import { Button, Container } from '@material-ui/core';
import React, { useContext } from 'react';
import { Col } from 'react-bootstrap';
import { useHistory } from 'react-router-dom';
import { UserContext } from '../../context/provider';
import ConfigApi from '../../utils/config-api';
import './marketSetting.scss'

const MarketSetting = () => {

    const cryptoContext = useContext(UserContext);

    const history = useHistory()

    return (

        <div className="content pb-5">

            <ConfigApi />

            <div className=" d-flex align-items-center justify-content-between w-auto mx-auto pt-2">

                <div className="d-flex">

                    <img src="/assets/drawer/Polygon.svg" />

                    <p className="font_title_name me-1" style={{ minWidth: "150px" }}>تنظیمات بازار</p>

                </div>

                <Button
                
                variant="contained"

                color="secondary"

                className='ms-5'

                onClick={() => history.push(`/marketsetting/detail`) }

                >
                    افزودن ارز جدید
                </Button>
            </div>

            <Container className='px-0'>

                <div className="row d-flex mt-4 justify-content-between">

                    {cryptoContext.configData?.map(item => <Col sm={5} className='market_setting_item align-items-center justify-content-between bg-dark bg_input mx-auto mt-4 d-flex text-white'>

                        <div className='align-items-center d-flex'>

                            <p className='my-1'>{item.Value.title}</p>

                            (<span>{item.Value.symbol}</span>)

                        </div>

                        {/* {console.log("item", item)} */}

                        <Button

                            variant="contained"

                            color="primary"

                            className='my-1'

                            onClick={() => history.push(`/marketsetting/detail/${item.Value.symbol}`) }

                        >جزییات</Button>

                    </Col>)}

                </div>

            </Container>

        </div>
    );
}

export default MarketSetting;
