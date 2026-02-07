<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Concerns\HasUuids;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;
use Laravel\Sanctum\HasApiTokens;

class User extends Authenticatable
{
    use HasApiTokens, HasUuids, Notifiable;

    protected $keyType = 'string';
    public $incrementing = false;

    protected $fillable = [
        'email',
        'password',
        'role',
    ];

    protected $hidden = [
        'password',
    ];

    protected function casts(): array
    {
        return [
            'password' => 'hashed',
        ];
    }

    // Relationships
    public function profile()
    {
        return $this->hasOne(Profile::class);
    }

    public function progressions()
    {
        return $this->hasMany(CourseProgression::class);
    }

    public function applications()
    {
        return $this->hasMany(Application::class);
    }

    public function projects()
    {
        return $this->hasMany(Project::class);
    }

    public function mentorings()
    {
        return $this->hasMany(Mentoring::class, 'mentor_id');
    }

    public function menteeings()
    {
        return $this->hasMany(Mentoring::class, 'mentee_id');
    }

    public function certificates()
    {
        return $this->hasMany(Certificate::class);
    }

    public function badges()
    {
        return $this->hasMany(UserBadge::class);
    }
}
