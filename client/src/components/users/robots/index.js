import React from 'react';

// import CardSection from './cardSection';

// import UserTable from './userTable/table';

import UserRobotsTable from './userRobotsDatagrid';

import './style.css';

const UserRobotsPanel = () => {

    return (

        <div className="userPanel">

            <p className="text-white pe-4 text-nowrap">ربات ها</p>

            <UserRobotsTable />

        </div>

    );

}



export default UserRobotsPanel;

