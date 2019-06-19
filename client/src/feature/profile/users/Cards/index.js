import React, { Component } from 'react';
import { emojify } from 'react-emojione';

class Card extends Component {
    render() {
        return (
            <div className="col s12 m12 l12">
                <div className="card-1 valign-wrapper">
                    <div className="col s2">
                        <h3 class="black-text">
                            T
                        </h3>
                    </div>
                    <div className="col s10">
                        <span class="black-text">
                            This is a square image. Add the "circle" class to it to make it appear circular.
                        </span>
                    </div>
                </div>
            </div>
        );
    }
}

export default Card;
