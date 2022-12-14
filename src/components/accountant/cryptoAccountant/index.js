import React from 'react';
import CardSection from '../cardSection';
// import UserTable from './userTable/table';
import CryptoAccountantDatagrid from './cryptoAccountantDatagrid';

const CryptoAccountant = () => {
    return (
        <div className="">
            <p className="text-white pe-4">تایید برداشت ارز</p>
            {/* <CardSection /> */}
            <CryptoAccountantDatagrid />
        </div>
    );
}

export default CryptoAccountant;
