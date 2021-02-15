import axios, { AxiosResponse } from 'axios';
import { CurrentRepo, InitialCurrentRepo } from './repositories';
import { Activity, CurrentUser, InitialCurrentUser } from './users';

// --- Network Handlers ---
export const baseUrl = "https:/";
export const gitHubApiUrl = `${baseUrl}/api.github.com`;
const PER_PAGE = 15

// --- USERS
export const sendUserListSearchRequest = (page: number, searchtext: string) => {
    return axios.get(`${gitHubApiUrl}/search/users?q=${searchtext}+in:name&per_page=${PER_PAGE}&page=${page}`);
}

export async function sendUserRequest(id: number) {
    const user = await axios.get(`${gitHubApiUrl}/user/${id}`);
    let returnedUser: CurrentUser = { ...InitialCurrentUser }
    if (user !== undefined) {
        returnedUser.bio = user.data.bio || ''
        returnedUser.avatar_url = user.data.avatar_url || ''
        returnedUser.login = user.data.login
        returnedUser.name = user.data.name
        returnedUser.location = user.data.location || ''
        returnedUser.followers = user.data.followers
        returnedUser.following = user.data.following
        returnedUser.public_repos = user.data.public_repos
        returnedUser.created_at = user.data.created_at
        returnedUser.updated_at = user.data.updated_at
    }
    const activities = await sendActivityRequest(user.data.login)
    if (activities.length > 0) {
        const newActivities: Activity[] = activities.map((i: any) => {
            return {
                created_at: i.created_at,
                id: i.id,
                type: i.type,
                repo: {
                    id: i.repo.id,
                    name: i.repo.name
                }
            }
        })
        returnedUser.activities = newActivities
    }
    return returnedUser
}

export async function sendActivityRequest(login: string, page: number = 1) {
    let activitiesList: [] = []
    const activities = await axios.get(`${gitHubApiUrl}/users/${login}/events/public?per_page=100&page=${page}`);
    if (activities !== undefined) {
        if (activities.data.length === 100) {
            const lastPageURL = activities.headers.link.split(',')[1].split(' rel')[0]
            const searcher = new URLSearchParams(lastPageURL)
            const lastPage = searcher.get('page')!.slice(0, -2)
            const lastActivities = await
                axios.get(`${gitHubApiUrl}/users/${login}/events/public?per_page=100&page=${Number(lastPage)}`);
            const lastLength = lastActivities.data.length
            if (lastLength < 5) {
                const preLastActivities = await
                    axios.get(`${gitHubApiUrl}/users/${login}/events/public?per_page=100&page=${Number(lastPage) - 1}`);
                activitiesList = preLastActivities.data.slice(lastLength - 5).concat(lastActivities.data)
            } else {
                activitiesList = lastActivities.data.slice(-5)
            }
        } else {
            if (activities.data.length > 5) {
                activitiesList = activities.data.slice(-5)
            } else if (activities.data.length > 0) {
                activitiesList = activities.data
            }
        }
    }
    return activitiesList
}

// --- REPOSITORIES
export const sendRepositoryListSearchRequest = (query: string[], page: number, searchtext: string) => {
    const searchquery = searchtext ? `${searchtext}+in:name+` : ''
    const queries = `&q=` + searchquery + query.reduce((l, v) => `${l}topic:${v}+`, '')
    return axios.get(`${gitHubApiUrl}/search/repositories?per_page=${PER_PAGE}&page=${page}${queries}`);
}

interface IApiResponse<T extends object> {
    response: { objects: T[] },
    objects?: T[]
    items?: T[]
    data?: T[]
}

interface IData {
    [key: string]: string | number
}

export async function sendRepositoryIdRequest(id: number) {
    const repository = await axios.get(`${gitHubApiUrl}/repositories/${id}`)
    const owner = repository.data.owner.login
    const name = repository.data.name
    const full_name = repository.data.full_name
    const repositoryResponce = await axios.all([
        axios.get(`${gitHubApiUrl}/repositories/${id}`)
            .catch(error => console.log(error)),
        axios.get<IApiResponse<IData>>(`${gitHubApiUrl}/repos/${owner}/${name}/languages`)
            .catch(error => console.log(error)),
        axios.get<IApiResponse<IData>>(`${gitHubApiUrl}/repos/${owner}/${name}/tags`)
            .catch(error => console.log(error)),
        axios.get<IApiResponse<IData>>(`${gitHubApiUrl}/repos/${owner}/${name}/commits?per_page=100`)
            .catch(error => console.log(error)),
        axios.get<IApiResponse<IData>>(`${gitHubApiUrl}/repos/${owner}/${name}/pulls?per_page=100`)
            .catch(error => console.log(error))
    ]) as AxiosResponse[]
    let returnedData: CurrentRepo = { ...InitialCurrentRepo }
    if (repositoryResponce[0] !== undefined) {
        const data = repositoryResponce[0].data
        returnedData.owner.id = data.owner.id
        returnedData.owner.login = data.owner.login
        returnedData.owner.avatar_link = data.owner.avatar_url
        returnedData.full_name = full_name
        returnedData.Forks = { value: data.forks, link: data.forks_url }
        returnedData.Rating = { value: data.stargazers_count, link: data.stargazers_url }
        returnedData.Open_Issues = { value: data.open_issues, link: data.issues_url }
        returnedData.Subscribers = { value: data.subscribers_count, link: data.subscribers_url }
        returnedData.Watchers = { value: data.watchers, link: '' }
        returnedData.Pull_Requests = { ...returnedData.Pull_Requests, link: data.pulls_url }
    }
    if (repositoryResponce[1] !== undefined) {
        returnedData.languages = repositoryResponce[1].data
    } if (repositoryResponce[2] !== undefined) {
    } if (repositoryResponce[3] !== undefined) {
        const length = repositoryResponce[3].data.length
        returnedData.Commits = { ...returnedData.Commits, value: length }
    } if (repositoryResponce[4] !== undefined) {
        const length = repositoryResponce[4].data.length
        returnedData.Pull_Requests = { ...returnedData.Pull_Requests, value: length }
    }
    return returnedData
}