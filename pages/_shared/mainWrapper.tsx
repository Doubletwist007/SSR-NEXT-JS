import { Container } from "@material-ui/core";
import React, { ReactNode } from "react";
import { makeStyles, Theme } from '@material-ui/core/styles';
import shadows from "@material-ui/core/styles/shadows";

const useStyles = makeStyles((theme: Theme) => ({
    root: {
        paddingTop: '58px',
        height: '100vh',
        boxShadow: shadows[3]
    }
}));

interface IPage {
    children: ReactNode
}

export const PageWrapper = ({ children }: IPage) => {
    const classes = useStyles();

    return (
        <Container maxWidth="md" className={classes.root} >
            {children!}
        </Container>
    )
}