import {FETCH, pollingStartTemplate, pollingStopTemplate, syncActionTemplate} from "./sync";
const dashboardParams = ["dashboard", "getDashboard", FETCH, undefined, (getState) => {
    return getState().dashboard
}];
export const fetchDashboard = syncActionTemplate(...dashboardParams);
export const pollDashboardStart = pollingStartTemplate(...dashboardParams);
export const pollDashboardStop = pollingStopTemplate(...dashboardParams);