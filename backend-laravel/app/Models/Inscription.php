<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Concerns\HasUuids;
use Illuminate\Database\Eloquent\Model;

class Inscription extends Model
{
    use HasUuids;

    protected $fillable = [
        'nom',
        'prenom',
        'email',
        'telephone',
        'message',
        'cv_filename',
        'cv_path',
        'qr_entry_token',
        'qr_cv_token',
        'statut',
        'event_id',
    ];

    public function event()
    {
        return $this->belongsTo(Event::class);
    }
}
