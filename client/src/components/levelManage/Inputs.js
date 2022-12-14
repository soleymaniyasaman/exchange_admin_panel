import React from 'react'
import { useFormik } from "formik";
import { Grid, Button } from '@material-ui/core';
import { clearDiscriminant, numberRegex, numDiscriminantInput } from '../../utils/discriminant';
import * as Yup from 'yup';


function FormComp(props) {

    //validation
    const validationSchema = Yup.object().shape({
        // threshold: Yup.string().matches(numberRegex, "اعداد را به لاتین وارد کنید").required('لطفا مقدار را وارد کنید'),
    });

    const handleSubmit = (values) => {
        let defaultValues = {
            trade_type: 'limit',
            rial_buying_commission: 0,
            rial_selling_commission: 0,
            tether_buying_commission: 0,
            tether_selling_commission: 0
        }
        if (props.isEditting) {
            values["trade_type"] = "limit"
            values["rial_buying_commission"] = props.item.rial_buying_commission
            values["rial_selling_commission"] = props.item.rial_selling_commission
            values["tether_buying_commission"] = props.item.tether_buying_commission
            values["tether_selling_commission"] = props.item.tether_selling_commission
            values["threshold"] = clearDiscriminant(formikProps.values.threshold)
        } else {
            values = { ...values, ...defaultValues }
        }
        props.handleSubmitLevel(props.isEditting, values, props?.item?.id)
    }

    const formikProps = useFormik({
        initialValues: { title: '', threshold: props.defaultValue ? props.defaultValue : null },
        enableReinitialize: true,
        validationSchema: validationSchema,
        onSubmit: values => handleSubmit(values),
    })

    React.useEffect(() => {
        if (Object.keys(props.item).length) {
            formikProps.setFieldValue("threshold", props.item?.threshold)
            formikProps.setFieldValue("title", props.item?.title)
            props.setMinValue(props.item.threshold, props.index)
        }
    }, [props.item])

    return (
        <div>
            <form onSubmit={formikProps.handleSubmit}>
                <div style={{ flexGrow: 1 }} >
                    <Grid container spacing={3} justify="space-between" className="p-3">
                        <Grid item md={5}>
                            <div className="d-flex w-100" style={{ maxHeight: "34px" }}>
                                <label className="text-end text-white " style={{ minWidth: "150px" }} htmlFor="title">نام سطح</label>
                                <input
                                    type="text"
                                    name="title"
                                    placeholder=""
                                    value={formikProps.values.title}
                                    required
                                    onChange={formikProps.handleChange}
                                    className="form-control bg_input input_text"
                                />
                            </div>
                        </Grid>
                    </Grid>
                    <Grid container spacing={3} justify="space-between" className="p-3">
                        <Grid item md={5}>
                            <div className="d-flex w-100" style={{ maxHeight: "34px" }}>
                                <label className="text-end text-white " style={{ minWidth: "150px" }} htmlFor="floor">حداقل گردش حساب</label>
                                <input
                                    type="text"
                                    name="floor"
                                    placeholder=""
                                    required
                                    disabled
                                    value={props.minValue}
                                    className="form-control bg_input input_text"
                                />
                            </div>
                        </Grid>
                        <Grid item md={5} className="ms-5">
                            <div className={`${props.maxValueStyle} w-100`} style={{ maxHeight: "34px" }}>
                                <label className="text-end text-white fs-6" style={{ minWidth: "150px" }} htmlFor="threshold">حداکثر گردش حساب</label>
                                <input
                                    type="text"
                                    name="threshold"
                                    placeholder=""
                                    required
                                    value={numDiscriminantInput(formikProps.values.threshold)}
                                    onChange={e => { props.setMinValue(e.target.value, props.index); formikProps.handleChange(e) }}
                                    className="form-control bg_input input_text"
                                />
                                {/* {formikProps.errors.threshold && formikProps.touched.threshold ? <strong className="error mt-md-n2 small" >{formikProps.errors.threshold}</strong> : null} */}
                            </div>
                        </Grid>
                    </Grid>
                    <Grid container spacing={3} justify="space-between" className="p-3">
                        <Grid item md={5}>
                            <input
                                accept="image/*"
                                className="d-none"
                                id="contained-button-file"
                                multiple
                                type="file"
                            />
                            <label className="text-end text-white ms-1" style={{ minWidth: "150px" }} htmlFor="contained-button-file">
                                آپلود عکس سطح
                                <Button className="me-5" variant="contained" component="span">
                                    انتخاب فایل ضمیمه
                                </Button>
                            </label>
                        </Grid>
                        <Grid item md={5} className="ms-5">
                            <div className="d-flex justify-content-end" style={{ maxHeight: "34px" }}>
                                <Button disabled variant="contained"  > لیست کاربران</Button>
                            </div>
                        </Grid>
                    </Grid>
                    <Grid container spacing={3} justify="space-between" className="p-3" >
                        <Grid item md={12} className="ms-5">
                            <div className="d-flex justify-content-end" style={{ maxHeight: "34px" }}>
                                <Button type="submit" color="primary" variant="contained"  >ذخیره</Button>
                            </div>
                        </Grid>
                    </Grid>
                </div>
            </form>
        </div>
    )
}

export default FormComp
