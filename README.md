# CardioDiagnosticsAssessment

In the assessment there is an API that handles receiving the data from devices and storing them into the database. So for testing I used Laravel factories and seeders and MySQL triggers to generate my own fake data while considering the cases given:
1-One patient is assigned to one device.
2-One device can have many patients in different times.
3-One patient can have multiple events.

For first case: I created table 'users' where each user is assigned a device_id (it can null if not immediately assigned with user creation).
                Then inside the table 'patient', each record consists of a unique patient_id (foreign key from 'users' table) along with the name, birth date, study start time, study end time, and assigned device_id. 
                

For second case: I add a MySQL trigger to ensure before inserting to the table 'patient' or updating, I can check the device_id if similar to the new one being inserted then check their corresponding study times for overlaps.

For third case: In the table 'event', patient_id is a foreign key from 'users' where I can have multiple events for the same patient. (Added a unique composite key made up of type, date, and patient_id).

Table :
For the sorting of the table, the fetched data is sorted by first the patient’s study start date and then I used the 'react-table' library to sort any column that I want to be sorted either descending or ascending on the frontend side.

Graph:
When the user clicks on a row in the table, a line graph appears underneath the table, along with the patient name, minimum heart rate (BPM), average heart rate (BPM) and maximum heart rate (BPM). Used Chart.js library for the line graph. The React component "Chart" takes as props the graph labels which are the event dates sorted, and the graph Data which are the heart rates corresponding to event dates.
The graph shows the variation of Heart Rates per minute with respect to its corresponding event datetime. (That is between the patient study start time and the study end time) 
