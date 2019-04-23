import React, { Component } from 'react'
import axios from 'axios'

import StatementCard from './viewStatementsCards'

class viewStatements extends Component {

    // states
    constructor(props) {
        super(props)
        this.state = {
            data: []
        }
    }
    componentDidMount = () => {
        console.log("componentDidMount: loading Statements");
        // load statement
        // Better way to manage statement
        // submit to server
        axios.get('http://localhost:5000/statement/view')
            .then((response) => {

                console.log(JSON.stringify(response.data.bigTable));
                
                if (response.data.bigTable) {
                    this.setState({ data: response.data.bigTable });
                }
            })
            .catch((error) => {
                // get and set props - register state
                this.setState({ data: error });
            });
    }

    render() {

        var Apap = React.createClass({
            render() {
                var tifs = { 1: 'Joe', 2: 'Jane' };

                var tifOptions = Object.keys(tifs).map(function (key) {
                    return <option key={key} value={key}>{tifs[key]}</option>
                });

                const tifOptionsES6 = Object.keys(tifs).map(key =>
                    <option key={key} value={key}>{tifs[key]}</option>
                )

                var tifOptionsForEach = []
                Object.keys(tifs).forEach(function (key) {
                    tifOptionsForEach.push(<option key={key} value={key}>{tifs[key]}</option>);
                });

                return (
                    <div>
                        <select>{tifOptions}</select>
                        <select>{tifOptionsES6}</select>
                        <select>{tifOptionsForEach}</select>
                    </div>
                );
            }
        });


        console.log(JSON.stringify(this.state.data));
        
        return (
            <div className="h-100">
                <nav>
                    <div class="nav-wrapper container">
                        <div className="left">
                            <a href="">123</a>
                            <a href="">123</a>
                        </div>
                        <div className="right">
                            <a href="">asd</a>
                            <a href="">asd</a>
                            <a href="">asd</a>
                            <a href="">asd</a>
                            <a href="">asd</a>
                            <a href="">asd</a>
                        </div>
                        <div className="center">
                            <a href="">123</a>
                            <a href="">123</a>
                        </div>
                    </div>
                </nav>

                <div className="col m12 s12 h-95 overflowY">
                    <div className="row">

                        <div className="col m3">
                            <StatementCard
                            cardData={"hello"}
                            chartData={"chartInfo"} />
                        </div>

                        <Apap />                                        
                    </div>
                </div>
            </div>
        );
    }
}

export default viewStatements;
