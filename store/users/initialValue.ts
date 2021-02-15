import { CurrentUser, IUserListState } from "./types";

export const InitialCurrentUser: CurrentUser = {
    login: '',
    name: '',
    avatar_url: '',
    bio: '',
    location: '',
    followers: 0,
    following: 0,
    public_repos: 0,
    created_at: '',
    updated_at: '',
    activities: []
}

export const InitialUserList: IUserListState = {
    count: 0,
    users: [],
    current: InitialCurrentUser,
    isRequesting: 'init'
}