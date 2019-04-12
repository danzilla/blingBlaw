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

        let optionTemplate = this.props.categories.map((row, i) => (
            <option key={i} value={row.category_serial}>{row.category_name}</option>
        ));

        return (
            <form onSubmit={this.handleSubmit}>
                <div class="row">
                    <div class="input-field col m4 s12">
                        <i class="material-icons prefix">loyalty</i>
                        <input id="categoryName" type="text" class="validate" name="categoryName"
                            onChange={this.handleChange.bind(this, 'categoryName')}
                            value={this.state.addCategory.categoryName}
                            placeholder="Trappin'" required />
                        <label for="categoryName">Label name</label>
                    </div>
                    <div class="input-field col m4 s12">
                        <i class="material-icons prefix">unfold_more</i>
                        <select name="categoryParent" id="categoryParent"
                            onChange={this.handleChange.bind(this, 'categoryParent')}
                            value={this.state.addCategory.categoryParent}>
                            {optionTemplate}
                        </select>
                        <label for="autocomplete-input">Parent Label</label>
                    </div>

                    <div className="col m4 s12">
                        <button className="blue-text text-lighten-2 card-1 grey lighten-3 waves-effect waves-dark btn-large btn-flat">
                            new label <i class="material-icons right">done_all</i></button>
                    </div>
                    <div className="center-align col s12 pink-text text-lighten-2">
                        {this.state.pageMesage}
                    </div>
                </div>
            </form>
        );
    }
}

export default addNewCategoryForm;


