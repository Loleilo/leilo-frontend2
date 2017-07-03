import React from 'react'
import ReactGridLayout from "react-grid-layout";
import {GRID_COLS, GRID_ROW_HEIGHT} from "../widgets/layout";
import {WidthProvider} from "react-grid-layout";
import FloatingActionButton from 'material-ui/FloatingActionButton'
import ContentAdd from 'material-ui-icons/Add'
import PropTypes from 'prop-types'
import {obj} from "../../util";
import Dialog from "material-ui/Dialog";
import AddWidgetContainer from "../WidgetEdit/WidgetEditContainer";

let Grid = ReactGridLayout;
Grid = WidthProvider(Grid);

function Dashboard(props) {
    const layout = props.layout.value;
    return <div>
        <Grid
            layout={layout || undefined}
            onLayoutChange={obj(props.layout).onChange}
            cols={GRID_COLS}
            rowHeight={GRID_ROW_HEIGHT}
            className="layout"
        >
            {props.widgets}
        </Grid>
        <FloatingActionButton
            onTouchTap={props.add.onOpen}
            style={{
                position: "fixed",
                bottom: "20px", //TODO comply with material design standards
                right: "20px",
            }}
        ><ContentAdd/></FloatingActionButton>

        <Dialog open={props.add.open} onRequestClose={props.add.onClose}>
            <AddWidgetContainer
                onSubmit={props.add.onSubmit}
            />
        </Dialog>
    </div>;
}

Dashboard.propTypes = {
    layout: PropTypes.shape({
        value: PropTypes.array,
        onChange: PropTypes.func,
    }),
    add: PropTypes.shape({
        open: PropTypes.bool,
        onOpen: PropTypes.func,
        onClose: PropTypes.func,
        onSubmit: PropTypes.func,
    }),
    widgets: PropTypes.array,
};

export default Dashboard;