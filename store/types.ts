import { ThunkDispatch as LibThunkDispatch } from "redux-thunk";
import { IRepoListState, ReposAction } from "./repositories";
import { UsersAction, IUserListState } from "./users";

export type Action = ReposAction | UsersAction;
export type Dispatch = (action: Action) => void;
export type ThunkDispatch = LibThunkDispatch<{}, {}, Action>
export type InferValueTypes<T> = T extends { [key: string]: infer U } ? U : never

/* --- Actions --- */
export interface BaseAction {
    type: string
}

/* --- State --- */
export interface IGlobalState {
    repositories: IRepoListState
    users: IUserListState,
}