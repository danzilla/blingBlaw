import React, { Component } from 'react';
import { emojify } from 'react-emojione';

class Nav extends Component {
    // state
    constructor(props) {
        super(props);
        this.state = {
            randomCategoryEmoji: "",
        };
    }
    // comp did Mount - First
    componentDidMount() {
        var emojiList = [
            ":pancakes:",
            ":tea:",
            ":pizza:",
            ":peach:",
            ":ice_cream:",
            ":rosette:",
            ":fireworks:",
            ":gem:",
            ":cherry_blossom:",
            ":pig:",
            ":unicorn:",
            ":gorilla:",
            ":avocado:",
            ":kiwi:",
            ":strawberry:"
        ];
        this.setState({ randomCategoryEmoji: emojiList[Math.floor(Math.random() * emojiList.length)]})
    }

    render() {
        // emojify - Font size
        const emojifyOptions = {
            style: {
                height: 85,
            }
        };
        return (
            <div className="row w-100">
                <nav className="light-blue darken-3">
                    <div class="nav-wrapper">
                        <a href="#!" class="brand-logo px-2">{emojify(':rocket:', emojifyOptions)}</a>
                        <ul class="right">
                            <li>
                                <a class="btn waves-effect waves-light tooltipped dropdown-trigger transparent"
                                    data-position="bottom"
                                    data-tooltip="FannyPackz"
                                    data-target="dropdown1">
                                    {emojify(this.state.randomCategoryEmoji)}
                                </a>
                            </li>
                        </ul>
                    </div>
                </nav>
                <ul id="dropdown1" class="dropdown-content">
                    <li><a href="#!">Accounts</a></li>
                    <li><a href="#!">Labels</a></li>
                    <li class="divider"></li>
                    <li><a href="#!">Search</a></li>
                    <li class="divider"></li>
                    <li><a href="#!">Settings</a></li>
                    <li><a href="#!">Users</a></li>
                </ul>
            </div>
        );
    }
}

export default Nav;