import { useStyles } from "./styles";
import Link from "next/link";
import Accordion from '@material-ui/core/Accordion';
import AccordionDetails from '@material-ui/core/AccordionDetails';
import AccordionSummary from '@material-ui/core/AccordionSummary';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import moment from 'moment';
import { Activity } from "../../../store/users";
import { AccordionActions, Button, Divider, Typography } from "@material-ui/core";

interface IInfo {
    activity: Activity
    expanded: string | false
    onChange: (str: string) => void
}

export const ActivityItem = ({ activity, expanded, onChange }: IInfo) => {
    const classes = useStyles();
    return (
        <Accordion expanded={expanded === activity.id} onChange={() => onChange(activity.id)}>
            <AccordionSummary
                expandIcon={<ExpandMoreIcon />}
                aria-controls="panel1c-content"
                id="panel1c-header"
            >
                <div className={classes.column}>
                    <Typography className={classes.heading}>{activity.type}</Typography>
                </div>
                <div className={classes.right}>
                    <Typography className={classes.secondaryHeading}>
                        {`Дата: ${moment(new Date(activity.created_at)).format('YYYY-MM-DD')}`}
                    </Typography>
                </div>
            </AccordionSummary>
            <AccordionDetails className={classes.details}>
                <div className={classes.box}>
                    <span className={classes.primary}>Репозиторий: </span>
                    <span className={classes.secondary}>{activity.repo.name}</span>
                </div>
                <div className={classes.box}>
                    <span className={classes.primary}>ID события: </span>
                    <span className={classes.secondary}>{activity.id}</span>
                </div>
            </AccordionDetails>
            <Divider />
            <AccordionActions>
                <Link href={`/repo/${activity.repo.id}`} s>
                    <Button size="small" color="primary">
                        Перейти на страницу репозитория
                    </Button>
                </Link>
            </AccordionActions>
        </Accordion>
    );
}