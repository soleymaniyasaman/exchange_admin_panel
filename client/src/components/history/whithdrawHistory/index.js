import React from 'react';
import { Nav, Tab } from 'react-bootstrap';
import { UserContext } from '../../../context/provider';
import CardSection from '../cardSection';
import WithdrawsCoinHistoryDatagrid from './withdrawsCoinHistoryDatagrid';
// import UserTable from './userTable/table';
// import WithdrawsHistoryDatagrid from './withdrawsCoinHistoryDatagrid';
import WithdrawsRialHistoryDatagrid from './withdrawsRialHistoryDatagrid';

const WithdrawHistory = () => {

    const contextData = React.useContext(UserContext);

    return (

        <div className="">

            <p className="text-white pe-4">تاریخچه برداشت‌ها</p>

            {/* <CardSection /> */}

            <div className="d-flex position-relative">

                <Tab.Container id="left-tabs-example" defaultActiveKey="rial">

                    <Nav variant="pills" >

                        <Nav.Item>

                            <Nav.Link role="button" eventKey="rial" onClick={() => contextData.setWithdrawFilter("irr")}>تومانی</Nav.Link>

                        </Nav.Item>

                        <Nav.Item>

                            <Nav.Link role="button" eventKey="coin" onClick={() => contextData.setWithdrawFilter("coin")}>رمز ارزها</Nav.Link>

                        </Nav.Item>

                    </Nav>

                    <Tab.Content className="mt-lg-3 mt-sm-0 mt-xl-0 w-100">

                        <Tab.Pane eventKey="rial">

                            <WithdrawsRialHistoryDatagrid />

                        </Tab.Pane>

                        <Tab.Pane eventKey="coin">

                            {/* <CoinDepositsHistoryDatagrid /> */}
                            <WithdrawsCoinHistoryDatagrid />

                        </Tab.Pane>

                    </Tab.Content>

                </Tab.Container>

            </div>


        </div>

    );

}

export default WithdrawHistory;