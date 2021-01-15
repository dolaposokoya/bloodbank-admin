import React from 'react';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
    root: {
        position: 'fixed',
        maxWidth: '350px',
        right: '3px',
        zIndex: 999,
        borderRadius: '40px',
    }
}));


export default function AlertMessage(props) {
    const classes = useStyles();

    const { alertType, iconType, message } = props
    return (
        <div className={classes.root}>
            <div className={`alert alert-${alertType}`} role="alert"><i className={`${iconType}`}></i> {message}</div>
        </div>
    );

}
