import { makeStyles, Theme, createStyles } from '@material-ui/core/styles';
import shadows from '@material-ui/core/styles/shadows';

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
            alignItems: 'center',
            paddingRight: '24px'
        },
        right: {
            position: 'absolute',
            right: '140px'
        },
        helper: {
            borderLeft: `2px solid ${theme.palette.divider}`,
            padding: theme.spacing(1, 2),
        },
        large: {
            width: theme.spacing(18),
            height: theme.spacing(18),
            marginBottom: '1em',
        },
        root2: {
            flexGrow: 1,
            maxWidth: 752,
        },
        demo: {
            boxShadow: shadows[1],
            width: '100%'
        },
        title: {
            margin: theme.spacing(4, 0, 2),
        },
        heading: {
            fontSize: theme.typography.pxToRem(15),
        },
        secondaryHeading: {
            fontSize: theme.typography.pxToRem(15),
            color: theme.palette.text.secondary,
        },
        details: {
            display: 'flex',
            flexDirection: 'column-reverse',
            alignItems: 'center',
        },
        link: {
            color: theme.palette.primary.main,
            textDecoration: 'none',
            '&:hover': {
                textDecoration: 'underline',
            },
        },
        box: {
            width: '100%'
        },
        primary: {
            color: '#3f50b5',
            fontWeight: 'bold'
        },
        secondary: {
            color: 'gray'
        },
        progress: {
            height: '20px',
            margin: '48px 0 18.76px 0'
        }
    }),
);