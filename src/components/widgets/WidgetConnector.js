import React from 'react'
import PropTypes from 'prop-types'
import WidgetView from "./WidgetView";
import WidgetList from "./list"

function WidgetConnector(props) {
    const WidgetComponent = WidgetList[props.config.widgetComponent].widget;
    return <WidgetView {...props.config.widgetProps}>
        <WidgetComponent config={props.config.config}/>
    </WidgetView>
}

WidgetConnector.propTypes = {
    config: PropTypes.shape({
        widgetComponent: PropTypes.string,
        widgetProps: PropTypes.shape({
            lineColor: PropTypes.any,
        }),
        config: PropTypes.any,
    })
};

export default WidgetConnector;