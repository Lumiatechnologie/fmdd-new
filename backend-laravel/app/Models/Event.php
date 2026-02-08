<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Concerns\HasUuids;
use Illuminate\Database\Eloquent\Model;

class Event extends Model
{
    use HasUuids;

    protected $fillable = [
        'title',
        'date',
        'description',
        'image_path',
        'time',
        'location',
    ];

    public function inscriptions()
    {
        return $this->hasMany(Inscription::class);
    }
}
