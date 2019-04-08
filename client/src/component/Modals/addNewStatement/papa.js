import React, { useCallback } from 'react'
import Dropzone from 'react-dropzone'
import Papa from 'papaparse'
import csv from "csvtojson";

import CSVReader from 'react-csv-reader'

class FileReader extends React.Component {
    constructor() {
        super();
        this.state = {
            data: [],
            data1: [],
            data2: [],
            data3: []
        };
    }


// Parase CSV to JSON array 
// Need more works~
ConvertToCSV(objArray) {
    var array = typeof objArray != 'object' ? JSON.parse(objArray) : objArray;
    var str = '';
    for (var i = 0; i < array.length; i++) {
        var line = '';
        for (var index in array[i]) {
            if (line != '') line += ','
            line += array[i][index];
        }
        str += line + '\r\n';
    }
    return str;
}

// File handle
// On file being reviews
handleForce = data => {
    // Convert csv to Json
    csv({
        noheader: true,
        output: "json"
    })
    .fromString(this.ConvertToCSV(data))
    .then(csvRows => {
        this.setState({
            data: csvRows,
            data1: this.ConvertToCSV(data),
            data2: csvRows,
        }); 
    })
};

    render() {
         return (
            <div>
                <CSVReader
                    cssClass="waves-effect waves-dark btn light-blue darken-3"
                    label="Select CSV"
                    onFileLoaded={this.handleForce}
                    onError={this.handleDarkSideForce}
                    inputId="ObiWan"
                    accept=".csv, text/csv"
                    parserOptions={{
                        delimiter: "",	// auto-detect
                        newline: "",	// auto-detect
                        quoteChar: '"',
                        escapeChar: '"',
                        header: false
                    }}
                    inputStyle={{ color: 'red' }}

                    asdasd
                />

                 <table class="table">
                     <thead class="thead-dark">
                         <tr class="bg-dark text-light">
                             <th scope="col" class="text-center"> ID </th>
                             <th scope="col" class="">Date</th>
                             <th scope="col" class="">Description</th>
                             <th scope="col" class="text-center">Transaction</th>
                             <th scope="col" class="text-center">Balance</th>
                         </tr>
                     </thead>
                     <tbody>
                         {this.state.data.map((row, i) =>
                            <tr key={i}>
                                <td>i</td>
                                <td>{row.field1}</td>
                                <td>{row.field2}</td>
                                {/* 
                                    Check if Deposite or Withdrawl
                                    Display only one
                                */}
                                <td>{row.field3 == '' ? row.field4: row.field3}</td>
                                <td>{row.field5}</td>
                            </tr>
                         )}
                     </tbody>
                 </table>
      
            </div>
        );
    }
}

export default FileReader;