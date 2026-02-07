<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Concerns\HasUuids;
use Illuminate\Database\Eloquent\Model;

class Profile extends Model
{
    use HasUuids;

    protected $keyType = 'string';
    public $incrementing = false;

    protected $fillable = [
        'user_id',
        'first_name',
        'last_name',
        'bio',
        'avatar',
        'skills',
        'preferences',
    ];

    protected function casts(): array
    {
        return [
            'skills' => 'array',
            'preferences' => 'array',
        ];
    }

    public function user()
    {
        return $this->belongsTo(User::class);
    }
}
