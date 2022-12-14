import { notification } from 'antd';
import axios from 'axios';

import { BASE_URL, PREFIX } from "./constants";

import { getTokenObject } from "./utils";


const openNotification = describe => {

    notification.error({

        message: `پیغام خطا `,

        description: describe,

        placement: "bottomRight",

        className: "bg-danger",

        style: { zIndex: '50000' }



    });

    notification.config({

        rtl: false

    })

};

export const api = axios.create({

    // baseURL: BASE_URL,

    headers: {

        'Content-Type': 'application/json'

    },

})

api.interceptors.request.use(config => {

    if (!config.headers.Authorization) {

        let token = getTokenObject()

        if (token) {

            config.headers.Authorization = `Bearer ${token.Authorization}`;

        }

    }

    // refreshToken()

    return config;

}, error => Promise.reject(error));


api.interceptors.response.use((response) => {

    if (response.status === 201) {

        let responseMessage = response.data.message ? response.data.message : undefined

    }


    return response

}, async function (error) {

    // const originalRequest = error.config;

    if (error.response.status === 401) {

        window.location.href = `${PREFIX}/login`

    }
    if (error.response.status === 403) {

        return openNotification('کاربر دسترسی ندارد')

    }

    if (error.response.status === 405) {

        return openNotification('تیکت بسته شده است')

    }
    if (error.response.status === 500) {

        return openNotification('ارتباط با سرور برقرار نشد')

    }

    if (error.response.status === 400) {

        if (error.response.data.status_code === 5050) {

            return openNotification('موجودی کافی نمی باشد.')

        } else if (error.response.data.status_code === 404) {

            return openNotification('رمز وارد شده صحیح نمی باشد.')

        } else if (error.response.data.status_code === 4001) {

            return openNotification('کاربر با این شماره وجود دارد.')

        } else if (error.response.data.status_code === 4002) {

            return openNotification('کاربر با این کد دعوت وجود ندارد')

        } else if (error.response.data.status_code === 4003) {

            return openNotification('رمز عبور اشتباه است')

        } else if (error.response.data.status_code === 4050) {

            return openNotification('زمان استفاده از کد تایید به پایان رسیده است')

        } else if (error.response.data.status_code === 4051) {

            return openNotification('کد تایید اشتباه است')

        } else if (error.response.data.status_code === 4052) {

            return openNotification('کد تایید برای شما ارسال گردیده است')

        } else if (error.response.data.status_code === 4053) {

            return openNotification('پیامک ارسال نشد')

        } else if (error.response.data.status_code === 4100) {

            return openNotification('ایمیل شما تایید نشده است لطفا ابتدا ایمیل خود را تایید کنید.')

        } else if (error.response.data.status_code === 4101) {

            return openNotification('ایمیل کاربر تغییر نکرد!')

        } else if (error.response.data.status_code === 4150) {

            return openNotification('کاربر احراز هویت نشده است لطفا ابتدا احراز هویت کنید')

        } else if (error.response.data.status_code === 4151) {

            return openNotification('بعد از تایید شدن میتوانید شماره و آدرس خود را عوض کنید')

        } else if (error.response.data.status_code === 4200) {

            return openNotification('کارت بانکی شما تایید نشده است لطفا ابتدا کارت بانکی خود را تایید کنید')

        } else if (error.response.data.status_code === 4300) {

            return openNotification('سرویس با خطا روبرو است')

        } else if (error.response.data.status_code === 4250) {

            return openNotification('فایل فرستاده شده وجود دارد')

        } else if (error.response.data.status_code === 4350) {

            return openNotification('کد تایید اشتباه است')

        } else if (error.response.data.status_code === 4351) {

            return openNotification('شناسایی دوعاملی در حال حاضر فعال است')

        } else if (error.response.data.status_code === 4352) {

            return openNotification('کد تایید اشتباه است')

        } else if (error.response.data.status_code === 4353) {

            return openNotification('کد otp فعال نیست')

        } else if (error.response.data.status_code === 4354) {

            return openNotification('you should select on of types ')

        } else if (error.response.data.status_code === 5000) {

            return openNotification('خطای داخلی رخ داده است')

        } else if (error.response.data.status_code === 5001) {

            return openNotification('نام کاربری قبلا ثبت شده است')

        } else if (error.response.data.status_code === 5950) {

            // return console.error('error',error.response.data.status_code)

            return openNotification('درخواست شما صحیح نمی باشد')

        } else if (error.response.data.status_code === 5100) {

            return openNotification('مارکت موجودی ندارد')

        } else if (error.response.data.status_code === 5051) {

            return openNotification('input quantity accuracy too high')

        } else if (error.response.data.status_code === 5052) {

            return openNotification('مبلغ وارد شده کمتر از حد مجاز است')

        } else if (error.response.data.status_code === 5053) {

            return openNotification('در حال حاضر مارکت فعال نمی باشد')

        } else if (error.response.data.status_code === 5150) {

            return console.error('error', error.response.data.status_code)

        } else if (error.response.data.status_code === 6950) {

            return console.error('error', error.response.data.status_code)

        } else if (error.response.data.status_code === 6001) {

            return openNotification('کیف پول موجودی ندارد')

        } else if (error.response.data.status_code === 6050) {

            return openNotification('کیف پولی برای شما یافت نشد.')

        } else if (error.response.data.status_code === 6051) {

            return openNotification('شماره کارتی برای شما یافت نشد')

        } else if (error.response.data.status_code === 6052) {

            return openNotification('برداشت از این کیف پول امکان پذیر نیست')

        } else if (error.response.data.status_code === 6053) {

            return openNotification('لطفا شبکه و آدرس کیف پول مقصد را وارد کنید')

        }else if (error.response.data.status_code === 6054) {

            return openNotification('quantity must greater than 0 or current asset quantity')

        }  else if (error.response.data.status_code === 6100) {

            return openNotification('این درگاه بانکی در دسترس نیست')

        } else if (error.response.data.status_code === 6101) {

            return openNotification('ارور ورودی زرین پال')

        } else if (error.response.data.status_code === 6102) {

            return openNotification('درگاه زرین پال در دسترس نمی باشد')

        } else if (error.response.data.status_code === 6103) {

            return openNotification('این پرداخت معتبر نمی باشد')

        } else if (error.response.data.status_code === 6150) {

            return openNotification('سرور به مشکل برخورده است')

        } else if (error.response.data.status_code === 6151) {

            return openNotification('wallet manager service not available')

        } else if (error.response.data.status_code === 6152) {

            return openNotification('config service not available')

        } else {

            return openNotification('درخواست شما با خطا روبرو شده است')
        }

    }

    if (error.response.status === 501) {

        return openNotification('ارتباط با سرور برقرار نشد')

    }

    if (error.response.status === 502) {

        return openNotification('ارتباط با سرور برقرار نشد')

    }

    if (error.response.status === 503) {

        return openNotification('ارتباط با سرور برقرار نشد')

    }

    if (error.response.status === 504) {

        return openNotification('ارتباط با سرور برقرار نشد')

    }

    if (error.response.status === 505) {

        return openNotification('ارتباط با سرور برقرار نشد')

    }

    if (error.response.status === 404) {

        return openNotification('کاربر با این مشخصات یافت نشد.')

    }
    
    return Promise.reject(error);

});

