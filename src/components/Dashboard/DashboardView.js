import React from 'react'
import ReactGridLayout from "react-grid-layout";
import {GRID_COLS, GRID_ROW_HEIGHT} from "../widgets/layout";
import {WidthProvider} from "react-grid-layout";
import FloatingActionButton from 'material-ui/FloatingActionButton'
import ContentAdd from 'material-ui-icons/Add'
import PropTypes from 'prop-types'
import {obj} from "../../util";
import Dialog from "material-ui/Dialog";
import EditWidgetContainer from "../WidgetEdit/WidgetEditContainer";

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
            draggableCancel={".cancel-drag,"}
        >
            {props.widgets}
        </Grid>
        <FloatingActionButton
            onTouchTap={props.configEdit.addOpen}
            style={{
                position: "fixed",
                bottom: "20px", //TODO comply with material design standards
                right: "20px",
            }}
        ><ContentAdd/></FloatingActionButton>

        <Dialog open={props.configEdit.open} onRequestClose={props.configEdit.onClose}>
            <EditWidgetContainer
                onSubmit={props.configEdit.onSubmit}
                initConfig={props.configEdit.initConfig}
            />
        </Dialog>
    </div>;
}

Dashboard.propTypes = {
    layout: PropTypes.shape({
        value: PropTypes.array,
        onChange: PropTypes.func,
    }),
    configEdit: PropTypes.shape({
        open: PropTypes.bool,
        addOpen: PropTypes.func,
        onClose: PropTypes.func,
        onSubmit: PropTypes.func,
        initConfig: PropTypes.any,
    }),
    widgets: PropTypes.array,
};

export default Dashboard;