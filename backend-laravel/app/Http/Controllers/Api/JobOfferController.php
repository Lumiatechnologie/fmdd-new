<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\JobOffer;
use Illuminate\Http\Request;

class JobOfferController extends Controller
{
    public function index(Request $request)
    {
        $query = JobOffer::query();

        if ($request->has('search') && $request->query('search')) {
            $search = $request->query('search');
            $query->where('title', 'like', "%{$search}%")
                  ->orWhere('company', 'like', "%{$search}%")
                  ->orWhere('skills', 'like', "%{$search}%");
        }

        if ($request->has('location') && $request->query('location')) {
            $query->where('location', 'like', "%{$request->query('location')}%");
        }

        if ($request->has('type') && $request->query('type') !== 'all') {
            $query->where('type', $request->query('type'));
        }

        if ($request->has('isRemote') && $request->query('isRemote') === 'true') {
            $query->where('is_remote', true);
        }

        $jobs = $query->latest()->get();

        return response()->json($jobs);
    }

    public function show($id)
    {
        $job = JobOffer::findOrFail($id);
        return response()->json($job);
    }
}
