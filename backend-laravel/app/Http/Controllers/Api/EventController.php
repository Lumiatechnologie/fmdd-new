<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Event;
use Illuminate\Http\Request;

class EventController extends Controller
{
    public function index()
    {
        $events = Event::withCount('inscriptions')->orderBy('date', 'desc')->get();
        
        return response()->json($events);
    }

    public function show($id)
    {
        $event = Event::withCount('inscriptions')->findOrFail($id);
        
        return response()->json($event);
    }
}
