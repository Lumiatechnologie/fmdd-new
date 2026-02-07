<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Concerns\HasUuids;
use Illuminate\Database\Eloquent\Model;

class JobOffer extends Model
{
    use HasUuids;

    protected $keyType = 'string';
    public $incrementing = false;

    protected $fillable = [
        'title',
        'company',
        'location',
        'type',
        'category',
        'duration',
        'salary',
        'description',
        'skills',
        'is_remote',
    ];

    protected function casts(): array
    {
        return [
            'is_remote' => 'boolean',
        ];
    }

    public function applications()
    {
        return $this->hasMany(Application::class, 'job_id');
    }
}
