import React, { useState, useReducer } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux';
import '../../index.css'
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
import LockOutlinedIcon from '@material-ui/icons/LockOutlined'
import { makeStyles } from '@material-ui/core/styles';
import Copyright from '../sharedComponents/copyright'
import AlertMessage from "../sharedComponents/alert";
import { LoginAction } from '../../actions/loginAction';
import { Success, Danger, Info } from "../sharedComponents/iconType";


const useStyles = makeStyles((theme) => ({
    paper: {
        marginTop: theme.spacing(8),
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
    },
    avatar: {
        margin: theme.spacing(1),
        backgroundColor: theme.palette.secondary.main,
    },
    form: {
        width: '100%', // Fix IE 11 issue.
        marginTop: theme.spacing(1),
        outlineColor: 'black'
    },
    submit: {
        margin: theme.spacing(3, 0, 2),
        border: '2px solid black',
        backgroundColor: 'white',
        color: 'black',
        fontSize: '17px'
    },
    error: {
        fontSize: '15px',
        color: 'red',
    }
}));


function Login(props) {
    console.log('props', props)
    // const [state, dispatch] = useReducer(LoginAction)
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [emailError, setEmailError] = useState({})
    const [passwordError, setPasswordError] = useState({})
    const [alertType, setAlertType] = useState('')
    const [iconType, seticonType] = useState('')
    const [message, setmessage] = useState('')
    console.log('history', props)

    const loginUser = async (event) => {
        event.preventDefault();
        const isValid = await validateInput()
        if (isValid === true) {
            let formData = { email: email, password: password }
            console.log(`${JSON.stringify(formData)}`)
            props.LoginAction(formData, response => {
                console.log('response', response)
                if (response) {
                    if (response.error === false) {
                        seticonType(Success)
                        setmessage(response.message)
                        setAlertType('success')
                        setTimeout(() => setmessage(''), 3000);
                        window.location.assign('/Users')
                    }
                    else {
                        seticonType(Info)
                        setmessage(response.message)
                        setAlertType('info')
                        setTimeout(() => setmessage(''), 3000);
                    }
                }
                else {
                    seticonType(Danger)
                    setmessage('Something went wrong')
                    setAlertType('danger')
                    setTimeout(() => setmessage(''), 3000);
                }
            })
        }
        else {
            seticonType(Info)
            setmessage('Unable to validate user')
            setAlertType('info')
            setTimeout(() => setmessage(''), 3000);
        }
    }

    const validateInput = async () => {
        let isValid = true;
        const emailError = {}
        const passwordError = {}

        if (email === '') {
            emailError.empty = 'Email is empty';
            isValid = false
        }
        if (!email.includes('@')) {
            emailError.valid = 'Not a valid email'
            isValid = false
        }
        if (password === '') {
            passwordError.empty = 'Password is empty'
            isValid = false
        }
        setPasswordError(passwordError)
        setEmailError(emailError)
        return isValid;

    }

    const classes = useStyles();
    return (
        <Container component="main" maxWidth="xs">
            {message && <AlertMessage alertType={alertType} message={message} iconType={iconType} />}
            <CssBaseline />
            <div className={classes.paper}>
                <Avatar className={classes.avatar}>
                    <LockOutlinedIcon />
                </Avatar>
                <Typography component="h1" variant="h5">
                    Sign in
          </Typography>
                <form className={classes.form} validate>
                    <TextField
                        variant="outlined"
                        margin="normal"
                        required
                        fullWidth
                        id="email"
                        label="Email Address"
                        name="email"
                        autoComplete="email"
                        autoFocus
                        value={email}
                        onChange={(e) => { setEmail(e.target.value) }}
                    />
                    {Object.keys(emailError).map((key) => {
                        return key && key ? <Typography component="h6" variant="h6" className={classes.error}>
                            {emailError[key]}
                        </Typography> : null
                    })}
                    <TextField
                        variant="outlined"
                        margin="normal"
                        required
                        fullWidth
                        name="password"
                        label="Password"
                        type="password"
                        id="password"
                        autoComplete="current-password"
                        value={password}
                        onChange={(e) => { setPassword(e.target.value) }}
                    />
                    {Object.keys(passwordError).map((key) => {
                        return key && key ? <Typography component="h6" variant="h6" className={classes.error}>
                            {passwordError[key]}
                        </Typography> : null

                    })}
                    <Button
                        type="submit"
                        fullWidth
                        variant="contained"
                        className={classes.submit}
                        onClick={loginUser}>
                        Sign In
                     </Button>
                    <Grid container>
                        <Grid item xs>
                            <Link href="#" variant="body2">
                                Forgot password?
                     </Link>
                        </Grid>
                        <Grid item>
                            <Link href="#" variant="body2">
                                {"Don't have an account? Sign Up"}
                            </Link>
                        </Grid>
                    </Grid>
                </form>
            </div>
            <Box mt={8}>
                <Copyright />
            </Box>
        </Container>
    )
}

const mapStateToProps = (state) => {
    const { currentUser } = state.loginReducer;
    return {
        currentUser
    }
}

const mapDispatchToProps = dispatch => bindActionCreators({ LoginAction }, dispatch);


export default connect(mapStateToProps, mapDispatchToProps)(Login)

