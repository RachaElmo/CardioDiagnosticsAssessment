<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Event extends Model
{
    protected $table = 'event';
    use HasFactory;
    public $fillable = [
        'type',
        'heart_rate_BPM',
        'patient_id'
    ];
    public function user()
    {
        return $this->belongsTo(User::class);
    }
    public function patient(){
        return $this->belongsToMany(Patient::class)->using(User::class);
    }
    public function device()
    {
        return $this->hasOneThrough(
            Device::class,
            User::class
        );
    }
}
