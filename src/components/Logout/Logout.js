import React from 'react'
import { useAuth0 } from "@auth0/auth0-react";
import {
    Avatar, Button,
    CssBaseline,
    TextField,
    Link,
    Grid,
    Box,
    Typography,
    Container
} from '@material-ui/core'

const Logout = () => {

    const { user, isAuthenticated, isLoading, logout } = useAuth0();
    return (
        isAuthenticated && (
            <Container component="main" maxWidth="xs" className="mt-5">
                <img src={user.picture} alt={user.name} style={{width: '50px', height: '50px', borderRadius: '50%'}} />
                <Typography variant="h5" component="h5">{user.name}</Typography>
                <Typography variant="h6" component="h6">{user.email}</Typography>
                <Button type="submit"
                    variant="contained"
                    onClick={() => logout({ returnTo: window.location.origin })}
                    style={{ cursor: 'pointer', fontSize: '18px', letterSpacing: '1px' }}>
                    Log Out
                </Button>
            </Container>
        )
    )
}

export default Logout
