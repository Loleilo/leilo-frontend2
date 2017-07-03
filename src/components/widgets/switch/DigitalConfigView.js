import React from 'react'
import TextField from "material-ui/TextField";
import PropTypes from 'prop-types'
import View from 'react-flexbox'
import MountSensor from "../../util/MountSensor";
import GroupSelect from '../../GroupSelect'
import {obj} from "../../../util";
import AtomSelect from "../../AtomSelect";

function DigitalConfigView(props) {
    //todo replace this with superselectfield package
    return <div>
        <View row>
            <View column>
                <TextField
                    floatingLabelText="Widget title"
                    onChange={(event) => {
                        props.onConfigChange({
                            ...props.config,
                            title: event.target.value,
                        })
                    }}
                    value={obj(props.config).title}
                />
            </View>
        </View>
        <View row>
            <View column>
                <GroupSelect
                    label="Device"
                    onChange={(value) => {
                        props.onConfigChange({
                            ...props.config,
                            groupID: value,
                        })
                    }}
                    value={obj(props.config, "groupID")}
                />
            </View>
            <View column>
                <AtomSelect
                    label="Heartbeat"
                    groupID={obj(props.config, "groupID")}
                    onChange={(value) => {
                        props.onConfigChange({
                            ...props.config,
                            heartbeatID: value,
                        })
                    }}
                    value={obj(props.config, "heartbeatID")}
                />
            </View>
        </View>
        <View row>
            <View column>
                <AtomSelect
                    label="Sensor"
                    groupID={obj(props.config, "groupID")}
                    onChange={(value) => {
                        props.onConfigChange({
                            ...props.config,
                            atomID: value,
                        })
                    }}
                    value={obj(props.config, "atomID")}
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