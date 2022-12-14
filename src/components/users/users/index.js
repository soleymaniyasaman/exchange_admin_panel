import React from 'react';

import CardSection from './cardSection';

// import UserTable from './userTable/table';

import UserTable from './userDatagrid';

import './style.css';

const UserPanel = () => {

    return (

        <div className="userPanel">

            <p className="text-white pe-4">کاربران</p>

            <CardSection />

            <UserTable />

        </div>

    );

}



export default UserPanel;

