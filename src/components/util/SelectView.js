import React from 'react'
import SelectField from 'material-ui/SelectField'
import PropTypes from 'prop-types'
import MenuItem from 'material-ui/MenuItem'

function SelectView(props) {
    return <SelectField
        value={props.selected.value}
        onChange={(event, index, value)=>props.selected.onChange(value)}
        disabled={props.disabled}
    >
        {props.selections.map((item) => {
            return <MenuItem
                value={item.value}
                primaryText={item.displayName}
                leftIcon={item.icon}
            />
        })}
    </SelectField>
}

SelectView.propTypes = {
    selections: PropTypes.arrayOf({
        value: PropTypes.any,
        displayName: PropTypes.string,
    }),
    selected: PropTypes.shape({
        value: PropTypes.any,
        onChange: PropTypes.func,
    }),

};

export default SelectView