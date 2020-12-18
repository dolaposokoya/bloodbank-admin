import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Alert } from '@material-ui/lab';
import IconButton from '@material-ui/core/IconButton';
import Collapse from '@material-ui/core/Collapse';
import Button from '@material-ui/core/Button';
import CloseIcon from '@material-ui/icons/Close';
import './modal.css'

const useStyles = makeStyles((theme) => ({
    root: {
        position: 'fixed',
        width: '100%',
        '& > * + *': {
            marginTop: theme.spacing(2),
        },
    },
    success: {
        right: 15,
        fontSize: '19px',
        fontWeight: 'bold',
        padding: '10px',
        background: 'rgb(101, 248, 15)',
        color: 'black'
    },
    error: {
        right: 15,
        fontSize: '19px',
        fontWeight: 'bold',
        padding: '10px',
        background: 'rgb(172, 71, 25)',
        color: 'black'
    }
}));


export default function AlertMessage(props) {
    const [open, setOpen] = useState(true);
    const classes = useStyles();
    return (
        <div className={classes.root} style={{ position: 'fixed', zIndex: 999 }}>
            {props.message ? <Collapse in={open}>
                <Alert
                    className={props.severity === 'success' ? classes.success : classes.error}
                    style={{ position: 'fixed', right: 15, fontSize: '19px', fontWeight: 'bold', padding: '10px', color: 'black' }} action={
                        <IconButton
                            aria-label="close"
                            color="inherit"
                            size="small"
                            style={{ color: 'black' }}
                            onClick={() => {
                                setOpen(false);
                            }}
                        >
                            <CloseIcon fontSize="inherit" style={{ color: 'black' }} />
                        </IconButton>
                    } severity={props.severity}>{props.message}</Alert>
            </Collapse> : null
            }
            {
                props.message ? <Button
                    disabled={open}
                    variant="outlined"
                    style={{ display: 'none' }}
                    onClick={() => {
                        setOpen(true);
                    }}
                /> : <Button
                        disabled={open}
                        variant="outlined"
                        style={{ display: 'none' }}
                        onClick={() => {
                            setOpen(false);
                        }}
                    />
            }
        </div >
    );
}
