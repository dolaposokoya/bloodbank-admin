import React, { useState } from 'react';
import clsx from 'clsx';
import { makeStyles } from '@material-ui/core/styles';
import {
    SwipeableDrawer, List,
    Avatar,
    ListItem,
    ListItemIcon,
    ListItemText,
    Typography
} from '@material-ui/core';
import InboxIcon from '@material-ui/icons/MoveToInbox';
import MailIcon from '@material-ui/icons/Mail';
import MenuIcon from '@material-ui/icons/Menu';
import PowerSettingsNewRoundedIcon from '@material-ui/icons/PowerSettingsNewRounded';
import './modal.css';
import { useHistory } from "react-router-dom";
import { apiUrl } from "../../url/apiUrl";


const max = 999999;
const min = 100000;
function generateColor() {
    let bgColor = Math.floor(Math
        .random() * (max - min + 1)) + min;
    return bgColor
}

let imageColor = generateColor()
const useStyles = makeStyles({
    list: {
        background: 'rgba(241, 184, 184,0.1)',
        height: '100%',
        padding: '17px',
        width: 250,
    },
    fullList: {
        width: 'auto',
    },
    navItem: {
        padding: '15px',
        borderBottom: '2px solid black',
    },
    menuIcon: {
        cursor: 'pointer',
        fontSize: '46px',
        margin: 'auto',
        paddingTop: '4px',
        paddingLeft: '20px'
    },
    randomColor: {
        float: 'right',
        margin: '7px',
        width: '40px',
        height: '40px',
        background: `#${imageColor}`,
        borderRadius: '50%',
        cursor: 'pointer',
    },
    header: {
        background: 'rgba(165, 21, 21, 0.9)',
        padding: '5px',
        margin: 0,
    }
});

export default function Header() {
    const classes = useStyles();
    const history = useHistory()
    const menus = ['Inbox', 'Starred', 'Send email', 'Drafts']
    const [state, setState] = useState({
        top: false,
        left: false,
        bottom: false,
        right: false,
    });

    const [showModal, setShowModal] = useState(false)
    const imageName = localStorage.getItem('image')
    const name = localStorage.getItem('name')

    const toggleDrawer = (anchor, open) => (event) => {
        if (event && event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
            return;
        }
        setState({ ...state, [anchor]: open });
    };

    const showPopUp = async () => {
        setShowModal(true)
    }
    const closePopUp = async () => {
        setShowModal(false)
    }
    const list = (anchor) => (
        <div
            className={clsx(classes.list, {
                [classes.fullList]: anchor === 'top' || anchor === 'bottom',
            })}
            role="presentation"
            onClick={toggleDrawer(anchor, false)}
            onKeyDown={toggleDrawer(anchor, false)}
        >
            <List>
                {menus.map((text, index) => (
                    <ListItem button key={text} className={classes.navItem}>
                        <ListItemIcon>{index % 2 === 0 ? <InboxIcon /> : <MailIcon />}</ListItemIcon>
                        <ListItemText primary={text} />
                    </ListItem>
                ))}
            </List>
            {/* <Divider /> */}
        </div>
    );

    const logOut = () => {
        localStorage.removeItem('admin_token')
        localStorage.removeItem('name')
        localStorage.removeItem('image')
        localStorage.removeItem('profile_id')
        history.push('/')
    }

    return (
        <div className={classes.header}>
            <MenuIcon onClick={toggleDrawer('left', true)} className={classes.menuIcon} />
            <SwipeableDrawer
                anchor={'left'}
                open={state['left']}
                onClose={toggleDrawer('left', false)}
                onOpen={toggleDrawer('left', true)}
            >
                {list('left')}
            </SwipeableDrawer>

            <Avatar variant="square" className={classes.randomColor} onClick={showModal === false ? showPopUp : closePopUp}>{name}</Avatar>
            {showModal && showModal ? <div className="cardLayout">
                <div className="content">
                    <Typography style={{ borderBottom: '2px solid black', paddingBottom: '6px' }}>Admin One</Typography>
                    <div className="flex" onClick={() => logOut}>
                        <PowerSettingsNewRoundedIcon className="logOut" />
                        <Typography className="logOut">logout</Typography>
                    </div>
                </div>
            </div> : null}
        </div >
    );
}
