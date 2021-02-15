import shadows from "@material-ui/core/styles/shadows";
import { makeStyles, Theme, createStyles } from '@material-ui/core/styles';

export const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        root: {
            width: '100%',
            display: 'flex',
            alignItems: 'center',
            height: '80vh',
            paddingLeft: 0,
            paddingRight: 0,
        },
        name: {
            marginTop: 0,
            paddingTop: '1em',
            color: '#3f50b5'
        },
        column: {
            height: '100%',
            flexBasis: '66.66%',
            '&:nth-of-type(1)': {
                flexBasis: '33.33%',
            }
        },
        left: {
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center'
        },
        helper: {
            borderLeft: `2px solid ${theme.palette.divider}`,
            padding: theme.spacing(1, 2),
        },
        large: {
            width: theme.spacing(18),
            height: theme.spacing(18)
        },
        heading: {
            fontSize: theme.typography.pxToRem(15),
        },
        secondaryHeading: {
            fontSize: theme.typography.pxToRem(15),
            color: theme.palette.text.secondary,
        },
        details: {
            alignItems: 'center',
        },
        link: {
            color: theme.palette.primary.main,
            textDecoration: 'none',
            '&:hover': {
                textDecoration: 'underline',
            },
        },
        scroll: {
            width: '98%',
            marginTop: '1em',
            marginRight: '1em',
            height: '55vh',
            position: "relative",
            overflow: "auto",
            '@global': {
                '.os-content-glue': {
                    display: 'none'
                }
            },
            boxShadow: shadows[1]
        },
        scrollme: {
            position: 'absolute',
            color: 'gray',
            right: '5px'
        },
        avatar: {
            width: '100%',
            display: 'flex',
            justifyContent: 'flex-start'
        },
        progress: {
            height: '20px',
            margin: '48px 0 18.76px 0'
        }
    }),
);