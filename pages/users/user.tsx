import React from 'react';
import { makeStyles, Theme } from '@material-ui/core/styles';
import { Avatar, Box, Button } from '@material-ui/core';
import { IUser } from '../../store/users';
import Link from "next/link";

const useStyles = makeStyles((theme: Theme) => ({
    user: {
        width: '100%',
        border: '1px solid #bdbdbd',
        borderRadius: '5px',
        backgroundColor: theme.palette.background.paper,
        marginLeft: 0,
        marginRight: 0,
    },
    button: {
        width: '100%',
        display: 'flex',
        justifyContent: 'flex-start'
    },
    avatar: {
        marginRight: '2em'
    },
    link: {
        textDecoration: 'none'
    }
}));

interface UserCard {
    user: IUser
    loadAvatar: boolean
}

export const User = ({ user: { login, avatar_url, id }, loadAvatar }: UserCard) => {
    const classes = useStyles();

    return (
        <Box component="div" m={0.5} className={classes.user}>
            <Link href={`/users/${id}`} className={classes.link}>
                <Button className={classes.button}>
                    <Avatar alt='' src={loadAvatar ? avatar_url : ''} className={classes.avatar} />
                    <span>{login}</span>
                </Button>
            </Link>
        </Box>
    );
}