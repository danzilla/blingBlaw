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
            <div className="m-0">
                <h5 class="center-align m-0">
                    This should be center aligned {JSON.stringify(this.props.pageDisplay)}
                </h5>
            </div>
        );
    }
}
export default Content;
