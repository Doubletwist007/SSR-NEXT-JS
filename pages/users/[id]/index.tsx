import { Avatar, Container, LinearProgress } from "@material-ui/core";
import React from "react";
import clsx from 'clsx';
import moment from 'moment';
import { PageWrapper } from "../../_shared/mainWrapper";
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import Typography from '@material-ui/core/Typography';
import { actionCreators, IGlobalState, ThunkDispatch } from "../../../store";
import { connect, useDispatch } from "react-redux";
import SimpleTabs from "../../_shared/tabPanel";
import { CurrentUser, Status } from "../../../store/users";
import { Icon } from "../../_shared/icons";
import { renderStats, useQuery } from "../../_shared/utils";
import Page404 from "../../404";
import { useStyles } from "./styles";
import { ActivityItem } from "./info";


interface IUserProfile {
    user: CurrentUser
    isRequesting: Status
    error?: string
}

export const UserProfileComponent = ({ user, isRequesting, error }: IUserProfile) => {
    const { name, avatar_url, activities, bio, location } = user;
    const classes = useStyles();
    const dispatch: ThunkDispatch = useDispatch()
    const [expanded, setExpanded] = React.useState<string | false>(false);
    const id = useQuery()

    React.useEffect(() => {
        if (id) dispatch(actionCreators.userIdRequest(Number(id.id)))
        return () => {
            dispatch(actionCreators.usersClearCurrent())
        }
    }, [id])

    const handleRepChange = (panel: string) => {
        setExpanded(panel === expanded ? false : panel);
    };

    const lastActivities = activities.map((activity, ind) => (
        <ActivityItem
            key={ind}
            activity={activity}
            expanded={expanded}
            onChange={handleRepChange}
        />
    ))

    const statList = renderStats.map((i, ind) => (
        <ListItem key={ind}>
            <ListItemIcon>
                <Icon icon={i.icon} />
            </ListItemIcon>
            <ListItemText
                primary={i.name}
            />
            <span className={classes.secondary}>
                {i.isDate ? `${moment(new Date(user[i.stat])).format('YYYY-MM-DD')}` : user[i.stat]}
            </span>
        </ListItem>
    ))

    if (error) {
        return (
            <Page404 message={'Пользователь не найден'} />
        )
    }

    return (
        <PageWrapper>
            <SimpleTabs />
            {isRequesting === 'end' && <h1 className={classes.name}>{name}</h1>}
            {isRequesting !== 'end' && <LinearProgress className={classes.progress} />}
            <Container className={classes.root}>
                <div className={clsx(classes.column, classes.left)}>
                    <Avatar className={clsx(classes.large)} src={avatar_url} />
                    <div className={classes.box}>
                        <span className={classes.primary}>BIO: </span>
                        <span className={classes.secondary}>{bio || '...'}</span>
                    </div>
                    <div className={classes.box}>
                        <span className={classes.primary}>Location: </span>
                        <span className={classes.secondary}>{location || '...'}</span>
                    </div>
                    <Typography variant="h6" className={clsx(classes.box, classes.name)}>
                        Статистика профиля
                    </Typography>
                    <div className={classes.demo}>
                        <List dense={true}>
                            {statList}
                        </List>
                    </div>
                </div>
                <div className={clsx(classes.column, classes.helper)}>
                    <h3 className={classes.name}>Последние действия</h3>
                    {lastActivities}
                    {lastActivities.length === 0 && isRequesting === 'end' &&
                        <h1>Пользователь давно не был активен =(</h1>}
                </div>
            </Container>
        </PageWrapper>
    )
}

function mapStateToProps(state: IGlobalState) {
    return {
        user: state.users.current,
        isRequesting: state.users.isRequesting,
        error: state.users.error
    }
}

const UserProfile = connect(mapStateToProps)(UserProfileComponent)

export default UserProfile