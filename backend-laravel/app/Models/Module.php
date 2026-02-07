<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Concerns\HasUuids;
use Illuminate\Database\Eloquent\Model;

class Module extends Model
{
    use HasUuids;

    protected $keyType = 'string';
    public $incrementing = false;

    protected $fillable = [
        'formation_id',
        'title',
        'content',
        'order',
    ];

    public function formation()
    {
        return $this->belongsTo(Formation::class);
    }

    public function quizzes()
    {
        return $this->hasMany(Quiz::class);
    }
}
