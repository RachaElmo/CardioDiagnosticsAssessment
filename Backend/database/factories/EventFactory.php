<?php

namespace Database\Factories;

use App\Models\Event;
use Illuminate\Database\Eloquent\Factories\Factory;

class EventFactory extends Factory
{
    /**
     * The name of the factory's corresponding model.
     *
     * @var string
     */
    protected $model = Event::class;

    /**
     * Define the model's default state.
     *
     * @return array
     */
    public function definition()
    {
        $input = array("Loop memory monitor", "Symptom event monitor", "Patch recorders", "Implanted loop recorders");
        $rand_key = array_rand($input);
        $patient_id = \App\Models\Patient::inRandomOrder()->first()->patient_id;
        $study_range=\App\Models\Patient::select('study_start_time','study_end_time')->where('patient_id',$patient_id)->first();
       
        return [
            'type'=>$input[$rand_key],
            'heart_rate_BPM'=>mt_rand(75,180),
            'date' =>$this->faker->dateTimeBetween($study_range->study_start_time, $study_range->study_end_time) ,  // should be between study start time and study end time of patient record
            'patient_id'=>$patient_id
        ];
        
        //maybe Type and date is unique for the event
    }
}
