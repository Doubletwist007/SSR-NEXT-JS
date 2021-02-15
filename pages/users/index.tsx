import { CircularProgress, FormControlLabel, Switch } from "@material-ui/core";
import React from "react";
import { OverlayScrollbarsComponent } from "overlayscrollbars-react";
import { PageWrapper } from "../_shared/mainWrapper";
import { SearchBar } from "../_shared/search";
import SimpleTabs from "../_shared/tabPanel";
import { User } from "./user";
import { makeStyles, Theme } from '@material-ui/core/styles';
import { actionCreators, IGlobalState, ThunkDispatch } from "../../store";
import { connect, useDispatch } from "react-redux";
import { IUser, Status } from "../../store/users";
import { Pagination } from '@material-ui/lab';
import { defaultScrollbarOptions } from "../_shared/utils";
import { TransitionsModal } from "../_shared/modal";
import { NothingFound } from "../_shared/nothingFound";

const useStyles = makeStyles((theme: Theme) => ({
    buttonGroup: {
        width: '100%',
        display: 'flex',
    },
    name: {
        color: '#3f50b5'
    },
    control: {
        marginLeft: '1em',
    },
    scroll: {
        width: 'calc(95%)',
        marginTop: '1em',
        height: '65vh',
        position: "relative",
        overflow: "auto",
        '@global': {
            '.os-content-glue': {
                display: 'none'
            }
        }
    },
    pagination: {
        marginTop: '1em'
    },
}));

interface IUserList {
    count: number
    users: IUser[],
    isRequesting: Status
}

const UsersListPageComponent = ({ count, users, isRequesting }: IUserList) => {
    const classes = useStyles();
    const [checked, setCheked] = React.useState(true)
    const [value, setValue] = React.useState('')
    const [page, setPage] = React.useState(1)
    const [modal, setModal] = React.useState(false)

    const dispatch: ThunkDispatch = useDispatch()

    let maxPage = Math.floor(count / 15) + 1

    // -- effects
    React.useEffect(() => {
        return () => {
            dispatch(actionCreators.usersClear())
        }
    }, [])

    // -- handlers
    const onSublmit = () => {
        if (!value) {
            setModal(true)
        } else {
            setPage(1)
            dispatch(actionCreators.usersSearchRequest(1, value))
        }
    }

    const onNext = (page: number) => {
        dispatch(actionCreators.usersSearchRequest(page, value))
        setPage(page)
    }

    const userList = users.map((user, index) => (
        <User key={index} user={user} loadAvatar={checked} />
    ))

    return (
        <PageWrapper>
            <SimpleTabs />
            <h1 className={classes.name}>Список пользователей</h1>
            <TransitionsModal type="users" open={modal} handleClose={() => setModal(false)} />
            <div className={classes.buttonGroup}>
                <SearchBar type='user' onChange={(value) => setValue(value)} onClick={onSublmit} />
                <FormControlLabel
                    className={classes.control}
                    control={
                        <Switch
                            checked={checked}
                            onChange={() => setCheked(!checked)}
                            name="checkedB"
                            color="primary"
                        />
                    }
                    label="Загружать аватары"
                />
                {isRequesting === 'start' && <CircularProgress />}
            </div>
            <OverlayScrollbarsComponent
                options={defaultScrollbarOptions}
                className={classes.scroll}
            >
                {userList}
                {isRequesting === 'end' && userList.length === 0 &&
                    <NothingFound />}
            </OverlayScrollbarsComponent>
            <div className={classes.pagination}>
                <Pagination
                    page={page}
                    count={maxPage > 67 ? 67 : maxPage}
                    color="primary"
                    onChange={(e, value) => onNext(value)}
                />
            </div>
        </PageWrapper>
    )
}

// --- Redux Connection ---
function mapStateToProps(state: IGlobalState) {
    return {
        count: state.users.count,
        users: state.users.users,
        isRequesting: state.users.isRequesting
    }
}

const UsersListPage = connect(mapStateToProps)(UsersListPageComponent)

export default UsersListPage