import React from 'react'
import {Component} from 'react'
import {connect} from 'react-redux'
import {SLOW_POLL_INTERVAL} from "../../consts";
import MountSensor from "../util/MountSensor";
import DashboardView from "./DashboardView";
import WidgetConnector from "../widgets/WidgetConnector";
import {arr, obj} from "../../util";
import * as Dashboard from '../../actions/dashboard'

class DashboardConnector extends Component {
    constructor(props) {
        super(props);
        this.state = {
            configDialogOpen: false,
            currConfigWidget: undefined,
        };

        this.initHandlers();
    }

    initHandlers() {
        this.openAddDialog = () => {
            this.setState({
                configDialogOpen: true,
            });
        };
        this.closeDialog = () => {
            this.setState({
                configDialogOpen: false,
                currConfigWidget: undefined,
            });
        };
        this.handleChangeSubmit = (id, config) => {
            const dashboard = obj(this.props.dashboard, "value");
            const widgets = {
                ...dashboard.widgets,
            };
            widgets[id] = config;
            this.props.pushDashboard({
                ...dashboard,
                widgets: widgets,
            });
            this.closeDialog();
        };
        this.handleAddSubmit = (config) => {
            const dashboard = obj(this.props.dashboard, "value");
            const currID = dashboard.currID || 1;
            const widgets = {
                ...dashboard.widgets,
            };
            widgets[currID] = config;
            this.props.pushDashboard({
                ...dashboard,
                layout: arr(dashboard, "layout").concat([{
                    x: 0, y: 0,
                    ...config.size,
                    i: currID.toString(),
                }]),
                widgets: widgets,
                currID: currID + 1,
            });
            this.closeDialog();
        };
        this.handleDelete = (id) => {
            const dashboard = obj(this.props.dashboard, "value");
            const widgets = {
                ...dashboard.widgets,
            };
            widgets[id] = undefined;
            this.props.pushDashboard({
                ...dashboard,
                widgets: widgets,
            });
        };
        this.handleLayoutChange = (layout) => {
            const dashboard = obj(this.props.dashboard, "value");
            this.props.pushDashboard({
                ...dashboard,
                layout: layout,
            });
        };
        this.openEditDialog = (id) => {
            console.log("id;" + id);
            this.setState({
                currConfigWidget: id,
                configDialogOpen: true,
            });
        };
    }

    render() {
        const props = this.props;
        const dashboard = obj(props, "dashboard", "value");
        return <MountSensor
            componentWillMount={props.loadDashboard}
            componentWillUnmount={props.unloadDashboard}>
            <DashboardView
                layout={{
                    value: dashboard.layout,
                    onChange: this.handleLayoutChange,
                }}
                widgets={dashboard.widgets && Object.keys(dashboard.widgets).map((id) => {
                    return <div
                        key={id}>
                        <WidgetConnector
                            config={dashboard.widgets[id]}
                            onDeleteClicked={() => this.handleDelete(id)}
                            onSettingsClicked={() => this.openEditDialog(id)}
                        />
                    </div>
                })}
                configEdit={{
                    open: this.state.configDialogOpen,
                    addOpen: this.openAddDialog,
                    onClose: this.closeDialog,
                    onSubmit: this.state.currConfigWidget ?
                        (config) => this.handleChangeSubmit(this.state.currConfigWidget, config) :
                        this.handleAddSubmit,
                    initConfig: obj(dashboard.widgets,this.state.currConfigWidget),
                }}
            />
        </MountSensor>
    }
}

function mapStateToProps(state) {
    return {
        dashboard: state.dashboard,
    }
}

function mapDispatchToProps(dispatch) {
    return {
        loadDashboard: () => {
            dispatch(Dashboard.pollDashboardStart(SLOW_POLL_INTERVAL))
        },
        unloadDashboard: () => {
            dispatch(Dashboard.pollDashboardStop())
        },
        pushDashboard: (dashboard) => {
            dispatch(Dashboard.pushDashboard({dashboard: dashboard}))
        },
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(DashboardConnector);