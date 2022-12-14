import React from 'react';
import CardSection from './cardSection';
// import UserTable from './userTable/table';
import TicketsDatagrid from './ticketsDatagrid';

const Tickets = () => {
    return (
        <div className="">
            <p className="text-white pe-4">پشتیبانی</p>
            {/* <CardSection /> */}
            <TicketsDatagrid />
        </div>
    );
}

export default Tickets;