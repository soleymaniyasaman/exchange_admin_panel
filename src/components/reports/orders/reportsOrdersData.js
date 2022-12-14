import React from 'react';
import FiltersArea from './filtersArea';
import FiltersBars from './filtersBars';
import FiltersProgress from './filtersProgress';
// import ActiveUsers from './activeUsers';
// import AuthenticationChart from './authenticationChart';
import NumOfOrders from './numOfOrders';
import OrderBarChart from './orderBarChart';
import OrderDonutChart from './orderDonutChart';
import OrderProgressDonutChart from './orderProgressDonutChart';
// import SignUpUsers from './signUpUsers';
import '../layout/style.scss';
import { useFetchApi } from '../../../utils/hooks';
import { UrlQuery } from '../../../utils/utils';
import { TRADING_APP, REPORTS_ORDER } from '../../../utils/constants';


const ReportsOrdersData = () => {
  const [params, setParams] = React.useState({ order: "-updated_at", status__in: "in_progress", size: 10, page: 0 });
  const [{ data, isLoading, hasError }, doFetch] = useFetchApi(undefined, []);

  React.useEffect(() => {
    doFetch("GET", TRADING_APP, UrlQuery(REPORTS_ORDER, { ...params }))
  }, [params])

  console.log("data", data);
  return (
    <div className='reportsContent'>
      <div className='d-flex justify-content-between'>

        <div className="content w-100">

          <div className=" d-flex align-items-center justify-content-between w-auto mx-auto pt-2">

            <div className="d-flex text-nowrap">

              <img src="/assets/drawer/Polygon.svg" />

              <p className="font_title_name me-1" style={{ minWidth: "150px" }}>تعداد سفارش ها بر اساس زمان</p>

            </div>

          </div>

          <FiltersArea params={params} setParams={setParams} />

          <NumOfOrders data={data} />

        </div>

      </div>

      <div className='d-flex justify-content-between mt-3'>

        <div className="content w-auto">

          <div className=" d-flex align-items-center justify-content-between w-auto mx-auto pt-2">

            <div className="d-flex">

              <img src="/assets/drawer/Polygon.svg" />

              <p className="font_title_name me-1" style={{ minWidth: "150px" }}>تعداد سفارش های موفق، باز و لغو شده</p>

            </div>

          </div>

          <FiltersBars params={params} setParams={setParams} />

          <OrderBarChart data={data} />

        </div>

        <div className="content w-auto">

          <div className=" align-items-start d-flex flex-column mx-auto pt-2 w-auto">

            <div className="d-flex">

              <img src="/assets/drawer/Polygon.svg" />

              <p className="font_title_name me-1" style={{ minWidth: "150px" }}>درصد سفارش های موفق، باز و لغو شده</p>

            </div>

            {/* <Filters params={params} setParams={setParams} /> */}
            <OrderDonutChart data={data} />

          </div>

        </div>

      </div>
      <div className='d-flex justify-content-between mt-3'>

        <div className="content w-50 ms-2">

          <div className=" d-flex align-items-center justify-content-between w-auto mx-auto pt-2">

            <div className="d-flex">

              {/* <img src="/assets/drawer/Polygon.svg" />

              <p className="font_title_name me-1" style={{ minWidth: "150px" }}>تعداد سفارش های موفق، باز و لغو شده</p> */}

            </div>

          </div>

          {/* <FiltersBars params={params} setParams={setParams} /> */}

          {/* <OrderBarChart /> */}

        </div>

        <div className="content w-50 me-2">

          <div className=" align-items-start d-flex flex-column mx-auto pt-2 w-auto">

            <div className="d-flex">

              <img src="/assets/drawer/Polygon.svg" />

              <p className="font_title_name me-1" style={{ minWidth: "150px" }}>درصد سفارش ها بر اساس نوع ارز</p>

            </div>

            <FiltersProgress params={params} setParams={setParams} />

            <OrderProgressDonutChart data={data} />

          </div>

        </div>

      </div>

    </div>
  );
}

export default ReportsOrdersData;
