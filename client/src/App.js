import React from "react"

import { BrowserRouter, Redirect, Route, Switch } from 'react-router-dom';

import './App.css';

import {
  ROOT, LOGIN, USERS, USERS_DETAIL, ORDERS, HISTORY_ORDERS,

  HISTORY_TRADES, HISTORY_WITHDRAWS, HISTORY_DEPOSITS,

  ACCOUNTANT_RIAL, ACCOUNTANT_CRYPTO, ACCOUNTANT_HISTORY,

  USERS_DEPOSITS, COMMISSIONS, MESSAGES, MESSAGES_CREATE,

  TICKETS, TICKET_DETAIL, LEVEL_MANAGE, POINTS, POLICIES, HELP, ABOUT_US, MARKET_SETTING, MARKET_SETTING_DETAIL, MARKET_SETTING_CREATE, REPORTS_ORDERS, REPORTS_USERS, REPORTS_TRADES, ROBOTS, ADMINS, ADMINS_DETAIL, ADMINS_ADD, ROBOTS_DETAIL, ROBOTS_ADD, ROLE_MANAGE, ROLE_DETAIL, ROLE_ADD,

} from './utils/routerConstants';

import { UserContext } from "./context/provider";

import Layout from './components/layout';

import AlternateLayout from './components/layout/altLayout';

import Login from "./components/login";

import UserPanel from './components/users/users';

import UserDeposits from "./components/users/users/userDeposits";

import SelectedForm from './components/users/users/usersForm/selectedForm';

import AdminsSelectedForm from './components/users/admins/usersForm/selectedForm';

import Orders from "./components/orders";

import OrdersHistory from "./components/history/orderHistory";

import WithdrawsHistory from "./components/history/whithdrawHistory";

import TradesHistory from "./components/history/tradeHistory";

import DepositsHistory from "./components/history/depositHistory";

import HistoryAccountant from "./components/accountant/historyAccountant";

import RialAccountant from "./components/accountant/rialAccountant";

import CryptoAccountant from "./components/accountant/cryptoAccountant";

import Commissions from "./components/commissions";

import Messages from "./components/messages";

import NewMessage from "./components/messages/newMessage";

import Tickets from "./components/tickets";

import TicketDetail from "./components/tickets/ticketDetail";

import LevelManage from "./components/levelManage";

import Points from "./components/points";

import Policies from "./components/managemant/policies";

import Help from "./components/managemant/help";

import AboutUs from "./components/managemant/about_us";

import MarketSetting from "./components/market-setting";

import MarketSettingDetail from "./components/market-setting/MarketSettingDetail";

import ReportsUsers from "./components/reports/users";

import ReportsOrders from "./components/reports/orders";

import ReportsTrades from "./components/reports/trades";
import UserAdminPanel from "./components/users/admins";
import UserRobotsPanel from "./components/users/robots";
import RobotsSelectedForm from "./components/users/robots/usersForm/selectedForm";
import RoleManage from "./components/roleManage";
import RoleDetail from "./components/roleManage/roleDetail";
import RoleAdd from "./components/roleManage/roleAdd";





function App(props) {

  const { isLoggedIn } = React.useContext(UserContext);



  return (

    <BrowserRouter>

      <Switch>

        <Route path={[LOGIN]}>

          <AlternateLayout {...props}>

            <Switch>

              <Route path={LOGIN} exact component={Login} />

            </Switch>

          </AlternateLayout>

        </Route>

        <Route path={[

          ROOT, USERS, ADMINS, ROBOTS, USERS_DETAIL, ADMINS_DETAIL, ROBOTS_DETAIL, ORDERS, HISTORY_ORDERS, HISTORY_TRADES, HISTORY_DEPOSITS, HISTORY_WITHDRAWS,

          ACCOUNTANT_RIAL, ACCOUNTANT_CRYPTO, ACCOUNTANT_HISTORY, COMMISSIONS, MESSAGES, TICKETS, TICKET_DETAIL,

          LEVEL_MANAGE, POINTS, REPORTS_ORDERS, REPORTS_USERS, ADMINS_ADD, ROBOTS_ADD, ROLE_MANAGE, ROLE_DETAIL, ROLE_ADD

        ]}>

          {

            !isLoggedIn ? (

              <Redirect to="/login" />

            ) : (

              <Layout {...props}>

                <Switch>

                  <Route path={USERS} exact component={UserPanel} />

                  <Route path={ADMINS} exact component={UserAdminPanel} />

                  <Route path={ROBOTS} exact component={UserRobotsPanel} />

                  <Route path={USERS_DETAIL} exact component={SelectedForm} />

                  <Route path={ADMINS_DETAIL} exact component={AdminsSelectedForm} />

                  <Route path={ROBOTS_DETAIL} exact component={RobotsSelectedForm} />

                  <Route path={ADMINS_ADD} exact component={AdminsSelectedForm} />

                  <Route path={ROBOTS_ADD} exact component={RobotsSelectedForm} />

                  <Route path={USERS_DEPOSITS} exact component={UserDeposits} />

                  <Route path={ORDERS} exact component={Orders} />

                  <Route path={HISTORY_ORDERS} exact component={OrdersHistory} />

                  <Route path={HISTORY_TRADES} exact component={TradesHistory} />

                  <Route path={HISTORY_WITHDRAWS} exact component={WithdrawsHistory} />

                  <Route path={HISTORY_DEPOSITS} exact component={DepositsHistory} />

                  <Route path={REPORTS_USERS} exact component={ReportsUsers} />

                  <Route path={REPORTS_ORDERS} exact component={ReportsOrders} />

                  <Route path={REPORTS_TRADES} exact component={ReportsTrades} />

                  <Route path={ACCOUNTANT_RIAL} exact component={RialAccountant} />

                  <Route path={ACCOUNTANT_CRYPTO} exact component={CryptoAccountant} />

                  <Route path={ACCOUNTANT_HISTORY} exact component={HistoryAccountant} />

                  <Route path={COMMISSIONS} exact component={Commissions} />

                  <Route path={MESSAGES} exact component={Messages} />

                  <Route path={MESSAGES_CREATE} exact component={NewMessage} />

                  <Route path={TICKETS} exact component={Tickets} />

                  <Route path={TICKET_DETAIL} exact component={TicketDetail} />

                  <Route path={LEVEL_MANAGE} exact component={LevelManage} />

                  <Route path={MARKET_SETTING} exact component={MarketSetting} />

                  <Route path={MARKET_SETTING_DETAIL} exact component={MarketSettingDetail} />

                  <Route path={MARKET_SETTING_CREATE} exact component={MarketSettingDetail} />

                  <Route path={POINTS} exact component={Points} />

                  <Route path={ROLE_MANAGE} exact component={RoleManage} />

                  <Route path={ROLE_ADD} exact component={RoleAdd} />

                  <Route path={ROLE_DETAIL} exact component={RoleDetail} />

                  <Route path={POLICIES} exact component={Policies} />

                  <Route path={HELP} exact component={Help} />

                  <Route path={ABOUT_US} exact component={AboutUs} />

                  <Route path={ROOT} />

                </Switch>

              </Layout>

            )

          }

        </Route>

      </Switch>

    </BrowserRouter>

  );

}



export default App;

