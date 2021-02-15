import React from 'react';
import { makeStyles, Theme, createStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import InputBase from '@material-ui/core/InputBase';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import SearchIcon from '@material-ui/icons/Search';

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        root: {
            padding: '2px 4px',
            display: 'flex',
            alignItems: 'center',
            width: 400,
        },
        input: {
            marginLeft: theme.spacing(1),
            flex: 1,
        },
        iconButton: {
            padding: 10,
        }
    }),
);

interface ISearch {
    type: 'repo' | 'user',
    onClick: () => void
    onChange: (str: string) => void
}

export const SearchBar = ({ type, onClick, onChange }: ISearch) => {
    const classes = useStyles();

    const handleEnter = (e: React.KeyboardEvent) => {
        if (e.key === 'Enter') {
            e.preventDefault();
            onClick()
        }
    }

    return (
        <Paper component="form" className={classes.root}>
            <IconButton className={classes.iconButton} aria-label="menu">
                <MenuIcon />
            </IconButton>
            <InputBase
                className={classes.input}
                placeholder={`Введите ${type === 'repo' ? 'название репозитория' : 'имя пользователя'}`}
                onChange={(e) => onChange(e.target.value)}
                onKeyDown={(e) => handleEnter(e)}
            />
            <IconButton className={classes.iconButton} aria-label="search" onClick={onClick}>
                <SearchIcon />
            </IconButton>
        </Paper>
    );
}
