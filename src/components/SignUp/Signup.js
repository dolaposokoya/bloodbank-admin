import React from "react";
import { useAuth0 } from "@auth0/auth0-react";
import Google from "../search.png";

const Signup = () => {
    const { loginWithRedirect } = useAuth0();

    return (
        <Button
            type="submit"
            fullWidth
            variant="contained"
            className={classes.submit}
            onClick={() =>
                loginWithRedirect({ screen_hint: 'signup' })
            }>
            Sign In With Google
            <img src={Google} style={{
                width: '15px',
                height: '15px',
                margin: '0 5px',
                outline: 'none'
            }} />
        </Button>
    )
};

export default Signup;