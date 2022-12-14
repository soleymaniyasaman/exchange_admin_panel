"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _react = _interopRequireDefault(require("react"));

var _editorjs = _interopRequireDefault(require("@editorjs/editorjs"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var AboutUs = new _editorjs["default"]({
  /**
   * Id of Element that should contain Editor instance
   */
  holder: 'editorjs'
});
var _default = AboutUs;
exports["default"] = _default;