import React from 'react';
import { makeStyles, Theme, createStyles } from '@material-ui/core/styles';
import Accordion from '@material-ui/core/Accordion';
import AccordionDetails from '@material-ui/core/AccordionDetails';
import AccordionSummary from '@material-ui/core/AccordionSummary';
import Typography from '@material-ui/core/Typography';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import AccordionActions from '@material-ui/core/AccordionActions';
import Button from '@material-ui/core/Button';
import Divider from '@material-ui/core/Divider';
import { IRepo } from '../../store/repositories';
import Link from "next/link";

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        root: {
            width: '100%',
        },
        heading: {
            fontSize: theme.typography.pxToRem(15),
            flexBasis: '33.33%',
            flexShrink: 0,
            '&:first-letter': {
                textTransform: 'capitalize'
            }
        },
        secondaryHeading: {
            fontSize: theme.typography.pxToRem(15),
            color: theme.palette.text.secondary,
        },
        icon: {
            verticalAlign: 'bottom',
            height: 20,
            width: 20,
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
        }
    }),
);

interface IRepository {
    expanded: string | false
    onChange: (str: string) => void
    repository: IRepo
}

export const Repository = ({ repository, expanded, onChange }: IRepository) => {
    const { name, full_name, id, owner: { id: owner_id, login } } = repository;
    const classes = useStyles();

    return (
        <Accordion expanded={expanded === repository.name} onChange={() => onChange(repository.name)}>
            <AccordionSummary
                expandIcon={<ExpandMoreIcon />}
                aria-controls="panel1bh-content"
                id="panel1bh-header"
            >
                <Typography className={classes.heading}>{name}</Typography>
                <Typography className={classes.secondaryHeading}>{`Автор: ${login}`}</Typography>
            </AccordionSummary>
            <AccordionDetails>
                <Typography>
                    {`Полное наименование репозитория: ${full_name}`}
                </Typography>
            </AccordionDetails>
            <Divider />
            <AccordionActions>
                <Link href={`/users/${owner_id}`} >
                    <Button size="small" color="secondary" onClick={() => onChange(repository.name)}>
                        Перейти в профиль автора
                </Button>
                </Link>
                <Link href={`/repo/${id}`} >
                    <Button size="small" color="primary">Перейти к карточке</Button>
                </Link>
            </AccordionActions>
        </Accordion>
    );
}
