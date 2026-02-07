<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Concerns\HasUuids;
use Illuminate\Database\Eloquent\Model;

class ProjectMilestone extends Model
{
    use HasUuids;

    protected $keyType = 'string';
    public $incrementing = false;

    protected $fillable = [
        'project_id',
        'title',
        'description',
        'status',
        'due_date',
        'completed_at',
        'order',
    ];

    protected function casts(): array
    {
        return [
            'due_date' => 'datetime',
            'completed_at' => 'datetime',
        ];
    }

    public function project()
    {
        return $this->belongsTo(Project::class);
    }
}
