import React from 'react';
import CardSection from './cardSection';
// import UserTable from './userTable/table';
import OrdersDatagrid from './ordersDatagrid';

const Orders = () => {
    return (
        <div className="">
            <p className="text-white pe-4">سفارش‌های باز</p>
            {/* <CardSection /> */}
            <OrdersDatagrid />
        </div>
    );
}

export default Orders;