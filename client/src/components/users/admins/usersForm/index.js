import React, { useContext, useEffect } from "react";
import { UserContext } from '../../../../context/provider';
import { Field, Formik } from "formik";
import { Link, useLocation, useParams, withRouter } from "react-router-dom";
import './adminPanel_products_Form.scss'
// import { USERS_DETAIL } from "../../../../utils/routerConstants";
import { IAM_APP, USERS_DETAIL } from "../../../../utils/constants";
import { useFetchApi } from "../../../../utils/hooks";
import { Select } from "antd";
import { Button } from "@material-ui/core";

const { Option } = Select;

const required = (value) => (value ? undefined : "Required");

const Error = ({ name }) => (
  <Field
    name={name}
    render={({ form: { touched, errors } }) =>
      touched[name] && errors[name] ? <span>{errors[name]}</span> : null
    }
  />
);

const Form = ({ history }) => {
  function useQuery() {
    return new URLSearchParams(useLocation().search);
  }
  var index;
  var query = useQuery();
  index = query.get("id")
  const { id } = useParams();

  console.log(`query:${id}`);

  const dataContext = useContext(UserContext);
  const [{ data: userDetail, isLoading, hasError }, doFetch] = useFetchApi(undefined, {});

  useEffect(() => {
    if (id) {
      doFetch("GET", IAM_APP, USERS_DETAIL(id))
    }
  }, [])
  console.log("userDetail", userDetail);
  return (
    <div className="bodyForm_s-admin mx-auto">
      <div className=" d-flex align-items-center w-auto mx-auto me-5">
        <img src="/assets/drawer/Polygon.svg" />
        <p className="font_title_name me-1">ایمیل </p>
      </div>
      <Formik
        initialValues={{}}
        enableReinitialize={true}
      // validate={this.validate}
      // onSubmit={this.handleSubmit}
      >
        {props => (
          <form onSubmit={props.handleSubmit}>
            <Link className="position-absolute d-flex text-decoration-none start-0 top-0 m-3 ms-5" style={{ color: "#10D078" }} to={'/users/admins'} >بازگشت به لیست کاربران {`->`} </Link>

            <div className="row container-fluid col-12 mx-auto">
              <div className="row mt-4 col-12 p-0">
                <div className="col-6 d-flex ">
                  <p className="col-2 font_title_name">نام و نام خانوادگی</p>
                  <div className="col-9">
                    <Field
                      value={`${userDetail?.credentials?.first_name} ${userDetail?.credentials?.last_name}`}
                      type="text"
                      name="email"
                      placeholder="نام و نام خانوادگی کاربر"
                      className="form-control bg_input input_text"
                      disabled
                    />
                  </div>
                </div>
                <div className="col-6 d-flex ">
                  <p className="col-2 font_title_name">کدملی</p>
                  <div className="col-9">
                    <Field
                      value={userDetail?.credentials?.national_code}
                      type="text"
                      name="email"
                      placeholder="کدملی کاربر"
                      className="form-control bg_input input_text"
                      disabled
                    />
                  </div>
                </div>
              </div>
              <div className="row mt-4 col-12 p-0">
                <div className="col-6 d-flex ">
                  <p className="col-2 font_title_name">شماره موبایل</p>
                  <div className="col-9">
                    <Field
                      value={userDetail?.mobile}
                      type="text"
                      name="email"
                      placeholder="شماره موبایل کاربر"
                      className="form-control bg_input input_text"
                      disabled
                    />
                  </div>
                </div>
                <div className="col-6 d-flex ">
                  <p className="col-2 font_title_name">نقش ادمین</p>
                  <div className="col-9">
                    <Select
                      showSearch

                      defaultActiveFirstOption={true}

                      style={{ width: "-webkit-fill-available" }}

                      defaultValue="احرازهویت"

                      placeholder="جستجو نقش ادمین "

                      optionFilterProp="children"

                      filterOption={(input, option) =>

                        option.title.toLowerCase().indexOf(input.toLowerCase()) >= 0 || option.value.toLowerCase().indexOf(input.toLowerCase()) >= 0

                      }

                      filterSort={(optionA, optionB) =>

                        optionA.value.toLowerCase().localeCompare(optionB.value.toLowerCase())

                      }
                      onChange={(e) => console.log("e", e)}

                      dropdownClassName="text-right"
                    >

                      {["احرازهویت", "پشتیبانی", "سوپرادمین"].map((item, index) =>

                        <Option

                          title={item}

                          key={index}

                          value={item}

                        >

                          {item}

                        </Option>

                      )}

                    </Select>
                  </div>
                </div>
              </div>
              <div className="d-flex justify-content-end mt-3 ps-5 py-5">
                <Button className=""
                  id="save-button"
                  variant="contained"
                  color="secondary"
                  onClick={() => {

                  }}
                  disabled
                >
                  لغو
                </Button>
                <Button className="me-2"
                  variant="contained"
                  id="authentication-button"
                  color="primary"
                  onClick={() => {
                    // setUserState("approved")
                    // setModalOpen(true)
                  }}
                // disabled={userDetail?.approve_state === "approved"}
                >
                  ثبت تغییرات
                </Button>
              </div>
            </div>
          </form>)}
      </Formik>
    </div>
  );
}

export default withRouter(Form);
