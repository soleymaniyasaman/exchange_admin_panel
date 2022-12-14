"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.round = exports.round_ten_thousand = exports.round_hundred_thousand = void 0;

var round_hundred_thousand = function round_hundred_thousand(input) {
  return Math.round(input * 100000) / 100000;
};

exports.round_hundred_thousand = round_hundred_thousand;

var round_ten_thousand = function round_ten_thousand(input) {
  return Math.round((input + Number.EPSILON) * 1000) / 1000;
};

exports.round_ten_thousand = round_ten_thousand;

var round = function round(input) {
  return Math.round(input);
};

exports.round = round;