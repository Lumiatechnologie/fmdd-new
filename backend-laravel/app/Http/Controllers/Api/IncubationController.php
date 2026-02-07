<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\IncubationProgram;
use Illuminate\Http\Request;

class IncubationController extends Controller
{
    public function index()
    {
        $programs = IncubationProgram::withCount('projects')->get();
        return response()->json($programs);
    }

    public function show($id)
    {
        $program = IncubationProgram::with(['stages', 'projects'])->findOrFail($id);
        return response()->json($program);
    }
}
