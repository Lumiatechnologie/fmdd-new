<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Concerns\HasUuids;
use Illuminate\Database\Eloquent\Model;

class Project extends Model
{
    use HasUuids;

    protected $keyType = 'string';
    public $incrementing = false;

    protected $fillable = [
        'user_id',
        'title',
        'description',
        'status',
        'diagnostic',
        'program_id',
    ];

    protected function casts(): array
    {
        return [
            'diagnostic' => 'array',
        ];
    }

    public function user()
    {
        return $this->belongsTo(User::class);
    }

    public function program()
    {
        return $this->belongsTo(IncubationProgram::class, 'program_id');
    }

    public function milestones()
    {
        return $this->hasMany(ProjectMilestone::class);
    }

    public function fundingApplications()
    {
        return $this->hasMany(FundingApplication::class);
    }
}
