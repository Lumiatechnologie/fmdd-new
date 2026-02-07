<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Concerns\HasUuids;
use Illuminate\Database\Eloquent\Model;

class Quiz extends Model
{
    use HasUuids;

    protected $keyType = 'string';
    public $incrementing = false;

    protected $fillable = [
        'module_id',
        'interview_prep_id',
        'title',
    ];

    public function module()
    {
        return $this->belongsTo(Module::class);
    }

    public function interviewPrep()
    {
        return $this->belongsTo(InterviewPrep::class);
    }

    public function questions()
    {
        return $this->hasMany(Question::class);
    }
}
