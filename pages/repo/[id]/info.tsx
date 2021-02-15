import { useStyles } from "./styles";
import Accordion from '@material-ui/core/Accordion';
import Typography from '@material-ui/core/Typography';
import clsx from 'clsx';
import AccordionDetails from '@material-ui/core/AccordionDetails';
import AccordionSummary from '@material-ui/core/AccordionSummary';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';

interface IInfo {
    rep_name: string
    metric: string
    expanded: string | false
    onChange: (str: string) => void
    link: string
    count: number
}

export const Info = ({ rep_name, metric, expanded, onChange, link, count }: IInfo) => {
    const classes = useStyles();

    const rep_link = `https://github.com/${rep_name}`

    return (
        <Accordion expanded={expanded === metric} onChange={() => onChange(metric)}>
            <AccordionSummary
                expandIcon={<ExpandMoreIcon />}
                aria-controls="panel1c-content"
                id="panel1c-header"
            >
                <div className={classes.column}>
                    <Typography className={classes.heading}>{metric.replace('_', ' ')}</Typography>
                </div>
                <div className={classes.column}>
                    <Typography className={classes.secondaryHeading}>{count === 100 ? '> 100' : count}</Typography>
                </div>
            </AccordionSummary>
            <AccordionDetails className={classes.details}>
                <div className={clsx(classes.helper)}>
                    <Typography variant="caption">
                        Посмотреть на GIthub.com
                            <br />
                        <a onClick={() => window.open(rep_link, '_blank')} className={classes.link}>
                            Перейти на страницу репозитория
                        </a>
                    </Typography>
                </div>
            </AccordionDetails>
        </Accordion>
    );
}