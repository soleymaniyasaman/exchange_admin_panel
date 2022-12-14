import React from 'react';
import FiltersArea from './filtersArea';
import FiltersBars from './filtersBars';
import FiltersProgress from './filtersProgress';
// import ActiveUsers from './activeUsers';
// import AuthenticationChart from './authenticationChart';
import NumOfTrades from './numOfTrades';
import TradeBarChart from './tradeBarChart';
import TradeDonutChart from './tradeDonutChart';
import TradeProgressDonutChart from './tradeProgressDonutChart';
// import SignUpUsers from './signUpUsers';
import '../layout/style.scss';

const ReportsTradesData = () => {
    const [params, setParams] = React.useState({order: "-updated_at", status__in: "in_progress", size: 10, page: 0});

  return (
    <div className='reportsContent'>
      <div className='d-flex justify-content-between'>

        <div className="content w-100">

          <div className=" d-flex align-items-center justify-content-between w-auto mx-auto pt-2">

            <div className="d-flex text-nowrap">

              <img src="/assets/drawer/Polygon.svg" />

              <p className="font_title_name me-1" style={{ minWidth: "150px" }}>حجم معاملات بر اساس زمان</p>

            </div>

          </div>

            <FiltersArea params={params} setParams={setParams} />

          <NumOfTrades />

        </div>

      </div>

      <div className='d-flex justify-content-between mt-3'>

        <div className="content w-auto">

          <div className=" d-flex align-items-center justify-content-between w-auto mx-auto pt-2">

            <div className="d-flex">

              <img src="/assets/drawer/Polygon.svg" />

              <p className="font_title_name me-1" style={{ minWidth: "150px" }}>تعداد معاملات بر اساس زمان</p>

            </div>

          </div>

        <FiltersBars params={params} setParams={setParams} />

          <TradeBarChart />

        </div>

        <div className="content w-auto">

          <div className=" align-items-start d-flex flex-column mx-auto pt-2 w-auto">

            <div className="d-flex">

              <img src="/assets/drawer/Polygon.svg" />

              <p className="font_title_name me-1" style={{ minWidth: "150px" }}>درصد نوع بازار معملات</p>

            </div>

            {/* <Filters params={params} setParams={setParams} /> */}
            <TradeDonutChart />

          </div>

        </div>

      </div>

    </div>
  );
}

export default ReportsTradesData;
