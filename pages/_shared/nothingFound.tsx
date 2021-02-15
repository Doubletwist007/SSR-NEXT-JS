import { makeStyles, Theme, createStyles } from '@material-ui/core/styles';

export const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        root: {
            width: '100%',
            display: 'flex',
            alignItems: 'center',
            height: '100%',
            justifyContent: 'center',
            color: '#3f50b5'
        }
    }),
);
export const NothingFound = () => {
    const classes = useStyles();

    return (
        <h3 className={classes.root}> Ничего не найдено =( </h3>
    )
}