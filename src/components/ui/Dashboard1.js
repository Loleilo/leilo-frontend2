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
        <div key="a" data-grid={{...WIDGET_SMALL, x: 0, y: 0}}><WidgetView
            lineColor={Colors.red600}>
            <DigitalWidgetConnector
                config={{
                title: "Garage door",
                atomID: "d7c5cbc9-5953-11e7-87c1-feed01100013",
                groupID: "d7578587-5953-11e7-87c1-feed01100013",
                heartbeatID: "d824583a-5953-11e7-87c1-feed01100013",
                mapping: {
                    1: "CLOSED",
                    0: "OPEN"
                },
            }}/>
        </WidgetView></div><div key="b" data-grid={{...WIDGET_SMALL, x: 0, y: 0}}><WidgetView
        lineColor={Colors.purple600}>
        <DigitalWidgetConnector
            config={{
            title: "Garage door",
            atomID: "d7c5cbc9-5953-11e7-87c1-feed01100013",
            groupID: "d7578587-5953-11e7-87c1-feed01100013",
            heartbeatID: "d824583a-5953-11e7-87c1-feed01100013",
            mapping: {
                1: "CLOSED",
                0: "OPEN"
            },
        }}/>
    </WidgetView></div>
    </Grid>;
}

export default Dashboard;