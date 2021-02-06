import React, { useMemo } from 'react'
import {useTable} from 'react-table'
import './table.css'
export const Table = (props)=>{
    const columns = props.columns;
    const data =  props.data;
    const tableInstance = useTable({
        columns,
        data
    })
    const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    rows,
    prepareRow ,
    }
    =tableInstance
    return (
(props.data!==null)?(
        <table {...getTableProps()} id="patients">
            <thead>
            {headerGroups.map(headerGroup => (
          <tr {...headerGroup.getHeaderGroupProps()}>
            {headerGroup.headers.map(column => (
              <th {...column.getHeaderProps()}>{column.render("Header")}</th>
            ))}
          </tr>
        ))}
            </thead>
            <tbody {...getTableBodyProps()}>
                {rows.map((row)=>{
                    prepareRow(row)
                    return(
                        <tr {...row.getRowProps()}>
                            {row.cells.map((cell,i) =>{
                                return <td id={i} {...cell.getCellProps()}>{cell.render('Cell')}
                                       </td>
                            })}
                            
                        </tr>
                    )
                })}
            </tbody>
        </table>
        ):(<></> )
    )
}
export default Table;