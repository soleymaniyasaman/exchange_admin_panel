import React from 'react'
import { useFormik } from "formik";
import { Grid, Button } from '@material-ui/core';


function FormComp(props) {

    const formikProps = useFormik({
        initialValues: {},
        enableReinitialize: true,
        // validate={this.validate}
        onSubmit: values => handleSubmit(values),
    })

    const handleSubmit = (values) => {
        if (Object.keys(props.item).length) {
            values.title = props.item.title
            values.trade_type = props.level
            props.handleSubmitLevel(values, props?.item?.id)
        }
    }

    React.useEffect(() => {
        if (Object.keys(props.item).length) {
            formikProps.setFieldValue("rial_buying_commission", props.item?.rial_buying_commission)
            formikProps.setFieldValue("rial_selling_commission", props.item?.rial_selling_commission)
            formikProps.setFieldValue("tether_buying_commission", props.item?.tether_buying_commission)
            formikProps.setFieldValue("tether_selling_commission", props.item?.tether_selling_commission)
        }
    }, [props.item])

    return (
        <div>
            <div>
                <form onSubmit={formikProps.handleSubmit}>
                    <div style={{ flexGrow: 1 }} >
                        <Grid container spacing={3} justify="space-between" className="p-3">
                            <Grid item md={5}>
                                <div className="d-flex w-100" style={{ maxHeight: "34px" }}>
                                    <label className="text-end text-white ms-4" style={{ minWidth: "90px" }} htmlFor="rial_buying_commission">خرید ریالی</label>
                                    <input
                                        type="text"
                                        name="rial_buying_commission"
                                        placeholder=""
                                        value={formikProps.values.rial_buying_commission}
                                        required
                                        onChange={formikProps.handleChange}
                                        className="form-control bg_input input_text"
                                    />
                                </div>
                            </Grid>
                            <Grid item md={5} className="ms-5">
                                <div className="d-flex w-100" style={{ maxHeight: "34px" }}>
                                    <label className="text-end text-white fs-6 ms-4" style={{ minWidth: "90px" }} htmlFor="rial_selling_commission">فروش ریالی</label>
                                    <input
                                        label="dasfdas"
                                        type="text"
                                        name="rial_selling_commission"
                                        placeholder=""
                                        value={formikProps.values.rial_selling_commission}
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
                                    <label className="text-end text-white ms-4" style={{ minWidth: "90px" }} htmlFor="tether_buying_commission">خرید تتری</label>
                                    <input
                                        type="text"
                                        name="tether_buying_commission"
                                        placeholder=""
                                        value={formikProps.values.tether_buying_commission}
                                        required
                                        onChange={formikProps.handleChange}
                                        className="form-control bg_input input_text"
                                    />
                                </div>
                            </Grid>
                            <Grid item md={5} className="ms-5">
                                <div className="d-flex w-100" style={{ maxHeight: "34px" }}>
                                    <label className="text-end text-white fs-6 ms-4" style={{ minWidth: "90px" }} htmlFor="tether_selling_commission">فروش تتری</label>
                                    <input
                                        label="dasfdas"
                                        type="text"
                                        name="tether_selling_commission"
                                        placeholder=""
                                        value={formikProps.values.tether_selling_commission}
                                        required
                                        onChange={formikProps.handleChange}
                                        className="form-control bg_input input_text"
                                    />
                                </div>
                            </Grid>
                            <Grid container spacing={3} justify="space-between" className="p-3" >
                                <Grid item md={12} className="ms-5">
                                    <div className="d-flex justify-content-end" style={{ maxHeight: "34px" }}>
                                        <Button type="submit" color="primary" variant="contained"  >ذخیره</Button>
                                    </div>
                                </Grid>
                            </Grid>
                        </Grid>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default FormComp
