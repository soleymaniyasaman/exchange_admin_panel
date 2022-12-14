"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _axios = _interopRequireDefault(require("axios"));

var _react = require("react");

var _provider = require("../context/provider");

var _constants = require("./constants");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

//config api call
var ConfigApi = function ConfigApi(props) {
  var dataContext = (0, _react.useContext)(_provider.UserContext);

  var configData = function configData() {
    var configUrl = "".concat(_constants.BASE_CONFIG_URL).concat(_constants.EXCHANGE_CONFIG).concat(_constants.CONFIG_COINS);
    console.log("config url ", configUrl);

    _axios["default"].get(configUrl).then(function (resp) {
      resp.data.map(function (item) {
        var values = '';

        if (item.Value) {
          var encodedRequestBody = String(item.Value);
          var decodedRequestBodyString = Buffer.from(encodedRequestBody, "base64");
          values = JSON.parse(decodedRequestBodyString);
        }

        item.Value = values;
        return item;
      });
      dataContext.setConfigData(resp.data);
    });
  };

  (0, _react.useEffect)(function () {
    configData();
  }, []);
  return null;
};

var _default = ConfigApi;
exports["default"] = _default;