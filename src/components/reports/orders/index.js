import React from 'react';
import CardSection from './cardSectionOrder';
import ReportsOrdersData from './reportsOrdersData';

const ReportsOrders = () => {
    return (
        <div className="">
            <p className="text-white pe-4">گزارش ها / سفارش‌ها </p>
            <CardSection />
            <ReportsOrdersData />
        </div>
    );
}

export default ReportsOrders;
