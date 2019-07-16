import React, { Component } from 'react'
import M from "materialize-css";
// Content
class Content extends Component {
    constructor(props) {
        super(props)
        this.state = {
            Content: "Content"
        }
    }
    componentWillReceiveProps (newProps) {
        if (newProps.alertMessage.pageMessage){
            M.toast({ html: newProps.alertMessage.pageMessage })
        }
    }
    // Raaar
    render() {
        return ( <div className=""> </div> );
    }
}
export default Content;
/*
                <div className="container center-align">
                    {this.props.pageDisplay &&
                        <span class="blue-text text-darken-2">
                            {JSON.stringify(this.props.pageDisplay)}
                        </span>
                    }
                    {this.props.alertMessage &&
                        <span class="blue-text text-darken-2">
                            {JSON.stringify(this.props.alertMessage.pageMessage)}
                        </span>
                    }
                </div>
*/