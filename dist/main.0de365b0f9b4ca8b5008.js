/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./src/scripts/consts.js":
/*!*******************************!*\
  !*** ./src/scripts/consts.js ***!
  \*******************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   nodes: () => (/* binding */ nodes),
/* harmony export */   urls: () => (/* binding */ urls)
/* harmony export */ });
const urls = {
  ROOMS: "/api/room/",
  USERS: "/api/users/",
  MESSAGES: "/api/message/",
  CURRENT: "/api/current_user/",
  MESSAGE: "/api/message/?target=",
  MEMBER: "/api/members/"
};
const nodes = {
  rooms: document.querySelector(".rooms"),
  users: document.querySelector(".users"),
  message: document.querySelector(".messages")
};


/***/ }),

/***/ "./src/scripts/get_post.js":
/*!*********************************!*\
  !*** ./src/scripts/get_post.js ***!
  \*********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   csrftoken: () => (/* binding */ csrftoken),
/* harmony export */   getApiData: () => (/* binding */ getApiData),
/* harmony export */   putApiData: () => (/* binding */ putApiData)
/* harmony export */ });
// Получаем токен
function getCookie(name) {
  let cookieValue = null;
  if (document.cookie && document.cookie !== "") {
    const cookies = document.cookie.split(";");
    for (let i = 0; i < cookies.length; i++) {
      const cookie = cookies[i].trim();
      // Does this cookie string begin with the name we want?
      if (cookie.substring(0, name.length + 1) === name + "=") {
        cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
        break;
      }
    }
  }
  return cookieValue;
}
const csrftoken = getCookie("csrftoken");

// Получаем данные с сервера
async function getApiData(callback, url) {
  if (arguments.length > 1) {
    fetch(url).then(response => {
      return callback(response.json());
    });
  } else {
    const response = await fetch(callback);
    return response.json();
  }
}

// Отправляем данные на сервер
async function putApiData(data, url) {
  return fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json;charset=utf-8",
      "X-CSRFTOKEN": csrftoken
    },
    body: JSON.stringify(data)
  });
}


/***/ }),

/***/ "./src/scripts/itc-custom-select.js":
/*!******************************************!*\
  !*** ./src/scripts/itc-custom-select.js ***!
  \******************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   ItcCustomSelect: () => (/* binding */ ItcCustomSelect)
/* harmony export */ });
class ItcCustomSelect {
  static EL = "itc-select";
  static EL_SHOW = "itc-select_show";
  static EL_OPTION = "itc-select__option";
  static EL_OPTION_SELECTED = "itc-select__option_selected";
  static DATA = "[data-select]";
  static DATA_TOGGLE = '[data-select="toggle"]';
  static template(params) {
    const {
      name,
      options,
      targetValue
    } = params;
    const items = [];
    let selectedIndex = -1;
    let selectedValue = "";
    let selectedContent = "Выберите из списка";
    options.forEach((option, index) => {
      let selectedClass = "";
      if (option[0] === targetValue) {
        selectedClass = ` ${this.EL_OPTION_SELECTED}`;
        selectedIndex = index;
        selectedValue = option[0];
        selectedContent = option[1];
      }
      items.push(`<li class="itc-select__option${selectedClass}" data-select="option"
          data-value="${option[0]}" data-index="${index}">${option[1]}</li>`);
    });
    return `<button type="button" class="itc-select__toggle" name="${name}"
        value="${selectedValue}" data-select="toggle" data-index="${selectedIndex}">
        ${selectedContent}</button><div class="itc-select__dropdown">
        <ul class="itc-select__options">${items.join("")}</ul></div>`;
  }
  static hideOpenSelect() {
    document.addEventListener("click", e => {
      if (!e.target.closest(`.${this.EL}`)) {
        const elsActive = document.querySelectorAll(`.${this.EL_SHOW}`);
        elsActive.forEach(el => {
          el.classList.remove(this.EL_SHOW);
        });
      }
    });
  }
  static create(target, params) {
    this._el = typeof target === "string" ? document.querySelector(target) : target;
    if (this._el) {
      return new this(target, params);
    }
    return null;
  }
  constructor(target, params) {
    this._el = typeof target === "string" ? document.querySelector(target) : target;
    this._params = params || {};
    this._onClickFn = this._onClick.bind(this);
    if (this._params.options) {
      this._el.innerHTML = this.constructor.template(this._params);
      this._el.classList.add(this.constructor.EL);
    }
    this._elToggle = this._el.querySelector(this.constructor.DATA_TOGGLE);
    this._el.addEventListener("click", this._onClickFn);
  }
  _onClick(e) {
    const {
      target
    } = e;
    const type = target.closest(this.constructor.DATA).dataset.select;
    if (type === "toggle") {
      this.toggle();
    } else if (type === "option") {
      this._changeValue(target);
    }
  }
  _updateOption(el) {
    const elOption = el.closest(`.${this.constructor.EL_OPTION}`);
    const elOptionSel = this._el.querySelector(`.${this.constructor.EL_OPTION_SELECTED}`);
    if (elOptionSel) {
      elOptionSel.classList.remove(this.constructor.EL_OPTION_SELECTED);
    }
    elOption.classList.add(this.constructor.EL_OPTION_SELECTED);
    this._elToggle.textContent = elOption.textContent;
    this._elToggle.value = elOption.dataset.value;
    this._elToggle.dataset.index = elOption.dataset.index;
    this._el.dispatchEvent(new CustomEvent("itc.select.change"));
    this._params.onSelected ? this._params.onSelected(this, elOption) : null;
    return elOption.dataset.value;
  }
  _reset() {
    const selected = this._el.querySelector(`.${this.constructor.EL_OPTION_SELECTED}`);
    if (selected) {
      selected.classList.remove(this.constructor.EL_OPTION_SELECTED);
    }
    this._elToggle.textContent = "Выберите из списка";
    this._elToggle.value = "";
    this._elToggle.dataset.index = "-1";
    this._el.dispatchEvent(new CustomEvent("itc.select.change"));
    this._params.onSelected ? this._params.onSelected(this, null) : null;
    return "";
  }
  _changeValue(el) {
    if (el.classList.contains(this.constructor.EL_OPTION_SELECTED)) {
      return;
    }
    this._updateOption(el);
    this.hide();
  }
  show() {
    document.querySelectorAll(this.constructor.EL_SHOW).forEach(el => {
      el.classList.remove(this.constructor.EL_SHOW);
    });
    this._el.classList.add(`${this.constructor.EL_SHOW}`);
  }
  hide() {
    this._el.classList.remove(this.constructor.EL_SHOW);
  }
  toggle() {
    this._el.classList.contains(this.constructor.EL_SHOW) ? this.hide() : this.show();
  }
  dispose() {
    this._el.removeEventListener("click", this._onClickFn);
  }
  get value() {
    return this._elToggle.value;
  }
  set value(value) {
    let isExists = false;
    this._el.querySelectorAll(".select__option").forEach(option => {
      if (option.dataset.value === value) {
        isExists = true;
        this._updateOption(option);
      }
    });
    if (!isExists) {
      this._reset();
    }
  }
  get selectedIndex() {
    return this._elToggle.dataset.index;
  }
  set selectedIndex(index) {
    const option = this._el.querySelector(`.select__option[data-index="${index}"]`);
    if (option) {
      this._updateOption(option);
    }
    this._reset();
  }
}
ItcCustomSelect.hideOpenSelect();

/***/ }),

/***/ "./src/scripts/script.js":
/*!*******************************!*\
  !*** ./src/scripts/script.js ***!
  \*******************************/
/***/ ((module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.a(module, async (__webpack_handle_async_dependencies__, __webpack_async_result__) => { try {
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   roomId: () => (/* binding */ roomId),
/* harmony export */   userId: () => (/* binding */ userId)
/* harmony export */ });
/* harmony import */ var _style_main_scss__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../style/main.scss */ "./src/style/main.scss");
/* harmony import */ var _get_post_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./get_post.js */ "./src/scripts/get_post.js");
/* harmony import */ var _itc_custom_select_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./itc-custom-select.js */ "./src/scripts/itc-custom-select.js");
/* harmony import */ var _consts_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./consts.js */ "./src/scripts/consts.js");





//  Получаем текущего пользователя
async function getCurrentUser() {
  const cur_user = await (0,_get_post_js__WEBPACK_IMPORTED_MODULE_1__.getApiData)(_consts_js__WEBPACK_IMPORTED_MODULE_3__.urls.CURRENT);
  return cur_user[0];
}
const current_user = await getCurrentUser();

// Получаем список комнат участником которых являемся
async function getRooms() {
  return await (0,_get_post_js__WEBPACK_IMPORTED_MODULE_1__.getApiData)(_consts_js__WEBPACK_IMPORTED_MODULE_3__.urls.ROOMS);
}
let rooms = await getRooms();

// Устанавливаем текущую комнату (Первую из списка доступных)
let current_room = {
  id: 0,
  name: " "
};
if (rooms.length > 0) {
  current_room.id = rooms[0].id;
  current_room.name = rooms[0].name;
  current_room.members = rooms[0].members;
}

// Отображаем участников комнаты(кроме себя)
showRoomMembers(current_room.id);

// Формируем список комнат
let li = "";
if (rooms.length > 0) {
  current_room.id = rooms[0].id;
  for (let room of rooms) {
    const li_block = `
        <li id=${room.id} class="li-off">
            <p>${room.name}</p>
        </li>`;
    li = li + li_block;
  }
}
_consts_js__WEBPACK_IMPORTED_MODULE_3__.nodes.rooms.innerHTML = li;
console.log(document.querySelectorAll(".rooms li"));
if (current_room.id !== 0) {
  document.getElementById(current_room.id).className = "li-on";
}

// Отображаем сообщения в комнате
await (0,_get_post_js__WEBPACK_IMPORTED_MODULE_1__.getApiData)(showMessages, _consts_js__WEBPACK_IMPORTED_MODULE_3__.urls.MESSAGES + `?target=${current_room.id}`);

