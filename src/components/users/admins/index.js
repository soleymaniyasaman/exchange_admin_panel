import React from 'react';

// import CardSection from './cardSection';

// import UserTable from './userTable/table';

import UserTable from './userDatagrid';

import './style.css';

const UserAdminPanel = () => {

    return (

        <div className="userPanel">

            <p className="text-white pe-4">ادمین ها</p>

            <UserTable />

        </div>

    );

}



export default UserAdminPanel;

