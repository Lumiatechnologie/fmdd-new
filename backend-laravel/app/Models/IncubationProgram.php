<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Concerns\HasUuids;
use Illuminate\Database\Eloquent\Model;

class IncubationProgram extends Model
{
    use HasUuids;

    protected $keyType = 'string';
    public $incrementing = false;

    protected $fillable = [
        'title',
        'description',
        'objectives',
        'stages',
        'duration',
        'requirements',
        'is_active',
    ];

    protected function casts(): array
    {
        return [
            'objectives' => 'array',
            'stages' => 'array',
            'requirements' => 'array',
            'is_active' => 'boolean',
        ];
    }

    public function projects()
    {
        return $this->hasMany(Project::class, 'program_id');
    }
}
