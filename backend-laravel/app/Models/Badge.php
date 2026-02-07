<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Concerns\HasUuids;
use Illuminate\Database\Eloquent\Model;

class Badge extends Model
{
    use HasUuids;

    protected $keyType = 'string';
    public $incrementing = false;
    public $timestamps = false;

    protected $fillable = [
        'name',
        'description',
        'icon',
    ];

    public function userBadges()
    {
        return $this->hasMany(UserBadge::class);
    }
}
