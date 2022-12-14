import React from 'react';
import CardSection from '../cardSection';
// import UserTable from './userTable/table';
import OrdersHistoryDatagrid from './ordersHistoryDatagrid';

const OrdersHistory = () => {
    return (
        <div className="">
            <p className="text-white pe-4">تاریخچه سفارش‌ها</p>
            {/* <CardSection /> */}
            <OrdersHistoryDatagrid />
        </div>
    );
}

export default OrdersHistory;