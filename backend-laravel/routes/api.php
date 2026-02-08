<?php

use App\Http\Controllers\Api\AuthController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider and all of them will
| be assigned to the "api" middleware group. Make something great!
|
*/

// Public auth routes
Route::post('/auth/register', [AuthController::class, 'register']);
Route::post('/auth/login', [AuthController::class, 'login']);

// Public feature routes
Route::get('/formations', [App\Http\Controllers\Api\FormationController::class, 'index']);
Route::get('/formations/{id}', [App\Http\Controllers\Api\FormationController::class, 'show']);

Route::get('/jobs', [App\Http\Controllers\Api\JobOfferController::class, 'index']);
Route::get('/jobs/{id}', [App\Http\Controllers\Api\JobOfferController::class, 'show']);

Route::get('/incubation/programs', [App\Http\Controllers\Api\IncubationController::class, 'index']);
Route::get('/incubation/programs/{id}', [App\Http\Controllers\Api\IncubationController::class, 'show']);

// Inscription Flow
Route::post('/inscriptions', [App\Http\Controllers\Api\InscriptionController::class, 'store']);
Route::get('/events', [App\Http\Controllers\Api\EventController::class, 'index']);
Route::get('/events/{id}', [App\Http\Controllers\Api\EventController::class, 'show']);

// Protected auth routes
Route::middleware('auth:sanctum')->group(function () {
    Route::get('/auth/me', [AuthController::class, 'me']);
    Route::post('/auth/logout', [AuthController::class, 'logout']);
});
