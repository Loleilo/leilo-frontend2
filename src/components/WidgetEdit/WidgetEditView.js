import React from 'react'
import {Stepper, Step, StepLabel} from 'material-ui/Stepper'
import PropTypes from 'prop-types'
import FlatButton from "material-ui/FlatButton";
import RaisedButton from "material-ui/RaisedButton";
import WidgetTypeSelector from '../WidgetTypeSelect'

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
    widgetSelection: PropTypes.object,
    widgetConfigView: PropTypes.any,
    onPrevStep: PropTypes.func,
    onNextStep: PropTypes.func,
    nextDisabled: PropTypes.bool,
};

export default AddWidgetView