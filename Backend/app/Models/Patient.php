<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Patient extends Model
{
    protected $table = 'patient';
    use HasFactory;
    public $fillable = [
        'name',
        'date_of_birth'
        ,'study_start_time'
        ,'study_end_time'
        ,'device_id'
    ];

    public function events()
    {
        return $this->hasMany(Event::class, 'patient_id', 'patient_id');
        //return $this->hasManyThrough(Event::class,User::class);
    }
    public function device()
    {
        /*return $this->hasOneThrough(
            Device::class,
            User::class,
            'device_id', // Foreign key on the cars table...
            'id', // Foreign key on the owners table...
            'device_id', // Local key on the mechanics table...
            'device_id' // Local key on the cars table...
        );*/
        return $this->belongsTo(Device::class, 'device_id', 'id');
    }
}
