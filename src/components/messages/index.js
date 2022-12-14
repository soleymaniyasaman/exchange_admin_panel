import React from 'react';
import CardSection from './cardSection';
// import UserTable from './userTable/table';
import MessagesDatagrid from './messagesDatagrid';

const Messages = () => {
    return (
        <div className="">
            <p className="text-white pe-4">پیام‌ها</p>
            {/* <CardSection /> */}
            <MessagesDatagrid />
        </div>
    );
}

export default Messages;