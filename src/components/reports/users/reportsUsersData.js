import React from 'react';
import ActiveUsers from './activeUsers';
import AuthenticationChart from './authenticationChart';
import NumOfUsers from './numOfUsers';
import SignUpUsers from './signUpUsers';
import '../layout/style.scss';

const ReportsUsersData = () => {



  return (
    <div className='reportsContent'>
      <div className='d-flex justify-content-between'>

        <div className="content w-auto">

          <div className=" d-flex align-items-center justify-content-between w-auto mx-auto pt-2">

            <div className="d-flex">

              <img src="/assets/drawer/Polygon.svg" />

              <p className="font_title_name me-1" style={{ minWidth: "150px" }}>تعداد کل کاربران بر اساس زمان</p>

            </div>

            {/* <Filters params={params} setParams={setParams} /> */}

          </div>

          <NumOfUsers type='registration_dispersion' />

        </div>

        <div className="content w-auto">

          <div className=" align-items-start d-flex flex-column mx-auto pt-2 w-auto">

            <div className="d-flex">

              <img src="/assets/drawer/Polygon.svg" />

              <p className="font_title_name me-1" style={{ minWidth: "150px" }}>درصد احراز هویت کاربران</p>

            </div>

            {/* <Filters params={params} setParams={setParams} /> */}
            <AuthenticationChart type='approval_dispersion' />

          </div>

        </div>

      </div>

      <div className='d-flex justify-content-between mt-3'>

        <div className="content w-auto">

          <div className=" d-flex align-items-center justify-content-between w-auto mx-auto pt-2">

            <div className="d-flex">

              <img src="/assets/drawer/Polygon.svg" />

              <p className="font_title_name me-1" style={{ minWidth: "150px" }}>تعداد ثبت نام کاربر بر اساس زمان</p>

            </div>

            {/* <Filters params={params} setParams={setParams} /> */}

          </div>

          <SignUpUsers type='registration_dispersion' />

        </div>

        <div className="content w-auto">

          <div className=" align-items-start d-flex flex-column mx-auto pt-2 w-auto">

            <div className="d-flex">

              <img src="/assets/drawer/Polygon.svg" />

              <p className="font_title_name me-1" style={{ minWidth: "150px" }}>درصد احراز هویت کاربران</p>

            </div>

            {/* <Filters params={params} setParams={setParams} /> */}
            <ActiveUsers type='registration_dispersion' />

          </div>

        </div>

      </div>

    </div>
  );
}

export default ReportsUsersData;
