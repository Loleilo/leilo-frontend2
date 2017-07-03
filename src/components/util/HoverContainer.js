import React from 'react'
import {Component} from 'react'

export default class HoverContainer extends Component {
    constructor(props) {
        super(props);
        this.state = {
            hovering: false,
        };
        this.initHandlers();
    }

    initHandlers() {
        this.handleMouseIn = () => {
            this.setState({
                hovering: true,
            });
        };

        this.handleMouseOut = () => {
            this.setState({
                hovering: false,
            });
        };
    }

    render() {
        const tooltipStyle = {
            display: this.state.hovering ? 'block' : 'none',
            zIndex: 99,
        };

        const mainStyle = this.state.hovering ? {
            display: 'block',
            position: 'absolute',
            zIndex: '100',
        } : undefined;

        return <div style={mainStyle} onMouseOver={this.handleMouseIn} onMouseOut={this.handleMouseOut}>
            {this.props.children}
            <div style={tooltipStyle}>{this.props.tooltip}</div>
        </div>
    }
}