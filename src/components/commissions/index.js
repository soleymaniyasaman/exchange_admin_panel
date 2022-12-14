import React from 'react';
import { Nav } from "react-bootstrap";
import { CircularProgress, Backdrop } from '@material-ui/core';
import { useFetchApi } from '../../utils/hooks';
import { LEVELS_LIST, LEVEL_DETAIL, TRADING_APP } from '../../utils/constants';
import FormComp from "./Inputs";
import "./style.css";


function Commissions(props) {

    const [{ data: levelList, isLoading: levelLoading }, getLevelList] = useFetchApi(undefined, []);
    const [{ data: updateLevelData, isLoading: updateLevelLoading }, updateLevel] = useFetchApi(undefined, {});

    const [level1, setLevel1] = React.useState("market")
    const [level2, setLevel2] = React.useState("market")
    const [level3, setLevel3] = React.useState("market")
    const [level4, setLevel4] = React.useState("market")

    const handleSubmitLevel = (values, id) => {
        console.log("value", values)
        updateLevel("PUT", TRADING_APP, LEVEL_DETAIL(id), values)
    }

    React.useEffect(() => {
        getLevelList("GET", TRADING_APP, LEVELS_LIST)
    }, [])

    React.useEffect(() => {
        if (!updateLevelLoading && Object.keys(updateLevelData).length) {
            getLevelList("GET", TRADING_APP, LEVELS_LIST)
        }
    }, [updateLevelLoading])
    console.log("level 1", level1)
    return (
        <div className="mt-3">
            <span className="text-white pe-2">مدیریت کارمزد</span>
            <div className="content mt-3 ">
                <div className="d-flex mb-2">
                    <img src="/assets/drawer/Polygon.svg" />
                    <p className="font_title_name me-1" style={{ minWidth: "150px" }}>کارمزد خرید و فروش </p>
                </div>
                <Backdrop className="backdrop-loading" open={levelLoading} >
                    <CircularProgress color="primary" />
                </Backdrop>
                <div className="content-dark mb-3">
                    <div className="position-relative">
                        <span className="text-green">سطح ۱</span>
                        <div className="switch">
                            <Nav variant="pills"
                                activeKey={level1}
                                onSelect={(selectedKey) => setLevel1(selectedKey)}
                            >
                                <Nav.Item>
                                    <Nav.Link eventKey="market">ثبت سفارش</Nav.Link>
                                </Nav.Item>
                                <Nav.Item>
                                    <Nav.Link eventKey="limit"> سفارش سریع</Nav.Link>
                                </Nav.Item>
                            </Nav>
                        </div>
                    </div>
                    <div className="mt-3">
                        <FormComp handleSubmitLevel={handleSubmitLevel} level={level1} item={levelList.length >= 1 ? levelList[0] : {}} />
                    </div>
                </div>
                <div className="content-dark mb-3">
                    <div className="position-relative">
                        <span className="text-green">سطح ۲</span>
                        <div className="switch">
                            <Nav variant="pills"
                                activeKey={level2}
                                onSelect={(selectedKey) => setLevel2(selectedKey)}
                            >
                                <Nav.Item>
                                    <Nav.Link eventKey="market">ثبت سفارش</Nav.Link>
                                </Nav.Item>
                                <Nav.Item>
                                    <Nav.Link eventKey="limit"> سفارش سریع</Nav.Link>
                                </Nav.Item>
                            </Nav>
                        </div>
                    </div>
                    <div className="mt-3">
                        <FormComp handleSubmitLevel={handleSubmitLevel} level={level2} item={levelList.length >= 2 ? levelList[1] : {}} />
                    </div>
                </div>
                <div className="content-dark mb-3">
                    <div className="position-relative">
                        <span className="text-green">سطح ۳</span>
                        <div className="switch">
                            <Nav variant="pills"
                                activeKey={level3}
                                onSelect={(selectedKey) => setLevel3(selectedKey)}
                            >
                                <Nav.Item>
                                    <Nav.Link eventKey="market">ثبت سفارش</Nav.Link>
                                </Nav.Item>
                                <Nav.Item>
                                    <Nav.Link eventKey="limit"> سفارش سریع</Nav.Link>
                                </Nav.Item>
                            </Nav>
                        </div>
                    </div>
                    <div className="mt-3">
                        <FormComp handleSubmitLevel={handleSubmitLevel} level={level3} item={levelList.length >= 3 ? levelList[2] : {}} />
                    </div>
                </div>
                <div className="content-dark mb-3">
                    <div className="position-relative">
                        <span className="text-green">سطح ۴</span>
                        <div className="switch">
                            <Nav variant="pills"
                                activeKey={level4}
                                onSelect={(selectedKey) => setLevel4(selectedKey)}
                            >
                                <Nav.Item>
                                    <Nav.Link eventKey="market">ثبت سفارش</Nav.Link>
                                </Nav.Item>
                                <Nav.Item>
                                    <Nav.Link eventKey="limit"> سفارش سریع</Nav.Link>
                                </Nav.Item>
                            </Nav>
                        </div>
                    </div>
                    <div className="mt-3">
                        <FormComp handleSubmitLevel={handleSubmitLevel} level={level4} item={levelList.length >= 4 ? levelList[3] : {}} />
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Commissions
