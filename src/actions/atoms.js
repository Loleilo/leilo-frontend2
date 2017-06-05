import {actionTemplate} from './syncAction'

export const fetchGroups=actionTemplate("atomGroups", "lookupGroups");

export const fetchValue=actionTemplate("atomValues", "readAtom");