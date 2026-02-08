<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Inscription;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Str;
use SimpleSoftwareIO\QrCode\Facades\QrCode;
use Illuminate\Support\Facades\Mail;
use App\Mail\InscriptionNotificationNaim;
use App\Mail\InscriptionConfirmationCandidate;

class InscriptionController extends Controller
{
    public function store(Request $request)
    {
        $request->validate([
            'nom' => 'required|string|max:191',
            'prenom' => 'required|string|max:191',
            'email' => 'required|email|unique:inscriptions,email',
            'telephone' => 'nullable|string|max:20',
            'domaine_formation' => 'required|string',
            'niveau_etudes' => 'required|string',
            'message' => 'nullable|string',
            'dossier_name' => 'required|string',
            'cv' => 'required|file|mimes:pdf,doc,docx,jpg,jpeg,png|max:5120',
            'event_id' => 'nullable|uuid|exists:events,id',
        ]);

        DB::beginTransaction();

        try {
            $inscription = new Inscription($request->only([
                'nom', 'prenom', 'email', 'telephone', 'domaine_formation', 'niveau_etudes', 'message', 'event_id'
            ]));

            $inscription->qr_entry_token = Str::random(40);
            $inscription->qr_cv_token = Str::random(40);

            // Handle CV Upload
            if ($request->hasFile('cv')) {
                $file = $request->file('cv');
                $timestamp = now()->format('YmdHis');
                $filename = "{$inscription->id}_{$request->prenom}-{$request->nom}_{$timestamp}.{$file->getClientOriginalExtension()}";
                
                // Construct path for frontend (as requested)
                // Note: In a real Laravel app, we usually use storage/app/public
                // But specifically requested to move to frontend/{dossier_name}/cv_tech
                $relativeDir = "frontend/{$request->dossier_name}/cv_tech";
                $publicPath = public_path($relativeDir);
                
                if (!file_exists($publicPath)) {
                    mkdir($publicPath, 0755, true);
                }

                $file->move($publicPath, $filename);
                
                $inscription->cv_filename = $filename;
                $inscription->cv_path = "{$relativeDir}/{$filename}";
            }

            $inscription->save();

            DB::commit();

            // Generate QR Codes via QRServer API (PNG) and fetch raw data for CID embedding
            $qrEntryUrl = "https://api.qrserver.com/v1/create-qr-code/?size=300x300&data=" . urlencode("https://fmdd.com/entry?token={$inscription->qr_entry_token}");
            $qrCvUrl = "https://api.qrserver.com/v1/create-qr-code/?size=300x300&data=" . urlencode("https://fmdd.com/cv?token={$inscription->qr_cv_token}");
            
            $qrEntryData = @file_get_contents($qrEntryUrl);
            $qrCvData = @file_get_contents($qrCvUrl);

            // Async Emails (Dispatch later if queues configured, or directly for now)
            try {
                Mail::to('candidature@fmdd.ma')->send(new InscriptionNotificationNaim($inscription, $inscription->cv_path));
                Mail::to($inscription->email)->send(new InscriptionConfirmationCandidate($inscription, $qrEntryData, $qrCvData));
            } catch (\Exception $e) {
                // Log email failure but don't fail the request
                \Log::error("Email failed for inscription {$inscription->id}: " . $e->getMessage());
            }

            return response()->json([
                'id' => $inscription->id,
                'message' => 'Inscription enregistrée',
                'urls' => [
                    'cv' => asset($inscription->cv_path),
                    'qr_entry' => $qrEntryUrl,
                    'qr_cv' => $qrCvUrl,
                ]
            ], 201);

        } catch (\Exception $e) {
            DB::rollBack();
            \Log::error("Registration error: " . $e->getMessage());
            return response()->json(['error' => 'Une erreur est survenue lors de l\'enregistrement.'], 500);
        }
    }
}
