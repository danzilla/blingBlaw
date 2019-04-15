import React, { Component } from 'react';
import axios from 'axios';

class addNewCategoryForm extends Component {
    // states
    constructor(props) {
        super(props)
        this.state = {
            addCategory: {
                categoryName: "",
                categoryParent: ""
            },
            pageMesage: ""
        }
    }
    // handleChange - get and set state for addCategory form
    handleChange = (propertyName, event) => {
        const addCategory = this.state.addCategory;
        addCategory[propertyName] = event.target.value;
        this.setState({ addCategory: addCategory });
    }
    // handleSubmit - addCategory
    handleSubmit = (event) => {
        if (!this.state.addCategory.categoryName || !this.state.addCategory.categoryParent) {
            // If the input are empty 
            // setState to = False
            this.setState({ pageMesage: "Category name cannot be empty " });
        } else {
            // submit to server
            axios.post('http://localhost:5000/category/add', {
                categoryName: this.state.addCategory.categoryName,
                categoryParent: this.state.addCategory.categoryParent
            })
            .then((response) => {
                if (!response.data) {
                    // if response.data = empty or bad
                    // set local state
                    this.setState({ pageMesage: response.data.pageMesage });
                } else {
                    // if response.data = good
                    // set local state
                    this.setState({ pageMesage: response.data.pageMesage });
                }
            })
            .catch((error) => {
                // get and set props - register state
                console.log("message: " + error.message);
            });
        }
        // default prevent-refresh Form dawg
         event.preventDefault();
    }
    // Render
    render() {
        return (
            <form onSubmit={this.handleSubmit}>
                <div className="row valign-wrapper">
                    <div className="col m4">
                        <div className="input-field">
                            <i className="material-icons prefix pink-text text-lighten-2">loyalty</i>
                            <input id="categoryName" type="text" className="validate" name="categoryName"
                                onChange={this.handleChange.bind(this, 'categoryName')}
                                value={this.state.addCategory.categoryName}
                                placeholder="Trappin'" required />
                            <label for="categoryName">Label name</label>
                        </div>
                    </div>
                    <div className="col m4">
                        <div className="input-field">
                            <select name="categoryParent" id="categoryType" 
                                className="select-style browser-default"
                                onChange={this.handleChange.bind(this, 'categoryParent')}
                                value={this.state.addCategory.categoryParent}>
                                <option value="lola" disabled selected>
                                    Choose your option
                                </option>
                            {
                                this.props.categories.map((row, i) => (
                                    <option key={i} value={row.category_serial}>
                                        {row.category_name}
                                    </option>
                                ))
                            }
                            </select>
                        </div>
                    </div>
                    <div className="col m4 center-align">
                        <button className="btn-large card-1 waves-effect waves-pink btn-flat card-panel blue-grey lighten-5">
                            New label
                            <i className="material-icons right">
                                done_all</i>
                        </button>
                    </div>
                </div>
                <div classNameclassName="row">
                    <div className="center-align col s12 pink-text text-lighten-2">
                        {this.state.pageMesage}
                    </div>
                </div>
            </form>
        );
    }
}

export default addNewCategoryForm;


