import React from 'react'
// import HoverContainer from "../logic/HoverContainer";
// import {Card, IconButton} from "material-ui";
// import Delete from 'material-ui-icons/Delete'
// import Settings from 'material-ui-icons/Settings'
import PropTypes from 'prop-types'

function WidgetView(props) {
    //todo need to fix tooltip later
    // const tooltip = (<Card>
    //     <IconButton onTouchTap={props.onDeleteClicked}><Delete/></IconButton>
    //     <IconButton onTouchTap={props.onSettingsClicked}><Settings/></IconButton>
    // </Card>);
    // <HoverContainer tooltip={tooltip}>
    // </HoverContainer>
    return <div>{props.lineColor && <div style={{
            backgroundColor: props.lineColor,
            position: "absolute",
            top: 0,
            left: 0,
            bottom: 0,
            width: '3px',
        }}/>}{props.children}</div>

}

WidgetView.propTypes={
    onDeleteClicked: PropTypes.func,
    onSettingsClicked: PropTypes.func,
    lineColor: PropTypes.string,
};

export default WidgetView