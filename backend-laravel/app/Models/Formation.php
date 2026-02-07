<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Concerns\HasUuids;
use Illuminate\Database\Eloquent\Model;

class Formation extends Model
{
    use HasUuids;

    protected $keyType = 'string';
    public $incrementing = false;

    protected $fillable = [
        'title',
        'description',
        'image',
        'duration',
        'level',
        'category',
        'is_paid',
    ];

    protected function casts(): array
    {
        return [
            'is_paid' => 'boolean',
        ];
    }

    public function modules()
    {
        return $this->hasMany(Module::class);
    }

    public function progressions()
    {
        return $this->hasMany(CourseProgression::class);
    }

    public function certificates()
    {
        return $this->hasMany(Certificate::class);
    }
}
