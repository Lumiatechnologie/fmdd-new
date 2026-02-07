<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Concerns\HasUuids;
use Illuminate\Database\Eloquent\Model;

class Certificate extends Model
{
    use HasUuids;

    protected $keyType = 'string';
    public $incrementing = false;
    public $timestamps = false;

    protected $fillable = [
        'user_id',
        'formation_id',
        'issue_date',
        'verify_url',
    ];

    protected function casts(): array
    {
        return [
            'issue_date' => 'datetime',
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
