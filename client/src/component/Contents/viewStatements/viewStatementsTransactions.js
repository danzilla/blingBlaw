import React, { Component } from 'react';

class StatementsTransactions extends Component {

    render() {
        return (
            <div id={"modal" + this.props.cardModalId} className="modal">
                <div className="modal-content">
                    <h4>Modal Header</h4>
                    <p>asdasdasdasdasd</p>
                </div>
                <div className="modal-footer">
                    <a href="#!" className="modal-close waves-effect waves-green btn-flat">Agree</a>
                </div>
            </div>
        );
    }
}

export default StatementsTransactions;
