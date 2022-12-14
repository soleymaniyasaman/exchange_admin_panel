import { Button, Container } from '@material-ui/core';
import { notification, Switch } from 'antd';
import axios from 'axios';
import { Field, Formik } from 'formik';
import React, { useContext, useEffect, useState } from 'react';
import { Col, Row } from 'react-bootstrap';
import { Link, useHistory, useParams } from 'react-router-dom';
import { UserContext } from '../../context/provider';
import ConfigApi from '../../utils/config-api';
import { useFetchApi } from '../../utils/hooks';
import AddNetwork from './add-network';
import './marketSetting.scss'
import { BASE_CONFIG_URL , EXCHANGE_CONFIG , CONFIG_COIN} from '../../utils/constants';

const MarketSettingDetail = () => {

    const { id } = useParams();

    const [cryptoItem, setCryptoItem] = useState();

    const [activeCheck, setActiveCheck] = useState(false);

    const [showCheck, setShowCheck] = useState(false);

    const [addNetwork, setAddNetwork] = useState(false);

    const cryptoContext = useContext(UserContext);

    const history = useHistory()

    let networkList = [1];

    const openNotification = describe => {

        notification.success({
    
            message: `پیغام ثبت تغییرات `,
    
            description: describe,
    
            placement: "bottomRight",
    
            className: "bg-success",
    
            style: { zIndex: '50000' }
    
    
    
        });
    
        notification.config({
    
            rtl: false
    
        })
    
    };
    const handleSettingApprove = (values) => {
        const configUrl = `${BASE_CONFIG_URL}${EXCHANGE_CONFIG}${CONFIG_COIN(id?.toLowerCase())}`
        // let config = {
        //     headers: {
        //         'Referrer-Policy': 'strict-origin-when-cross-origin',
        //     }
        //   }
              
        let payload = {
                is_active: activeCheck,
                is_show: showCheck,
                icon:values.icon,
                symbol: values.symbol,
                title: values.title,
                title_en: values.title_en,
                minimum_price_usdt: values.minimum_price_usdt,
                minimum_price_irr: values.minimum_price_irr,
                decimals: values.decimals,
                networks: values.networks
                }
            axios.put(configUrl,payload)
            .then(resp => console.log("resp",resp))
            .finally(() => {
                openNotification('تغییرات با موفقیت ثبت شد')
                history.push('/marketsetting')
            })
        }
    

    useEffect(() => {
        if (id) {
            cryptoContext.configData?.map(item => item.Value.symbol === id && setCryptoItem(item))
        }
    }, [id, cryptoContext.configData]);
    useEffect(() => {
        if (cryptoItem?.Value?.is_active) {
            setActiveCheck(true)
        }
        if (cryptoItem?.Value?.is_show) {
            setShowCheck(true)
        }
    }, [cryptoItem]);
    return (

        <div className="cryptoSetting">

            <ConfigApi />

            {console.log("id", cryptoItem)}
            <p className="text-white pe-4">جزییات بازار {cryptoItem?.Value.title}</p>

            <div className="content">

                <div className=" d-flex align-items-center justify-content-between w-auto mx-auto pt-2">

                    <div className="d-flex">

                        <img src="/assets/drawer/Polygon.svg" />

                        <p className="font_title_name me-1" style={{ minWidth: "150px" }}>{cryptoItem?.Value.title} </p>

                    </div>

                    <Link className="text-decoration-none ms-3" style={{ color: "#10D078" }} to={'/marketsetting'} >بازگشت به لیست ارزها {`->`} </Link>

                </div>


                <Container className="w-100 py-3">

                    <Formik
                        initialValues={{
                            icon: cryptoItem?.Value.icon,
                            symbol: cryptoItem?.Value.symbol,
                            title: cryptoItem?.Value.title,
                            title_en: cryptoItem?.Value.title_en,
                            minimum_price_usdt: cryptoItem?.Value.minimum_price_usdt,
                            minimum_price_irr: cryptoItem?.Value.minimum_price_irr,
                            decimals: cryptoItem?.Value.decimals,
                            networks: cryptoItem?.Value?.networks?.map((im, ix) => ({ slug: `${im.slug}`, title: `${im.title}`,fee: `${im.fee}` , minimum_withdraw: `${im.minimum_withdraw}`, withdraw_requirements: im.withdraw_requirements?.map(it => `${it}`), deposit_requirements: im.deposit_requirements?.map(it => `${it}`) })),
                        }}
                        isInitialValid={false}
                        enableReinitialize={true}
                    >

                        {props => (
                            <Container>
                                <form onSubmit={props.handleSubmit}>

                                    <div className="form-group row">
                                        <Col sm={6}>
                                            <Row>
                                                <Col sm={3}>
                                                    <label className='text-white'>وضعیت</label>
                                                </Col>
                                                <Col sm={9}>
                                                    <Switch name="active" checked={activeCheck} onChange={() => { setActiveCheck(!activeCheck) }} checkedChildren="فعال" unCheckedChildren="غیر‌فعال" />
                                                </Col>
                                            </Row>
                                        </Col>
                                        <Col sm={6}>
                                            <Row>
                                                <Col sm={3}>
                                                    <label className='text-white'>نمایش</label>
                                                </Col>
                                                <Col sm={9}>
                                                    <Switch name="show" checked={showCheck} onChange={() => { setShowCheck(!showCheck) }} checkedChildren="فعال" unCheckedChildren="غیر‌فعال" />
                                                </Col>
                                            </Row>
                                        </Col>
                                    </div>
                                    <div className='form-group row mt-5'>
                                        <Col sm={6}>
                                            <Row className='align-items-center'>
                                                <Col sm={3}>
                                                    <label className='text-white'>آپلود آیکون</label>
                                                </Col>
                                                <Col sm={9}>
                                                    <Field
                                                        name="icon"
                                                        className="form-control text-center"
                                                    />
                                                </Col>
                                            </Row>
                                        </Col>
                                        <Col sm={6}>
                                            <Row className='align-items-center'>
                                                <Col sm={3}>
                                                    <label className='text-white'>نماد ارز</label>
                                                </Col>
                                                <Col sm={9}>
                                                    <Field
                                                        name="symbol"
                                                        className="form-control text-center bg-secondary"
                                                        disabled
                                                    />
                                                </Col>
                                            </Row>
                                        </Col>
                                    </div>
                                    <div className='form-group row mt-5'>
                                        <Col sm={6}>
                                            <Row className='align-items-center'>
                                                <Col sm={3}>
                                                    <label className='text-white'>نام ارز (فارسی)</label>
                                                </Col>
                                                <Col sm={9}>
                                                    <Field
                                                        name="title"
                                                        className="form-control text-center"
                                                    />
                                                </Col>
                                            </Row>
                                        </Col>
                                        <Col sm={6}>
                                            <Row className='align-items-center'>
                                                <Col sm={3}>
                                                    <label className='text-white'>نام ارز (انگلیسی)</label>
                                                </Col>
                                                <Col sm={9}>
                                                    <Field
                                                        name="title_en"
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
                                                    <label className='text-white'>حداقل معامله (USDT)</label>
                                                </Col>
                                                <Col sm={9}>
                                                    <Field
                                                        name="minimum_price_usdt"
                                                        className="form-control text-center"
                                                    />
                                                </Col>
                                            </Row>
                                        </Col>
                                        <Col sm={6}>
                                            <Row className='align-items-center'>
                                                <Col sm={3}>
                                                    <label className='text-white'>حداقل معامله (IRT)</label>
                                                </Col>
                                                <Col sm={9}>
                                                    <Field
                                                        name="minimum_price_irr"
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
                                                    <label className='text-white'>نمایش اعشار</label>
                                                </Col>
                                                <Col sm={9}>
                                                    <Field
                                                        name="decimals"
                                                        className="form-control text-center"
                                                    />
                                                </Col>
                                            </Row>
                                        </Col>
                                        <Col sm={6}>

                                        </Col>
                                    </div>
                                    <div className=" d-flex align-items-center justify-content-between w-auto mx-auto mt-5">

                                        <div className="d-flex">

                                            <img src="/assets/drawer/Polygon.svg" />

                                            <p className="font_title_name me-1" style={{ minWidth: "150px" }}>شبکه های انتقال</p>

                                        </div>
                                        <button className="verifyButton text-decoration-none mb-2" onClick={() => id?cryptoItem?.Value.networks.push(Math.random()) : networkList.push(Math.random())} style={{ color: "#10D078" }}><img alt="" src='/assets/drawer/active/Group1841.svg' className='p-2 w-25' />افزودن شبکه</button>
                                    </div>
                                    {id? 
                                    cryptoItem?.Value.networks.map((item, index) =>
                                        <AddNetwork props={props} item={item} index={index} symbol={cryptoItem?.Value.symbol} />
                                    ):
                                    networkList?.map((itm, inx) =>
                                        <AddNetwork props={props} index={inx} symbol={cryptoItem?.Value.symbol} />
                                    )
                                    }
                                    <div className="d-flex justify-content-end mt-3 ps-5 py-5">
                                        <Button
                                            style={{ backgroundColor: '#B4B1B1' }}
                                            className="me-2 text-white"
                                            variant="contained"
                                            id="authentication-button2"
                                            onClick={() => {
                                                // setUserState("rejected")
                                                // setModalOpen(true)
                                            }}
                                        // disabled={userDetail?.approve_state === "rejected"}
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
                                                handleSettingApprove(props.values)
                                                console.log("====>", props.values)
                                            }}
                                        // disabled={userDetail?.approve_state === "approved"}
                                        >
                                            ثبت تغییرات
                                        </Button>
                                    </div>
                                </form>
                            </Container>
                        )}


                    </Formik>

                </Container>

            </div>

        </div>
    );
}

export default MarketSettingDetail;
