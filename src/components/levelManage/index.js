import React from 'react';
import { CircularProgress, Backdrop } from '@material-ui/core';
import FormComp from "./Inputs";
import CardSection from './cardSection';
import "./style.css";
import { useFetchApi } from '../../utils/hooks';
import { LEVELS_LIST, LEVEL_DETAIL, TRADING_APP } from '../../utils/constants';
import { numDiscriminantInput } from '../../utils/discriminant';


function LevelManage(props) {

    const [{ data: levelList, isLoading: levelLoading }, getLevelList] = useFetchApi(undefined, []);
    const [{ data: createLevelData, isLoading: createLevelLoading }, createLevel] = useFetchApi(undefined, {});
    const [{ data: updateLevelData, isLoading: updateLevelLoading }, updateLevel] = useFetchApi(undefined, {});

    const [minValue1, setMinValue1] = React.useState(0);
    const [minValue2, setMinValue2] = React.useState(0);
    const [minValue3, setMinValue3] = React.useState(0);
    const [minValue4, setMinValue4] = React.useState(0);

    const maxNumber = Math.pow(10, 1000); // max positive number

    console.log("item", levelList)
    const handleSubmitLevel = (isEditting, values, id) => {
        if (isEditting) {
            console.log("values", id)
            updateLevel("PUT", TRADING_APP, LEVEL_DETAIL(id), values)
        } else {
            console.log("else", id)
            createLevel("POST", TRADING_APP, LEVELS_LIST, values)
        }
    }

    const setMinValue = (value, index) => {
        let fname = `setMinValue${index + 2}`
        index < 3 && eval(fname)(value)
    }

    React.useEffect(() => {
        getLevelList("GET", TRADING_APP, LEVELS_LIST)
    }, [])

    React.useEffect(() => {
        if (!createLevelLoading && Object.keys(createLevelData).length) {
            getLevelList("GET", TRADING_APP, LEVELS_LIST)
        }
        if (!updateLevelLoading && Object.keys(updateLevelData).length) {
            getLevelList("GET", TRADING_APP, LEVELS_LIST)
        }
    }, [createLevelLoading, updateLevelLoading])

    return (
        <div className="mt-3">
            <span className="text-white pe-2">مدیریت سطوح</span>
            {/* <CardSection /> */}
            <Backdrop className="backdrop-loading" open={levelLoading} >
                <CircularProgress color="primary" />
            </Backdrop>
            <div className="content mt-3 ">
                <div className="d-flex mb-2">
                    <img src="/assets/drawer/Polygon.svg" />
                    <p className="font_title_name me-1" style={{ minWidth: "150px" }}>مدیریت سطوح </p>
                </div>
                <div className="content-dark my-3">
                    <div className="d-flex pe-3" style={{ maxWidth: "580px" }}>
                        <label className="text-end text-white ms-1" style={{ minWidth: "150px" }} htmlFor="account_number">مدت گردش حساب</label>
                        <select name="color" disabled value="green" className="form-control bg_input input_text">
                            <option value="red">۱ماه</option>
                            <option value="green">۳ماه</option>
                            <option value="blue">۶ ماه</option>
                        </select>
                    </div>
                </div>
                <div className="content-dark mb-3">
                    <div className="position-relative">
                        <span className="text-green">سطح ۱</span>
                    </div>
                    <div className="mt-3">
                        <FormComp
                            index={0}
                            item={levelList.length >= 2 ? levelList[1] : {}}
                            isEditting={levelList.length >= 2}
                            minValue={numDiscriminantInput(minValue1)}
                            setMinValue={setMinValue}
                            handleSubmitLevel={handleSubmitLevel}
                            maxValueStyle={'d-flex'}
                        />
                    </div>
                </div>
                <div className="content-dark mb-3">
                    <div className="position-relative">
                        <span className="text-green">سطح ۲</span>
                    </div>
                    <div className="mt-3">
                        <FormComp
                            index={1}
                            item={levelList.length >= 3 ? levelList[2] : {}}
                            isEditting={levelList.length >= 3}
                            minValue={numDiscriminantInput(minValue2)}
                            setMinValue={setMinValue}
                            handleSubmitLevel={handleSubmitLevel}
                            maxValueStyle={'d-flex'}
                        />
                    </div>
                </div>
                <div className="content-dark mb-3">
                    <div className="position-relative">
                        <span className="text-green">سطح ۳</span>
                    </div>
                    <div className="mt-3">
                        <FormComp
                            index={2}
                            item={levelList.length >= 4 ? levelList[3] : {}}
                            isEditting={levelList.length >= 4}
                            minValue={numDiscriminantInput(minValue3)}
                            setMinValue={setMinValue}
                            handleSubmitLevel={handleSubmitLevel}
                            maxValueStyle={'d-flex'}
                        />
                    </div>
                </div>
                <div className="content-dark mb-3">
                    <div className="position-relative">
                        <span className="text-green">سطح ۴</span>
                    </div>
                    <div className="mt-3">
                        <FormComp
                            index={3}
                            item={levelList.length >= 5 ? levelList[4] : {}}
                            isEditting={levelList.length >= 5}
                            minValue={numDiscriminantInput(minValue4)}
                            setMinValue={setMinValue}
                            handleSubmitLevel={handleSubmitLevel}
                            maxValueStyle={'d-none'}
                            defaultValue={9999999999999999}
                        />
                    </div>
                </div>
            </div>
        </div>
    )
}

export default LevelManage
