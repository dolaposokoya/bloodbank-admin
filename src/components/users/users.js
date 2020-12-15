import React from 'react';
import { Container } from '@material-ui/core';
import Header from '../sharedComponents/header'
import BasicTable from '../sharedComponents/basicTable'

const User = (props) => {

    return (
        <div>
            <Header />
            <Container component="main" maxWidth="lg">
                <BasicTable />
            </Container>
        </div>
    );
}
export default User
