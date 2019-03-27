import React, { Component } from 'react';

import 'materialize-css/dist/css/materialize.min.css';
import M from "materialize-css";


class Materialize extends Component {
    componentDidMount() {
        // Auto initialize all the things!
        M.AutoInit();
    }

    render() { return ("");}
}

export default Materialize;
