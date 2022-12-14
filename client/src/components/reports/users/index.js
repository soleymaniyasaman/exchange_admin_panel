import React from 'react';
import CardSection from '../../users/users/cardSection';
import ReportsUsersData from './reportsUsersData';

const ReportsUsers = () => {
    return (
        <div className="">
            <p className="text-white pe-4">گزارش ها / کاربران </p>
            <CardSection />
            <ReportsUsersData />
        </div>
    );
}

export default ReportsUsers;
