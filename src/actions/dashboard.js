import {FETCH, pollingStartTemplate, pollingStopTemplate, PUSH, syncActionTemplate} from "./sync";

const layoutParams = ["layout", "getDashboard", FETCH, (payload) => {
    return {value: payload}
}, (getState) => {
    return getState().dashboard.layout
}];
export const fetchLayout = syncActionTemplate(...layoutParams);
export const pollLayoutStart = pollingStartTemplate(...layoutParams);
export const pollLayoutStop = pollingStopTemplate(...layoutParams);
layoutParams[1] = "writeDashboard";
layoutParams[2] = PUSH;
export const pushLayout = syncActionTemplate(...layoutParams);

const widgetParams = ["widgets", "getWidget", FETCH, (payload, params) => {
    return {value: payload, uuid: params.widget_id}
}, (getState, params) => {
    return arr(getState().dashboard.widgets, params.widget_id);
}];
export const fetchWidgets = syncActionTemplate(...widgetParams);
export const pollWidgetsStart = pollingStartTemplate(...widgetParams);
export const pollWidgetsStop = pollingStopTemplate(...widgetParams);
widgetParams[1] = "writeWidget";
widgetParams[2] = PUSH;
export const pushWidget = syncActionTemplate(...widgetParams);