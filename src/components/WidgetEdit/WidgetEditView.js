import React from 'react'
import {Stepper, Step, StepLabel} from 'material-ui/Stepper'
import PropTypes from 'prop-types'
import {List, ListItem} from "material-ui/List";
import FlatButton from "material-ui/FlatButton";
import RaisedButton from "material-ui/RaisedButton";

function getContent(props) {
    switch (props.stepIndex) {
        case 0:
            return <div>Select the type of widget to add:<br/>
                <List>
                    {props.widgetList.map((item) => {
                        return <ListItem
                            primaryText={item.text}
                            key={item.key}
                            leftIcon={item.icon}
                            onClick={item.onClick}
                        />
                    })}
                </List></div>;
        case 1:
            return <div>Set the configuration for the widget:<br/>
                {props.widgetConfigView}
            </div>;
        case 2:
            return <div>Set up the look for the widget: <br/>
                Under construction
            </div>;
    }
}

function AddWidgetView(props) {
    return <div>
        <Stepper activeStep={props.stepIndex}>
            <Step>
                <StepLabel>Select widget</StepLabel>
            </Step>
            <Step>
                <StepLabel>Configure widget</StepLabel>
            </Step>
            <Step>
                <StepLabel>Create widget</StepLabel>
            </Step>
        </Stepper>
        {getContent(props)}
        <div style={{marginTop: 12}}>
            <FlatButton
                label="Back"
                disabled={props.stepIndex === 0}
                onTouchTap={props.onPrevStep}
                style={{marginRight: 12}}
            />
            <RaisedButton
                label={props.stepIndex === 2 ? 'Finish' : 'Next'}
                primary={true}
                onTouchTap={props.onNextStep}
                disabled={props.nextDisabled}
            />
        </div>
    </div>
}

AddWidgetView.propTypes = {
    stepIndex: PropTypes.number.isRequired,
    widgetList: PropTypes.arrayOf(PropTypes.shape({
        key: PropTypes.any,
        text: PropTypes.string,
        onClick: PropTypes.func,
        icon: PropTypes.any,
    })).isRequired,
    widgetConfigView: PropTypes.any,
    onPrevStep: PropTypes.func,
    onNextStep: PropTypes.func,
    nextDisabled: PropTypes.bool,
};

export default AddWidgetView