"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _toConsumableArray2 = _interopRequireDefault(require("@babel/runtime/helpers/toConsumableArray"));

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));

window.onload = function () {
  getItems().then(function (items) {
    return console.log("Items fetched");
  })["catch"](function (err) {
    return console.log(err);
  });
};

var data;

function getItems() {
  return _getItems.apply(this, arguments);
}

function _getItems() {
  _getItems = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee() {
    var res, error;
    return _regenerator["default"].wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            _context.prev = 0;
            _context.next = 3;
            return fetch('http://localhost:3000/items');

          case 3:
            res = _context.sent;

            if (res.ok) {
              _context.next = 6;
              break;
            }

            throw new Error(res.statusText);

          case 6:
            _context.next = 8;
            return res.json();

          case 8:
            data = _context.sent;
            renderData(data.entries);
            getCategories(data.entries);
            _context.next = 17;
            break;

          case 13:
            _context.prev = 13;
            _context.t0 = _context["catch"](0);
            error = _context.t0.error;
            throw new Error(error);

          case 17:
          case "end":
            return _context.stop();
        }
      }
    }, _callee, null, [[0, 13]]);
  }));
  return _getItems.apply(this, arguments);
}

function renderData(_x) {
  return _renderData.apply(this, arguments);
}

function _renderData() {
  _renderData = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee2(data) {
    var root, i, row, id, title, category;
    return _regenerator["default"].wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            root = document.getElementById('root');
            root.innerHTML = '';

            for (i = 0; i < data.length; i++) {
              row = document.createElement('tr');
              id = document.createElement('td');
              id.innerText = i;
              title = document.createElement('td');
              title.innerText = data[i].API;
              category = document.createElement('td');
              category.innerText = data[i].Category;
              row.setAttribute('dataId', i);
              row.appendChild(id);
              row.appendChild(title);
              row.appendChild(category);
              root.appendChild(row);
            }

          case 3:
          case "end":
            return _context2.stop();
        }
      }
    }, _callee2);
  }));
  return _renderData.apply(this, arguments);
}

function getCategories(_x2) {
  return _getCategories.apply(this, arguments);
}

function _getCategories() {
  _getCategories = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee3(data) {
    var select, select2, head, uniqueItems, i, option, _option;

    return _regenerator["default"].wrap(function _callee3$(_context3) {
      while (1) {
        switch (_context3.prev = _context3.next) {
          case 0:
            select = document.createElement('select');
            select2 = document.createElement('select');
            head = document.getElementById('head');
            uniqueItems = (0, _toConsumableArray2["default"])(new Set(data.map(function (item) {
              return item.Category;
            })));

            for (i = 0; i < unique.length; i++) {
              option = document.createElement('option');
              option.innerText = unique[i];
              option.setAttribute('value', unique[i]);
              select.appendChild(option);
            }

            for (i = 0; i < data.length; i++) {
              _option = document.createElement('option');
              _option.innerText = data[i].API;

              _option.setAttribute('value', data[i].API);

              select2.appendChild(_option);
            }

            select.addEventListener('change', function (e) {
              var newData = data.filter(function (item) {
                return item.Category === e.target.value;
              });
              renderData(newData);
            });
            select2.addEventListener('change', function (e) {
              var newData = data.filter(function (item) {
                return item.API === e.target.value;
              });
              renderData(newData);
            });
            head.appendChild(select);
            head.appendChild(select2);

          case 10:
          case "end":
            return _context3.stop();
        }
      }
    }, _callee3);
  }));
  return _getCategories.apply(this, arguments);
}
