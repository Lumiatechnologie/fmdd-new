<?php

use App\Models\Inscription;
use App\Mail\InscriptionConfirmationCandidate;
use App\Mail\InscriptionNotificationNaim;
use Illuminate\Support\Facades\Mail;
use Illuminate\Support\Facades\Http;

require __DIR__.'/vendor/autoload.php';
$app = require_once __DIR__.'/bootstrap/app.php';

$kernel = $app->make(Illuminate\Contracts\Console\Kernel::class);
$kernel->bootstrap();

$inscription = Inscription::latest()->first();
if (!$inscription) {
    die("ERROR: No inscriptions found.\n");
}

$testEmail = 'fouad05achraf@gmail.com';

echo "--- STARTING FINAL TESTS ---\n";
echo "1. Testing Candidate Confirmation (Dark Theme + CID QRs)...\n";

try {
    $qrEntryUrl = "https://api.qrserver.com/v1/create-qr-code/?size=300x300&data=" . urlencode("https://fmdd.com/entry?token={$inscription->qr_entry_token}");
    $qrCvUrl = "https://api.qrserver.com/v1/create-qr-code/?size=300x300&data=" . urlencode("https://fmdd.com/cv?token={$inscription->qr_cv_token}");
    
    $qrEntryRes = Http::get($qrEntryUrl);
    $qrCvRes = Http::get($qrCvUrl);
    
    if (!$qrEntryRes->successful() || !$qrCvRes->successful()) {
        throw new \Exception("Failed to fetch QR data.");
    }
    
    Mail::to($testEmail)->send(new InscriptionConfirmationCandidate($inscription, $qrEntryRes->body(), $qrCvRes->body()));
    echo "SUCCESS: Candidate email sent to {$testEmail}\n";
} catch (\Exception $e) {
    echo "FAILURE (Candidate): " . $e->getMessage() . "\n";
}

echo "\n2. Testing Admin Notification (Naim) with CV Attachment...\n";

try {
    Mail::to($testEmail)->send(new InscriptionNotificationNaim($inscription, $inscription->cv_path));
    echo "SUCCESS: Admin notification sent to {$testEmail}\n";
} catch (\Exception $e) {
    echo "FAILURE (Admin): " . $e->getMessage() . "\n";
}

echo "--- TESTS FINISHED ---\n";
