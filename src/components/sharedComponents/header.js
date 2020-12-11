import React, { useState } from 'react';
import clsx from 'clsx';
import { makeStyles } from '@material-ui/core/styles';
import {
    SwipeableDrawer, List,
    Avatar,
    ListItem,
    ListItemIcon,
    ListItemText,
    Grid,
    Typography
} from '@material-ui/core';
import InboxIcon from '@material-ui/icons/MoveToInbox';
import MailIcon from '@material-ui/icons/Mail';
import MenuIcon from '@material-ui/icons/Menu';
import PowerSettingsNewRoundedIcon from '@material-ui/icons/PowerSettingsNewRounded';
import './modal.css'


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
        padding: '15px',
        width: 200,
    },
    fullList: {
        width: 'auto',
    },
    navItem: {
        padding: '20px',
        borderBottom: '2px solid black',
    },
    menuIcon: {
        cursor: 'pointer',
        fontSize: '36px',
        margin: 'auto',
        paddingTop: '4px',
        paddingLeft: '20px'
    },
    purple: {
        float: 'right',
        margin: '10px',
        width: '30px',
        height: '30px',
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
    const menus = ['Inbox', 'Starred', 'Send email', 'Drafts']
    const [state, setState] = useState({
        top: false,
        left: false,
        bottom: false,
        right: false,
    });
    const [name, setName] = useState('A')
    const [showModal, setShowModal] = useState(false)

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
            <Avatar variant="square" className={classes.purple} onClick={showModal === false ? showPopUp : closePopUp}>{name}</Avatar>
            {showModal && showModal ? <div className="cardLayout">
                <div className="content">
                    <Typography style={{borderBottom: '2px solid black',paddingBottom: '6px'}}>Admin One</Typography>
                    <div className="flex">
                        <PowerSettingsNewRoundedIcon className="logOut" />
                        <Typography className="logOut">logout</Typography>
                    </div>
                </div>
            </div> : null}
        </div >
    );
}