// Формируем список пользователей на страничке
async function showUsersData(apiData) {
  let li = "";
  const users = await apiData;
  for (let user of users) {
    const li_block = `
        <li id=${user.username} onclick="userId(id)">
            <img src="/uploads/${user.avatar}" alt="avatar" />
            <p>${user.username}</p>
        </li>`;
    li = li + li_block;
  }
  _consts_js__WEBPACK_IMPORTED_MODULE_3__.nodes.users.innerHTML = li;
}

// Формируем список участников в комнате
function showRoomMembers(id) {
  getRooms().then(result => {
    rooms = result;
    _consts_js__WEBPACK_IMPORTED_MODULE_3__.nodes.users.innerHTML = "";
    let li = "";
    for (let room of rooms) {
      if (room.id == id) {
        for (let user of room.members) {
          if (user.id !== current_user.id) {
            const li_block = `
                    <li id=${user.username}>
                        <img src="/uploads/${user.avatar}" alt="avatar" />
                        <p>${user.username}</p>
                    </li>`;
            li = li + li_block;
          }
        }
        _consts_js__WEBPACK_IMPORTED_MODULE_3__.nodes.users.innerHTML = li;
      }
    }
  });
}

// Получаем сообщения с сервера
async function showMessages(apiData) {
  let li = "";
  const messages = await apiData;
  for (let message of messages) {
    const li_block = `
    <li id=${message.author}>
    <h4>${message.author}</h4>
    <p>${message.text}</p>
  </li>`;
    li = li + li_block;
  }
  _consts_js__WEBPACK_IMPORTED_MODULE_3__.nodes.message.innerHTML = li;
}

// Список всех пользователей
// getApiData(showUsersData, urls.USERS);

//Создаем новую чат комнату
async function userId(id) {
  const rooms = await (0,_get_post_js__WEBPACK_IMPORTED_MODULE_1__.getApiData)(_consts_js__WEBPACK_IMPORTED_MODULE_3__.urls.ROOMS);
  let room_exist = await roomExist(rooms, id);
  let room_data = {
    name: id
  }; //

  if (getCurrentUser().length !== 0) {
    // Проверяем есть ли уже такая комната
    if (room_exist[1]) {
      roomId(room_exist[0]);
    } else {
      // создаем комнату
      (0,_get_post_js__WEBPACK_IMPORTED_MODULE_1__.putApiData)(room_data, _consts_js__WEBPACK_IMPORTED_MODULE_3__.urls.ROOMS).then(res => {
        return res.json();
      }).then(() => {
        // Отображаем новую комнату
      });
    }
  } else {
    alert("Войдите или зарегистрируйтесь, чтобы отправлять сообщения");
  }
}

// Проверяем существует ли комната
function roomExist(id) {
  for (let i of rooms) {
    if (i.name === id) {
      return [true];
    }
  }
  return false;
}

// Переход в комнату
function roomId(id) {
  document.getElementById(current_room.id).className = "li-off";
  current_room.id = id;
  document.getElementById(current_room.id).className = "li-on";
  _consts_js__WEBPACK_IMPORTED_MODULE_3__.nodes.users.innerHTML = "";
  showRoomMembers(id);
  (0,_get_post_js__WEBPACK_IMPORTED_MODULE_1__.getApiData)(showMessages, _consts_js__WEBPACK_IMPORTED_MODULE_3__.urls.MESSAGES + `?target=${id}`);
}
document.querySelectorAll("ul li").forEach(function (click) {
  click.addEventListener("click", function () {
    roomId(this.id);
  });
});

// Отправляем сообщение
let form = document.getElementById("message-form");
form.onsubmit = async e => {
  e.preventDefault();
  let my_form = new FormData(form);
  my_form.append("target", current_room.id);
  if (my_form.get("target") != "0" && my_form.get("text") != "") {
    let message = {
      csrfmiddlewaretoken: `${my_form.get("csrfmiddlewaretoken")}`,
      text: `${my_form.get("text")}`,
      author: current_user.username,
      target: my_form.get("target")
    };
    (0,_get_post_js__WEBPACK_IMPORTED_MODULE_1__.putApiData)(message, _consts_js__WEBPACK_IMPORTED_MODULE_3__.urls.MESSAGES).then(response => {
      console.log(response.json());
    });
  }
  e.target.reset();
};

// Кнопка добавить участника
async function addButton() {
  const response = await fetch(_consts_js__WEBPACK_IMPORTED_MODULE_3__.urls.USERS);
  if (response.ok) {
    const data = await response.json();
    const values = Object.keys(data).map((key, index) => {
      return `<li class="itc-select__option" data-select="option" data-value="${data[key].id}" data-index="${index}">${data[key].username}</li>`;
    });
    document.querySelector(".itc-select__options").innerHTML = values.join("");
    document.ITC = new _itc_custom_select_js__WEBPACK_IMPORTED_MODULE_2__.ItcCustomSelect("#select-1");
    document.querySelector(".itc-select__toggle").disabled = false;
  }
}
addButton();
document.querySelector("#select-1").addEventListener("itc.select.change", e => {
  const btn = e.target.querySelector(".itc-select__toggle");
  const data = {
    csrfmiddlewaretoken: _get_post_js__WEBPACK_IMPORTED_MODULE_1__.csrftoken,
    room: current_room.id,
    member: btn.value
  };
  if (rooms.length > 0) {
    for (let user of current_room.members) {
      if (btn.value == user.id) {
        alert("Этот пользователь уже есть в этой комнате");
        break;
      } else {
        (0,_get_post_js__WEBPACK_IMPORTED_MODULE_1__.putApiData)(data, _consts_js__WEBPACK_IMPORTED_MODULE_3__.urls.MEMBER).then(response => {
          console.log("Пользователь добавлен: ", response.json());
          showRoomMembers(current_room.id);
        });
        break;
      }
    }
  } else {
    alert("Создйте комнату");
  }
  btn.dataset.index = -1;
  btn.textContent = "Добавить участника";
});

__webpack_async_result__();
} catch(e) { __webpack_async_result__(e); } }, 1);

/***/ }),

