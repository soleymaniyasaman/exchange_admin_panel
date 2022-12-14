"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.decimalLimitInput = exports.numberRegex = exports.clearDiscriminant = exports.numDiscriminantInput = exports.numDiscriminant = void 0;

var numDiscriminant = function numDiscriminant(input) {
  if (input) {
    return input.toString().replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ",");
  }
};

exports.numDiscriminant = numDiscriminant;

var numDiscriminantInput = function numDiscriminantInput(input) {
  if (input) {
    if (input.toString().includes(" ")) {
      input = input.toString().replace(/\s/g, "");
    }

    return input.toString().replace(/,/g, "").replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ",").replace(/ /g, '');
  }
};

exports.numDiscriminantInput = numDiscriminantInput;

var clearDiscriminant = function clearDiscriminant(input) {
  if (input) {
    return input.toString().replace(/,/g, "");
  }
};

exports.clearDiscriminant = clearDiscriminant;
var numberRegex = /^[0-9,]+$/;
exports.numberRegex = numberRegex;

var decimalLimitInput = function decimalLimitInput(originWallet) {
  if (originWallet === "usdt") {
    return /^\d{0,100}(\.\d{0,2})?$/;
  } else if (originWallet === "irr") {
    return /^\d{0,100}(\.\d{0,0})?$/;
  } else {
    return new RegExp("^\\d{0,100}(\\.\\d{0,".concat(originWallet, "})?$"));
  }
}; // \d+\.\d\d(?!\d)
// ^\d{1,6}(\.\d{1,5})?$
// \B(?<!\.\d*)(?=(\d{3})+(?!\d))


exports.decimalLimitInput = decimalLimitInput;