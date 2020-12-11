import React from 'react'
import '../../index.css'
import {
    Link,
    Typography
} from '@material-ui/core'

export default function Copyright() {
    return (
        <Typography variant="body2" color="textSecondary" align="center">
            {'Copyright © '}
            <Link color="inherit" href="#">
                Bloodbank
        </Link>{' '}
            {new Date().getFullYear()}
            {'.'}
        </Typography>
    );
}