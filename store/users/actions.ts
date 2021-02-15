import { InferValueTypes } from "../types"
import * as actions from "./action-creators";
import { Dispatch } from "redux";
import { sendUserListSearchRequest, sendUserRequest } from "./../network";
import { IUser } from "./types";

const { usersGet, usersGetCurrent, usersStartRequest, usersEndRequest, usersSetError } = actions;

export const usersSearchRequest = (page: number, searchtext: string) => async (dispatch: Dispatch) => {
    dispatch(usersSetError(undefined))
    dispatch(usersStartRequest());
    sendUserListSearchRequest(page, searchtext).then((response) => {
        const count = response.data.total_count
        const convertedData: IUser[] = response.data.items.map((user: any) => {
            let User: IUser = {
                login: user.login,
                id: user.id,
                avatar_url: user.avatar_url
            }
            return User
        })
        dispatch(usersGet(convertedData, count))
    }).catch((e) => {
        console.log(e)
        dispatch(usersSetError('error'))
    }).finally(() => {
        dispatch(usersEndRequest());
    });
}

export const userIdRequest = (id: number) => async (dispatch: Dispatch) => {
    dispatch(usersSetError(undefined))
    dispatch(usersStartRequest());
    sendUserRequest(id).then((response) => {
        dispatch(usersGetCurrent(response))
    }).catch((e) => {
        console.log(e)
        dispatch(usersSetError('error'))
    }).finally(() => {
        dispatch(usersEndRequest());
    });
}

/* --- Assemble --- */
export type UsersAction = ReturnType<InferValueTypes<typeof actions>>

export const usersActionCreators = {
    usersSearchRequest,
    userIdRequest,
    ...actions
}