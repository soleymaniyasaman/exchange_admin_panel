import React from 'react';
import CardSection from '../cardSection';
// import UserTable from './userTable/table';
import HistoryAccountantDatagrid from './historyAccountantDatagrid';

const HistoryAccountant = () => {
    return (
        <div className="">
            <p className="text-white pe-4">تاریخچه تراکنش‌ها</p>
            {/* <CardSection /> */}
            <HistoryAccountantDatagrid />
        </div>
    );
}

export default HistoryAccountant;
