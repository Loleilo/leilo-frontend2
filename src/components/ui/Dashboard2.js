import React from 'react'
import ReactGridLayout from "react-grid-layout";
import {GRID_COLS, GRID_ROW_HEIGHT, WIDGET_SMALL} from "../widgets/layout";
import WidgetView from "../widgets/WidgetView";
import DigitalWidgetConnector from "../widgets/digital/DigitalWidgetConnector";
import {WidthProvider} from "react-grid-layout";
import * as Colors from 'material-ui/styles/colors'
let Grid=ReactGridLayout;
Grid=WidthProvider(Grid);

function Dashboard(props) {
    return <Grid cols={GRID_COLS} rowHeight={GRID_ROW_HEIGHT} className="layout" auto>

    </Grid>;
}

export default Dashboard;