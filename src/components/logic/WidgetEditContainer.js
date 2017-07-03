import React from 'react'
import {Component} from 'react'
import PropTypes from 'prop-types'
import AddWidgetView from "../ui/WidgetEditView";
import widgetList from "../widgets/list"

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
                        lineColor: "red",
                    },
                });
            else
                this.setState({
                    stepIndex: this.state.stepIndex + 1,
                });
        };
        this.handlePrevStep = () => {
            this.setState({
                stepIndex: this.state.stepIndex - 1,
            })
        };
        this.handleConfigChange = (config) => {
            this.setState({
                config: {
                    ...this.state.config,
                    config: config,
                },
            })
        };
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
            widgetList={Object.keys(widgetList).map((key) => {
                return {
                    key: key,
                    text: widgetList[key].displayName,
                    onClick: () => {
                        this.setState({
                            config: {
                                ...this.state.config,
                                widgetComponent: key,
                                size: widgetList[key].size,
                            },
                            stepIndex: 1,
                        })
                    },
                    icon: widgetList[key].icon,
                }
            })}
            widgetConfigView={this.state.stepIndex === 1 ? this.renderConfigView() : undefined}
            onPrevStep={this.handlePrevStep}
            onNextStep={this.handleNextStep}
            nextDisabled={this.state.stepIndex === 0}
        />
    };
}