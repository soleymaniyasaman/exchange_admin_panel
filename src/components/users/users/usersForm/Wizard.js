import React from 'react';
import { UserContext } from '../../../../context/provider';
import { Button } from "@material-ui/core"
import { Formik } from "formik";
import PopUp from '../../../popUp';
import { Link, withRouter } from "react-router-dom";
import PropTypes from "prop-types";
// import { Prompt } from 'react-router';

class Wizard extends React.Component {
    static Page = ({ children, parentState }) => {
        if (children) {
            return children(parentState);
        } return null
    };
    static propTypes = {
        match: PropTypes.object.isRequired,
        location: PropTypes.object.isRequired,
        history: PropTypes.object.isRequired
    };
    static contextType = UserContext;

    constructor(props) {
        super(props);
        this.state = {
            page: 0,
            values: props.initialValues,
            // toggle: false,
            blocked: false,
            save: false,
            isAuth: false
            // upload: false
        };
    }

    history = this.props;
    validate = values => {
        const activePage = React.Children.toArray(this.props.children)[
            this.state.page
        ];
        return activePage.props.validate ? activePage.props.validate(values) : {};
    };


    handleSubmit = (values) => {
        // console.log(values);
        const { onSubmit } = this.props;
        if (this.state.save) {
            return (
                onSubmit({ values: values, save: this.state.save }),
                this.setState({ save: false })
            )
        }
        if (this.state.isAuth) {
            return (
                onSubmit({ values: values, isAuth: this.state.isAuth }),
                this.setState({ isAuth: false })
            )
        }
    };


    render() {
        const { children } = this.props;
        const { page, values } = this.state;
        const activePage = React.Children.toArray(children)[page];
        var data = this.context;


        return (
            <Formik
                initialValues={values}
                enableReinitialize={true}
                validate={this.validate}
                onSubmit={this.handleSubmit}
            >
                {props => (
                    <form onSubmit={props.handleSubmit}>
                        <Link className="position-absolute d-flex text-decoration-none start-0 top-0 m-3 ms-5" style={{ color: "#10D078" }} to={'/users/users'} >بازگشت به لیست کاربران {`->`} </Link>
                        {/* <a to="">بازگشت به لیست کاربران</a> */}
                        {React.cloneElement(activePage, { parentState: { ...props } })}

                        {/* <React.Fragment >
                                <button className="one border-0 pr-2 fixed-bottom"     //upload button
                                    id="first-button"
                                    type="button"
                                    onClick={() => {
                                        props.setFieldValue('isSaveButton', false)
                                        this.setState({ blocked: true })
                                        data.setShowAlert(true)
                                    }}
                                >
                                    <i className="fa fa-upload pr-0"></i>
                                </Button>
                                <button className="three border-0 fixed-bottom pr-2"        //save button
                                    type="button"
                                    id="second-button"
                                    onClick={() => {
                                        props.setFieldValue('isSaveButton', true)
                                        this.setState({ blocked: false })
                                        data.setShowAlert(true)
                                    }}
                                >
                                    <i className="fa fa-save"></i>
                                </button>
                            </React.Fragment> */}

                        {this.state.blocked ?
                            <PopUp                                //upload button alert
                                popUpHead={"تایید احراز هویت"}
                                popUpBody={
                                    "آیا از تایید احراز هویت مطمئن هستید؟"
                                }
                                onCancel={() => data.setShowAlert(false)}
                                onCancelText={'لغو'}
                                onAccept={() => {
                                    return (
                                        data.setShowAlert(false),
                                        this.setState({ isAuth: true }),
                                        props.setFieldValue('isAuthentication', true),
                                        props.submitForm(this.handleSubmit)

                                    )
                                }
                                }
                                onAcceptText={'انجام'}
                            /> :
                            <PopUp                                 //save button alert
                                popUpHead={"تایید ویرایش اطلاعات"}
                                popUpBody={
                                    "آیا از تایید اطلاعات کاربر مطمئن هستید؟"
                                }
                                onCancel={() => data.setShowAlert(false)}
                                onCancelText={'مطمئن نیستم'}
                                onAccept={() => {
                                    return (
                                        data.setShowAlert(false),
                                        this.setState({ save: true }),
                                        props.submitForm(this.handleSubmit)
                                    )
                                }
                                }
                                onAcceptText={'بله'}
                            />
                        }
                    </form>
                )}
            </Formik>

        );
    }
}
Wizard.contextType = UserContext;

export default withRouter(Wizard);