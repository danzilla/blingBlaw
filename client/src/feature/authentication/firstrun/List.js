import React, { Component } from 'react';

class List extends Component {
    render() {
        return (
            <div className="App">
                <ul>
                    <li>
                        <label>
                            <input type="checkbox"
                                checked={this.props.firstRunCheck.database.usersDB.checked} />
                            <span>Initial assets (Database)</span>
                        </label>
                    </li>
                    <li>
                        <label>
                            <input type="checkbox"
                                checked={this.props.firstRunCheck.database.fannyDB.checked} />
                            <span>Initial fannyPackz (Database)</span>
                        </label>
                    </li>

                    <hr />
                    <li>
                        <label>
                            <input type="checkbox"
                                checked={this.props.firstRunCheck.schema.usersSchema.checked} />
                            <span>Initial Users (Schema)</span>
                        </label>
                    </li>
                    <li>
                        <label>
                            <input type="checkbox"
                                checked={this.props.firstRunCheck.schema.fannypackSchema.checked} />
                            <span>Initial fannyPackz (Schema)</span>
                        </label>
                    </li>

                    <hr />
                    <li>
                        <label>
                            <input type="checkbox"
                                checked={this.props.firstRunCheck.table.userAuth.checked} />
                            <span>Initial userAuth (Table)</span>
                        </label>
                    </li>
                    <li>
                        <label>
                            <input type="checkbox"
                                checked={this.props.firstRunCheck.table.userDetails.checked} />
                            <span>Initial userDetails (Table)</span>
                        </label>
                    </li>
                    <li>
                        <label>
                            <input type="checkbox"
                                checked={this.props.firstRunCheck.table.userRecord.checked} />
                            <span>Initial userRecord (Table)</span>
                        </label>
                    </li>
                    <li>
                        <label>
                            <input type="checkbox"
                                checked={this.props.firstRunCheck.table.userGroup.checked} />
                            <span>Initial userGroup (Table)</span>
                        </label>
                    </li>
                    <li>
                        <label>
                            <input type="checkbox"
                                checked={this.props.firstRunCheck.table.fannyPack.checked} />
                            <span>Initial fannyPack (Table)</span>
                        </label>
                    </li>
                    <li>
                        <label>
                            <input type="checkbox"
                                checked={this.props.firstRunCheck.table.fannyRecord.checked} />
                            <span>Initial fannyPackzRecord (Table)</span>
                        </label>
                    </li>

                </ul>
            </div>
        );
    }
}
export default List;