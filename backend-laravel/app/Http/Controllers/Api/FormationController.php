<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Formation;
use Illuminate\Http\Request;

class FormationController extends Controller
{
    public function index(Request $request)
    {
        $query = Formation::query();

        if ($request->has('search')) {
            $search = $request->query('search');
            $query->where('title', 'like', "%{$search}%")
                  ->orWhere('description', 'like', "%{$search}%");
        }

        if ($request->has('category') && $request->query('category') !== 'all') {
            $query->where('category', $request->query('category'));
        }

        if ($request->has('level') && $request->query('level') !== 'all') {
            $query->where('level', $request->query('level'));
        }

        $formations = $query->latest()->get();

        return response()->json($formations);
    }

    public function show($id)
    {
        $formation = Formation::with(['modules.quizzes', 'certificates'])->findOrFail($id);
        return response()->json($formation);
    }
}
