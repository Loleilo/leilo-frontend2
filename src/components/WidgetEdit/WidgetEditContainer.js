import React from 'react'
import {Component} from 'react'
import PropTypes from 'prop-types'
import AddWidgetView from "./WidgetEditView";
import widgetList from "../widgets/list"
import {red600} from "material-ui/styles/colors";

export default class AddWidgetContainer extends Component {
    static PropTypes = {
        onSubmit: PropTypes.func,
        initConfig: PropTypes.any,
    };

    constructor(props) {
        super(props);
        this.state = {
            stepIndex: 0,
            config: props.initConfig || {},
        };

        this.initHandlers();
    }

    initHandlers() {
        this.handleNextStep = () => {
            if (this.state.stepIndex === 2)
                this.props.onSubmit({
                    ...this.state.config,
                    widgetProps: {
                        lineColor: red600,
                    },
                });
            else
                this.setState({
                    stepIndex: this.state.stepIndex + 1,
                });
        };
        this.handlePrevStep = () => this.setState({
            stepIndex: this.state.stepIndex - 1,
        });

        this.handleConfigChange = (config) => this.setState({
            config: {
                ...this.state.config,
                config: config,
            },
        });

        this.handleSelectedWidgetChange = (value) => this.setState({
            config: {
                ...this.state.config,
                size: widgetList[value].size,
                widgetComponent: value,
            }
        });
    }

    renderConfigView() {
        const ConfigComponent = widgetList[this.state.config.widgetComponent].config;
        return <ConfigComponent
            config={this.state.config.config}
            onConfigChange={this.handleConfigChange}
        />;
    }

    render() {
        return <AddWidgetView
            stepIndex={this.state.stepIndex}
            widgetSelection={{
                value: this.state.config.widgetComponent,
                onChange: this.handleSelectedWidgetChange,
            }}
            widgetConfigView={this.state.stepIndex === 1 ? this.renderConfigView() : undefined}
            onPrevStep={this.handlePrevStep}
            onNextStep={this.handleNextStep}
            nextDisabled={this.state.stepIndex === 0 ? (!this.state.config.widgetComponent) : false}
        />
    };
}