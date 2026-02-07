<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Concerns\HasUuids;
use Illuminate\Database\Eloquent\Model;

class Mentor extends Model
{
    use HasUuids;

    protected $keyType = 'string';
    public $incrementing = false;

    protected $fillable = [
        'user_id',
        'expertise',
        'bio',
        'availability',
        'rating',
        'sessions_count',
        'is_active',
    ];

    protected function casts(): array
    {
        return [
            'expertise' => 'array',
            'availability' => 'array',
            'rating' => 'float',
            'is_active' => 'boolean',
        ];
    }

    public function sessions()
    {
        return $this->hasMany(MentorshipSession::class);
    }
}
