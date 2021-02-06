import React, { useMemo,useEffect } from 'react'
import {useTable, useSortBy,usePagination} from 'react-table'
import './table.css';
import './chart.css';
import Charts from "./Charts";
import axios from 'axios';
export const SortTable = (props)=>{
    //After getting list of patients pass the columns and data to Table
    const columns = props.columns;
    const data =  props.data;
   
    const [graphData, setgraphData] = React.useState([]);
    const [graphLabels, setgraphLabels] = React.useState([]);
    const [HRmin, setHRmin] = React.useState([]);
    const [HRmean, setHRmean] = React.useState([]);
    const [HRmax, setHRmax] = React.useState([]);
    
    const prepareChartData = ()=>{
        if (typeof Events[0] !== 'undefined'){
            let HRmaxi,HRmini,HRavg;
            let sum=0
            let events = Events[0].events
            let eventsHR=[];
            let eventsDates=[];
            
            events.sort(function(a, b) {
                var keyA = new Date(a.date),
                  keyB = new Date(b.date);
                // Comparing dates
                if (keyA < keyB) return -1;
                if (keyA > keyB) return 1;
                return 0;
            });
            //starts from study start time
            events.map(event=>{
                eventsDates.push(event.date) //add to the x-axis labels events in between the study
                eventsHR.push(event.heart_rate_BPM) //y-axis Heart rate event data
                sum+=event.heart_rate_BPM;
            })
            //end at study end time
            events.sort(function(a, b) { //sort with respect to HR to get HRmin and HRmax
                return a.heart_rate_BPM - b.heart_rate_BPM;
            }); 
            HRmaxi= events[events.length-1].heart_rate_BPM;
            HRmini= events[0].heart_rate_BPM;
            HRavg = sum / events.length;
            setgraphLabels(eventsDates) //Set the Graph Labels
            setgraphData(eventsHR) //Set the Graph Data
            setHRmax(HRmaxi); setHRmin(HRmini); setHRmean(HRavg);
            console.log(graphData,graphLabels)
        }
    };

    // Table Instance Headers, Pagination settings,...
    const tableInstance = useTable({
        columns,
        data
    },useSortBy,usePagination)
    const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    page,
    nextPage,
    previousPage,
    canNextPage,
    canPreviousPage,
    pageOptions,
    state,
    prepareRow ,
    }=tableInstance
    const {pageIndex} = state
    //States will be mounted when user clicks on the row of patient
    
    const [Events, setEvents] = React.useState([]);
    const [name, setName] = React.useState("");
    //Fetch events for patient after click
    const handlePatientRow = (record_id)=>{
        axios.get('http://localhost:8000/api/patient?'+"id="+record_id).then(response=>{ if (response.status === 200) {
            setEvents(response.data); setName(response.data[0].name); 
        }});
    }
    useEffect(() => {
        console.log("his will be logged after every render!")
        prepareChartData();
    },[Events])
    return (
    (props.data!==null)?(<>
    {/*Table Start*/}
        <table {...getTableProps()} id="patients">
            <thead>
            {headerGroups.map(headerGroup => (
          <tr {...headerGroup.getHeaderGroupProps()}>
            {headerGroup.headers.map(column => (
              <th {...column.getHeaderProps(column.getSortByToggleProps())}>
                  {column.render("Header")}
                  <span>
                  {
                        column.isSorted
                        ? column.isSortedDesc
                            ? "▼"
                            : "▲"
                        : ""
                    }
                  </span>
                  </th>
            ))}
          </tr>
        ))}
            </thead>
            <tbody {...getTableBodyProps()}>
                {page.map((row)=>{
                    prepareRow(row)
                    return( 
                        <tr id={row.id} {...row.getRowProps()} onClick={()=>{handlePatientRow(row.original.id)}}>
                            {row.cells.map((cell) =>{
                                return <td {...cell.getCellProps()}> {cell.render('Cell')}
                                       </td>
                            })}
                        </tr>
                    )
                })}
            </tbody>
        </table>
        <div>
            <span>
                Page{' '}
                <strong>
                    {pageIndex + 1 } of {pageOptions.length}
                </strong>{' '}
            </span>
            <button onClick={()=>previousPage()}  disabled={!canPreviousPage} className="previous">&#8249;</button>
            <button onClick={()=>nextPage()} disabled={!canNextPage} className="next">&#8250;</button>
        </div>
    {/*Table End*/}
    {/*Chart Start*/}
        <div className="HighCharts">
                <h3><span>Patient Name: </span>{name}</h3>
                <Charts graphData={graphData}  graphLabels={graphLabels}/>
        </div>
        <div  style={{overflowY:"auto"}}>
            { (typeof Events[0] !== 'undefined')?(<>
                <div className="graphinfo"><span>Patient ID: {Events[0].patient_id}</span><span>HRmin: {HRmin} BPM</span><span>HRmax: {HRmax} BPM</span><span>HRmean: {HRmean} BPM</span></div>
                <table id="events">
                     <tr><th colSpan={3}>Events</th></tr>
                     <tr>
                         <th>Type</th><th>Date</th><th>Heart Rate (BPM)</th>
                     </tr>
                    {Events[0].events.map((event,i)=>{
                        return (<tr key={i}><td>{event.type}</td><td>{event.date}</td><td>{event.heart_rate_BPM}</td></tr>)
                    })
                }
                </table></>
            )
            :(<></>)}
        </div>
    {/*Chart End*/}
        </>
        ):(<></> )
    )
}
export default SortTable;