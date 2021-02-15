import React from 'react';
import Link from "next/link";
import { useRouter } from "next/router";
import Button from '@material-ui/core/Button';
import { makeStyles, Theme } from '@material-ui/core/styles';
import clsx from 'clsx';
import { Folder, Person } from '@material-ui/icons';
import shadows from '@material-ui/core/styles/shadows';

const useStyles = makeStyles((theme: Theme) => ({
    root: {
        flexGrow: 10,
        display: 'flex',
        justifyContent: 'center',
        backgroundColor: '#3f50b5',
        width: '100vw',
        position: 'absolute',
        top: 0,
        left: 0,
        boxShadow: shadows[3]
    },
    button: {
        height: '58px',
        boxShadow: 'none',
        borderRadius: 'unset',
        '&:hover': {
            borderRadius: 'unset'
        }
    },
    navlink: {
        textDecoration: 'none'
    },
    current: {
        backgroundColor: '#303f9f',
    }
}));

export default function SimpleTabs() {
    const classes = useStyles();
    const router = useRouter();

    return (
        <div className={classes.root}>
            <Link href='/' >
                <Button
                    variant="contained"
                    color="primary"
                    size="large"
                    className={clsx(classes.button,
                        { [classes.current]: router.pathname === '/' }
                    )}
                    startIcon={<Folder />}
                >
                    Поиск по репозиториям
                </Button>
            </Link>
            <Link href='/users' >
                <Button
                    variant="contained"
                    color="primary"
                    size="large"
                    className={clsx(classes.button,
                        { [classes.current]: router.pathname === '/users' }
                    )}
                    startIcon={<Person />}
                >
                    Поиск по пользователям
                </Button>
            </Link>
        </div>
    );
}