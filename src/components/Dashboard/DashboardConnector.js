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
            addDialogOpen: false,
        };

        this.initHandlers();
    }

    initHandlers() {
        this.openAddDialog = () => {
            this.setState({
                addDialogOpen: true,
            });
        };
        this.closeAddDialog = () => {
            this.setState({
                addDialogOpen: false,
            });
        };
        this.handleChangeSubmit = (id, config) => {
            const dashboard = obj(this.props.dashboard, "value");
            this.props.pushDashboard({
                ...dashboard,
                widgets: {
                    ...dashboard.widgets,
                    id: config,
                },
            });
        };
        this.handleAddSubmit = (config) => {
            const dashboard = obj(this.props.dashboard, "value");
            const currID = dashboard.currID || 1;
            const widgets = {
                ...dashboard.widgets,
            };
            widgets[currID] = config;
            console.log(JSON.stringify({
                ...dashboard,
                layout: arr(dashboard, "layout").concat([{
                    x: 0, y: 0,
                    ...config.size,
                    i: currID.toString(),
                }]),
                widgets: widgets,
                currID: currID + 1,
            }));
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
            this.closeAddDialog();
        };
        this.handleLayoutChange = (layout) => {
            const dashboard = obj(this.props.dashboard, "value");
            this.props.pushDashboard({
                ...dashboard,
                layout: layout,
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
                        key={id}><WidgetConnector
                        config={dashboard.widgets[id]}
                    /></div>
                })}
                add={{
                    open: this.state.addDialogOpen,
                    onOpen: this.openAddDialog,
                    onClose: this.closeAddDialog,
                    onSubmit: this.handleAddSubmit,
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