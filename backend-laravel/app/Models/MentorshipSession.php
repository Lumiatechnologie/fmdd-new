<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Concerns\HasUuids;
use Illuminate\Database\Eloquent\Model;

class MentorshipSession extends Model
{
    use HasUuids;

    protected $keyType = 'string';
    public $incrementing = false;

    protected $fillable = [
        'mentoring_id',
        'mentor_id',
        'scheduled_at',
        'duration',
        'status',
        'notes',
        'feedback',
    ];

    protected function casts(): array
    {
        return [
            'scheduled_at' => 'datetime',
            'feedback' => 'array',
        ];
    }

    public function mentoring()
    {
        return $this->belongsTo(Mentoring::class);
    }

    public function mentor()
    {
        return $this->belongsTo(Mentor::class);
    }
}
