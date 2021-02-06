<?php

namespace Database\Factories;

use App\Models\Patient;
use Illuminate\Database\Eloquent\Factories\Factory;

class PatientFactory extends Factory
{
    /**
     * The name of the factory's corresponding model.
     *
     * @var string
     */
    protected $model = Patient::class;

    /**
     * Define the model's default state.
     *
     * @return array
     */
    public function definition()
    {
        $start_dateofbirth = strtotime("10 September 1960");
        $end_dateofbirth = strtotime("now");
        $dateofbirth = mt_rand($start_dateofbirth,$end_dateofbirth);

        // I want the start date to be sometime in the future from now 
        //and the end dateTime to be within a few hours of the start dateTime.
        $start_date = $this->faker->dateTimeBetween('+0 days', '+1 month');
        $start_date_clone = clone $start_date;
        $end_date =  $this->faker->dateTimeBetween($start_date, $start_date_clone->modify('+3 hours'));
        $patient_id = \App\Models\User::inRandomOrder()->first()->id;
        return [
            'patient_id' =>  $patient_id ,//only need patient ID as input and then automatically get the patient name and deviceID
            'name' => \App\Models\User::getName($patient_id),
            'date_of_birth' => date("Y-m-d", $dateofbirth),
            'study_start_time' => $start_date,
            'study_end_time' =>$end_date,
            'device_id' =>  \App\Models\User::getDeviceID($patient_id)
            
        ];
    }
}
//References:
// https://laracasts.com/discuss/channels/laravel/factory-with-a-foreign-key