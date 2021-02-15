import { CurrentRepo, IRepoListState } from "./types";

const initialValue = {
    value: 0,
    link: ''
}

export const InitialCurrentRepo: CurrentRepo = {
    full_name: '', //
    owner: { //
        id: 0,
        avatar_link: '',
        login: ''
    },
    languages: {},
    Rating: { ...initialValue }, //
    Subscribers: { ...initialValue }, //
    Open_Issues: { ...initialValue }, //
    Pull_Requests: { ...initialValue },
    Forks: { ...initialValue }, //
    Watchers: { ...initialValue },//
    Commits: { ...initialValue }
}

export const InitialReposList: IRepoListState = {
    count: 0,
    repositories: [],
    current: InitialCurrentRepo,
    isRequesting: 'init'
}