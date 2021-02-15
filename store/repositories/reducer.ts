import { ReposAction } from "./actions";
import { InitialCurrentRepo, InitialReposList } from "./initialValue"
import { IRepoListState } from "./types";

export const reposReducer = (state: IRepoListState = InitialReposList, action: ReposAction): IRepoListState => {
    switch (action.type) {
        case "REPOS_GET":
            return {
                ...state,
                count: action.payload.count,
                repositories: action.payload.repositories
            }
        case "REPOS_GET_CURRENT":
            return {
                ...state,
                current: action.payload
            }
        case "REPOS_CLEAR":
            return {
                ...state,
                isRequesting: 'init',
                count: 0,
                repositories: []
            }
        case "REPOS_CLEAR_CURRENT":
            return {
                ...state,
                isRequesting: 'init',
                current: InitialCurrentRepo
            }
        case "REPOS_REQUEST":
            return {
                ...state,
                isRequesting: action.payload
            }
        case "REPOS_SET_ERROR":
            return {
                ...state,
                error: action.payload
            }
        default:
            return state
    }
}
