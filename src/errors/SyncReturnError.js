import ExtendableError from './ExtendableError'

export default class SyncReturnError extends ExtendableError {
    constructor(response) {
        super("Non-zero server return code: Error code " + response.returnCode + " - " + response.returnData);
        this.errorCode = response.returnCode;
        this.errorData = response.returnData;
    }
}