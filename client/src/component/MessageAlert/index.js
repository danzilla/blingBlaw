import React, { Component } from 'react'
// Content
class Content extends Component {
    constructor(props) {
        super(props)
        this.state = {
            Content: "Content"
        }
    }
    // Raaar
    render() {
        return (
            <div className="row w-100">
                <div className="container center-align">
                    {this.props.pageDisplay &&
                        <span class="blue-text text-darken-2">
                            {JSON.stringify(this.props.pageDisplay)}
                        </span>
                    }
                    {this.props.alertMessage &&
                        <span class="blue-text text-darken-2">
                            {JSON.stringify(this.props.alertMessage)}
                        </span>
                    }
                </div>
            </div>
        );
    }
}
export default Content;
