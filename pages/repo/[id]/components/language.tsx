import React from 'react';
import { createStyles, Theme, makeStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import { Code } from '@material-ui/icons';

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        root: {
            width: '100%',
            maxWidth: 360,
            backgroundColor: theme.palette.background.paper,
        },
        item: {
            paddingTop: 0,
            paddingBottom: 0
        },
        icon: {
            minWidth: '38px'
        }
    }),
);

interface ILanguages {
    languages: { [key: string]: number }
}

export const Languages = ({ languages }: ILanguages) => {
    const classes = useStyles();

    const list = Object.keys(languages).map((key) => (
        <ListItem key={key} button className={classes.item}>
            <ListItemIcon className={classes.icon}>
                <Code />
            </ListItemIcon>
            <ListItemText primary={key} secondary={`Упоминаний: ${languages[key]}`} />
        </ListItem>
    ))

    return (
        <div className={classes.root}>
            <List component="nav" aria-label="main mailbox folders">
                {list}
            </List>
        </div>
    );
}
