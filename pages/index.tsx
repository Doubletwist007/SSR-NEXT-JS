import React from "react";
import { PageWrapper } from "./_shared/mainWrapper";
import { SearchBar } from "./_shared/search";
import SimpleTabs from "./_shared/tabPanel";
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import ListItemText from '@material-ui/core/ListItemText';
import Select from '@material-ui/core/Select';
import Checkbox from '@material-ui/core/Checkbox';
import { OverlayScrollbarsComponent } from "overlayscrollbars-react";
import { Repository } from "./_shared/repository";
import { actionCreators, IGlobalState, ThunkDispatch } from "../store";
import { connect, useDispatch } from "react-redux";
import { IRepo } from "../store/repositories";
import { Pagination } from '@material-ui/lab';
import { defaultScrollbarOptions, MenuProps, names } from "./_shared/utils";
import { TransitionsModal } from "./_shared/modal";
import { CircularProgress } from "@material-ui/core";
import { NothingFound } from "./_shared/nothingFound";
import { Status } from "../store/users";

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        formControl: {
            minWidth: 120,
            maxWidth: 400,
            margin: '0 2em 0 1em'
        },
        name: {
            color: '#3f50b5'
        },
        searchGroup: {
            display: 'flex'
        },
        pagination: {
            marginTop: '1em'
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
        }
    }),
);

interface IRepositoryList {
    count: number
    repositories: IRepo[]
    isRequesting: Status
}

const HomePageComponent = ({ count, repositories, isRequesting }: IRepositoryList) => {
    const classes = useStyles();
    const [technology, setTechnology] = React.useState<string[]>([]);
    const [value, setValue] = React.useState('')
    const [expanded, setExpanded] = React.useState<string | false>(false);
    const [page, setPage] = React.useState(1)
    const [modal, setModal] = React.useState(false)

    const maxPage = Math.floor(count / 15) + 1

    // -- redux connection
    const dispatch: ThunkDispatch = useDispatch()

    // -- effects
    React.useEffect(() => {
        return () => {
            dispatch(actionCreators.reposClear())
        }
    }, [])

    // -- handlers
    const handleRepChange = (panel: string) => {
        setExpanded(panel === expanded ? false : panel);
    };

    const handleChange = (event: React.ChangeEvent<{ value: unknown }>) => {
        setTechnology(event.target.value as string[]);
    };

    const onSublmit = () => {
        if (!value && technology.length === 0) {
            setModal(true)
        } else {
            setPage(1)
            dispatch(actionCreators.reposSearchRequest(technology, 1, value))
        }
    }

    const onNext = (page: number) => {
        dispatch(actionCreators.reposSearchRequest(technology, page, value))
        setPage(page)
    }

    const repositoryList = repositories.map((repo, ind) => (
        <Repository key={ind} repository={repo} onChange={handleRepChange} expanded={expanded} />
    ))

    return (
        <PageWrapper>
            <SimpleTabs />
            <h1 className={classes.name}>Список репозиториев</h1>
            <TransitionsModal type="repo" open={modal} handleClose={() => setModal(false)} />
            <div className={classes.searchGroup}>
                <SearchBar type='repo' onChange={(value) => setValue(value)} onClick={onSublmit} />
                <FormControl className={classes.formControl}>
                    <InputLabel id="demo-mutiple-checkbox-label">Фильтр</InputLabel>
                    <Select
                        labelId="demo-mutiple-checkbox-label"
                        id="demo-mutiple-checkbox"
                        multiple
                        value={technology}
                        onChange={handleChange}
                        input={<Input />}
                        renderValue={(selected) => (selected as string[]).join(', ')}
                        MenuProps={MenuProps}
                    >
                        {names.map((name) => (
                            <MenuItem key={name} value={name}>
                                <Checkbox checked={technology.indexOf(name) > -1} />
                                <ListItemText primary={name} />
                            </MenuItem>
                        ))}
                    </Select>
                </FormControl>
                {isRequesting === 'start' && <CircularProgress />}
            </div>
            <OverlayScrollbarsComponent
                options={defaultScrollbarOptions}
                className={classes.scroll}
            >
                {repositoryList}
                {isRequesting === 'end' && repositories.length === 0 &&
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
        count: state.repositories.count,
        repositories: state.repositories.repositories,
        isRequesting: state.repositories.isRequesting
    }
}

const MainPage = connect(mapStateToProps)(HomePageComponent)

export default MainPage