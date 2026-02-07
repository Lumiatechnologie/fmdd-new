<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Concerns\HasUuids;
use Illuminate\Database\Eloquent\Model;

class FundingApplication extends Model
{
    use HasUuids;

    protected $keyType = 'string';
    public $incrementing = false;

    protected $fillable = [
        'project_id',
        'event_id',
        'status',
        'submitted_at',
        'documents',
        'notes',
    ];

    protected function casts(): array
    {
        return [
            'submitted_at' => 'datetime',
            'documents' => 'array',
        ];
    }

    public function project()
    {
        return $this->belongsTo(Project::class);
    }

    public function fundingEvent()
    {
        return $this->belongsTo(FundingEvent::class, 'event_id');
    }
}
