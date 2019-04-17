import React, { Component } from 'react';

import NewUsersForm from './addNewUsersForm'
import ViewUsers from './viewUsersTable'

class addNewUsers extends Component {
    // States
    constructor(props) {
        super(props);
        this.state = {
            register: {
                userName: "",
                password: "",
                fannyPack: ""
            }
        };
    }
    // Render
    render() {
        return (
            <div>
                <div id="NewUsers" className="container modal">
                    {/* Header */}
                    <h4 className="m-1"> Users </h4>
                    <hr className="hr black-text text-darken" />
                    {/* Content */}
                    <div className="modal-content">
                        <div className="row center-align">
                            <NewUsersForm />
                        </div>
                        <div className="row">
                            <ViewUsers />
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default addNewUsers;
