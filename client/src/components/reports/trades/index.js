import React from 'react';
import CardSection from './cardSectionTrade';
import ReportsTradesData from './reportsTradeData';

const ReportsTrades = () => {
    return (
        <div className="">
            <p className="text-white pe-4">گزارش ها / معاملات  </p>
            <CardSection />
            <ReportsTradesData />
        </div>
    );
}

export default ReportsTrades;
