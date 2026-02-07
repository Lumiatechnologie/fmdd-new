<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\User;
use App\Models\Profile;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Illuminate\Validation\ValidationException;

class AuthController extends Controller
{
    /**
     * Register a new user
     */
    public function register(Request $request)
    {
        $validated = $request->validate([
            'email' => 'required|email|unique:users',
            'password' => 'required|min:6',
            'role' => 'required|in:USER,ADMIN,MENTOR',
            'first_name' => 'nullable|string',
            'last_name' => 'nullable|string',
        ]);

        $user = User::create([
            'email' => $validated['email'],
            'password' => $validated['password'], // Auto-hashed by User model cast
            'role' => $validated['role'],
        ]);

        // Create profile if name provided
        if (isset($validated['first_name']) || isset($validated['last_name'])) {
            Profile::create([
                'user_id' => $user->id,
                'first_name' => $validated['first_name'] ?? '',
                'last_name' => $validated['last_name'] ?? '',
            ]);
        }

        $token = $user->createToken('auth_token')->plainTextToken;

        return response()->json([
            'user' => $user->load('profile'),
            'token' => $token,
        ], 201);
    }

    /**
     * Login user
     */
    public function login(Request $request)
    {
        $validated = $request->validate([
            'email' => 'required|email',
            'password' => 'required',
        ]);

        $user = User::where('email', $validated['email'])->first();

        if (!$user || !Hash::check($validated['password'], $user->password)) {
            throw ValidationException::withMessages([
                'email' => ['The provided credentials are incorrect.'],
            ]);
        }

        $token = $user->createToken('auth_token')->plainTextToken;

        return response()->json([
            'user' => $user->load('profile'),
            'token' => $token,
        ]);
    }

    /**
     * Get authenticated user
     */
    public function me(Request $request)
    {
        return response()->json([
            'user' => $request->user()->load('profile'),
        ]);
    }

    /**
     * Logout user
     */
    public function logout(Request $request)
    {
        $request->user()->currentAccessToken()->delete();

        return response()->json([
            'message' => 'Logged out successfully',
        ]);
    }
}
