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
            <Link className="position-absolute d-flex text-decoration-none start-0 top-0 m-3 ms-5" style={{ color: "#10D078" }} to={'/users/robots'} >بازگشت به لیست کاربران {`->`} </Link>

            <div className="row container-fluid col-12 mx-auto">
              <div className="row mt-4 col-12 p-0">
                <div className="col-6 d-flex ">
                  <p className="col-2 font_title_name">نام ربات</p>
                  <div className="col-9">
                    <Field
                      value={`${userDetail?.credentials?.first_name} ${userDetail?.credentials?.last_name}`}
                      type="text"
                      name="email"
                      placeholder="نام ربات"
                      className="form-control bg_input input_text"
                      disabled
                    />
                  </div>
                </div>
                {/* <div className="col-6 d-flex ">
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
                </div> */}
                <div className="col-6 d-flex ">
                  <p className="col-2 font_title_name">شماره موبایل</p>
                  <div className="col-9">
                    <Field
                      value={userDetail?.mobile}
                      type="text"
                      name="email"
                      placeholder="شماره موبایل ربات"
                      className="form-control bg_input input_text"
                      disabled
                    />
                  </div>
                </div>
              </div>
              <div className="row mt-4 col-12 p-0">
                <div className="col-6 d-flex ">
                  <p className="col-2 font_title_name">رمزعبور</p>
                  <div className="col-9 d-flex">
                    <div className="col-8">
                      <Field
                        // value={userDetail?.mobile}
                        type="password"
                        name="pass"
                        placeholder="رمزعبور ربات"
                        className="form-control bg_input input_text"
                        disabled
                      />
                    </div>
                    <div className="col-4 me-1">
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
                        ایجاد رمزعبور
                      </Button>

                    </div>
                  </div>
                </div>
              </div>
              <div className="d-flex justify-content-end mt-3 ps-5 py-5">
                {/* <Button className=""
                  id="save-button"
                  variant="contained"
                  color="secondary"
                  onClick={() => {

                  }}
                  disabled
                >
                  لغو
                </Button> */}
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
                  تایید و ثبت
                </Button>
              </div>
            </div>
          </form>)}
      </Formik>
    </div>
  );
}

export default withRouter(Form);
