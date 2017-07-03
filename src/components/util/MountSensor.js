import React from 'react';
import {Component} from 'react'
import PropTypes from 'prop-types'

export default class MountSensor extends Component {
    static propTypes={
        componentWillMount: PropTypes.func,
        componentWillUnmount: PropTypes.func,
    };

    constructor(props) {
        super(props);

        this.componentWillMount = this.componentWillMount.bind(this);
        this.componentWillUnmount = this.componentWillUnmount.bind(this);
    }

    componentWillMount() {
        if (this.props.componentWillMount)
            this.props.componentWillMount();
    }

    componentWillUnmount() {
        if (this.props.componentWillUnmount)
            this.props.componentWillUnmount();
    }

    render() {
        return (
            <div>{this.props.children}</div>
        );
    }
}