import React, { useMemo, useState, useEffect } from "react";
import Table from "./Table";
import SortTable from "./SortTable";
import axios from 'axios';
function Home() {
    const columns =  [
          
          {id:'col1',
          Header:'',
            columns: [
              {
                Header: "Patient ID",
                accessor: "patient_id"
              },
              {
                Header: "Name",
                accessor: "name"
              },
              {
                Header: "Date of Birth",
                accessor: "date_of_birth"
              },
              {
                Header: "Study Start Time",
                accessor: "study_start_time"
              },
              {
                Header: "Study End Time",
                accessor: "study_end_time"
              },
              {
                Header: "Device Serial Number",
                accessor: "device.serial_number"
              },
              {
                Header: "Total Number of Events",
                accessor: "events_count"
              }
            ]
          }
        ];
    
 const [patients, setpatients] = useState([]);

 // Using useEffect to call the API once mounted and set the data
 useEffect(() => {
   ( () => {
        axios.get('http://localhost:8000/api/patients',{}).then(response=>{ if (response.status === 200) {
            setpatients(response.data);
        }});
   })();
 }, []);
 console.log(patients)
    return (
      <div className="App">
        <SortTable columns={columns} data={patients} />
      </div>
    );
  }
  
  export default Home;