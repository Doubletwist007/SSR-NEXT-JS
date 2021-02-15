import { UsersAction } from "./actions";
import { InitialCurrentUser, InitialUserList } from "./initialValue"
import { IUserListState } from "./types";

export const usersReducer = (state: IUserListState = InitialUserList, action: UsersAction): IUserListState => {
    switch (action.type) {
        case "USERS_GET":
            return {
                ...state,
                count: action.payload.count,
                users: action.payload.users
            }
        case "USERS_GET_CURRENT":
            return {
                ...state,
                current: action.payload
            }
        case "USERS_CLEAR":
            return {
                ...state,
                isRequesting: 'init',
                users: [],
                count: 0
            }
        case "USERS_CLEAR_CURRENT":
            return {
                ...state,
                isRequesting: 'init',
                current: InitialCurrentUser
            }
        case "USERS_REQUEST":
            return {
                ...state,
                isRequesting: action.payload
            }
        case "USERS_SET_ERROR":
            return {
                ...state,
                error: action.payload
            }
        default:
            return state
    }
}
