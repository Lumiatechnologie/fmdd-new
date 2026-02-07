<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Concerns\HasUuids;
use Illuminate\Database\Eloquent\Model;

class CourseProgression extends Model
{
    use HasUuids;

    protected $keyType = 'string';
    public $incrementing = false;

    protected $fillable = [
        'user_id',
        'formation_id',
        'progress',
        'is_completed',
    ];

    protected function casts(): array
    {
        return [
            'is_completed' => 'boolean',
        ];
    }

    public function user()
    {
        return $this->belongsTo(User::class);
    }

    public function formation()
    {
        return $this->belongsTo(Formation::class);
    }
}
