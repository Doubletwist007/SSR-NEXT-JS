import { useRouter } from "next/router";
import OverlayScrollbars from "overlayscrollbars";
import { CurrentRepo } from "../../store/repositories";
import { CurrentUser } from "../../store/users";
import { IconNames } from "./icons";

export const defaultScrollbarOptions: OverlayScrollbars.Options = {
    className: "os-theme-dark",
    scrollbars: {
        visibility: "hidden"
    }
};

export const metrics: Array<keyof Omit<CurrentRepo, 'owner' | 'full_name' | 'languages'>> = [
    'Rating',
    'Subscribers',
    'Watchers',
    'Open_Issues',
    'Pull_Requests',
    'Commits',
    'Forks',
]

export const ITEM_HEIGHT = 48;
export const ITEM_PADDING_TOP = 8;
export const MenuProps = {
    PaperProps: {
        style: {
            maxHeight: ITEM_HEIGHT * 5.1 + ITEM_PADDING_TOP,
            width: 250,
        },
    },
};

export const names = [
    'Python',
    'Javascript',
    'Ruby',
    'Postgress',
    'Docker',
    'C++',
    'Java',
    'CSS',
    'HTML',
    'Go',
];

export interface RenderStats {
    icon: IconNames
    stat: keyof Omit<CurrentUser, 'activities'>
    name: string
    isDate: boolean
}

export const renderStats: RenderStats[] = [
    { icon: IconNames.FOLLOWERS, stat: 'followers', name: 'Подписчики', isDate: false },
    { icon: IconNames.FOLLOWING, stat: 'following', name: 'Подписки', isDate: false },
    { icon: IconNames.PUBLIC_REPOS, stat: 'public_repos', name: 'Репозитории', isDate: false },
    { icon: IconNames.CREATE_AT, stat: 'created_at', name: 'Создан', isDate: true },
    { icon: IconNames.UPDATED_AT, stat: 'updated_at', name: 'Обновлён', isDate: true },
]

export function useQuery() {
    const router = useRouter();
    const hasQueryParams =
        /\[.+\]/.test(router.route) || /\?./.test(router.asPath);
    const ready = !hasQueryParams || Object.keys(router.query).length > 0;
    if (!ready) return null;
    return router.query;
}