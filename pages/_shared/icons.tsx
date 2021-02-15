import { Folder, People, PeopleOutline, Schedule, Update } from "@material-ui/icons";
import React from "react";

export enum IconNames {
    FOLLOWERS = 'FOLLOWERS',
    FOLLOWING = 'FOLLOWING',
    PUBLIC_REPOS = 'PUBLIC_REPOS',
    CREATE_AT = 'CREATE_AT',
    UPDATED_AT = 'UPDATED_AT'
}

interface IconProps {
    icon: IconNames;
}

export const Icon = ({ icon }: IconProps) => {

    const getIconSVG = (): JSX.Element => {
        switch (icon) {
            case IconNames.FOLLOWERS:
                return <People />;
            case IconNames.FOLLOWING:
                return <PeopleOutline />;
            case IconNames.PUBLIC_REPOS:
                return <Folder />;
            case IconNames.CREATE_AT:
                return <Schedule />;
            case IconNames.UPDATED_AT:
                return <Update />;
        }
    };

    return (getIconSVG());
}