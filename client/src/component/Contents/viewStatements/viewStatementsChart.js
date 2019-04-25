import React, { Component } from 'react';
import { Pie } from 'react-chartjs-2';

class Chart extends Component {
    render() {
        // Hide labels on Charts
        const options = {
            legend: {
                display: false,
            },
        };
        const data = {
            labels: [
                'Red',
                'Green',
                'Yellow',
                'Red',
                'Green',
                'Yellow'
            ],
            datasets: [{
                data: [300, 50, 100, 300, 50, 100],
                backgroundColor: [
                    '#FF6384',
                    '#36A2EB',
                    '#FFCE56',
                    '#FF6364',
                    '#34A2EB',
                    '#FFCE26'
                ],
                hoverBackgroundColor: [
                    '#FF6384',
                    '#36A2EB',
                    '#FFCE56',
                    '#FB6384',
                    '#36C2EB',
                    '#FFAE56'
                ]
            }]
        };
        return (
            <Pie 
                data={data} 
                options={options}
            />
        );
    }
}

export default Chart;
