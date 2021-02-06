<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Device extends Model
{
    protected $table = 'device';
    use HasFactory;
    
    public function patients(){
 
        return $this->hasMany(Patient::class);
     }
}
