import { InferValueTypes } from "../types"
import * as actions from "./action-creators";
import { Dispatch } from "redux";
import { sendRepositoryListSearchRequest, sendRepositoryIdRequest } from "./../network";
import { IRepo } from "./types";

const { reposGet, reposSetError, reposGetCurrent, reposStartRequest, reposEndRequest } = actions;

export const reposSearchRequest = (query: string[], page: number, searchtext: string) => async (dispatch: Dispatch) => {
    dispatch(reposStartRequest());
    dispatch(reposSetError(undefined))
    sendRepositoryListSearchRequest(query, page, searchtext).then((response) => {
        const count = response.data.total_count
        const convertedData: IRepo[] = response.data.items.map((repo: any) => {
            let newRepo: IRepo = {
                id: repo.id,
                name: repo.name,
                full_name: repo.full_name,
                owner: {
                    id: repo.owner.id,
                    login: repo.owner.login
                }
            }
            return newRepo
        })
        dispatch(reposGet(convertedData, count))
    }).catch((e) => {
        console.log(e)
        dispatch(reposSetError('error'))
    }).finally(() => {
        dispatch(reposEndRequest());
    });
}

export const repoByIdRequest = (id: number) => async (dispatch: Dispatch) => {
    dispatch(reposStartRequest());
    dispatch(reposSetError(undefined))
    sendRepositoryIdRequest(id).then((response) => {
        dispatch(reposGetCurrent(response))
    }).catch((e) => {
        dispatch(reposSetError('error'))
        console.log(e)
    }).finally(() => {
        dispatch(reposEndRequest());
    });
}

/* --- Assemble --- */
export type ReposAction = ReturnType<InferValueTypes<typeof actions>>

export const reposActionCreators = {
    reposSearchRequest,
    repoByIdRequest,
    ...actions
}