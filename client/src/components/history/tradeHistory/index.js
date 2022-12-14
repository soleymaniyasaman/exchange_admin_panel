import React from 'react';
import CardSection from '../cardSection';
// import UserTable from './userTable/table';
import TradesHistoryDatagrid from './tradesHistoryDatagrid';

const TradesHistory = () => {
    return (
        <div className="">
            <p className="text-white pe-4">تاریخچه معاملات</p>
            {/* <CardSection /> */}
            <TradesHistoryDatagrid />
        </div>
    );
}

export default TradesHistory;