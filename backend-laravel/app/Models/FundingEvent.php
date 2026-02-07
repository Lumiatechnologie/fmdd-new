<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Concerns\HasUuids;
use Illuminate\Database\Eloquent\Model;

class FundingEvent extends Model
{
    use HasUuids;

    protected $keyType = 'string';
    public $incrementing = false;

    protected $fillable = [
        'title',
        'description',
        'type',
        'organizer',
        'deadline',
        'amount',
        'requirements',
        'application_url',
        'is_active',
    ];

    protected function casts(): array
    {
        return [
            'deadline' => 'datetime',
            'requirements' => 'array',
            'is_active' => 'boolean',
        ];
    }

    public function applications()
    {
        return $this->hasMany(FundingApplication::class, 'event_id');
    }
}
