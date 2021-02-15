import { Status } from "../users";

interface Owner {
    id: number
    login: string
    avatar_link?: string
}

export interface IRepo {
    name: string
    id: number
    full_name: string
    owner: Owner
}

interface Value {
    value: number
    link: string
}

export interface CurrentRepo {
    full_name: string
    owner: Owner
    languages: { [key: string]: number }
    Rating: Value
    Subscribers: Value
    Open_Issues: Value
    Pull_Requests: Value
    Forks: Value
    Watchers: Value
    Commits: Value
}

export interface IRepoListState {
    count: number
    repositories: IRepo[]
    current: CurrentRepo
    isRequesting: Status
    error?: string
}