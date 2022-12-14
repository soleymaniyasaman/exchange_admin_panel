import { Button, Container, IconButton, InputAdornment, TextField } from '@material-ui/core';
import { Checkbox, Grid, notification, Switch } from 'antd';
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
// import Filters from './filters';
import SearchIcon from "@material-ui/icons/Search";


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
const RoleAdd = () => {

    const { id } = useParams();
    const [roleName, setRoleName] = useState('');
    const [role, setRole] = useState('');
    const [cryptoItem, setCryptoItem] = useState();

    const [activeCheck, setActiveCheck] = useState(false);

    const [showCheck, setShowCheck] = useState(false);

    const [addNetwork, setAddNetwork] = useState(false);

    const cryptoContext = useContext(UserContext);

    const history = useHistory()

    let networkList = [1];

    const [params, setParams] = React.useState({ size: 10, page: 1 })
    const [children, setChildren] = useState([]);
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
        setChildren(checkedValues)
    }
    const handleChangeInput = (values) => { console.log("v", values) }

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

                    {/* <Link className="text-decoration-none ms-3" style={{ color: "#10D078" }} to={'/rolemanage'} >بازگشت به لیست نقش‌ها {`->`} </Link> */}
                </div>
                <Row className='m-auto w-100 my-4'>
                    <Col sm={6}>
                        <div className="d-flex w-100" style={{ maxHeight: "34px" }}>
                            <label className="text-end text-white d-flex align-items-center" style={{ minWidth: "90px" }} htmlFor="rial_buying_commission">نام نقش</label>
                            <input
                                type="text"
                                name="role_name"
                                placeholder="نام نقش جدید را بنویسید"
                                required
                                onChange={handleChangeInput}
                                className="form-control bg_input input_text"
                            />
                        </div>
                    </Col>
                </Row>

                {/* <Filters params={params} setParams={setParams} /> */}
                <div className="mb-3 pe-3 mt-1">
                    <div className="mt-2" >
                        <TextField
                            value={role}
                            type="search"
                            onChange={e => setRole(e.target.value)}
                            name="national_code"
                            // size="small"
                            className="w-100"
                            placeholder="جست و جو"
                            InputProps={{
                                endAdornment: (
                                    <InputAdornment>
                                        <IconButton onClick={() => setParams(state => ({ ...state, role: role }))}>
                                            <SearchIcon />
                                        </IconButton>
                                    </InputAdornment>
                                )
                            }}
                        />
                    </div>
                </div>
                <div className="d-flex">
                    {children?.map(item => <div className='border border-secondary m-2 px-2 py-1 rounded-pill font_style_selected_pc d-flex h-100' style={{ cursor: "pointer" }}><p className="m-0 p-0">{item}</p><div className='border border-secondary me-1 px-2 rounded-pill text-secondary'>x</div></div>)}
                    {console.log(children)}
                </div>
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

export default RoleAdd;
