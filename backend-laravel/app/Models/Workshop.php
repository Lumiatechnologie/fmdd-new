<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Concerns\HasUuids;
use Illuminate\Database\Eloquent\Model;

class Workshop extends Model
{
    use HasUuids;

    protected $keyType = 'string';
    public $incrementing = false;

    protected $fillable = [
        'title',
        'description',
        'category',
        'duration',
        'format',
        'resources',
        'video_url',
        'max_participants',
    ];

    protected function casts(): array
    {
        return [
            'resources' => 'array',
        ];
    }
}
