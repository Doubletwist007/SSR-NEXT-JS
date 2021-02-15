import React from 'react';
import { makeStyles, Theme, createStyles } from '@material-ui/core/styles';
import Modal from '@material-ui/core/Modal';
import Backdrop from '@material-ui/core/Backdrop';
import Fade from '@material-ui/core/Fade';

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        modal: {
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
        },
        paper: {
            backgroundColor: theme.palette.background.paper,
            boxShadow: theme.shadows[5],
            padding: theme.spacing(2, 4, 3),
            '&:focus': {
                outline: 'none'
            }
        },
    }),
);

interface IModal {
    type: 'repo' | 'users'
    open: boolean
    handleClose: () => void
}

export const TransitionsModal = ({ type, open, handleClose }: IModal) => {
    const classes = useStyles();

    const seconLineText = type === 'repo'
        ? 'Введите запрос или выберите значение в фильтре'
        : 'Введите запрос в поисковой строке'

    return (
        <div>
            <Modal
                aria-labelledby="transition-modal-title"
                aria-describedby="transition-modal-description"
                className={classes.modal}
                open={open}
                onClose={handleClose}
                closeAfterTransition
                BackdropComponent={Backdrop}
                BackdropProps={{
                    timeout: 500,
                }}
            >
                <Fade in={open}>
                    <div className={classes.paper}>
                        <h2 id="transition-modal-title">Ошибка!</h2>
                        <p id="transition-modal-description">Github API не работает с пустыми значениями</p>
                        <p id="transition-modal-description">{seconLineText}</p>
                    </div>
                </Fade>
            </Modal>
        </div>
    );
}