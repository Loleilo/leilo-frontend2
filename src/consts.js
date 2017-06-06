export const API_ENDPOINT="http://sunnylan.tk/Leilo-API/api.php";
export const CLIENT_API_VERSION="1.0.0";

export const SUCCESS = 0;
export const ERR_DB = 1;
export const ERR_ENTITY_ALREADY_EXISTS = 2;
export const ERR_ENTITY_NONEXISTENT = 3;
export const ERR_NO_PERMS = 4;
export const ERR_INVALID_ARGS = 5;
export const ERR_INVALID_REQ = 6;
export const ERR_VERSION_MISMATCH = 7;
export const ERR_INVALID_LOGIN=8;
export const ERR_INVALID_CALL=9;

const PERM_NONE = 0;
const PERM_READ = 1;
const PERM_WRITE = 1 << 1;
const PERM_CONFIG = 1 << 2;
const PERMS_ALL = PERM_READ | PERM_WRITE | PERM_CONFIG;