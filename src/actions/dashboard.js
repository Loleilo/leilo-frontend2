import {FETCH, pollingStartTemplate, pollingStopTemplate, PUSH, syncActionTemplate} from "./sync";
const dashboardParams = ["dashboard", "getDashboard", FETCH, undefined, (getState) => {
    return getState().dashboard
}];
export const fetchDashboard = syncActionTemplate(...dashboardParams);
export const pollDashboardStart = pollingStartTemplate(...dashboardParams);
export const pollDashboardStop = pollingStopTemplate(...dashboardParams);
dashboardParams[1] = "writeDashboard";
dashboardParams[2] = PUSH;
dashboardParams[3] = (result, params) => {
    return {value: params.dashboard}
};
export const pushDashboard = syncActionTemplate(...dashboardParams);