import DigitalConfigView from './DigitalConfigView'
import DigitalWidgetConnector from './DigitalWidgetConnector'
import {WIDGET_SMALL} from "../layout";
import ListBulleted from 'material-ui-icons/FormatListBulleted'
import React from 'react'

//todo rename everything to switch
export default {
    config: DigitalConfigView,
    widget: DigitalWidgetConnector,
    displayName: "Switch widget",
    size: WIDGET_SMALL,
    icon: <ListBulleted/>
}