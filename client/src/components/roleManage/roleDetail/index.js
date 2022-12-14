import { Button, Container } from '@material-ui/core';
import { Checkbox, notification, Switch } from 'antd';
import axios from 'axios';
import { Field, Formik } from 'formik';
import React, { useContext, useEffect, useState } from 'react';
import { Col, Row } from 'react-bootstrap';
import { Link, useHistory, useParams } from 'react-router-dom';
import { UserContext } from '../../../context/provider';
import ConfigApi from '../../../utils/config-api';
import { useFetchApi } from '../../../utils/hooks';
// import AddNetwork from './add-network';
// import './marketSetting.scss'
import { BASE_CONFIG_URL, EXCHANGE_CONFIG, CONFIG_COIN } from '../../../utils/constants';
import Filters from './filters';


const data = [
    {
        name: 'دسترسی یک',
        checked: true,
    },
    {
        name: 'دسترسی دو',
        checked: true,
    },
    {
        name: 'دسترسی سه',
        checked: false,

    },
    {
        name: 'دسترسی چهار',
        checked: true,

    },
    {
        name: 'دسترسی پنج',
        checked: true,

    },
    {
        name: 'دسترسی شش',
        checked: true,

    },
    {
        name: 'دسترسی هفت',
        checked: true,

    },
];
const RoleDetail = () => {

    const { id } = useParams();

    const [cryptoItem, setCryptoItem] = useState();

    const [activeCheck, setActiveCheck] = useState(false);

    const [showCheck, setShowCheck] = useState(false);

    const [addNetwork, setAddNetwork] = useState(false);

    const cryptoContext = useContext(UserContext);

    const history = useHistory()

    let networkList = [1];

    const [params, setParams] = React.useState({ size: 10, page: 1 })

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
            icon: values.icon,
            symbol: values.symbol,
            title: values.title,
            title_en: values.title_en,
            minimum_price_usdt: values.minimum_price_usdt,
            minimum_price_irr: values.minimum_price_irr,
            decimals: values.decimals,
            networks: values.networks
        }
        axios.put(configUrl, payload)
            .then(resp => console.log("resp", resp))
            .finally(() => {
                openNotification('تغییرات با موفقیت ثبت شد')
                history.push('/rolemanage')
            })
    }
    function onChange(checkedValues) {
        console.log('checked = ', checkedValues);
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

            {/* {console.log("id", cryptoItem)} */}
            <p className="text-white pe-4">ویرایش نقش</p>

            <div className="content">

                <div className=" d-flex align-items-center justify-content-between w-auto mx-auto pt-2">

                    <div className="d-flex">

                        <img src="/assets/drawer/Polygon.svg" />

                        <p className="font_title_name me-1" style={{ minWidth: "150px" }}>لیست دسترسی‌ها </p>

                    </div>

                    <Link className="text-decoration-none ms-3" style={{ color: "#10D078" }} to={'/rolemanage'} >بازگشت به لیست نقش‌ها {`->`} </Link>

                </div>

                <Filters params={params} setParams={setParams} />


                <Container className="w-100 py-3 bg-dark">
                    <Checkbox.Group style={{ width: '100%' }} onChange={onChange}>
                        <Row>
                            {data?.map(item =>
                                <Col span={8}>
                                    <Checkbox className="text-light" defaultChecked={item.checked} value={item.name}>{item.name}</Checkbox>
                                </Col>
                            )}
                        </Row>
                    </Checkbox.Group>
                </Container>

            </div>

        </div>
    );
}

export default RoleDetail;