/***/ "./src/style/main.scss":
/*!*****************************!*\
  !*** ./src/style/main.scss ***!
  \*****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
// extracted by mini-css-extract-plugin


/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/async module */
/******/ 	(() => {
/******/ 		var webpackQueues = typeof Symbol === "function" ? Symbol("webpack queues") : "__webpack_queues__";
/******/ 		var webpackExports = typeof Symbol === "function" ? Symbol("webpack exports") : "__webpack_exports__";
/******/ 		var webpackError = typeof Symbol === "function" ? Symbol("webpack error") : "__webpack_error__";
/******/ 		var resolveQueue = (queue) => {
/******/ 			if(queue && queue.d < 1) {
/******/ 				queue.d = 1;
/******/ 				queue.forEach((fn) => (fn.r--));
/******/ 				queue.forEach((fn) => (fn.r-- ? fn.r++ : fn()));
/******/ 			}
/******/ 		}
/******/ 		var wrapDeps = (deps) => (deps.map((dep) => {
/******/ 			if(dep !== null && typeof dep === "object") {
/******/ 				if(dep[webpackQueues]) return dep;
/******/ 				if(dep.then) {
/******/ 					var queue = [];
/******/ 					queue.d = 0;
/******/ 					dep.then((r) => {
/******/ 						obj[webpackExports] = r;
/******/ 						resolveQueue(queue);
/******/ 					}, (e) => {
/******/ 						obj[webpackError] = e;
/******/ 						resolveQueue(queue);
/******/ 					});
/******/ 					var obj = {};
/******/ 					obj[webpackQueues] = (fn) => (fn(queue));
/******/ 					return obj;
/******/ 				}
/******/ 			}
/******/ 			var ret = {};
/******/ 			ret[webpackQueues] = x => {};
/******/ 			ret[webpackExports] = dep;
/******/ 			return ret;
/******/ 		}));
/******/ 		__webpack_require__.a = (module, body, hasAwait) => {
/******/ 			var queue;
/******/ 			hasAwait && ((queue = []).d = -1);
/******/ 			var depQueues = new Set();
/******/ 			var exports = module.exports;
/******/ 			var currentDeps;
/******/ 			var outerResolve;
/******/ 			var reject;
/******/ 			var promise = new Promise((resolve, rej) => {
/******/ 				reject = rej;
/******/ 				outerResolve = resolve;
/******/ 			});
/******/ 			promise[webpackExports] = exports;
/******/ 			promise[webpackQueues] = (fn) => (queue && fn(queue), depQueues.forEach(fn), promise["catch"](x => {}));
/******/ 			module.exports = promise;
/******/ 			body((deps) => {
/******/ 				currentDeps = wrapDeps(deps);
/******/ 				var fn;
/******/ 				var getResult = () => (currentDeps.map((d) => {
/******/ 					if(d[webpackError]) throw d[webpackError];
/******/ 					return d[webpackExports];
/******/ 				}))
/******/ 				var promise = new Promise((resolve) => {
/******/ 					fn = () => (resolve(getResult));
/******/ 					fn.r = 0;
/******/ 					var fnQueue = (q) => (q !== queue && !depQueues.has(q) && (depQueues.add(q), q && !q.d && (fn.r++, q.push(fn))));
/******/ 					currentDeps.map((dep) => (dep[webpackQueues](fnQueue)));
/******/ 				});
/******/ 				return fn.r ? promise : getResult();
/******/ 			}, (err) => ((err ? reject(promise[webpackError] = err) : outerResolve(exports)), resolveQueue(queue)));
/******/ 			queue && queue.d < 0 && (queue.d = 0);
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module used 'module' so it can't be inlined
/******/ 	var __webpack_exports__ = __webpack_require__("./src/scripts/script.js");
/******/ 	
/******/ })()
;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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YnBhY2s6Ly9UZXN0Ly4vc3JjL3NjcmlwdHMvZ2V0X3Bvc3QuanMiLCJ3ZWJwYWNrOi8vVGVzdC8uL3NyYy9zY3JpcHRzL2l0Yy1jdXN0b20tc2VsZWN0LmpzIiwid2VicGFjazovL1Rlc3QvLi9zcmMvc2NyaXB0cy9zY3JpcHQuanMiLCJ3ZWJwYWNrOi8vVGVzdC8uL3NyYy9zdHlsZS9tYWluLnNjc3M/OTU2NiIsIndlYnBhY2s6Ly9UZXN0L3dlYnBhY2svYm9vdHN0cmFwIiwid2VicGFjazovL1Rlc3Qvd2VicGFjay9ydW50aW1lL2FzeW5jIG1vZHVsZSIsIndlYnBhY2s6Ly9UZXN0L3dlYnBhY2svcnVudGltZS9kZWZpbmUgcHJvcGVydHkgZ2V0dGVycyIsIndlYnBhY2s6Ly9UZXN0L3dlYnBhY2svcnVudGltZS9oYXNPd25Qcm9wZXJ0eSBzaG9ydGhhbmQiLCJ3ZWJwYWNrOi8vVGVzdC93ZWJwYWNrL3J1bnRpbWUvbWFrZSBuYW1lc3BhY2Ugb2JqZWN0Iiwid2VicGFjazovL1Rlc3Qvd2VicGFjay9iZWZvcmUtc3RhcnR1cCIsIndlYnBhY2s6Ly9UZXN0L3dlYnBhY2svc3RhcnR1cCIsIndlYnBhY2s6Ly9UZXN0L3dlYnBhY2svYWZ0ZXItc3RhcnR1cCJdLCJzb3VyY2VzQ29udGVudCI6WyJjb25zdCB1cmxzID0ge1xuICBST09NUzogXCIvYXBpL3Jvb20vXCIsXG4gIFVTRVJTOiBcIi9hcGkvdXNlcnMvXCIsXG4gIE1FU1NBR0VTOiBcIi9hcGkvbWVzc2FnZS9cIixcbiAgQ1VSUkVOVDogXCIvYXBpL2N1cnJlbnRfdXNlci9cIixcbiAgTUVTU0FHRTogXCIvYXBpL21lc3NhZ2UvP3RhcmdldD1cIixcbiAgTUVNQkVSOiBcIi9hcGkvbWVtYmVycy9cIixcbn07XG5cbmNvbnN0IG5vZGVzID0ge1xuICByb29tczogZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIi5yb29tc1wiKSxcbiAgdXNlcnM6IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIudXNlcnNcIiksXG4gIG1lc3NhZ2U6IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIubWVzc2FnZXNcIiksXG59O1xuXG5leHBvcnQgeyB1cmxzLCBub2RlcyB9O1xuIiwiLy8g0J/QvtC70YPRh9Cw0LXQvCDRgtC+0LrQtdC9XG5mdW5jdGlvbiBnZXRDb29raWUobmFtZSkge1xuICBsZXQgY29va2llVmFsdWUgPSBudWxsO1xuICBpZiAoZG9jdW1lbnQuY29va2llICYmIGRvY3VtZW50LmNvb2tpZSAhPT0gXCJcIikge1xuICAgIGNvbnN0IGNvb2tpZXMgPSBkb2N1bWVudC5jb29raWUuc3BsaXQoXCI7XCIpO1xuICAgIGZvciAobGV0IGkgPSAwOyBpIDwgY29va2llcy5sZW5ndGg7IGkrKykge1xuICAgICAgY29uc3QgY29va2llID0gY29va2llc1tpXS50cmltKCk7XG4gICAgICAvLyBEb2VzIHRoaXMgY29va2llIHN0cmluZyBiZWdpbiB3aXRoIHRoZSBuYW1lIHdlIHdhbnQ/XG4gICAgICBpZiAoY29va2llLnN1YnN0cmluZygwLCBuYW1lLmxlbmd0aCArIDEpID09PSBuYW1lICsgXCI9XCIpIHtcbiAgICAgICAgY29va2llVmFsdWUgPSBkZWNvZGVVUklDb21wb25lbnQoY29va2llLnN1YnN0cmluZyhuYW1lLmxlbmd0aCArIDEpKTtcbiAgICAgICAgYnJlYWs7XG4gICAgICB9XG4gICAgfVxuICB9XG4gIHJldHVybiBjb29raWVWYWx1ZTtcbn1cbmV4cG9ydCBjb25zdCBjc3JmdG9rZW4gPSBnZXRDb29raWUoXCJjc3JmdG9rZW5cIik7XG5cbi8vINCf0L7Qu9GD0YfQsNC10Lwg0LTQsNC90L3Ri9C1INGBINGB0LXRgNCy0LXRgNCwXG5hc3luYyBmdW5jdGlvbiBnZXRBcGlEYXRhKGNhbGxiYWNrLCB1cmwpIHtcbiAgaWYgKGFyZ3VtZW50cy5sZW5ndGggPiAxKSB7XG4gICAgZmV0Y2godXJsKS50aGVuKChyZXNwb25zZSkgPT4ge1xuICAgICAgcmV0dXJuIGNhbGxiYWNrKHJlc3BvbnNlLmpzb24oKSk7XG4gICAgfSk7XG4gIH0gZWxzZSB7XG4gICAgY29uc3QgcmVzcG9uc2UgPSBhd2FpdCBmZXRjaChjYWxsYmFjayk7XG4gICAgcmV0dXJuIHJlc3BvbnNlLmpzb24oKTtcbiAgfVxufVxuXG4vLyDQntGC0L/RgNCw0LLQu9GP0LXQvCDQtNCw0L3QvdGL0LUg0L3QsCDRgdC10YDQstC10YBcbmFzeW5jIGZ1bmN0aW9uIHB1dEFwaURhdGEoZGF0YSwgdXJsKSB7XG4gIHJldHVybiBmZXRjaCh1cmwsIHtcbiAgICBtZXRob2Q6IFwiUE9TVFwiLFxuICAgIGhlYWRlcnM6IHtcbiAgICAgIFwiQ29udGVudC1UeXBlXCI6IFwiYXBwbGljYXRpb24vanNvbjtjaGFyc2V0PXV0Zi04XCIsXG4gICAgICBcIlgtQ1NSRlRPS0VOXCI6IGNzcmZ0b2tlbixcbiAgICB9LFxuICAgIGJvZHk6IEpTT04uc3RyaW5naWZ5KGRhdGEpLFxuICB9KTtcbn1cblxuZXhwb3J0IHsgZ2V0QXBpRGF0YSwgcHV0QXBpRGF0YSB9O1xuIiwiZXhwb3J0IGNsYXNzIEl0Y0N1c3RvbVNlbGVjdCB7XG4gIHN0YXRpYyBFTCA9IFwiaXRjLXNlbGVjdFwiO1xuICBzdGF0aWMgRUxfU0hPVyA9IFwiaXRjLXNlbGVjdF9zaG93XCI7XG4gIHN0YXRpYyBFTF9PUFRJT04gPSBcIml0Yy1zZWxlY3RfX29wdGlvblwiO1xuICBzdGF0aWMgRUxfT1BUSU9OX1NFTEVDVEVEID0gXCJpdGMtc2VsZWN0X19vcHRpb25fc2VsZWN0ZWRcIjtcbiAgc3RhdGljIERBVEEgPSBcIltkYXRhLXNlbGVjdF1cIjtcbiAgc3RhdGljIERBVEFfVE9HR0xFID0gJ1tkYXRhLXNlbGVjdD1cInRvZ2dsZVwiXSc7XG5cbiAgc3RhdGljIHRlbXBsYXRlKHBhcmFtcykge1xuICAgIGNvbnN0IHsgbmFtZSwgb3B0aW9ucywgdGFyZ2V0VmFsdWUgfSA9IHBhcmFtcztcbiAgICBjb25zdCBpdGVtcyA9IFtdO1xuICAgIGxldCBzZWxlY3RlZEluZGV4ID0gLTE7XG4gICAgbGV0IHNlbGVjdGVkVmFsdWUgPSBcIlwiO1xuICAgIGxldCBzZWxlY3RlZENvbnRlbnQgPSBcItCS0YvQsdC10YDQuNGC0LUg0LjQtyDRgdC/0LjRgdC60LBcIjtcbiAgICBvcHRpb25zLmZvckVhY2goKG9wdGlvbiwgaW5kZXgpID0+IHtcbiAgICAgIGxldCBzZWxlY3RlZENsYXNzID0gXCJcIjtcbiAgICAgIGlmIChvcHRpb25bMF0gPT09IHRhcmdldFZhbHVlKSB7XG4gICAgICAgIHNlbGVjdGVkQ2xhc3MgPSBgICR7dGhpcy5FTF9PUFRJT05fU0VMRUNURUR9YDtcbiAgICAgICAgc2VsZWN0ZWRJbmRleCA9IGluZGV4O1xuICAgICAgICBzZWxlY3RlZFZhbHVlID0gb3B0aW9uWzBdO1xuICAgICAgICBzZWxlY3RlZENvbnRlbnQgPSBvcHRpb25bMV07XG4gICAgICB9XG4gICAgICBpdGVtcy5wdXNoKGA8bGkgY2xhc3M9XCJpdGMtc2VsZWN0X19vcHRpb24ke3NlbGVjdGVkQ2xhc3N9XCIgZGF0YS1zZWxlY3Q9XCJvcHRpb25cIlxuICAgICAgICAgIGRhdGEtdmFsdWU9XCIke29wdGlvblswXX1cIiBkYXRhLWluZGV4PVwiJHtpbmRleH1cIj4ke29wdGlvblsxXX08L2xpPmApO1xuICAgIH0pO1xuICAgIHJldHVybiBgPGJ1dHRvbiB0eXBlPVwiYnV0dG9uXCIgY2xhc3M9XCJpdGMtc2VsZWN0X190b2dnbGVcIiBuYW1lPVwiJHtuYW1lfVwiXG4gICAgICAgIHZhbHVlPVwiJHtzZWxlY3RlZFZhbHVlfVwiIGRhdGEtc2VsZWN0PVwidG9nZ2xlXCIgZGF0YS1pbmRleD1cIiR7c2VsZWN0ZWRJbmRleH1cIj5cbiAgICAgICAgJHtzZWxlY3RlZENvbnRlbnR9PC9idXR0b24+PGRpdiBjbGFzcz1cIml0Yy1zZWxlY3RfX2Ryb3Bkb3duXCI+XG4gICAgICAgIDx1bCBjbGFzcz1cIml0Yy1zZWxlY3RfX29wdGlvbnNcIj4ke2l0ZW1zLmpvaW4oXCJcIil9PC91bD48L2Rpdj5gO1xuICB9XG5cbiAgc3RhdGljIGhpZGVPcGVuU2VsZWN0KCkge1xuICAgIGRvY3VtZW50LmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCAoZSkgPT4ge1xuICAgICAgaWYgKCFlLnRhcmdldC5jbG9zZXN0KGAuJHt0aGlzLkVMfWApKSB7XG4gICAgICAgIGNvbnN0IGVsc0FjdGl2ZSA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoYC4ke3RoaXMuRUxfU0hPV31gKTtcbiAgICAgICAgZWxzQWN0aXZlLmZvckVhY2goKGVsKSA9PiB7XG4gICAgICAgICAgZWwuY2xhc3NMaXN0LnJlbW92ZSh0aGlzLkVMX1NIT1cpO1xuICAgICAgICB9KTtcbiAgICAgIH1cbiAgICB9KTtcbiAgfVxuICBzdGF0aWMgY3JlYXRlKHRhcmdldCwgcGFyYW1zKSB7XG4gICAgdGhpcy5fZWwgPVxuICAgICAgdHlwZW9mIHRhcmdldCA9PT0gXCJzdHJpbmdcIiA/IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IodGFyZ2V0KSA6IHRhcmdldDtcbiAgICBpZiAodGhpcy5fZWwpIHtcbiAgICAgIHJldHVybiBuZXcgdGhpcyh0YXJnZXQsIHBhcmFtcyk7XG4gICAgfVxuICAgIHJldHVybiBudWxsO1xuICB9XG4gIGNvbnN0cnVjdG9yKHRhcmdldCwgcGFyYW1zKSB7XG4gICAgdGhpcy5fZWwgPVxuICAgICAgdHlwZW9mIHRhcmdldCA9PT0gXCJzdHJpbmdcIiA/IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IodGFyZ2V0KSA6IHRhcmdldDtcbiAgICB0aGlzLl9wYXJhbXMgPSBwYXJhbXMgfHwge307XG4gICAgdGhpcy5fb25DbGlja0ZuID0gdGhpcy5fb25DbGljay5iaW5kKHRoaXMpO1xuICAgIGlmICh0aGlzLl9wYXJhbXMub3B0aW9ucykge1xuICAgICAgdGhpcy5fZWwuaW5uZXJIVE1MID0gdGhpcy5jb25zdHJ1Y3Rvci50ZW1wbGF0ZSh0aGlzLl9wYXJhbXMpO1xuICAgICAgdGhpcy5fZWwuY2xhc3NMaXN0LmFkZCh0aGlzLmNvbnN0cnVjdG9yLkVMKTtcbiAgICB9XG4gICAgdGhpcy5fZWxUb2dnbGUgPSB0aGlzLl9lbC5xdWVyeVNlbGVjdG9yKHRoaXMuY29uc3RydWN0b3IuREFUQV9UT0dHTEUpO1xuICAgIHRoaXMuX2VsLmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCB0aGlzLl9vbkNsaWNrRm4pO1xuICB9XG5cbiAgX29uQ2xpY2soZSkge1xuICAgIGNvbnN0IHsgdGFyZ2V0IH0gPSBlO1xuICAgIGNvbnN0IHR5cGUgPSB0YXJnZXQuY2xvc2VzdCh0aGlzLmNvbnN0cnVjdG9yLkRBVEEpLmRhdGFzZXQuc2VsZWN0O1xuICAgIGlmICh0eXBlID09PSBcInRvZ2dsZVwiKSB7XG4gICAgICB0aGlzLnRvZ2dsZSgpO1xuICAgIH0gZWxzZSBpZiAodHlwZSA9PT0gXCJvcHRpb25cIikge1xuICAgICAgdGhpcy5fY2hhbmdlVmFsdWUodGFyZ2V0KTtcbiAgICB9XG4gIH1cblxuICBfdXBkYXRlT3B0aW9uKGVsKSB7XG4gICAgY29uc3QgZWxPcHRpb24gPSBlbC5jbG9zZXN0KGAuJHt0aGlzLmNvbnN0cnVjdG9yLkVMX09QVElPTn1gKTtcbiAgICBjb25zdCBlbE9wdGlvblNlbCA9IHRoaXMuX2VsLnF1ZXJ5U2VsZWN0b3IoXG4gICAgICBgLiR7dGhpcy5jb25zdHJ1Y3Rvci5FTF9PUFRJT05fU0VMRUNURUR9YFxuICAgICk7XG4gICAgaWYgKGVsT3B0aW9uU2VsKSB7XG4gICAgICBlbE9wdGlvblNlbC5jbGFzc0xpc3QucmVtb3ZlKHRoaXMuY29uc3RydWN0b3IuRUxfT1BUSU9OX1NFTEVDVEVEKTtcbiAgICB9XG4gICAgZWxPcHRpb24uY2xhc3NMaXN0LmFkZCh0aGlzLmNvbnN0cnVjdG9yLkVMX09QVElPTl9TRUxFQ1RFRCk7XG4gICAgdGhpcy5fZWxUb2dnbGUudGV4dENvbnRlbnQgPSBlbE9wdGlvbi50ZXh0Q29udGVudDtcbiAgICB0aGlzLl9lbFRvZ2dsZS52YWx1ZSA9IGVsT3B0aW9uLmRhdGFzZXQudmFsdWU7XG4gICAgdGhpcy5fZWxUb2dnbGUuZGF0YXNldC5pbmRleCA9IGVsT3B0aW9uLmRhdGFzZXQuaW5kZXg7XG4gICAgdGhpcy5fZWwuZGlzcGF0Y2hFdmVudChuZXcgQ3VzdG9tRXZlbnQoXCJpdGMuc2VsZWN0LmNoYW5nZVwiKSk7XG4gICAgdGhpcy5fcGFyYW1zLm9uU2VsZWN0ZWQgPyB0aGlzLl9wYXJhbXMub25TZWxlY3RlZCh0aGlzLCBlbE9wdGlvbikgOiBudWxsO1xuICAgIHJldHVybiBlbE9wdGlvbi5kYXRhc2V0LnZhbHVlO1xuICB9XG5cbiAgX3Jlc2V0KCkge1xuICAgIGNvbnN0IHNlbGVjdGVkID0gdGhpcy5fZWwucXVlcnlTZWxlY3RvcihcbiAgICAgIGAuJHt0aGlzLmNvbnN0cnVjdG9yLkVMX09QVElPTl9TRUxFQ1RFRH1gXG4gICAgKTtcbiAgICBpZiAoc2VsZWN0ZWQpIHtcbiAgICAgIHNlbGVjdGVkLmNsYXNzTGlzdC5yZW1vdmUodGhpcy5jb25zdHJ1Y3Rvci5FTF9PUFRJT05fU0VMRUNURUQpO1xuICAgIH1cbiAgICB0aGlzLl9lbFRvZ2dsZS50ZXh0Q29udGVudCA9IFwi0JLRi9Cx0LXRgNC40YLQtSDQuNC3INGB0L/QuNGB0LrQsFwiO1xuICAgIHRoaXMuX2VsVG9nZ2xlLnZhbHVlID0gXCJcIjtcbiAgICB0aGlzLl9lbFRvZ2dsZS5kYXRhc2V0LmluZGV4ID0gXCItMVwiO1xuICAgIHRoaXMuX2VsLmRpc3BhdGNoRXZlbnQobmV3IEN1c3RvbUV2ZW50KFwiaXRjLnNlbGVjdC5jaGFuZ2VcIikpO1xuICAgIHRoaXMuX3BhcmFtcy5vblNlbGVjdGVkID8gdGhpcy5fcGFyYW1zLm9uU2VsZWN0ZWQodGhpcywgbnVsbCkgOiBudWxsO1xuICAgIHJldHVybiBcIlwiO1xuICB9XG5cbiAgX2NoYW5nZVZhbHVlKGVsKSB7XG4gICAgaWYgKGVsLmNsYXNzTGlzdC5jb250YWlucyh0aGlzLmNvbnN0cnVjdG9yLkVMX09QVElPTl9TRUxFQ1RFRCkpIHtcbiAgICAgIHJldHVybjtcbiAgICB9XG4gICAgdGhpcy5fdXBkYXRlT3B0aW9uKGVsKTtcbiAgICB0aGlzLmhpZGUoKTtcbiAgfVxuXG4gIHNob3coKSB7XG4gICAgZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbCh0aGlzLmNvbnN0cnVjdG9yLkVMX1NIT1cpLmZvckVhY2goKGVsKSA9PiB7XG4gICAgICBlbC5jbGFzc0xpc3QucmVtb3ZlKHRoaXMuY29uc3RydWN0b3IuRUxfU0hPVyk7XG4gICAgfSk7XG4gICAgdGhpcy5fZWwuY2xhc3NMaXN0LmFkZChgJHt0aGlzLmNvbnN0cnVjdG9yLkVMX1NIT1d9YCk7XG4gIH1cblxuICBoaWRlKCkge1xuICAgIHRoaXMuX2VsLmNsYXNzTGlzdC5yZW1vdmUodGhpcy5jb25zdHJ1Y3Rvci5FTF9TSE9XKTtcbiAgfVxuXG4gIHRvZ2dsZSgpIHtcbiAgICB0aGlzLl9lbC5jbGFzc0xpc3QuY29udGFpbnModGhpcy5jb25zdHJ1Y3Rvci5FTF9TSE9XKVxuICAgICAgPyB0aGlzLmhpZGUoKVxuICAgICAgOiB0aGlzLnNob3coKTtcbiAgfVxuXG4gIGRpc3Bvc2UoKSB7XG4gICAgdGhpcy5fZWwucmVtb3ZlRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsIHRoaXMuX29uQ2xpY2tGbik7XG4gIH1cblxuICBnZXQgdmFsdWUoKSB7XG4gICAgcmV0dXJuIHRoaXMuX2VsVG9nZ2xlLnZhbHVlO1xuICB9XG5cbiAgc2V0IHZhbHVlKHZhbHVlKSB7XG4gICAgbGV0IGlzRXhpc3RzID0gZmFsc2U7XG4gICAgdGhpcy5fZWwucXVlcnlTZWxlY3RvckFsbChcIi5zZWxlY3RfX29wdGlvblwiKS5mb3JFYWNoKChvcHRpb24pID0+IHtcbiAgICAgIGlmIChvcHRpb24uZGF0YXNldC52YWx1ZSA9PT0gdmFsdWUpIHtcbiAgICAgICAgaXNFeGlzdHMgPSB0cnVlO1xuICAgICAgICB0aGlzLl91cGRhdGVPcHRpb24ob3B0aW9uKTtcbiAgICAgIH1cbiAgICB9KTtcbiAgICBpZiAoIWlzRXhpc3RzKSB7XG4gICAgICB0aGlzLl9yZXNldCgpO1xuICAgIH1cbiAgfVxuXG4gIGdldCBzZWxlY3RlZEluZGV4KCkge1xuICAgIHJldHVybiB0aGlzLl9lbFRvZ2dsZS5kYXRhc2V0LmluZGV4O1xuICB9XG5cbiAgc2V0IHNlbGVjdGVkSW5kZXgoaW5kZXgpIHtcbiAgICBjb25zdCBvcHRpb24gPSB0aGlzLl9lbC5xdWVyeVNlbGVjdG9yKFxuICAgICAgYC5zZWxlY3RfX29wdGlvbltkYXRhLWluZGV4PVwiJHtpbmRleH1cIl1gXG4gICAgKTtcbiAgICBpZiAob3B0aW9uKSB7XG4gICAgICB0aGlzLl91cGRhdGVPcHRpb24ob3B0aW9uKTtcbiAgICB9XG4gICAgdGhpcy5fcmVzZXQoKTtcbiAgfVxufVxuXG5JdGNDdXN0b21TZWxlY3QuaGlkZU9wZW5TZWxlY3QoKTtcbiIsImltcG9ydCBcIi4uL3N0eWxlL21haW4uc2Nzc1wiO1xuaW1wb3J0IHsgZ2V0QXBpRGF0YSwgcHV0QXBpRGF0YSwgY3NyZnRva2VuIH0gZnJvbSBcIi4vZ2V0X3Bvc3QuanNcIjtcbmltcG9ydCB7IEl0Y0N1c3RvbVNlbGVjdCB9IGZyb20gXCIuL2l0Yy1jdXN0b20tc2VsZWN0LmpzXCI7XG5pbXBvcnQgeyBub2RlcywgdXJscyB9IGZyb20gXCIuL2NvbnN0cy5qc1wiO1xuXG4vLyAg0J/QvtC70YPRh9Cw0LXQvCDRgtC10LrRg9GJ0LXQs9C+INC/0L7Qu9GM0LfQvtCy0LDRgtC10LvRj1xuYXN5bmMgZnVuY3Rpb24gZ2V0Q3VycmVudFVzZXIoKSB7XG4gIGNvbnN0IGN1cl91c2VyID0gYXdhaXQgZ2V0QXBpRGF0YSh1cmxzLkNVUlJFTlQpO1xuICByZXR1cm4gY3VyX3VzZXJbMF07XG59XG5cbmNvbnN0IGN1cnJlbnRfdXNlciA9IGF3YWl0IGdldEN1cnJlbnRVc2VyKCk7XG5cbi8vINCf0L7Qu9GD0YfQsNC10Lwg0YHQv9C40YHQvtC6INC60L7QvNC90LDRgiDRg9GH0LDRgdGC0L3QuNC60L7QvCDQutC+0YLQvtGA0YvRhSDRj9Cy0LvRj9C10LzRgdGPXG5hc3luYyBmdW5jdGlvbiBnZXRSb29tcygpIHtcbiAgcmV0dXJuIGF3YWl0IGdldEFwaURhdGEodXJscy5ST09NUyk7XG59XG5cbmxldCByb29tcyA9IGF3YWl0IGdldFJvb21zKCk7XG5cbi8vINCj0YHRgtCw0L3QsNCy0LvQuNCy0LDQtdC8INGC0LXQutGD0YnRg9GOINC60L7QvNC90LDRgtGDICjQn9C10YDQstGD0Y4g0LjQtyDRgdC/0LjRgdC60LAg0LTQvtGB0YLRg9C/0L3Ri9GFKVxubGV0IGN1cnJlbnRfcm9vbSA9IHsgaWQ6IDAsIG5hbWU6IFwiIFwiIH07XG5pZiAocm9vbXMubGVuZ3RoID4gMCkge1xuICBjdXJyZW50X3Jvb20uaWQgPSByb29tc1swXS5pZDtcbiAgY3VycmVudF9yb29tLm5hbWUgPSByb29tc1swXS5uYW1lO1xuICBjdXJyZW50X3Jvb20ubWVtYmVycyA9IHJvb21zWzBdLm1lbWJlcnM7XG59XG5cbi8vINCe0YLQvtCx0YDQsNC20LDQtdC8INGD0YfQsNGB0YLQvdC40LrQvtCyINC60L7QvNC90LDRgtGLKNC60YDQvtC80LUg0YHQtdCx0Y8pXG5zaG93Um9vbU1lbWJlcnMoY3VycmVudF9yb29tLmlkKTtcblxuLy8g0KTQvtGA0LzQuNGA0YPQtdC8INGB0L/QuNGB0L7QuiDQutC+0LzQvdCw0YJcbmxldCBsaSA9IFwiXCI7XG5pZiAocm9vbXMubGVuZ3RoID4gMCkge1xuICBjdXJyZW50X3Jvb20uaWQgPSByb29tc1swXS5pZDtcbiAgZm9yIChsZXQgcm9vbSBvZiByb29tcykge1xuICAgIGNvbnN0IGxpX2Jsb2NrID0gYFxuICAgICAgICA8bGkgaWQ9JHtyb29tLmlkfSBjbGFzcz1cImxpLW9mZlwiPlxuICAgICAgICAgICAgPHA+JHtyb29tLm5hbWV9PC9wPlxuICAgICAgICA8L2xpPmA7XG4gICAgbGkgPSBsaSArIGxpX2Jsb2NrO1xuICB9XG59XG5ub2Rlcy5yb29tcy5pbm5lckhUTUwgPSBsaTtcblxuY29uc29sZS5sb2coZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbChcIi5yb29tcyBsaVwiKSk7XG5pZiAoY3VycmVudF9yb29tLmlkICE9PSAwKSB7XG4gIGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKGN1cnJlbnRfcm9vbS5pZCkuY2xhc3NOYW1lID0gXCJsaS1vblwiO1xufVxuXG4vLyDQntGC0L7QsdGA0LDQttCw0LXQvCDRgdC+0L7QsdGJ0LXQvdC40Y8g0LIg0LrQvtC80L3QsNGC0LVcbmF3YWl0IGdldEFwaURhdGEoc2hvd01lc3NhZ2VzLCB1cmxzLk1FU1NBR0VTICsgYD90YXJnZXQ9JHtjdXJyZW50X3Jvb20uaWR9YCk7XG5cbi8vINCk0L7RgNC80LjRgNGD0LXQvCDRgdC/0LjRgdC+0Log0L/QvtC70YzQt9C+0LLQsNGC0LXQu9C10Lkg0L3QsCDRgdGC0YDQsNC90LjRh9C60LVcbmFzeW5jIGZ1bmN0aW9uIHNob3dVc2Vyc0RhdGEoYXBpRGF0YSkge1xuICBsZXQgbGkgPSBcIlwiO1xuICBjb25zdCB1c2VycyA9IGF3YWl0IGFwaURhdGE7XG4gIGZvciAobGV0IHVzZXIgb2YgdXNlcnMpIHtcbiAgICBjb25zdCBsaV9ibG9jayA9IGBcbiAgICAgICAgPGxpIGlkPSR7dXNlci51c2VybmFtZX0gb25jbGljaz1cInVzZXJJZChpZClcIj5cbiAgICAgICAgICAgIDxpbWcgc3JjPVwiL3VwbG9hZHMvJHt1c2VyLmF2YXRhcn1cIiBhbHQ9XCJhdmF0YXJcIiAvPlxuICAgICAgICAgICAgPHA+JHt1c2VyLnVzZXJuYW1lfTwvcD5cbiAgICAgICAgPC9saT5gO1xuICAgIGxpID0gbGkgKyBsaV9ibG9jaztcbiAgfVxuICBub2Rlcy51c2Vycy5pbm5lckhUTUwgPSBsaTtcbn1cblxuLy8g0KTQvtGA0LzQuNGA0YPQtdC8INGB0L/QuNGB0L7QuiDRg9GH0LDRgdGC0L3QuNC60L7QsiDQsiDQutC+0LzQvdCw0YLQtVxuZnVuY3Rpb24gc2hvd1Jvb21NZW1iZXJzKGlkKSB7XG4gIGdldFJvb21zKCkudGhlbigocmVzdWx0KSA9PiB7XG4gICAgcm9vbXMgPSByZXN1bHQ7XG4gICAgbm9kZXMudXNlcnMuaW5uZXJIVE1MID0gXCJcIjtcbiAgICBsZXQgbGkgPSBcIlwiO1xuICAgIGZvciAobGV0IHJvb20gb2Ygcm9vbXMpIHtcbiAgICAgIGlmIChyb29tLmlkID09IGlkKSB7XG4gICAgICAgIGZvciAobGV0IHVzZXIgb2Ygcm9vbS5tZW1iZXJzKSB7XG4gICAgICAgICAgaWYgKHVzZXIuaWQgIT09IGN1cnJlbnRfdXNlci5pZCkge1xuICAgICAgICAgICAgY29uc3QgbGlfYmxvY2sgPSBgXG4gICAgICAgICAgICAgICAgICAgIDxsaSBpZD0ke3VzZXIudXNlcm5hbWV9PlxuICAgICAgICAgICAgICAgICAgICAgICAgPGltZyBzcmM9XCIvdXBsb2Fkcy8ke3VzZXIuYXZhdGFyfVwiIGFsdD1cImF2YXRhclwiIC8+XG4gICAgICAgICAgICAgICAgICAgICAgICA8cD4ke3VzZXIudXNlcm5hbWV9PC9wPlxuICAgICAgICAgICAgICAgICAgICA8L2xpPmA7XG4gICAgICAgICAgICBsaSA9IGxpICsgbGlfYmxvY2s7XG4gICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIG5vZGVzLnVzZXJzLmlubmVySFRNTCA9IGxpO1xuICAgICAgfVxuICAgIH1cbiAgfSk7XG59XG5cbi8vINCf0L7Qu9GD0YfQsNC10Lwg0YHQvtC+0LHRidC10L3QuNGPINGBINGB0LXRgNCy0LXRgNCwXG5hc3luYyBmdW5jdGlvbiBzaG93TWVzc2FnZXMoYXBpRGF0YSkge1xuICBsZXQgbGkgPSBcIlwiO1xuICBjb25zdCBtZXNzYWdlcyA9IGF3YWl0IGFwaURhdGE7XG4gIGZvciAobGV0IG1lc3NhZ2Ugb2YgbWVzc2FnZXMpIHtcbiAgICBjb25zdCBsaV9ibG9jayA9IGBcbiAgICA8bGkgaWQ9JHttZXNzYWdlLmF1dGhvcn0+XG4gICAgPGg0PiR7bWVzc2FnZS5hdXRob3J9PC9oND5cbiAgICA8cD4ke21lc3NhZ2UudGV4dH08L3A+XG4gIDwvbGk+YDtcbiAgICBsaSA9IGxpICsgbGlfYmxvY2s7XG4gIH1cbiAgbm9kZXMubWVzc2FnZS5pbm5lckhUTUwgPSBsaTtcbn1cblxuLy8g0KHQv9C40YHQvtC6INCy0YHQtdGFINC/0L7Qu9GM0LfQvtCy0LDRgtC10LvQtdC5XG4vLyBnZXRBcGlEYXRhKHNob3dVc2Vyc0RhdGEsIHVybHMuVVNFUlMpO1xuXG4vL9Ch0L7Qt9C00LDQtdC8INC90L7QstGD0Y4g0YfQsNGCINC60L7QvNC90LDRgtGDXG5hc3luYyBmdW5jdGlvbiB1c2VySWQoaWQpIHtcbiAgY29uc3Qgcm9vbXMgPSBhd2FpdCBnZXRBcGlEYXRhKHVybHMuUk9PTVMpO1xuICBsZXQgcm9vbV9leGlzdCA9IGF3YWl0IHJvb21FeGlzdChyb29tcywgaWQpO1xuICBsZXQgcm9vbV9kYXRhID0ge1xuICAgIG5hbWU6IGlkLFxuICB9OyAvL1xuXG4gIGlmIChnZXRDdXJyZW50VXNlcigpLmxlbmd0aCAhPT0gMCkge1xuICAgIC8vINCf0YDQvtCy0LXRgNGP0LXQvCDQtdGB0YLRjCDQu9C4INGD0LbQtSDRgtCw0LrQsNGPINC60L7QvNC90LDRgtCwXG4gICAgaWYgKHJvb21fZXhpc3RbMV0pIHtcbiAgICAgIHJvb21JZChyb29tX2V4aXN0WzBdKTtcbiAgICB9IGVsc2Uge1xuICAgICAgLy8g0YHQvtC30LTQsNC10Lwg0LrQvtC80L3QsNGC0YNcbiAgICAgIHB1dEFwaURhdGEocm9vbV9kYXRhLCB1cmxzLlJPT01TKVxuICAgICAgICAudGhlbigocmVzKSA9PiB7XG4gICAgICAgICAgcmV0dXJuIHJlcy5qc29uKCk7XG4gICAgICAgIH0pXG4gICAgICAgIC50aGVuKCgpID0+IHtcbiAgICAgICAgICAvLyDQntGC0L7QsdGA0LDQttCw0LXQvCDQvdC+0LLRg9GOINC60L7QvNC90LDRgtGDXG4gICAgICAgIH0pO1xuICAgIH1cbiAgfSBlbHNlIHtcbiAgICBhbGVydChcItCS0L7QudC00LjRgtC1INC40LvQuCDQt9Cw0YDQtdCz0LjRgdGC0YDQuNGA0YPQudGC0LXRgdGMLCDRh9GC0L7QsdGLINC+0YLQv9GA0LDQstC70Y/RgtGMINGB0L7QvtCx0YnQtdC90LjRj1wiKTtcbiAgfVxufVxuXG4vLyDQn9GA0L7QstC10YDRj9C10Lwg0YHRg9GJ0LXRgdGC0LLRg9C10YIg0LvQuCDQutC+0LzQvdCw0YLQsFxuZnVuY3Rpb24gcm9vbUV4aXN0KGlkKSB7XG4gIGZvciAobGV0IGkgb2Ygcm9vbXMpIHtcbiAgICBpZiAoaS5uYW1lID09PSBpZCkge1xuICAgICAgcmV0dXJuIFt0cnVlXTtcbiAgICB9XG4gIH1cbiAgcmV0dXJuIGZhbHNlO1xufVxuXG4vLyDQn9C10YDQtdGF0L7QtCDQsiDQutC+0LzQvdCw0YLRg1xuZnVuY3Rpb24gcm9vbUlkKGlkKSB7XG4gIGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKGN1cnJlbnRfcm9vbS5pZCkuY2xhc3NOYW1lID0gXCJsaS1vZmZcIjtcbiAgY3VycmVudF9yb29tLmlkID0gaWQ7XG4gIGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKGN1cnJlbnRfcm9vbS5pZCkuY2xhc3NOYW1lID0gXCJsaS1vblwiO1xuICBub2Rlcy51c2Vycy5pbm5lckhUTUwgPSBcIlwiO1xuICBzaG93Um9vbU1lbWJlcnMoaWQpO1xuICBnZXRBcGlEYXRhKHNob3dNZXNzYWdlcywgdXJscy5NRVNTQUdFUyArIGA/dGFyZ2V0PSR7aWR9YCk7XG59XG5cbmRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoXCJ1bCBsaVwiKS5mb3JFYWNoKGZ1bmN0aW9uIChjbGljaykge1xuICBjbGljay5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgZnVuY3Rpb24gKCkge1xuICAgIHJvb21JZCh0aGlzLmlkKTtcbiAgfSk7XG59KTtcblxuLy8g0J7RgtC/0YDQsNCy0LvRj9C10Lwg0YHQvtC+0LHRidC10L3QuNC1XG5sZXQgZm9ybSA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwibWVzc2FnZS1mb3JtXCIpO1xuZm9ybS5vbnN1Ym1pdCA9IGFzeW5jIChlKSA9PiB7XG4gIGUucHJldmVudERlZmF1bHQoKTtcbiAgbGV0IG15X2Zvcm0gPSBuZXcgRm9ybURhdGEoZm9ybSk7XG5cbiAgbXlfZm9ybS5hcHBlbmQoXCJ0YXJnZXRcIiwgY3VycmVudF9yb29tLmlkKTtcbiAgaWYgKG15X2Zvcm0uZ2V0KFwidGFyZ2V0XCIpICE9IFwiMFwiICYmIG15X2Zvcm0uZ2V0KFwidGV4dFwiKSAhPSBcIlwiKSB7XG4gICAgbGV0IG1lc3NhZ2UgPSB7XG4gICAgICBjc3JmbWlkZGxld2FyZXRva2VuOiBgJHtteV9mb3JtLmdldChcImNzcmZtaWRkbGV3YXJldG9rZW5cIil9YCxcbiAgICAgIHRleHQ6IGAke215X2Zvcm0uZ2V0KFwidGV4dFwiKX1gLFxuICAgICAgYXV0aG9yOiBjdXJyZW50X3VzZXIudXNlcm5hbWUsXG4gICAgICB0YXJnZXQ6IG15X2Zvcm0uZ2V0KFwidGFyZ2V0XCIpLFxuICAgIH07XG4gICAgcHV0QXBpRGF0YShtZXNzYWdlLCB1cmxzLk1FU1NBR0VTKS50aGVuKChyZXNwb25zZSkgPT4ge1xuICAgICAgY29uc29sZS5sb2cocmVzcG9uc2UuanNvbigpKTtcbiAgICB9KTtcbiAgfVxuICBlLnRhcmdldC5yZXNldCgpO1xufTtcblxuLy8g0JrQvdC+0L/QutCwINC00L7QsdCw0LLQuNGC0Ywg0YPRh9Cw0YHRgtC90LjQutCwXG5hc3luYyBmdW5jdGlvbiBhZGRCdXR0b24oKSB7XG4gIGNvbnN0IHJlc3BvbnNlID0gYXdhaXQgZmV0Y2godXJscy5VU0VSUyk7XG4gIGlmIChyZXNwb25zZS5vaykge1xuICAgIGNvbnN0IGRhdGEgPSBhd2FpdCByZXNwb25zZS5qc29uKCk7XG4gICAgY29uc3QgdmFsdWVzID0gT2JqZWN0LmtleXMoZGF0YSkubWFwKChrZXksIGluZGV4KSA9PiB7XG4gICAgICByZXR1cm4gYDxsaSBjbGFzcz1cIml0Yy1zZWxlY3RfX29wdGlvblwiIGRhdGEtc2VsZWN0PVwib3B0aW9uXCIgZGF0YS12YWx1ZT1cIiR7ZGF0YVtrZXldLmlkfVwiIGRhdGEtaW5kZXg9XCIke2luZGV4fVwiPiR7ZGF0YVtrZXldLnVzZXJuYW1lfTwvbGk+YDtcbiAgICB9KTtcbiAgICBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiLml0Yy1zZWxlY3RfX29wdGlvbnNcIikuaW5uZXJIVE1MID0gdmFsdWVzLmpvaW4oXCJcIik7XG4gICAgZG9jdW1lbnQuSVRDID0gbmV3IEl0Y0N1c3RvbVNlbGVjdChcIiNzZWxlY3QtMVwiKTtcbiAgICBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiLml0Yy1zZWxlY3RfX3RvZ2dsZVwiKS5kaXNhYmxlZCA9IGZhbHNlO1xuICB9XG59XG5cbmFkZEJ1dHRvbigpO1xuXG5kb2N1bWVudFxuICAucXVlcnlTZWxlY3RvcihcIiNzZWxlY3QtMVwiKVxuICAuYWRkRXZlbnRMaXN0ZW5lcihcIml0Yy5zZWxlY3QuY2hhbmdlXCIsIChlKSA9PiB7XG4gICAgY29uc3QgYnRuID0gZS50YXJnZXQucXVlcnlTZWxlY3RvcihcIi5pdGMtc2VsZWN0X190b2dnbGVcIik7XG5cbiAgICBjb25zdCBkYXRhID0ge1xuICAgICAgY3NyZm1pZGRsZXdhcmV0b2tlbjogY3NyZnRva2VuLFxuICAgICAgcm9vbTogY3VycmVudF9yb29tLmlkLFxuICAgICAgbWVtYmVyOiBidG4udmFsdWUsXG4gICAgfTtcbiAgICBpZiAocm9vbXMubGVuZ3RoID4gMCkge1xuICAgICAgZm9yIChsZXQgdXNlciBvZiBjdXJyZW50X3Jvb20ubWVtYmVycykge1xuICAgICAgICBpZiAoYnRuLnZhbHVlID09IHVzZXIuaWQpIHtcbiAgICAgICAgICBhbGVydChcItCt0YLQvtGCINC/0L7Qu9GM0LfQvtCy0LDRgtC10LvRjCDRg9C20LUg0LXRgdGC0Ywg0LIg0Y3RgtC+0Lkg0LrQvtC80L3QsNGC0LVcIik7XG4gICAgICAgICAgYnJlYWs7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgcHV0QXBpRGF0YShkYXRhLCB1cmxzLk1FTUJFUikudGhlbigocmVzcG9uc2UpID0+IHtcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKFwi0J/QvtC70YzQt9C+0LLQsNGC0LXQu9GMINC00L7QsdCw0LLQu9C10L06IFwiLCByZXNwb25zZS5qc29uKCkpO1xuICAgICAgICAgICAgc2hvd1Jvb21NZW1iZXJzKGN1cnJlbnRfcm9vbS5pZCk7XG4gICAgICAgICAgfSk7XG4gICAgICAgICAgYnJlYWs7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9IGVsc2Uge1xuICAgICAgYWxlcnQoXCLQodC+0LfQtNC50YLQtSDQutC+0LzQvdCw0YLRg1wiKTtcbiAgICB9XG4gICAgYnRuLmRhdGFzZXQuaW5kZXggPSAtMTtcbiAgICBidG4udGV4dENvbnRlbnQgPSBcItCU0L7QsdCw0LLQuNGC0Ywg0YPRh9Cw0YHRgtC90LjQutCwXCI7XG4gIH0pO1xuXG5leHBvcnQgeyByb29tSWQsIHVzZXJJZCB9O1xuIiwiLy8gZXh0cmFjdGVkIGJ5IG1pbmktY3NzLWV4dHJhY3QtcGx1Z2luXG5leHBvcnQge307IiwiLy8gVGhlIG1vZHVsZSBjYWNoZVxudmFyIF9fd2VicGFja19tb2R1bGVfY2FjaGVfXyA9IHt9O1xuXG4vLyBUaGUgcmVxdWlyZSBmdW5jdGlvblxuZnVuY3Rpb24gX193ZWJwYWNrX3JlcXVpcmVfXyhtb2R1bGVJZCkge1xuXHQvLyBDaGVjayBpZiBtb2R1bGUgaXMgaW4gY2FjaGVcblx0dmFyIGNhY2hlZE1vZHVsZSA9IF9fd2VicGFja19tb2R1bGVfY2FjaGVfX1ttb2R1bGVJZF07XG5cdGlmIChjYWNoZWRNb2R1bGUgIT09IHVuZGVmaW5lZCkge1xuXHRcdHJldHVybiBjYWNoZWRNb2R1bGUuZXhwb3J0cztcblx0fVxuXHQvLyBDcmVhdGUgYSBuZXcgbW9kdWxlIChhbmQgcHV0IGl0IGludG8gdGhlIGNhY2hlKVxuXHR2YXIgbW9kdWxlID0gX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fW21vZHVsZUlkXSA9IHtcblx0XHQvLyBubyBtb2R1bGUuaWQgbmVlZGVkXG5cdFx0Ly8gbm8gbW9kdWxlLmxvYWRlZCBuZWVkZWRcblx0XHRleHBvcnRzOiB7fVxuXHR9O1xuXG5cdC8vIEV4ZWN1dGUgdGhlIG1vZHVsZSBmdW5jdGlvblxuXHRfX3dlYnBhY2tfbW9kdWxlc19fW21vZHVsZUlkXShtb2R1bGUsIG1vZHVsZS5leHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKTtcblxuXHQvLyBSZXR1cm4gdGhlIGV4cG9ydHMgb2YgdGhlIG1vZHVsZVxuXHRyZXR1cm4gbW9kdWxlLmV4cG9ydHM7XG59XG5cbiIsInZhciB3ZWJwYWNrUXVldWVzID0gdHlwZW9mIFN5bWJvbCA9PT0gXCJmdW5jdGlvblwiID8gU3ltYm9sKFwid2VicGFjayBxdWV1ZXNcIikgOiBcIl9fd2VicGFja19xdWV1ZXNfX1wiO1xudmFyIHdlYnBhY2tFeHBvcnRzID0gdHlwZW9mIFN5bWJvbCA9PT0gXCJmdW5jdGlvblwiID8gU3ltYm9sKFwid2VicGFjayBleHBvcnRzXCIpIDogXCJfX3dlYnBhY2tfZXhwb3J0c19fXCI7XG52YXIgd2VicGFja0Vycm9yID0gdHlwZW9mIFN5bWJvbCA9PT0gXCJmdW5jdGlvblwiID8gU3ltYm9sKFwid2VicGFjayBlcnJvclwiKSA6IFwiX193ZWJwYWNrX2Vycm9yX19cIjtcbnZhciByZXNvbHZlUXVldWUgPSAocXVldWUpID0+IHtcblx0aWYocXVldWUgJiYgcXVldWUuZCA8IDEpIHtcblx0XHRxdWV1ZS5kID0gMTtcblx0XHRxdWV1ZS5mb3JFYWNoKChmbikgPT4gKGZuLnItLSkpO1xuXHRcdHF1ZXVlLmZvckVhY2goKGZuKSA9PiAoZm4uci0tID8gZm4ucisrIDogZm4oKSkpO1xuXHR9XG59XG52YXIgd3JhcERlcHMgPSAoZGVwcykgPT4gKGRlcHMubWFwKChkZXApID0+IHtcblx0aWYoZGVwICE9PSBudWxsICYmIHR5cGVvZiBkZXAgPT09IFwib2JqZWN0XCIpIHtcblx0XHRpZihkZXBbd2VicGFja1F1ZXVlc10pIHJldHVybiBkZXA7XG5cdFx0aWYoZGVwLnRoZW4pIHtcblx0XHRcdHZhciBxdWV1ZSA9IFtdO1xuXHRcdFx0cXVldWUuZCA9IDA7XG5cdFx0XHRkZXAudGhlbigocikgPT4ge1xuXHRcdFx0XHRvYmpbd2VicGFja0V4cG9ydHNdID0gcjtcblx0XHRcdFx0cmVzb2x2ZVF1ZXVlKHF1ZXVlKTtcblx0XHRcdH0sIChlKSA9PiB7XG5cdFx0XHRcdG9ialt3ZWJwYWNrRXJyb3JdID0gZTtcblx0XHRcdFx0cmVzb2x2ZVF1ZXVlKHF1ZXVlKTtcblx0XHRcdH0pO1xuXHRcdFx0dmFyIG9iaiA9IHt9O1xuXHRcdFx0b2JqW3dlYnBhY2tRdWV1ZXNdID0gKGZuKSA9PiAoZm4ocXVldWUpKTtcblx0XHRcdHJldHVybiBvYmo7XG5cdFx0fVxuXHR9XG5cdHZhciByZXQgPSB7fTtcblx0cmV0W3dlYnBhY2tRdWV1ZXNdID0geCA9PiB7fTtcblx0cmV0W3dlYnBhY2tFeHBvcnRzXSA9IGRlcDtcblx0cmV0dXJuIHJldDtcbn0pKTtcbl9fd2VicGFja19yZXF1aXJlX18uYSA9IChtb2R1bGUsIGJvZHksIGhhc0F3YWl0KSA9PiB7XG5cdHZhciBxdWV1ZTtcblx0aGFzQXdhaXQgJiYgKChxdWV1ZSA9IFtdKS5kID0gLTEpO1xuXHR2YXIgZGVwUXVldWVzID0gbmV3IFNldCgpO1xuXHR2YXIgZXhwb3J0cyA9IG1vZHVsZS5leHBvcnRzO1xuXHR2YXIgY3VycmVudERlcHM7XG5cdHZhciBvdXRlclJlc29sdmU7XG5cdHZhciByZWplY3Q7XG5cdHZhciBwcm9taXNlID0gbmV3IFByb21pc2UoKHJlc29sdmUsIHJlaikgPT4ge1xuXHRcdHJlamVjdCA9IHJlajtcblx0XHRvdXRlclJlc29sdmUgPSByZXNvbHZlO1xuXHR9KTtcblx0cHJvbWlzZVt3ZWJwYWNrRXhwb3J0c10gPSBleHBvcnRzO1xuXHRwcm9taXNlW3dlYnBhY2tRdWV1ZXNdID0gKGZuKSA9PiAocXVldWUgJiYgZm4ocXVldWUpLCBkZXBRdWV1ZXMuZm9yRWFjaChmbiksIHByb21pc2VbXCJjYXRjaFwiXSh4ID0+IHt9KSk7XG5cdG1vZHVsZS5leHBvcnRzID0gcHJvbWlzZTtcblx0Ym9keSgoZGVwcykgPT4ge1xuXHRcdGN1cnJlbnREZXBzID0gd3JhcERlcHMoZGVwcyk7XG5cdFx0dmFyIGZuO1xuXHRcdHZhciBnZXRSZXN1bHQgPSAoKSA9PiAoY3VycmVudERlcHMubWFwKChkKSA9PiB7XG5cdFx0XHRpZihkW3dlYnBhY2tFcnJvcl0pIHRocm93IGRbd2VicGFja0Vycm9yXTtcblx0XHRcdHJldHVybiBkW3dlYnBhY2tFeHBvcnRzXTtcblx0XHR9KSlcblx0XHR2YXIgcHJvbWlzZSA9IG5ldyBQcm9taXNlKChyZXNvbHZlKSA9PiB7XG5cdFx0XHRmbiA9ICgpID0+IChyZXNvbHZlKGdldFJlc3VsdCkpO1xuXHRcdFx0Zm4uciA9IDA7XG5cdFx0XHR2YXIgZm5RdWV1ZSA9IChxKSA9PiAocSAhPT0gcXVldWUgJiYgIWRlcFF1ZXVlcy5oYXMocSkgJiYgKGRlcFF1ZXVlcy5hZGQocSksIHEgJiYgIXEuZCAmJiAoZm4ucisrLCBxLnB1c2goZm4pKSkpO1xuXHRcdFx0Y3VycmVudERlcHMubWFwKChkZXApID0+IChkZXBbd2VicGFja1F1ZXVlc10oZm5RdWV1ZSkpKTtcblx0XHR9KTtcblx0XHRyZXR1cm4gZm4uciA/IHByb21pc2UgOiBnZXRSZXN1bHQoKTtcblx0fSwgKGVycikgPT4gKChlcnIgPyByZWplY3QocHJvbWlzZVt3ZWJwYWNrRXJyb3JdID0gZXJyKSA6IG91dGVyUmVzb2x2ZShleHBvcnRzKSksIHJlc29sdmVRdWV1ZShxdWV1ZSkpKTtcblx0cXVldWUgJiYgcXVldWUuZCA8IDAgJiYgKHF1ZXVlLmQgPSAwKTtcbn07IiwiLy8gZGVmaW5lIGdldHRlciBmdW5jdGlvbnMgZm9yIGhhcm1vbnkgZXhwb3J0c1xuX193ZWJwYWNrX3JlcXVpcmVfXy5kID0gKGV4cG9ydHMsIGRlZmluaXRpb24pID0+IHtcblx0Zm9yKHZhciBrZXkgaW4gZGVmaW5pdGlvbikge1xuXHRcdGlmKF9fd2VicGFja19yZXF1aXJlX18ubyhkZWZpbml0aW9uLCBrZXkpICYmICFfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZXhwb3J0cywga2V5KSkge1xuXHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIGtleSwgeyBlbnVtZXJhYmxlOiB0cnVlLCBnZXQ6IGRlZmluaXRpb25ba2V5XSB9KTtcblx0XHR9XG5cdH1cbn07IiwiX193ZWJwYWNrX3JlcXVpcmVfXy5vID0gKG9iaiwgcHJvcCkgPT4gKE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChvYmosIHByb3ApKSIsIi8vIGRlZmluZSBfX2VzTW9kdWxlIG9uIGV4cG9ydHNcbl9fd2VicGFja19yZXF1aXJlX18uciA9IChleHBvcnRzKSA9PiB7XG5cdGlmKHR5cGVvZiBTeW1ib2wgIT09ICd1bmRlZmluZWQnICYmIFN5bWJvbC50b1N0cmluZ1RhZykge1xuXHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBTeW1ib2wudG9TdHJpbmdUYWcsIHsgdmFsdWU6ICdNb2R1bGUnIH0pO1xuXHR9XG5cdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCAnX19lc01vZHVsZScsIHsgdmFsdWU6IHRydWUgfSk7XG59OyIsIiIsIi8vIHN0YXJ0dXBcbi8vIExvYWQgZW50cnkgbW9kdWxlIGFuZCByZXR1cm4gZXhwb3J0c1xuLy8gVGhpcyBlbnRyeSBtb2R1bGUgdXNlZCAnbW9kdWxlJyBzbyBpdCBjYW4ndCBiZSBpbmxpbmVkXG52YXIgX193ZWJwYWNrX2V4cG9ydHNfXyA9IF9fd2VicGFja19yZXF1aXJlX18oXCIuL3NyYy9zY3JpcHRzL3NjcmlwdC5qc1wiKTtcbiIsIiJdLCJuYW1lcyI6WyJ1cmxzIiwiUk9PTVMiLCJVU0VSUyIsIk1FU1NBR0VTIiwiQ1VSUkVOVCIsIk1FU1NBR0UiLCJNRU1CRVIiLCJub2RlcyIsInJvb21zIiwiZG9jdW1lbnQiLCJxdWVyeVNlbGVjdG9yIiwidXNlcnMiLCJtZXNzYWdlIiwiZ2V0Q29va2llIiwibmFtZSIsImNvb2tpZVZhbHVlIiwiY29va2llIiwiY29va2llcyIsInNwbGl0IiwiaSIsImxlbmd0aCIsInRyaW0iLCJzdWJzdHJpbmciLCJkZWNvZGVVUklDb21wb25lbnQiLCJjc3JmdG9rZW4iLCJnZXRBcGlEYXRhIiwiY2FsbGJhY2siLCJ1cmwiLCJhcmd1bWVudHMiLCJmZXRjaCIsInRoZW4iLCJyZXNwb25zZSIsImpzb24iLCJwdXRBcGlEYXRhIiwiZGF0YSIsIm1ldGhvZCIsImhlYWRlcnMiLCJib2R5IiwiSlNPTiIsInN0cmluZ2lmeSIsIkl0Y0N1c3RvbVNlbGVjdCIsIkVMIiwiRUxfU0hPVyIsIkVMX09QVElPTiIsIkVMX09QVElPTl9TRUxFQ1RFRCIsIkRBVEEiLCJEQVRBX1RPR0dMRSIsInRlbXBsYXRlIiwicGFyYW1zIiwib3B0aW9ucyIsInRhcmdldFZhbHVlIiwiaXRlbXMiLCJzZWxlY3RlZEluZGV4Iiwic2VsZWN0ZWRWYWx1ZSIsInNlbGVjdGVkQ29udGVudCIsImZvckVhY2giLCJvcHRpb24iLCJpbmRleCIsInNlbGVjdGVkQ2xhc3MiLCJwdXNoIiwiam9pbiIsImhpZGVPcGVuU2VsZWN0IiwiYWRkRXZlbnRMaXN0ZW5lciIsImUiLCJ0YXJnZXQiLCJjbG9zZXN0IiwiZWxzQWN0aXZlIiwicXVlcnlTZWxlY3RvckFsbCIsImVsIiwiY2xhc3NMaXN0IiwicmVtb3ZlIiwiY3JlYXRlIiwiX2VsIiwiY29uc3RydWN0b3IiLCJfcGFyYW1zIiwiX29uQ2xpY2tGbiIsIl9vbkNsaWNrIiwiYmluZCIsImlubmVySFRNTCIsImFkZCIsIl9lbFRvZ2dsZSIsInR5cGUiLCJkYXRhc2V0Iiwic2VsZWN0IiwidG9nZ2xlIiwiX2NoYW5nZVZhbHVlIiwiX3VwZGF0ZU9wdGlvbiIsImVsT3B0aW9uIiwiZWxPcHRpb25TZWwiLCJ0ZXh0Q29udGVudCIsInZhbHVlIiwiZGlzcGF0Y2hFdmVudCIsIkN1c3RvbUV2ZW50Iiwib25TZWxlY3RlZCIsIl9yZXNldCIsInNlbGVjdGVkIiwiY29udGFpbnMiLCJoaWRlIiwic2hvdyIsImRpc3Bvc2UiLCJyZW1vdmVFdmVudExpc3RlbmVyIiwiaXNFeGlzdHMiLCJnZXRDdXJyZW50VXNlciIsImN1cl91c2VyIiwiY3VycmVudF91c2VyIiwiZ2V0Um9vbXMiLCJjdXJyZW50X3Jvb20iLCJpZCIsIm1lbWJlcnMiLCJzaG93Um9vbU1lbWJlcnMiLCJsaSIsInJvb20iLCJsaV9ibG9jayIsImNvbnNvbGUiLCJsb2ciLCJnZXRFbGVtZW50QnlJZCIsImNsYXNzTmFtZSIsInNob3dNZXNzYWdlcyIsInNob3dVc2Vyc0RhdGEiLCJhcGlEYXRhIiwidXNlciIsInVzZXJuYW1lIiwiYXZhdGFyIiwicmVzdWx0IiwibWVzc2FnZXMiLCJhdXRob3IiLCJ0ZXh0IiwidXNlcklkIiwicm9vbV9leGlzdCIsInJvb21FeGlzdCIsInJvb21fZGF0YSIsInJvb21JZCIsInJlcyIsImFsZXJ0IiwiY2xpY2siLCJmb3JtIiwib25zdWJtaXQiLCJwcmV2ZW50RGVmYXVsdCIsIm15X2Zvcm0iLCJGb3JtRGF0YSIsImFwcGVuZCIsImdldCIsImNzcmZtaWRkbGV3YXJldG9rZW4iLCJyZXNldCIsImFkZEJ1dHRvbiIsIm9rIiwidmFsdWVzIiwiT2JqZWN0Iiwia2V5cyIsIm1hcCIsImtleSIsIklUQyIsImRpc2FibGVkIiwiYnRuIiwibWVtYmVyIl0sInNvdXJjZVJvb3QiOiIifQ==