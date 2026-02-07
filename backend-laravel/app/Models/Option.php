<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Concerns\HasUuids;
use Illuminate\Database\Eloquent\Model;

class Option extends Model
{
    use HasUuids;

    protected $keyType = 'string';
    public $incrementing = false;
    public $timestamps = false;

    protected $fillable = [
        'question_id',
        'text',
        'is_correct',
    ];

    protected function casts(): array
    {
        return [
            'is_correct' => 'boolean',
        ];
    }

    public function question()
    {
        return $this->belongsTo(Question::class);
    }
}
