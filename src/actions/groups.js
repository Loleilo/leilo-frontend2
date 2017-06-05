import {actionTemplate} from './syncAction'

export const fetchUsers = actionTemplate("groupUsers", "lookupUsers");

export const fetchAtomPerms = actionTemplate("groupAtomPerms", "getAtomPerms");

export const fetchAtomsList = actionTemplate("groupAtomsList", "listAtoms");