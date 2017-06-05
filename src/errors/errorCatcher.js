export default function (dispatch) {
    return (err) => {
        dispatch({type: "ERROR_OCCURRED", payload: err});
        throw err;
    }
}