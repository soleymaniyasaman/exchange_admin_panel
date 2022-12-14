"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.EDITOR_JS_TOOLS = void 0;

var _embed = _interopRequireDefault(require("@editorjs/embed"));

var _table = _interopRequireDefault(require("@editorjs/table"));

var _list = _interopRequireDefault(require("@editorjs/list"));

var _warning = _interopRequireDefault(require("@editorjs/warning"));

var _code = _interopRequireDefault(require("@editorjs/code"));

var _link = _interopRequireDefault(require("@editorjs/link"));

var _image = _interopRequireDefault(require("@editorjs/image"));

var _raw = _interopRequireDefault(require("@editorjs/raw"));

var _header = _interopRequireDefault(require("@editorjs/header"));

var _quote = _interopRequireDefault(require("@editorjs/quote"));

var _marker = _interopRequireDefault(require("@editorjs/marker"));

var _checklist = _interopRequireDefault(require("@editorjs/checklist"));

var _delimiter = _interopRequireDefault(require("@editorjs/delimiter"));

var _inlineCode = _interopRequireDefault(require("@editorjs/inline-code"));

var _simpleImage = _interopRequireDefault(require("@editorjs/simple-image"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var EDITOR_JS_TOOLS = {
  embed: _embed["default"],
  table: _table["default"],
  marker: _marker["default"],
  list: _list["default"],
  warning: _warning["default"],
  code: _code["default"],
  linkTool: _link["default"],
  image: _image["default"],
  raw: _raw["default"],
  header: _header["default"],
  quote: _quote["default"],
  checklist: _checklist["default"],
  delimiter: _delimiter["default"],
  inlineCode: _inlineCode["default"],
  simpleImage: _simpleImage["default"]
};
exports.EDITOR_JS_TOOLS = EDITOR_JS_TOOLS;