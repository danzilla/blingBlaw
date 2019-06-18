import React, { Component } from 'react';
import { emojify } from 'react-emojione';

class Nav extends Component {
    render() {
        // emojify - Font size
        const emojifyOptions = {
            style: {
                height: 85,
            }
        };
        return (
            <div>
                <nav>
                    <div class="nav-wrapper">
                        <a href="#!" class="brand-logo px-2">{emojify(':rocket:', emojifyOptions)}</a>
                        <ul class="right hide-on-med-and-down">
                            <li>
                                <a class="btn waves-effect waves-light tooltipped light-blue darken-4"
                                    data-position="bottom" data-tooltip="Labels and Category" href="/accounts">
                                    <i class="material-icons red-text text-accent-1">filter_vintage</i>
                                </a>
                            </li>
                            <li>
                                <a class="btn waves-effect waves-light tooltipped light-blue darken-4"
                                    data-position="bottom" data-tooltip="FannyPackz" href="/accounts">
                                    <i class="material-icons red-text text-accent-1">favorite_border</i>
                                </a>
                            </li>
                            <li>
                                <a class="btn waves-effect waves-light tooltipped dropdown-trigger light-blue darken-4"
                                    data-position="bottom" data-tooltip="FannyPackz" data-target="dropdown1">
                                    {emojify(':star2:')}
                                </a>
                            </li>
                        </ul>
                    </div>
                </nav>
                <ul id="dropdown1" class="dropdown-content">
                    <li><a href="#!">one</a></li>
                    <li><a href="#!">two</a></li>
                    <li class="divider"></li>
                    <li><a href="#!">three</a></li>
                </ul>
            </div>
        );
    }
}

export default Nav;