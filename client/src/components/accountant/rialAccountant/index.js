import React from 'react';
import CardSection from '../cardSection';
// import UserTable from './userTable/table';
import RialAccountantDatagrid from './rialAccountantDatagrid';

const RialAccountant = () => {
    return (
        <div className="">
            <p className="text-white pe-4">تایید برداشت ریال</p>
            {/* <CardSection /> */}
            <RialAccountantDatagrid />
        </div>
    );
}

export default RialAccountant;
