"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.api = void 0;

var _antd = require("antd");

var _axios = _interopRequireDefault(require("axios"));

var _constants = require("./constants");

var _utils = require("./utils");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var openNotification = function openNotification(describe) {
  _antd.notification.error({
    message: "\u067E\u06CC\u063A\u0627\u0645 \u062E\u0637\u0627 ",
    description: describe,
    placement: "bottomRight",
    className: "bg-danger",
    style: {
      zIndex: '50000'
    }
  });

  _antd.notification.config({
    rtl: false
  });
};

var api = _axios["default"].create({
  // baseURL: BASE_URL,
  headers: {
    'Content-Type': 'application/json'
  }
});

exports.api = api;
api.interceptors.request.use(function (config) {
  if (!config.headers.Authorization) {
    var token = (0, _utils.getTokenObject)();

    if (token) {
      config.headers.Authorization = "Bearer ".concat(token.Authorization);
    }
  } // refreshToken()


  return config;
}, function (error) {
  return Promise.reject(error);
});
api.interceptors.response.use(function (response) {
  if (response.status === 201) {
    var responseMessage = response.data.message ? response.data.message : undefined;
  }

  return response;
}, function _callee(error) {
  return regeneratorRuntime.async(function _callee$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          // const originalRequest = error.config;
          if (error.response.status === 401) {
            window.location.href = "".concat(_constants.PREFIX, "/login");
          }

          if (!(error.response.status === 403)) {
            _context.next = 3;
            break;
          }

          return _context.abrupt("return", openNotification('کاربر دسترسی ندارد'));

        case 3:
          if (!(error.response.status === 405)) {
            _context.next = 5;
            break;
          }

          return _context.abrupt("return", openNotification('تیکت بسته شده است'));

        case 5:
          if (!(error.response.status === 500)) {
            _context.next = 7;
            break;
          }

          return _context.abrupt("return", openNotification('ارتباط با سرور برقرار نشد'));

        case 7:
          if (!(error.response.status === 400)) {
            _context.next = 181;
            break;
          }

          if (!(error.response.data.status_code === 5050)) {
            _context.next = 12;
            break;
          }

          return _context.abrupt("return", openNotification('موجودی کافی نمی باشد.'));

        case 12:
          if (!(error.response.data.status_code === 404)) {
            _context.next = 16;
            break;
          }

          return _context.abrupt("return", openNotification('رمز وارد شده صحیح نمی باشد.'));

        case 16:
          if (!(error.response.data.status_code === 4001)) {
            _context.next = 20;
            break;
          }

          return _context.abrupt("return", openNotification('کاربر با این شماره وجود دارد.'));

        case 20:
          if (!(error.response.data.status_code === 4002)) {
            _context.next = 24;
            break;
          }

          return _context.abrupt("return", openNotification('کاربر با این کد دعوت وجود ندارد'));

        case 24:
          if (!(error.response.data.status_code === 4003)) {
            _context.next = 28;
            break;
          }

          return _context.abrupt("return", openNotification('رمز عبور اشتباه است'));

        case 28:
          if (!(error.response.data.status_code === 4050)) {
            _context.next = 32;
            break;
          }

          return _context.abrupt("return", openNotification('زمان استفاده از کد تایید به پایان رسیده است'));

        case 32:
          if (!(error.response.data.status_code === 4051)) {
            _context.next = 36;
            break;
          }

          return _context.abrupt("return", openNotification('کد تایید اشتباه است'));

        case 36:
          if (!(error.response.data.status_code === 4052)) {
            _context.next = 40;
            break;
          }

          return _context.abrupt("return", openNotification('کد تایید برای شما ارسال گردیده است'));

        case 40:
          if (!(error.response.data.status_code === 4053)) {
            _context.next = 44;
            break;
          }

          return _context.abrupt("return", openNotification('پیامک ارسال نشد'));

        case 44:
          if (!(error.response.data.status_code === 4100)) {
            _context.next = 48;
            break;
          }

          return _context.abrupt("return", openNotification('ایمیل شما تایید نشده است لطفا ابتدا ایمیل خود را تایید کنید.'));

        case 48:
          if (!(error.response.data.status_code === 4101)) {
            _context.next = 52;
            break;
          }

          return _context.abrupt("return", openNotification('ایمیل کاربر تغییر نکرد!'));

        case 52:
          if (!(error.response.data.status_code === 4150)) {
            _context.next = 56;
            break;
          }

          return _context.abrupt("return", openNotification('کاربر احراز هویت نشده است لطفا ابتدا احراز هویت کنید'));

        case 56:
          if (!(error.response.data.status_code === 4151)) {
            _context.next = 60;
            break;
          }

          return _context.abrupt("return", openNotification('بعد از تایید شدن میتوانید شماره و آدرس خود را عوض کنید'));

        case 60:
          if (!(error.response.data.status_code === 4200)) {
            _context.next = 64;
            break;
          }

          return _context.abrupt("return", openNotification('کارت بانکی شما تایید نشده است لطفا ابتدا کارت بانکی خود را تایید کنید'));

        case 64:
          if (!(error.response.data.status_code === 4300)) {
            _context.next = 68;
            break;
          }

          return _context.abrupt("return", openNotification('سرویس با خطا روبرو است'));

        case 68:
          if (!(error.response.data.status_code === 4250)) {
            _context.next = 72;
            break;
          }

          return _context.abrupt("return", openNotification('فایل فرستاده شده وجود دارد'));

        case 72:
          if (!(error.response.data.status_code === 4350)) {
            _context.next = 76;
            break;
          }

          return _context.abrupt("return", openNotification('کد تایید اشتباه است'));

        case 76:
          if (!(error.response.data.status_code === 4351)) {
            _context.next = 80;
            break;
          }

          return _context.abrupt("return", openNotification('شناسایی دوعاملی در حال حاضر فعال است'));

        case 80:
          if (!(error.response.data.status_code === 4352)) {
            _context.next = 84;
            break;
          }

          return _context.abrupt("return", openNotification('کد تایید اشتباه است'));

        case 84:
          if (!(error.response.data.status_code === 4353)) {
            _context.next = 88;
            break;
          }

          return _context.abrupt("return", openNotification('کد otp فعال نیست'));

        case 88:
          if (!(error.response.data.status_code === 4354)) {
            _context.next = 92;
            break;
          }

          return _context.abrupt("return", openNotification('you should select on of types '));

        case 92:
          if (!(error.response.data.status_code === 5000)) {
            _context.next = 96;
            break;
          }

          return _context.abrupt("return", openNotification('خطای داخلی رخ داده است'));

        case 96:
          if (!(error.response.data.status_code === 5001)) {
            _context.next = 100;
            break;
          }

          return _context.abrupt("return", openNotification('نام کاربری قبلا ثبت شده است'));

        case 100:
          if (!(error.response.data.status_code === 5950)) {
            _context.next = 104;
            break;
          }

          return _context.abrupt("return", openNotification('درخواست شما صحیح نمی باشد'));

        case 104:
          if (!(error.response.data.status_code === 5100)) {
            _context.next = 108;
            break;
          }

          return _context.abrupt("return", openNotification('مارکت موجودی ندارد'));

        case 108:
          if (!(error.response.data.status_code === 5051)) {
            _context.next = 112;
            break;
          }

          return _context.abrupt("return", openNotification('input quantity accuracy too high'));

        case 112:
          if (!(error.response.data.status_code === 5052)) {
            _context.next = 116;
            break;
          }

          return _context.abrupt("return", openNotification('مبلغ وارد شده کمتر از حد مجاز است'));

        case 116:
          if (!(error.response.data.status_code === 5053)) {
            _context.next = 120;
            break;
          }

          return _context.abrupt("return", openNotification('در حال حاضر مارکت فعال نمی باشد'));

        case 120:
          if (!(error.response.data.status_code === 5150)) {
            _context.next = 124;
            break;
          }

          return _context.abrupt("return", console.error('error', error.response.data.status_code));

        case 124:
          if (!(error.response.data.status_code === 6950)) {
            _context.next = 128;
            break;
          }

          return _context.abrupt("return", console.error('error', error.response.data.status_code));

        case 128:
          if (!(error.response.data.status_code === 6001)) {
            _context.next = 132;
            break;
          }

          return _context.abrupt("return", openNotification('کیف پول موجودی ندارد'));

        case 132:
          if (!(error.response.data.status_code === 6050)) {
            _context.next = 136;
            break;
          }

          return _context.abrupt("return", openNotification('کیف پولی برای شما یافت نشد.'));

        case 136:
          if (!(error.response.data.status_code === 6051)) {
            _context.next = 140;
            break;
          }

          return _context.abrupt("return", openNotification('شماره کارتی برای شما یافت نشد'));

        case 140:
          if (!(error.response.data.status_code === 6052)) {
            _context.next = 144;
            break;
          }

          return _context.abrupt("return", openNotification('برداشت از این کیف پول امکان پذیر نیست'));

        case 144:
          if (!(error.response.data.status_code === 6053)) {
            _context.next = 148;
            break;
          }

          return _context.abrupt("return", openNotification('لطفا شبکه و آدرس کیف پول مقصد را وارد کنید'));

        case 148:
          if (!(error.response.data.status_code === 6054)) {
            _context.next = 152;
            break;
          }

          return _context.abrupt("return", openNotification('quantity must greater than 0 or current asset quantity'));

        case 152:
          if (!(error.response.data.status_code === 6100)) {
            _context.next = 156;
            break;
          }

          return _context.abrupt("return", openNotification('این درگاه بانکی در دسترس نیست'));

        case 156:
          if (!(error.response.data.status_code === 6101)) {
            _context.next = 160;
            break;
          }

          return _context.abrupt("return", openNotification('ارور ورودی زرین پال'));

        case 160:
          if (!(error.response.data.status_code === 6102)) {
            _context.next = 164;
            break;
          }

          return _context.abrupt("return", openNotification('درگاه زرین پال در دسترس نمی باشد'));

        case 164:
          if (!(error.response.data.status_code === 6103)) {
            _context.next = 168;
            break;
          }

          return _context.abrupt("return", openNotification('این پرداخت معتبر نمی باشد'));

        case 168:
          if (!(error.response.data.status_code === 6150)) {
            _context.next = 172;
            break;
          }

          return _context.abrupt("return", openNotification('سرور به مشکل برخورده است'));

        case 172:
          if (!(error.response.data.status_code === 6151)) {
            _context.next = 176;
            break;
          }

          return _context.abrupt("return", openNotification('wallet manager service not available'));

        case 176:
          if (!(error.response.data.status_code === 6152)) {
            _context.next = 180;
            break;
          }

          return _context.abrupt("return", openNotification('config service not available'));

        case 180:
          return _context.abrupt("return", openNotification('درخواست شما با خطا روبرو شده است'));

        case 181:
          if (!(error.response.status === 501)) {
            _context.next = 183;
            break;
          }

          return _context.abrupt("return", openNotification('ارتباط با سرور برقرار نشد'));

        case 183:
          if (!(error.response.status === 502)) {
            _context.next = 185;
            break;
          }

          return _context.abrupt("return", openNotification('ارتباط با سرور برقرار نشد'));

        case 185:
          if (!(error.response.status === 503)) {
            _context.next = 187;
            break;
          }

          return _context.abrupt("return", openNotification('ارتباط با سرور برقرار نشد'));

        case 187:
          if (!(error.response.status === 504)) {
            _context.next = 189;
            break;
          }

          return _context.abrupt("return", openNotification('ارتباط با سرور برقرار نشد'));

        case 189:
          if (!(error.response.status === 505)) {
            _context.next = 191;
            break;
          }

          return _context.abrupt("return", openNotification('ارتباط با سرور برقرار نشد'));

        case 191:
          if (!(error.response.status === 404)) {
            _context.next = 193;
            break;
          }

          return _context.abrupt("return", openNotification('کاربر با این مشخصات یافت نشد.'));

        case 193:
          return _context.abrupt("return", Promise.reject(error));

        case 194:
        case "end":
          return _context.stop();
      }
    }
  });
});