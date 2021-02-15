import { CurrentRepo, IRepo } from "./types"

/* --- Get init repositories--- */
export const reposGet = (repositories: IRepo[], count: number) => (
    { type: "REPOS_GET", payload: { repositories: repositories, count: count } } as const)

/* --- Get current repository--- */
export const reposGetCurrent = (repository: CurrentRepo) => (
    { type: "REPOS_GET_CURRENT", payload: repository } as const)

/* --- Clear list repositories --- */
export const reposClearCurrent = () => ({ type: "REPOS_CLEAR_CURRENT" } as const)

/* --- Clear list repositories --- */
export const reposClear = () => ({ type: "REPOS_CLEAR" } as const)

/* --- Set is requesting --- */
export const reposStartRequest = () => ({ type: "REPOS_REQUEST", payload: 'start' } as const)
export const reposEndRequest = () => ({ type: "REPOS_REQUEST", payload: 'end' } as const)

/* --- Set error --- */
export const reposSetError = (error?: string) => ({ type: "REPOS_SET_ERROR", payload: error } as const)