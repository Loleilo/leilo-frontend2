import React from 'react'
import {Stepper, Step, StepLabel} from 'material-ui/Stepper'
import PropTypes from 'prop-types'
import FlatButton from "material-ui/FlatButton";
import RaisedButton from "material-ui/RaisedButton";
import WidgetTypeSelector from '../WidgetTypeSelect'
import ColorPicker from 'material-ui-color-picker'
import * as Colors from 'material-ui/styles/colors'

const colors = [
    Colors.red600,
    Colors.orange600,
    Colors.yellow600,
    Colors.green600,
    Colors.blue600,
    Colors.purple600,
];

function getRandomColor(props) {
    const color=colors[Math.floor(Math.random() * colors.length)];
    props.onColorChanged(color);
    return color;
}

function getContent(props) {
    switch (props.stepIndex) {
        case 0:
            return <div>Select the type of widget to add:<br/>
                <WidgetTypeSelector
                    {...props.widgetSelection}
                /></div>;
        case 1:
            return <div>Set the configuration for the widget:<br/>
                {props.widgetConfigView}
            </div>;
        case 2:
            return <div>Set up the look for the widget: <br/>
                <ColorPicker
                    defaultValue={props.color || getRandomColor(props)}
                    onChange={props.onColorChanged}
                />
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

//todo fix organization
AddWidgetView.propTypes = {
    stepIndex: PropTypes.number.isRequired,
    widgetSelection: PropTypes.object,
    widgetConfigView: PropTypes.any,
    color: PropTypes.any,
    onColorChanged: PropTypes.func,
    onPrevStep: PropTypes.func,
    onNextStep: PropTypes.func,
    nextDisabled: PropTypes.bool,
};

export default AddWidgetView