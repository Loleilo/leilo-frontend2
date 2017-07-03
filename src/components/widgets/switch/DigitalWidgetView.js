import {CardTitle} from "material-ui/Card";
import React from "react";
import PropTypes from 'prop-types'
import {FormattedRelative} from 'react-intl'

//todo fix timezone stuff

function DigitalWidgetView(props) {
    return <CardTitle title={props.value}
                      subtitle={
                          <div>
                              <strong>{props.title}</strong><br/>Last updated{' '}
                              <i><FormattedRelative value={props.lastUpdate - 7*3600*1000}/></i>
                          </div>
                      }/>

}

DigitalWidgetView.propTypes = {
    value: PropTypes.string,
    title: PropTypes.string,
    lastUpdate: PropTypes.object,
};

export default DigitalWidgetView;