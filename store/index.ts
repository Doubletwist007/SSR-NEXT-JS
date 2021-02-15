import { combineReducers } from "redux";
import { usersActionCreators, usersReducer } from "./users";
import { reposActionCreators, reposReducer } from "./repositories";

export const rootReducer = combineReducers({
    repositories: reposReducer,
    users: usersReducer
})

// --- Configure CommonAction Creators ---
export const actionCreators = {
    ...usersActionCreators,
    ...reposActionCreators
};

export * from "./types";