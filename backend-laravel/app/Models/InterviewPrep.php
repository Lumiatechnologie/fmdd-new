<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Concerns\HasUuids;
use Illuminate\Database\Eloquent\Model;

class InterviewPrep extends Model
{
    use HasUuids;

    protected $keyType = 'string';
    public $incrementing = false;

    protected $fillable = [
        'title',
        'description',
        'category',
        'video_url',
    ];

    public function quizzes()
    {
        return $this->hasMany(Quiz::class);
    }
}
