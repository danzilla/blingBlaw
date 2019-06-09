import React, { Component } from 'react';

// import NewCategoryForm from './addNewCategoryForm'
// import CategoryTable from './viewCategoryTable'

class addNewCategory extends Component {
    // States
    constructor(props) {
        super(props);
        this.state = {
            reviewData: [],
            categories: []
        };
    }
    // call back all categories from Child components
    categories = (category) => {
        this.setState({
            categories: category
        })
    }
    // Render
    render() {
        return (

            {/* 
              <div>
                <div id="NewCategory" className="container modal">
                    {// Header }
                    <h4 className="m-1"> Labels </h4>
                    <hr className="hr black-text text-darken" />
                    {// Content }
                    <div className="modal-content">
                        <NewCategoryForm categories={this.state.categories} />
                        <CategoryTable categories={this.categories}/>
                    </div>
                </div>
            </div>
            */}
          
        );
    }
}

export default addNewCategory;
