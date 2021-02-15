export interface Activity {
    created_at: string
    id: string
    type: string
    repo: {
        id: number
        name: string
    }
}

export interface CurrentUser {
    login: string
    name: string
    avatar_url: string
    bio: string
    location: string
    followers: number
    following: number
    public_repos: number
    created_at: string
    updated_at: string
    activities: Activity[]
}

export interface IUser {
    login: string
    id: number
    avatar_url: string
}

export type Status = 'init' | 'start' | 'end'

export interface IUserListState {
    count: number
    users: IUser[]
    current: CurrentUser
    isRequesting: Status
    error?: string
}