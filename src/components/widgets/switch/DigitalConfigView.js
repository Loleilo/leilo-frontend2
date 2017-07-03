import React from 'react'
import TextField from "material-ui/TextField";
import PropTypes from 'prop-types'
import View from 'react-flexbox'
import MountSensor from "../../logic/MountSensor";

function DigitalConfigView(props) {
    //todo replace this with superselectfield package
    return <div>
        <View row>
            <View column>
                <TextField
                    floatingLabelText="Device ID"
                    onChange={(event) => {
                        props.onConfigChange({
                            ...props.config,
                            groupID: event.target.value,
                        })
                    }}
                />
            </View>
            <View column>
                <TextField
                    floatingLabelText="Heartbeart ID"
                    onChange={(event) => {
                        props.onConfigChange({
                            ...props.config,
                            heartbeatID: event.target.value,
                        })
                    }}
                />
            </View>
        </View>
        <View row>
            <View column>
                <TextField
                    floatingLabelText="Sensor ID"
                    onChange={(event) => {
                        props.onConfigChange({
                            ...props.config,
                            atomID: event.target.value,
                        })
                    }}
                />
            </View>
        </View>
        <MountSensor
            componentWillMount={() => {
                props.onConfigChange({
                    ...props.config,
                    mapping: {
                        1: "OPEN",
                        0: "CLOSED",
                    },
                });
            }}
            componentWillUnmount={() => {
            }}/>
    </div>
}

DigitalConfigView.propTypes = {
    onConfigChange: PropTypes.func,
    config: PropTypes.object,
};

export default DigitalConfigView