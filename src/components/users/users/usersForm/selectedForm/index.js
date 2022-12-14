import React, { useContext } from 'react';
import { UserContext } from '../../../../../context/provider';
import Form from '../index'
import './style.scss';

const SelectedForm = () => {
  const data = useContext(UserContext);

  return (
    <div className="formsContainer">
      <div className="margin_top">
        <div className="row container-fluid col-12 selectedForm">
          <div
            className={`d-flex align-items-center col button_selected ${data.selected === "userInfoForm" ? "isActive" : ""
              }`}
            onClick={() => data.setSelected("userInfoForm")}
          >
            <p className="my-auto pr-lg-2 font_style_selected pr-md-2 pr-sm-2">اطلاعات کاربری</p>
          </div>
          <div
            className={`d-flex align-items-center col button_selected ${data.selected === "wallet" ? "isActive" : ""
              }`}
            onClick={() => {
              return (
                data.setSelected("wallet")
              )
            }
            }
          >
            <p className="my-auto pr-lg-2 font_style_selected_pc pr-md-2 pr-sm-2">
              {" "}
              کیف پول
            </p>
          </div>
          <div
            className={`d-flex align-items-center col button_selected ${data.selected === "permit" ? "isActive" : ""
              }`}
            onClick={() => {
              return (
                data.setSelected("permit")
              )
            }
            }
          >
            <p className="my-auto font_style_selected pr-lg-2 pr-md-2 pr-sm-2"> درخواست برداشت</p>
          </div>
          <div
            className={`d-flex align-items-center col button_selected ${data.selected === "order" ? "isActive" : ""
              }`}
            onClick={() => data.setSelected("order")}
          >
            <p className="my-auto font_style_selected pr-lg-2 pr-md-2 pr-sm-2"> سفارش ها</p>
          </div>
          <div
            className={`d-flex align-items-center col button_selected ${data.selected === "treatHistory" ? "isActive" : ""
              }`}
            onClick={() => data.setSelected("treatHistory")}
          >
            <p className="my-auto font_style_selected pr-lg-2 pr-md-2 pr-sm-2"> تاریخچه معاملات</p>
          </div>
          <div
            className={`d-flex align-items-center col button_selected ${data.selected === "transAction" ? "isActive" : ""
              }`}
            onClick={() => data.setSelected("transAction")}
          >
            <p className="my-auto font_style_selected pr-lg-2 pr-md-2 pr-sm-2"> تاریخچه تراکنش ها</p>
          </div>
          <div
            className={`d-flex align-items-center col button_selected ${data.selected === "concession" ? "isActive" : ""
              }`}
            onClick={() => data.setSelected("concession")}
          >
            <p className=" my-auto font_style_selected pr-lg-2 pr-md-2 pr-sm-2"> امتیازها</p>
          </div>
          <div
            className={`d-flex align-items-center col button_selected ${data.selected === "loginHistory" ? "isActive" : ""
              }`}
            onClick={() => data.setSelected("loginHistory")}
          >
            <p className="my-auto font_style_selected pr-lg-2 pr-md-2 pr-sm-2"> تاریخچه ورود</p>
          </div>
        </div>
      </div>
      <Form infoFirst={data.selected} />
    </div>
  );
}

export default SelectedForm;
