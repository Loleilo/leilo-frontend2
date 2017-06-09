import {Component} from 'react'

export default class MountSensor extends Component {
    constructor(props) {
        super(props);

        this.componentWillMount = this.componentWillMount.bind(this);
        this.componentWillUnmount = this.componentWillUnmount.bind(this);
    }

    componentWillMount() {
        this.props.componentWillMount();
    }

    componentWillUnmount() {
        this.props.componentWillUnmount();
    }

    render() {
        return this.props.children
    }
}