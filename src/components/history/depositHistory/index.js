import React from 'react';

import { Nav, Tab } from 'react-bootstrap';
import { UserContext } from '../../../context/provider';

import CardSection from '../cardSection';

import CoinDepositsHistoryDatagrid from './coinDeposisHistoryDatagrid';

import RialDepositsHistoryDatagrid from './rialDepositsHistoryDatagrid';


const DepositHistory = () => {

    const contextData = React.useContext(UserContext);


    return (

        <div className="">

            <p className="text-white pe-4">تاریخچه واریزها</p>

            {/* <CardSection /> */}

            <div className="d-flex position-relative">

                <Tab.Container id="left-tabs-example" defaultActiveKey="rial">

                    <Nav variant="pills" >

                        <Nav.Item>

                            <Nav.Link role="button" eventKey="rial" onClick={() => contextData.setDepositFilter("irr")}>تومانی</Nav.Link>

                        </Nav.Item>

                        <Nav.Item>

                            <Nav.Link role="button" eventKey="coin" onClick={() => contextData.setDepositFilter("coin")}>رمز ارزها</Nav.Link>

                        </Nav.Item>

                    </Nav>

                    <Tab.Content className="mt-lg-3 mt-sm-0 mt-xl-0 w-100">

                        <Tab.Pane eventKey="rial">

                            <RialDepositsHistoryDatagrid />

                        </Tab.Pane>

                        <Tab.Pane eventKey="coin">

                            <CoinDepositsHistoryDatagrid />

                        </Tab.Pane>

                    </Tab.Content>

                </Tab.Container>

            </div>
            {/* <DepositsHistoryDatagrid /> */}
        </div>
    );
}

export default DepositHistory;