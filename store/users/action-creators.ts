import { CurrentUser, IUser } from "./types"

/* --- Get init users--- */
export const usersGet = (users: IUser[], count: number) => (
    { type: "USERS_GET", payload: { users: users, count: count } } as const)

/* --- Get current user--- */
export const usersGetCurrent = (user: CurrentUser) => (
    { type: "USERS_GET_CURRENT", payload: user } as const)

/* --- Clear all users --- */
export const usersClear = () => ({ type: "USERS_CLEAR" } as const)

/* --- Clear all users --- */
export const usersClearCurrent = () => ({ type: "USERS_CLEAR_CURRENT" } as const)

/* --- Set is requesting --- */
export const usersStartRequest = () => ({ type: "USERS_REQUEST", payload: 'start' } as const)
export const usersEndRequest = () => ({ type: "USERS_REQUEST", payload: 'end' } as const)

/* --- Set error --- */
export const usersSetError = (error?: string) => ({ type: "USERS_SET_ERROR", payload: error } as const)