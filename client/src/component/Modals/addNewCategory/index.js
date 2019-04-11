import React, { Component } from 'react';
import { emojify } from 'react-emojione';

import Table from '../../Charts/table'

class addNewCategory extends Component {
    // States
    constructor(props) {
        super(props);
        this.state = {
            reviewData: [],
            contact: ''
        };
    }

    // Render
    render() {
        return (
            <div>
                <div id="NewCategory" className="container modal">
                    {/* Header */}
                    <h4 className="m-1"> Labels </h4>
                    <hr className="hr black-text text-darken" />
                    {/* Content */}
                    <div className="modal-content">
                        
                        <div class="row">
                            <div class="input-field col m4 s12">
                                <i class="material-icons prefix">loyalty</i>
                                <input placeholder="Trappin'" id="first_name" type="text" class="validate" required />
                                <label for="first_name">Label name</label>
                            </div>
                            <div class="input-field col m4 s12">
                                <i class="material-icons prefix">unfold_more</i>
                                <select name="staType">
                                    <option value="1">New label (root)</option>
                                    <option value="2">Option 2</option>
                                    <option value="3">Option 3</option>
                                </select>
                                <label for="autocomplete-input">Parent Label</label>
                            </div>
                            <div className="col m4 s12">
                                <a className="blue-text text-lighten-2 card-1 grey lighten-3 waves-effect waves-dark btn-large btn-flat">
                                    Add <i class="material-icons right">done_all</i>
                                </a>
                            </div>
                        </div>

                        <div className="row">
                            <Table />
                        </div>
                     
                    </div>
                </div>
            </div>
        );
    }
}

export default addNewCategory;
