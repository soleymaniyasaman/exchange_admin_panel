"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _classiceditor = _interopRequireDefault(require("@ckeditor/ckeditor5-editor-classic/src/classiceditor"));

var _essentials = _interopRequireDefault(require("@ckeditor/ckeditor5-essentials/src/essentials"));

var _autoformat = _interopRequireDefault(require("@ckeditor/ckeditor5-autoformat/src/autoformat"));

var _bold = _interopRequireDefault(require("@ckeditor/ckeditor5-basic-styles/src/bold"));

var _italic = _interopRequireDefault(require("@ckeditor/ckeditor5-basic-styles/src/italic"));

var _heading = _interopRequireDefault(require("@ckeditor/ckeditor5-heading/src/heading"));

var _link = _interopRequireDefault(require("@ckeditor/ckeditor5-link/src/link"));

var _list = _interopRequireDefault(require("@ckeditor/ckeditor5-list/src/list"));

var _paragraph = _interopRequireDefault(require("@ckeditor/ckeditor5-paragraph/src/paragraph"));

var _customplugin = _interopRequireDefault(require("ckeditor5-custom-package/src/customplugin"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

// import OtherCustomPlugin from '../relative/path/to/some/othercustomplugin';
var ClassicEditor =
/*#__PURE__*/
function (_ClassicEditorBase) {
  _inherits(ClassicEditor, _ClassicEditorBase);

  function ClassicEditor() {
    _classCallCheck(this, ClassicEditor);

    return _possibleConstructorReturn(this, _getPrototypeOf(ClassicEditor).apply(this, arguments));
  }

  return ClassicEditor;
}(_classiceditor["default"]); // Plugins to include in the build.


exports["default"] = ClassicEditor;
ClassicEditor.builtinPlugins = [_essentials["default"], _autoformat["default"], _bold["default"], _italic["default"], _heading["default"], _link["default"], _list["default"], _paragraph["default"], _customplugin["default"] // OtherCustomPlugin
];
ClassicEditor.defaultConfig = {
  toolbar: ['heading', '|', 'bold', 'italic', 'custombutton'],
  // This value must be kept in sync with the language defined in webpack.config.js.
  language: 'en'
};