import React from 'react';
import { Container } from '@material-ui/core';
import Header from '../sharedComponents/header'
import BasicTable from '../sharedComponents/basicTable'
import { useHistory } from "react-router-dom";

const User = (props) => {

    const browserHistory = useHistory();
    return (
        <div>
            <Header />
            <Container component="main" maxWidth="lg">
                <BasicTable history={browserHistory} />
            </Container>
        </div>
    );
}
export default User
