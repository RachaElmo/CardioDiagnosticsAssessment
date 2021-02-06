<?php

namespace App\Http\Controllers;
use Illuminate\Support\Facades\Auth;
use Illuminate\Http\Request;
use App\Models\Patient;
class PatientController extends Controller
{
    /**
     * Handle the incoming request.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function getpatients(Request $request)
    {  
        $Patients=Patient::select('id','patient_id','name','date_of_birth','study_start_time','study_end_time','device_id')->with('device:id,serial_number')->withCount('events')->orderBy('study_start_time')->get();
        return $Patients;
    }
    public function getpatient(Request $request)
    {  
        $Patients=Patient::select('id','patient_id','name','date_of_birth','study_start_time','study_end_time','device_id')->with('device:id,serial_number')->with('events')->where('id',$request->id)->get();
        return $Patients;
    }
}
