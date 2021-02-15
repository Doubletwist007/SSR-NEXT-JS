import { Avatar, Container, LinearProgress } from "@material-ui/core";
import React from "react";
import clsx from 'clsx';
import { OverlayScrollbarsComponent } from "overlayscrollbars-react";
import { PageWrapper } from "../../_shared/mainWrapper";
import { actionCreators, IGlobalState, ThunkDispatch } from "../../../store";
import { connect, useDispatch } from "react-redux";
import { CurrentRepo } from "../../../store/repositories";
import { Languages } from "./components/language";
import { defaultScrollbarOptions, metrics, useQuery } from "../../_shared/utils";
import SimpleTabs from "../../_shared/tabPanel";
import Page404 from "../../404";
import { useStyles } from "./styles";
import { Info } from "./info";
import { Status } from "../../../store/users";

interface IrepoView {
    current: CurrentRepo,
    isRequesting: Status,
    error?: string
}

const RepoProfileComponent = ({ current, isRequesting, error }: IrepoView) => {
    const classes = useStyles();
    const [expanded, setExpanded] = React.useState<string | false>(false);
    const dispatch: ThunkDispatch = useDispatch()
    const query = useQuery()

    React.useEffect(() => {
        if (query) dispatch(actionCreators.repoByIdRequest(Number(query.id)))
        return () => {
            dispatch(actionCreators.reposClearCurrent())
        }
    }, [query])

    const handleRepChange = (panel: string) => {
        setExpanded(panel === expanded ? false : panel);
    };

    const infoList = metrics.map((metric, ind) => (
        <Info
            key={ind}
            rep_name={current.full_name}
            metric={metric}
            count={current[metric].value}
            link={current[metric].link}
            expanded={expanded}
            onChange={handleRepChange}
        />
    ))

    if (!isRequesting && error) {
        return (
            <Page404 message={'Репозиторий не найден'} />
        )
    }

    return (
        <PageWrapper>
            <SimpleTabs />
            {isRequesting === 'end' && <h1 className={classes.name}>{current.full_name}</h1>}
            {isRequesting !== 'end' && <LinearProgress className={classes.progress} />}
            <Container className={classes.root}>
                <div className={clsx(classes.column, classes.left)}>
                    <div className={classes.avatar}>
                        <Avatar className={classes.large} src={current.owner.avatar_link} />
                    </div>
                    <OverlayScrollbarsComponent
                        options={defaultScrollbarOptions}
                        className={classes.scroll}
                    >
                        <span className={classes.scrollme}>scroll me</span>
                        <Languages languages={current.languages} />
                    </OverlayScrollbarsComponent>
                </div>
                <div className={clsx(classes.column, classes.helper)}>
                    <h3 className={classes.name}>Статистика</h3>
                    {infoList}
                </div>
            </Container>
        </PageWrapper>
    )
}

// --- Redux Connection ---
function mapStateToProps(state: IGlobalState) {
    return {
        current: state.repositories.current,
        isRequesting: state.repositories.isRequesting,
        error: state.repositories.error
    }
}

const RepoProfile = connect(mapStateToProps)(RepoProfileComponent)

export default RepoProfile