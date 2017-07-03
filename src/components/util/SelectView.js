import React from 'react'
import SelectField from 'material-ui/SelectField'
import PropTypes from 'prop-types'
import MenuItem from 'material-ui/MenuItem'

function SelectView(props) {
    return <SelectField
        floatingLabelText={props.label}
        disabled={props.disabled}
        value={props.selected.value}
        onChange={(event, index, value)=>props.selected.onChange(value)}
    >
        {props.selections && props.selections.map((item) => {
            return <MenuItem
                key={item.value}
                value={item.value}
                primaryText={item.displayName}
                leftIcon={item.icon}
            >{item.content}</MenuItem>
        })}
    </SelectField>
}

SelectView.propTypes = {
    selections: PropTypes.array,
    selected: PropTypes.shape({
        value: PropTypes.any,
        onChange: PropTypes.func,
    }),

};

export default SelectView