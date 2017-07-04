import React from 'react'
import PropTypes from 'prop-types'
import WidgetView from "./WidgetView";
import WidgetList from "./list"
import {Component} from 'react'
import {obj} from "../../util";

let _id = 1;

class WidgetConnector extends Component {
    constructor(props) {
        super(props);
        this.id = _id;
        _id++;
    }

    render() {
        const props = this.props;

        //todo fix this custyness
        let WidgetComponent = props.config;
        if (!WidgetComponent)
            return null;
        WidgetComponent = WidgetList ? WidgetList[props.config.widgetComponent] : undefined;
        if (!WidgetComponent)
            return null;
        WidgetComponent = WidgetComponent.widget;
        if (!WidgetComponent)
            return null;

        return <WidgetView
            {...props.config.widgetProps}
            menuID={this.id}
            onSettingsClicked={props.onSettingsClicked}
            onDeleteClicked={props.onDeleteClicked}
        >
            <WidgetComponent config={props.config.config}/>
        </WidgetView>
    }
}

WidgetConnector.propTypes = {
    config: PropTypes.shape({
        widgetComponent: PropTypes.string,
        widgetProps: PropTypes.shape({
            lineColor: PropTypes.any,
        }),
        config: PropTypes.any,
    }),
    onDeleteClicked: PropTypes.func,
    onSettingsClicked: PropTypes.func,
};

export default WidgetConnector;