import React, { Component } from 'react';

import 'materialize-css/dist/css/materialize.min.css';
import M from "materialize-css";


class Materialize extends Component {

    componentDidMount() {

        const optionsL = {
            inDuration: 250,
            outDuration: 200,
            draggable: true,
            edge: 'left'
        }
        const optionsR = {
            inDuration: 250,
            outDuration: 200,
            draggable: true,
            edge: 'right'
        }
        const navLeft = document.querySelectorAll('#slideoutLeft');
        const navRight = document.querySelectorAll('#slideoutRight');

        // Auto initialize all the things!
        M.AutoInit();

        // Nav
        M.Sidenav.init(navLeft, optionsL)
        M.Sidenav.init(navRight, optionsR)
    }


    render() { return ("");}
}

export default Materialize;
