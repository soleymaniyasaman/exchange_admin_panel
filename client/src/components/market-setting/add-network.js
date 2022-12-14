import { Field, Formik } from 'formik';
import React from 'react';
import { Col, Container, Row } from 'react-bootstrap';

const AddNetwork = ({ props, item, index, symbol }) => {
    return (
        <Container key={index && index} className='bg-dark p-3 mt-2'>
            <div className='form-group row mt-5'>
                <Col sm={6}>
                    <Row className='align-items-center'>
                        <Col sm={3}>
                            <label className='text-white'>شبکه</label>
                        </Col>
                        <Col sm={9}>
                            <Field
                                name={`networks[${index}].slug`}
                                className="form-control text-center"
                            />
                        </Col>
                    </Row>
                </Col>
                <Col sm={6}>
                    <Row className='align-items-center'>
                        <Col sm={3}>
                            <label className='text-white'>عنوان شبکه</label>
                        </Col>
                        <Col sm={9}>
                            <Field
                                name={`networks[${index}].title`}
                                className="form-control text-center"
                            />
                        </Col>
                    </Row>
                </Col>
            </div>
            <div className='form-group row mt-5'>
                <Col sm={6}>
                    <Row className='align-items-center'>
                        <Col sm={3}>
                            <label className='text-white'>حداقل برداشت ({symbol})</label>
                        </Col>
                        <Col sm={9}>
                            <Field
                                name={`networks[${index}].minimum_withdraw`}
                                className="form-control text-center"
                            />
                        </Col>
                    </Row>
                </Col>
                <Col sm={6}>
                    <Row className='align-items-center'>
                        <Col sm={3}>
                            <label className='text-white'>کارمزد برداشت ارز({symbol})</label>
                        </Col>
                        <Col sm={9}>
                            <Field
                                name={`networks[${index}].fee`}
                                className="form-control text-center"
                            />
                        </Col>
                    </Row>

                </Col>
            </div>
            <div className='form-group row mt-5'>
                <Col sm={6}>
                    <Row className='align-items-center'>
                        <Col sm={3}>
                            <label className='text-white'>نیازمندی‌های برداشت :</label>
                        </Col>
                        <Col sm={9}>
                            <div role="group" aria-labelledby="checkbox-group " className='d-flex justify-content-around'>
                                <label className='align-items-center d-flex text-white'>
                                    آدرس
                                    <input

                                        id="address"

                                        type="checkbox"

                                        value="address"

                                        name={`networks[${index}].withdraw_requirements`}

                                        onChange={props.handleChange}

                                        defaultChecked={item?.withdraw_requirements?.includes("address")}

                                        // onClick={() => setChange2faPopUp(true)}

                                        className={'ms-3 me-2 align-items-center d-flex box ' + (props.errors.emailPanel && props.touched.emailPanel ? ' is-invalid' : '')}

                                    />
                                </label>
                                <label className='align-items-center d-flex text-white'>
                                    تگ
                                    <input

                                        id="tag"

                                        type="checkbox"

                                        value="tag"

                                        name={`networks[${index}].withdraw_requirements`}

                                        onChange={props.handleChange}

                                        defaultChecked={item?.withdraw_requirements?.includes("tag")}

                                        // onClick={() => setChange2faPopUp(true)}

                                        className={'ms-3 me-2 align-items-center d-flex box ' + (props.errors.emailPanel && props.touched.emailPanel ? ' is-invalid' : '')}

                                    />
                                </label>
                                <label className='align-items-center d-flex text-white'>
                                    ممو
                                    <input

                                        id="memo"

                                        type="checkbox"

                                        value="memo"

                                        name={`networks[${index}].withdraw_requirements`}

                                        onChange={props.handleChange}

                                        defaultChecked={item?.withdraw_requirements?.includes("memo")}

                                        // onClick={() => setChange2faPopUp(true)}

                                        className={'ms-3 me-2 align-items-center d-flex box ' + (props.errors.emailPanel && props.touched.emailPanel ? ' is-invalid' : '')}

                                    />
                                </label>
                            </div>
                        </Col>
                    </Row>
                </Col>
                <Col sm={6}>
                    <Row className='align-items-center'>
                        <Col sm={3}>
                            <label className='text-white'>نیازمندی های واریز :</label>
                        </Col>
                        <Col sm={9}>
                            <div role="group" aria-labelledby="checkbox-group " className='d-flex justify-content-around'>
                                <label className='align-items-center d-flex text-white'>
                                    آدرس
                                    <input

                                        id="address"

                                        type="checkbox"

                                        value="address"

                                        name={`networks[${index}].deposit_requirements`}

                                        onChange={props.handleChange}

                                        defaultChecked={item?.deposit_requirements?.includes("address")}

                                        // onClick={() => setChange2faPopUp(true)}

                                        className={'ms-3 me-2 align-items-center d-flex box ' + (props.errors.emailPanel && props.touched.emailPanel ? ' is-invalid' : '')}

                                    />
                                </label>
                                <label className='align-items-center d-flex text-white'>
                                    تگ
                                    <input

                                        id="tag"

                                        type="checkbox"

                                        value="tag"

                                        name={`networks[${index}].deposit_requirements`}

                                        onChange={props.handleChange}

                                        defaultChecked={item?.deposit_requirements?.includes("tag")}

                                        // onClick={() => setChange2faPopUp(true)}

                                        className={'ms-3 me-2 align-items-center d-flex box ' + (props.errors.emailPanel && props.touched.emailPanel ? ' is-invalid' : '')}

                                    />
                                </label>
                                <label className='align-items-center d-flex text-white'>
                                    ممو
                                    <input

                                        id="memo"

                                        type="checkbox"

                                        value="memo"

                                        name={`networks[${index}].deposit_requirements`}

                                        onChange={props.handleChange}

                                        defaultChecked={item?.deposit_requirements?.includes("memo")}

                                        // onClick={() => setChange2faPopUp(true)}

                                        className={'ms-3 me-2 align-items-center d-flex box ' + (props.errors.emailPanel && props.touched.emailPanel ? ' is-invalid' : '')}

                                    />
                                </label>
                            </div>
                        </Col>
                    </Row>
                </Col>
            </div>
        </Container>
    );
}

export default AddNetwork;
