/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./static/scripts/temp_scripts/consts.js":
/*!***********************************************!*\
  !*** ./static/scripts/temp_scripts/consts.js ***!
  \***********************************************/
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
    CURRENT:"/api/current_user/",
    MESSAGE: "/api/message/?target=",
    MEMBER: "/api/members/",
}

const nodes = {
    rooms: document.querySelector(".rooms"),
    users: document.querySelector(".users"),
    message: document.querySelector(".messages"),
}



/***/ }),

/***/ "./static/scripts/temp_scripts/get_post.js":
/*!*************************************************!*\
  !*** ./static/scripts/temp_scripts/get_post.js ***!
  \*************************************************/
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
    fetch(url).then((response) => {
      return callback(response.json())
    })
    } else {
    const response = await fetch(callback)
    return response.json()
    }
  }

// Отправляем данные на сервер
async function putApiData(data, url) {
  return fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json;charset=utf-8",
      "X-CSRFTOKEN": csrftoken,
    },
    body: JSON.stringify(data)
  })
}



/***/ }),

/***/ "./static/scripts/temp_scripts/itc-custom-select.js":
/*!**********************************************************!*\
  !*** ./static/scripts/temp_scripts/itc-custom-select.js ***!
  \**********************************************************/
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
    const { name, options, targetValue } = params;
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
    document.addEventListener("click", (e) => {
      if (!e.target.closest(`.${this.EL}`)) {
        const elsActive = document.querySelectorAll(`.${this.EL_SHOW}`);
        elsActive.forEach((el) => {
          el.classList.remove(this.EL_SHOW);
        });
      }
    });
  }
  static create(target, params) {
    this._el =
      typeof target === "string" ? document.querySelector(target) : target;
    if (this._el) {
      return new this(target, params);
    }
    return null;
  }
  constructor(target, params) {
    this._el =
      typeof target === "string" ? document.querySelector(target) : target;
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
    const { target } = e;
    const type = target.closest(this.constructor.DATA).dataset.select;
    if (type === "toggle") {
      this.toggle();
    } else if (type === "option") {
      this._changeValue(target);
    }
  }

  _updateOption(el) {
    const elOption = el.closest(`.${this.constructor.EL_OPTION}`);
    const elOptionSel = this._el.querySelector(
      `.${this.constructor.EL_OPTION_SELECTED}`
    );
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
    const selected = this._el.querySelector(
      `.${this.constructor.EL_OPTION_SELECTED}`
    );
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
    document.querySelectorAll(this.constructor.EL_SHOW).forEach((el) => {
      el.classList.remove(this.constructor.EL_SHOW);
    });
    this._el.classList.add(`${this.constructor.EL_SHOW}`);
  }

  hide() {
    this._el.classList.remove(this.constructor.EL_SHOW);
  }

  toggle() {
    this._el.classList.contains(this.constructor.EL_SHOW)
      ? this.hide()
      : this.show();
  }

  dispose() {
    this._el.removeEventListener("click", this._onClickFn);
  }

  get value() {
    return this._elToggle.value;
  }

  set value(value) {
    let isExists = false;
    this._el.querySelectorAll(".select__option").forEach((option) => {
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
    const option = this._el.querySelector(
      `.select__option[data-index="${index}"]`
    );
    if (option) {
      this._updateOption(option);
    }
    this._reset();
  }
}

ItcCustomSelect.hideOpenSelect();


/***/ }),

/***/ "./static/scripts/temp_scripts/script.js":
/*!***********************************************!*\
  !*** ./static/scripts/temp_scripts/script.js ***!
  \***********************************************/
/***/ ((module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.a(module, async (__webpack_handle_async_dependencies__, __webpack_async_result__) => { try {
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   roomId: () => (/* binding */ roomId),
/* harmony export */   userId: () => (/* binding */ userId)
/* harmony export */ });
/* harmony import */ var _get_post_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./get_post.js */ "./static/scripts/temp_scripts/get_post.js");
/* harmony import */ var _itc_custom_select_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./itc-custom-select.js */ "./static/scripts/temp_scripts/itc-custom-select.js");
/* harmony import */ var _consts_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./consts.js */ "./static/scripts/temp_scripts/consts.js");




//  Получаем текущего пользователя
async function getCurrentUser() {
  const cur_user = await (0,_get_post_js__WEBPACK_IMPORTED_MODULE_0__.getApiData)(_consts_js__WEBPACK_IMPORTED_MODULE_2__.urls.CURRENT);
  return cur_user[0];
}

const current_user = await getCurrentUser();

// Получаем список комнат участником которых являемся
async function getRooms() {
  return await (0,_get_post_js__WEBPACK_IMPORTED_MODULE_0__.getApiData)(_consts_js__WEBPACK_IMPORTED_MODULE_2__.urls.ROOMS);
}

let rooms = await getRooms();

// Устанавливаем текущую комнату (Первую из списка доступных)
let current_room = { id: 0, name: " " };
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
_consts_js__WEBPACK_IMPORTED_MODULE_2__.nodes.rooms.innerHTML = li;

console.log(document.querySelectorAll(".rooms li"));
if (current_room.id !== 0) {
  document.getElementById(current_room.id).className = "li-on";
}

// Отображаем сообщения в комнате
await (0,_get_post_js__WEBPACK_IMPORTED_MODULE_0__.getApiData)(showMessages, _consts_js__WEBPACK_IMPORTED_MODULE_2__.urls.MESSAGES + `?target=${current_room.id}`);

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
  _consts_js__WEBPACK_IMPORTED_MODULE_2__.nodes.users.innerHTML = li;
}

// Формируем список участников в комнате
function showRoomMembers(id) {
  getRooms().then((result) => {
    rooms = result;
    _consts_js__WEBPACK_IMPORTED_MODULE_2__.nodes.users.innerHTML = "";
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
        _consts_js__WEBPACK_IMPORTED_MODULE_2__.nodes.users.innerHTML = li;
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
  _consts_js__WEBPACK_IMPORTED_MODULE_2__.nodes.message.innerHTML = li;
}

// Список всех пользователей
// getApiData(showUsersData, urls.USERS);

//Создаем новую чат комнату
async function userId(id) {
  const rooms = await (0,_get_post_js__WEBPACK_IMPORTED_MODULE_0__.getApiData)(_consts_js__WEBPACK_IMPORTED_MODULE_2__.urls.ROOMS);
  let room_exist = await roomExist(rooms, id);
  let room_data = {
    name: id,
  }; //

  if (getCurrentUser().length !== 0) {
    // Проверяем есть ли уже такая комната
    if (room_exist[1]) {
      roomId(room_exist[0]);
    } else {
      // создаем комнату
      (0,_get_post_js__WEBPACK_IMPORTED_MODULE_0__.putApiData)(room_data, _consts_js__WEBPACK_IMPORTED_MODULE_2__.urls.ROOMS)
        .then((res) => {
          return res.json();
        })
        .then(() => {
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
  _consts_js__WEBPACK_IMPORTED_MODULE_2__.nodes.users.innerHTML = "";
  showRoomMembers(id);
  (0,_get_post_js__WEBPACK_IMPORTED_MODULE_0__.getApiData)(showMessages, _consts_js__WEBPACK_IMPORTED_MODULE_2__.urls.MESSAGES + `?target=${id}`);
}

document.querySelectorAll("ul li").forEach(function (click) {
  click.addEventListener("click", function () {
    roomId(this.id);
  });
});

// Отправляем сообщение
let form = document.getElementById("message-form");
form.onsubmit = async (e) => {
  e.preventDefault();
  let my_form = new FormData(form);

  my_form.append("target", current_room.id);
  if (my_form.get("target") != "0" && my_form.get("text") != "") {
    let message = {
      csrfmiddlewaretoken: `${my_form.get("csrfmiddlewaretoken")}`,
      text: `${my_form.get("text")}`,
      author: current_user.username,
      target: my_form.get("target"),
    };
    (0,_get_post_js__WEBPACK_IMPORTED_MODULE_0__.putApiData)(message, _consts_js__WEBPACK_IMPORTED_MODULE_2__.urls.MESSAGES).then((response) => {
      console.log(response.json());
    });
  }
  e.target.reset();
};

// Кнопка добавить участника
async function addButton() {
  const response = await fetch(_consts_js__WEBPACK_IMPORTED_MODULE_2__.urls.USERS);
  if (response.ok) {
    const data = await response.json();
    const values = Object.keys(data).map((key, index) => {
      return `<li class="itc-select__option" data-select="option" data-value="${data[key].id}" data-index="${index}">${data[key].username}</li>`;
    });
    document.querySelector(".itc-select__options").innerHTML = values.join("");
    document.ITC = new _itc_custom_select_js__WEBPACK_IMPORTED_MODULE_1__.ItcCustomSelect("#select-1");
    document.querySelector(".itc-select__toggle").disabled = false;
  }
}

addButton();

document
  .querySelector("#select-1")
  .addEventListener("itc.select.change", (e) => {
    const btn = e.target.querySelector(".itc-select__toggle");

    const data = {
      csrfmiddlewaretoken: _get_post_js__WEBPACK_IMPORTED_MODULE_0__.csrftoken,
      room: current_room.id,
      member: btn.value,
    };
    if (rooms.length > 0) {
      for (let user of current_room.members) {
        if (btn.value == user.id) {
          alert("Этот пользователь уже есть в этой комнате");
          break;
        } else {
          (0,_get_post_js__WEBPACK_IMPORTED_MODULE_0__.putApiData)(data, _consts_js__WEBPACK_IMPORTED_MODULE_2__.urls.MEMBER).then((response) => {
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
/******/ 	var __webpack_exports__ = __webpack_require__("./static/scripts/temp_scripts/script.js");
/******/ 	
/******/ })()
;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWFpbi5qcyIsIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7QUFBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQ2JBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsNENBQTRDO0FBQzVDLG9CQUFvQixvQkFBb0I7QUFDeEM7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDTzs7QUFFUDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMLE1BQU07QUFDTjtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0Esd0NBQXdDO0FBQ3hDO0FBQ0EsS0FBSztBQUNMO0FBQ0EsR0FBRztBQUNIOzs7Ozs7Ozs7Ozs7Ozs7O0FDeENPO0FBQ1A7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0EsWUFBWSw2QkFBNkI7QUFDekM7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSw0QkFBNEIsd0JBQXdCO0FBQ3BEO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsaURBQWlELGNBQWM7QUFDL0Qsc0JBQXNCLFVBQVUsZ0JBQWdCLE1BQU0sSUFBSSxVQUFVO0FBQ3BFLEtBQUs7QUFDTCxxRUFBcUUsS0FBSztBQUMxRSxlQUFlLGNBQWMscUNBQXFDLGNBQWM7QUFDaEYsUUFBUSxnQkFBZ0I7QUFDeEIsd0NBQXdDLGVBQWU7QUFDdkQ7O0FBRUE7QUFDQTtBQUNBLGdDQUFnQyxRQUFRO0FBQ3hDLHdEQUF3RCxhQUFhO0FBQ3JFO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0EsWUFBWSxTQUFTO0FBQ3JCO0FBQ0E7QUFDQTtBQUNBLE1BQU07QUFDTjtBQUNBO0FBQ0E7O0FBRUE7QUFDQSxvQ0FBb0MsMkJBQTJCO0FBQy9EO0FBQ0EsVUFBVSxvQ0FBb0M7QUFDOUM7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQSxVQUFVLG9DQUFvQztBQUM5QztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTCw4QkFBOEIseUJBQXlCO0FBQ3ZEOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQSxxQ0FBcUMsTUFBTTtBQUMzQztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUNyS2tFO0FBQ1Q7QUFDZjs7QUFFMUM7QUFDQTtBQUNBLHlCQUF5Qix3REFBVSxDQUFDLDRDQUFJO0FBQ3hDO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTtBQUNBLGVBQWUsd0RBQVUsQ0FBQyw0Q0FBSTtBQUM5Qjs7QUFFQTs7QUFFQTtBQUNBLHFCQUFxQjtBQUNyQjtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsaUJBQWlCLFNBQVM7QUFDMUIsaUJBQWlCLFVBQVU7QUFDM0I7QUFDQTtBQUNBO0FBQ0E7QUFDQSw2Q0FBSzs7QUFFTDtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBLE1BQU0sd0RBQVUsZUFBZSw0Q0FBSSx1QkFBdUIsZ0JBQWdCOztBQUUxRTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxpQkFBaUIsZUFBZTtBQUNoQyxpQ0FBaUMsWUFBWTtBQUM3QyxpQkFBaUIsY0FBYztBQUMvQjtBQUNBO0FBQ0E7QUFDQSxFQUFFLDZDQUFLO0FBQ1A7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQSxJQUFJLDZDQUFLO0FBQ1Q7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsNkJBQTZCLGNBQWM7QUFDM0MsNkNBQTZDLFlBQVk7QUFDekQsNkJBQTZCLGNBQWM7QUFDM0M7QUFDQTtBQUNBO0FBQ0E7QUFDQSxRQUFRLDZDQUFLO0FBQ2I7QUFDQTtBQUNBLEdBQUc7QUFDSDs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxhQUFhLGVBQWU7QUFDNUIsVUFBVSxlQUFlO0FBQ3pCLFNBQVMsYUFBYTtBQUN0QjtBQUNBO0FBQ0E7QUFDQSxFQUFFLDZDQUFLO0FBQ1A7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0Esc0JBQXNCLHdEQUFVLENBQUMsNENBQUk7QUFDckM7QUFDQTtBQUNBO0FBQ0EsS0FBSzs7QUFFTDtBQUNBO0FBQ0E7QUFDQTtBQUNBLE1BQU07QUFDTjtBQUNBLE1BQU0sd0RBQVUsWUFBWSw0Q0FBSTtBQUNoQztBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7QUFDQSxJQUFJO0FBQ0o7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsRUFBRSw2Q0FBSztBQUNQO0FBQ0EsRUFBRSx3REFBVSxlQUFlLDRDQUFJLHVCQUF1QixHQUFHO0FBQ3pEOztBQUVBO0FBQ0E7QUFDQTtBQUNBLEdBQUc7QUFDSCxDQUFDOztBQUVEO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsOEJBQThCLG1DQUFtQztBQUNqRSxlQUFlLG9CQUFvQjtBQUNuQztBQUNBO0FBQ0E7QUFDQSxJQUFJLHdEQUFVLFVBQVUsNENBQUk7QUFDNUI7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQSwrQkFBK0IsNENBQUk7QUFDbkM7QUFDQTtBQUNBO0FBQ0EsZ0ZBQWdGLGFBQWEsZ0JBQWdCLE1BQU0sSUFBSSxtQkFBbUI7QUFDMUksS0FBSztBQUNMO0FBQ0EsdUJBQXVCLGtFQUFlO0FBQ3RDO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBLDJCQUEyQixtREFBUztBQUNwQztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsVUFBVTtBQUNWLFVBQVUsd0RBQVUsT0FBTyw0Q0FBSTtBQUMvQjtBQUNBO0FBQ0EsV0FBVztBQUNYO0FBQ0E7QUFDQTtBQUNBLE1BQU07QUFDTjtBQUNBO0FBQ0E7QUFDQTtBQUNBLEdBQUc7O0FBRXVCOzs7Ozs7Ozs7VUNyTzFCO1VBQ0E7O1VBRUE7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7O1VBRUE7VUFDQTs7VUFFQTtVQUNBO1VBQ0E7Ozs7O1dDdEJBO1dBQ0E7V0FDQTtXQUNBO1dBQ0E7V0FDQTtXQUNBO1dBQ0E7V0FDQTtXQUNBO1dBQ0E7V0FDQTtXQUNBO1dBQ0E7V0FDQTtXQUNBO1dBQ0E7V0FDQTtXQUNBO1dBQ0EsSUFBSTtXQUNKO1dBQ0E7V0FDQSxJQUFJO1dBQ0o7V0FDQTtXQUNBO1dBQ0E7V0FDQTtXQUNBO1dBQ0E7V0FDQTtXQUNBO1dBQ0EsQ0FBQztXQUNEO1dBQ0E7V0FDQTtXQUNBO1dBQ0E7V0FDQTtXQUNBO1dBQ0E7V0FDQTtXQUNBO1dBQ0E7V0FDQSxFQUFFO1dBQ0Y7V0FDQSxzR0FBc0c7V0FDdEc7V0FDQTtXQUNBO1dBQ0E7V0FDQTtXQUNBO1dBQ0E7V0FDQSxHQUFHO1dBQ0g7V0FDQTtXQUNBO1dBQ0E7V0FDQTtXQUNBLEdBQUc7V0FDSDtXQUNBLEVBQUU7V0FDRjtXQUNBOzs7OztXQ2hFQTtXQUNBO1dBQ0E7V0FDQTtXQUNBLHlDQUF5Qyx3Q0FBd0M7V0FDakY7V0FDQTtXQUNBOzs7OztXQ1BBOzs7OztXQ0FBO1dBQ0E7V0FDQTtXQUNBLHVEQUF1RCxpQkFBaUI7V0FDeEU7V0FDQSxnREFBZ0QsYUFBYTtXQUM3RDs7Ozs7VUVOQTtVQUNBO1VBQ0E7VUFDQSIsInNvdXJjZXMiOlsid2VicGFjazovL0NoYXQvLi9zdGF0aWMvc2NyaXB0cy90ZW1wX3NjcmlwdHMvY29uc3RzLmpzIiwid2VicGFjazovL0NoYXQvLi9zdGF0aWMvc2NyaXB0cy90ZW1wX3NjcmlwdHMvZ2V0X3Bvc3QuanMiLCJ3ZWJwYWNrOi8vQ2hhdC8uL3N0YXRpYy9zY3JpcHRzL3RlbXBfc2NyaXB0cy9pdGMtY3VzdG9tLXNlbGVjdC5qcyIsIndlYnBhY2s6Ly9DaGF0Ly4vc3RhdGljL3NjcmlwdHMvdGVtcF9zY3JpcHRzL3NjcmlwdC5qcyIsIndlYnBhY2s6Ly9DaGF0L3dlYnBhY2svYm9vdHN0cmFwIiwid2VicGFjazovL0NoYXQvd2VicGFjay9ydW50aW1lL2FzeW5jIG1vZHVsZSIsIndlYnBhY2s6Ly9DaGF0L3dlYnBhY2svcnVudGltZS9kZWZpbmUgcHJvcGVydHkgZ2V0dGVycyIsIndlYnBhY2s6Ly9DaGF0L3dlYnBhY2svcnVudGltZS9oYXNPd25Qcm9wZXJ0eSBzaG9ydGhhbmQiLCJ3ZWJwYWNrOi8vQ2hhdC93ZWJwYWNrL3J1bnRpbWUvbWFrZSBuYW1lc3BhY2Ugb2JqZWN0Iiwid2VicGFjazovL0NoYXQvd2VicGFjay9iZWZvcmUtc3RhcnR1cCIsIndlYnBhY2s6Ly9DaGF0L3dlYnBhY2svc3RhcnR1cCIsIndlYnBhY2s6Ly9DaGF0L3dlYnBhY2svYWZ0ZXItc3RhcnR1cCJdLCJzb3VyY2VzQ29udGVudCI6WyJjb25zdCB1cmxzID0ge1xuICAgIFJPT01TOiBcIi9hcGkvcm9vbS9cIixcbiAgICBVU0VSUzogXCIvYXBpL3VzZXJzL1wiLFxuICAgIE1FU1NBR0VTOiBcIi9hcGkvbWVzc2FnZS9cIixcbiAgICBDVVJSRU5UOlwiL2FwaS9jdXJyZW50X3VzZXIvXCIsXG4gICAgTUVTU0FHRTogXCIvYXBpL21lc3NhZ2UvP3RhcmdldD1cIixcbiAgICBNRU1CRVI6IFwiL2FwaS9tZW1iZXJzL1wiLFxufVxuXG5jb25zdCBub2RlcyA9IHtcbiAgICByb29tczogZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIi5yb29tc1wiKSxcbiAgICB1c2VyczogZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIi51c2Vyc1wiKSxcbiAgICBtZXNzYWdlOiBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiLm1lc3NhZ2VzXCIpLFxufVxuXG5leHBvcnQge3VybHMsIG5vZGVzfSIsIi8vINCf0L7Qu9GD0YfQsNC10Lwg0YLQvtC60LXQvVxuZnVuY3Rpb24gZ2V0Q29va2llKG5hbWUpIHtcbiAgbGV0IGNvb2tpZVZhbHVlID0gbnVsbDtcbiAgaWYgKGRvY3VtZW50LmNvb2tpZSAmJiBkb2N1bWVudC5jb29raWUgIT09IFwiXCIpIHtcbiAgICBjb25zdCBjb29raWVzID0gZG9jdW1lbnQuY29va2llLnNwbGl0KFwiO1wiKTtcbiAgICBmb3IgKGxldCBpID0gMDsgaSA8IGNvb2tpZXMubGVuZ3RoOyBpKyspIHtcbiAgICAgIGNvbnN0IGNvb2tpZSA9IGNvb2tpZXNbaV0udHJpbSgpO1xuICAgICAgLy8gRG9lcyB0aGlzIGNvb2tpZSBzdHJpbmcgYmVnaW4gd2l0aCB0aGUgbmFtZSB3ZSB3YW50P1xuICAgICAgaWYgKGNvb2tpZS5zdWJzdHJpbmcoMCwgbmFtZS5sZW5ndGggKyAxKSA9PT0gbmFtZSArIFwiPVwiKSB7XG4gICAgICAgIGNvb2tpZVZhbHVlID0gZGVjb2RlVVJJQ29tcG9uZW50KGNvb2tpZS5zdWJzdHJpbmcobmFtZS5sZW5ndGggKyAxKSk7XG4gICAgICAgIGJyZWFrO1xuICAgICAgfVxuICAgIH1cbiAgfVxuICByZXR1cm4gY29va2llVmFsdWU7XG59XG5leHBvcnQgY29uc3QgY3NyZnRva2VuID0gZ2V0Q29va2llKFwiY3NyZnRva2VuXCIpO1xuXG4vLyDQn9C+0LvRg9GH0LDQtdC8INC00LDQvdC90YvQtSDRgSDRgdC10YDQstC10YDQsFxuYXN5bmMgZnVuY3Rpb24gZ2V0QXBpRGF0YShjYWxsYmFjaywgdXJsKSB7XG4gIGlmIChhcmd1bWVudHMubGVuZ3RoID4gMSkge1xuICAgIGZldGNoKHVybCkudGhlbigocmVzcG9uc2UpID0+IHtcbiAgICAgIHJldHVybiBjYWxsYmFjayhyZXNwb25zZS5qc29uKCkpXG4gICAgfSlcbiAgICB9IGVsc2Uge1xuICAgIGNvbnN0IHJlc3BvbnNlID0gYXdhaXQgZmV0Y2goY2FsbGJhY2spXG4gICAgcmV0dXJuIHJlc3BvbnNlLmpzb24oKVxuICAgIH1cbiAgfVxuXG4vLyDQntGC0L/RgNCw0LLQu9GP0LXQvCDQtNCw0L3QvdGL0LUg0L3QsCDRgdC10YDQstC10YBcbmFzeW5jIGZ1bmN0aW9uIHB1dEFwaURhdGEoZGF0YSwgdXJsKSB7XG4gIHJldHVybiBmZXRjaCh1cmwsIHtcbiAgICBtZXRob2Q6IFwiUE9TVFwiLFxuICAgIGhlYWRlcnM6IHtcbiAgICAgIFwiQ29udGVudC1UeXBlXCI6IFwiYXBwbGljYXRpb24vanNvbjtjaGFyc2V0PXV0Zi04XCIsXG4gICAgICBcIlgtQ1NSRlRPS0VOXCI6IGNzcmZ0b2tlbixcbiAgICB9LFxuICAgIGJvZHk6IEpTT04uc3RyaW5naWZ5KGRhdGEpXG4gIH0pXG59XG5cbmV4cG9ydCB7Z2V0QXBpRGF0YSwgcHV0QXBpRGF0YX0iLCJleHBvcnQgY2xhc3MgSXRjQ3VzdG9tU2VsZWN0IHtcbiAgc3RhdGljIEVMID0gXCJpdGMtc2VsZWN0XCI7XG4gIHN0YXRpYyBFTF9TSE9XID0gXCJpdGMtc2VsZWN0X3Nob3dcIjtcbiAgc3RhdGljIEVMX09QVElPTiA9IFwiaXRjLXNlbGVjdF9fb3B0aW9uXCI7XG4gIHN0YXRpYyBFTF9PUFRJT05fU0VMRUNURUQgPSBcIml0Yy1zZWxlY3RfX29wdGlvbl9zZWxlY3RlZFwiO1xuICBzdGF0aWMgREFUQSA9IFwiW2RhdGEtc2VsZWN0XVwiO1xuICBzdGF0aWMgREFUQV9UT0dHTEUgPSAnW2RhdGEtc2VsZWN0PVwidG9nZ2xlXCJdJztcblxuICBzdGF0aWMgdGVtcGxhdGUocGFyYW1zKSB7XG4gICAgY29uc3QgeyBuYW1lLCBvcHRpb25zLCB0YXJnZXRWYWx1ZSB9ID0gcGFyYW1zO1xuICAgIGNvbnN0IGl0ZW1zID0gW107XG4gICAgbGV0IHNlbGVjdGVkSW5kZXggPSAtMTtcbiAgICBsZXQgc2VsZWN0ZWRWYWx1ZSA9IFwiXCI7XG4gICAgbGV0IHNlbGVjdGVkQ29udGVudCA9IFwi0JLRi9Cx0LXRgNC40YLQtSDQuNC3INGB0L/QuNGB0LrQsFwiO1xuICAgIG9wdGlvbnMuZm9yRWFjaCgob3B0aW9uLCBpbmRleCkgPT4ge1xuICAgICAgbGV0IHNlbGVjdGVkQ2xhc3MgPSBcIlwiO1xuICAgICAgaWYgKG9wdGlvblswXSA9PT0gdGFyZ2V0VmFsdWUpIHtcbiAgICAgICAgc2VsZWN0ZWRDbGFzcyA9IGAgJHt0aGlzLkVMX09QVElPTl9TRUxFQ1RFRH1gO1xuICAgICAgICBzZWxlY3RlZEluZGV4ID0gaW5kZXg7XG4gICAgICAgIHNlbGVjdGVkVmFsdWUgPSBvcHRpb25bMF07XG4gICAgICAgIHNlbGVjdGVkQ29udGVudCA9IG9wdGlvblsxXTtcbiAgICAgIH1cbiAgICAgIGl0ZW1zLnB1c2goYDxsaSBjbGFzcz1cIml0Yy1zZWxlY3RfX29wdGlvbiR7c2VsZWN0ZWRDbGFzc31cIiBkYXRhLXNlbGVjdD1cIm9wdGlvblwiXG4gICAgICAgIGRhdGEtdmFsdWU9XCIke29wdGlvblswXX1cIiBkYXRhLWluZGV4PVwiJHtpbmRleH1cIj4ke29wdGlvblsxXX08L2xpPmApO1xuICAgIH0pO1xuICAgIHJldHVybiBgPGJ1dHRvbiB0eXBlPVwiYnV0dG9uXCIgY2xhc3M9XCJpdGMtc2VsZWN0X190b2dnbGVcIiBuYW1lPVwiJHtuYW1lfVwiXG4gICAgICB2YWx1ZT1cIiR7c2VsZWN0ZWRWYWx1ZX1cIiBkYXRhLXNlbGVjdD1cInRvZ2dsZVwiIGRhdGEtaW5kZXg9XCIke3NlbGVjdGVkSW5kZXh9XCI+XG4gICAgICAke3NlbGVjdGVkQ29udGVudH08L2J1dHRvbj48ZGl2IGNsYXNzPVwiaXRjLXNlbGVjdF9fZHJvcGRvd25cIj5cbiAgICAgIDx1bCBjbGFzcz1cIml0Yy1zZWxlY3RfX29wdGlvbnNcIj4ke2l0ZW1zLmpvaW4oXCJcIil9PC91bD48L2Rpdj5gO1xuICB9XG5cbiAgc3RhdGljIGhpZGVPcGVuU2VsZWN0KCkge1xuICAgIGRvY3VtZW50LmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCAoZSkgPT4ge1xuICAgICAgaWYgKCFlLnRhcmdldC5jbG9zZXN0KGAuJHt0aGlzLkVMfWApKSB7XG4gICAgICAgIGNvbnN0IGVsc0FjdGl2ZSA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoYC4ke3RoaXMuRUxfU0hPV31gKTtcbiAgICAgICAgZWxzQWN0aXZlLmZvckVhY2goKGVsKSA9PiB7XG4gICAgICAgICAgZWwuY2xhc3NMaXN0LnJlbW92ZSh0aGlzLkVMX1NIT1cpO1xuICAgICAgICB9KTtcbiAgICAgIH1cbiAgICB9KTtcbiAgfVxuICBzdGF0aWMgY3JlYXRlKHRhcmdldCwgcGFyYW1zKSB7XG4gICAgdGhpcy5fZWwgPVxuICAgICAgdHlwZW9mIHRhcmdldCA9PT0gXCJzdHJpbmdcIiA/IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IodGFyZ2V0KSA6IHRhcmdldDtcbiAgICBpZiAodGhpcy5fZWwpIHtcbiAgICAgIHJldHVybiBuZXcgdGhpcyh0YXJnZXQsIHBhcmFtcyk7XG4gICAgfVxuICAgIHJldHVybiBudWxsO1xuICB9XG4gIGNvbnN0cnVjdG9yKHRhcmdldCwgcGFyYW1zKSB7XG4gICAgdGhpcy5fZWwgPVxuICAgICAgdHlwZW9mIHRhcmdldCA9PT0gXCJzdHJpbmdcIiA/IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IodGFyZ2V0KSA6IHRhcmdldDtcbiAgICB0aGlzLl9wYXJhbXMgPSBwYXJhbXMgfHwge307XG4gICAgdGhpcy5fb25DbGlja0ZuID0gdGhpcy5fb25DbGljay5iaW5kKHRoaXMpO1xuICAgIGlmICh0aGlzLl9wYXJhbXMub3B0aW9ucykge1xuICAgICAgdGhpcy5fZWwuaW5uZXJIVE1MID0gdGhpcy5jb25zdHJ1Y3Rvci50ZW1wbGF0ZSh0aGlzLl9wYXJhbXMpO1xuICAgICAgdGhpcy5fZWwuY2xhc3NMaXN0LmFkZCh0aGlzLmNvbnN0cnVjdG9yLkVMKTtcbiAgICB9XG4gICAgdGhpcy5fZWxUb2dnbGUgPSB0aGlzLl9lbC5xdWVyeVNlbGVjdG9yKHRoaXMuY29uc3RydWN0b3IuREFUQV9UT0dHTEUpO1xuICAgIHRoaXMuX2VsLmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCB0aGlzLl9vbkNsaWNrRm4pO1xuICB9XG5cbiAgX29uQ2xpY2soZSkge1xuICAgIGNvbnN0IHsgdGFyZ2V0IH0gPSBlO1xuICAgIGNvbnN0IHR5cGUgPSB0YXJnZXQuY2xvc2VzdCh0aGlzLmNvbnN0cnVjdG9yLkRBVEEpLmRhdGFzZXQuc2VsZWN0O1xuICAgIGlmICh0eXBlID09PSBcInRvZ2dsZVwiKSB7XG4gICAgICB0aGlzLnRvZ2dsZSgpO1xuICAgIH0gZWxzZSBpZiAodHlwZSA9PT0gXCJvcHRpb25cIikge1xuICAgICAgdGhpcy5fY2hhbmdlVmFsdWUodGFyZ2V0KTtcbiAgICB9XG4gIH1cblxuICBfdXBkYXRlT3B0aW9uKGVsKSB7XG4gICAgY29uc3QgZWxPcHRpb24gPSBlbC5jbG9zZXN0KGAuJHt0aGlzLmNvbnN0cnVjdG9yLkVMX09QVElPTn1gKTtcbiAgICBjb25zdCBlbE9wdGlvblNlbCA9IHRoaXMuX2VsLnF1ZXJ5U2VsZWN0b3IoXG4gICAgICBgLiR7dGhpcy5jb25zdHJ1Y3Rvci5FTF9PUFRJT05fU0VMRUNURUR9YFxuICAgICk7XG4gICAgaWYgKGVsT3B0aW9uU2VsKSB7XG4gICAgICBlbE9wdGlvblNlbC5jbGFzc0xpc3QucmVtb3ZlKHRoaXMuY29uc3RydWN0b3IuRUxfT1BUSU9OX1NFTEVDVEVEKTtcbiAgICB9XG4gICAgZWxPcHRpb24uY2xhc3NMaXN0LmFkZCh0aGlzLmNvbnN0cnVjdG9yLkVMX09QVElPTl9TRUxFQ1RFRCk7XG4gICAgdGhpcy5fZWxUb2dnbGUudGV4dENvbnRlbnQgPSBlbE9wdGlvbi50ZXh0Q29udGVudDtcbiAgICB0aGlzLl9lbFRvZ2dsZS52YWx1ZSA9IGVsT3B0aW9uLmRhdGFzZXQudmFsdWU7XG4gICAgdGhpcy5fZWxUb2dnbGUuZGF0YXNldC5pbmRleCA9IGVsT3B0aW9uLmRhdGFzZXQuaW5kZXg7XG4gICAgdGhpcy5fZWwuZGlzcGF0Y2hFdmVudChuZXcgQ3VzdG9tRXZlbnQoXCJpdGMuc2VsZWN0LmNoYW5nZVwiKSk7XG4gICAgdGhpcy5fcGFyYW1zLm9uU2VsZWN0ZWQgPyB0aGlzLl9wYXJhbXMub25TZWxlY3RlZCh0aGlzLCBlbE9wdGlvbikgOiBudWxsO1xuICAgIHJldHVybiBlbE9wdGlvbi5kYXRhc2V0LnZhbHVlO1xuICB9XG5cbiAgX3Jlc2V0KCkge1xuICAgIGNvbnN0IHNlbGVjdGVkID0gdGhpcy5fZWwucXVlcnlTZWxlY3RvcihcbiAgICAgIGAuJHt0aGlzLmNvbnN0cnVjdG9yLkVMX09QVElPTl9TRUxFQ1RFRH1gXG4gICAgKTtcbiAgICBpZiAoc2VsZWN0ZWQpIHtcbiAgICAgIHNlbGVjdGVkLmNsYXNzTGlzdC5yZW1vdmUodGhpcy5jb25zdHJ1Y3Rvci5FTF9PUFRJT05fU0VMRUNURUQpO1xuICAgIH1cbiAgICB0aGlzLl9lbFRvZ2dsZS50ZXh0Q29udGVudCA9IFwi0JLRi9Cx0LXRgNC40YLQtSDQuNC3INGB0L/QuNGB0LrQsFwiO1xuICAgIHRoaXMuX2VsVG9nZ2xlLnZhbHVlID0gXCJcIjtcbiAgICB0aGlzLl9lbFRvZ2dsZS5kYXRhc2V0LmluZGV4ID0gXCItMVwiO1xuICAgIHRoaXMuX2VsLmRpc3BhdGNoRXZlbnQobmV3IEN1c3RvbUV2ZW50KFwiaXRjLnNlbGVjdC5jaGFuZ2VcIikpO1xuICAgIHRoaXMuX3BhcmFtcy5vblNlbGVjdGVkID8gdGhpcy5fcGFyYW1zLm9uU2VsZWN0ZWQodGhpcywgbnVsbCkgOiBudWxsO1xuICAgIHJldHVybiBcIlwiO1xuICB9XG5cbiAgX2NoYW5nZVZhbHVlKGVsKSB7XG4gICAgaWYgKGVsLmNsYXNzTGlzdC5jb250YWlucyh0aGlzLmNvbnN0cnVjdG9yLkVMX09QVElPTl9TRUxFQ1RFRCkpIHtcbiAgICAgIHJldHVybjtcbiAgICB9XG4gICAgdGhpcy5fdXBkYXRlT3B0aW9uKGVsKTtcbiAgICB0aGlzLmhpZGUoKTtcbiAgfVxuXG4gIHNob3coKSB7XG4gICAgZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbCh0aGlzLmNvbnN0cnVjdG9yLkVMX1NIT1cpLmZvckVhY2goKGVsKSA9PiB7XG4gICAgICBlbC5jbGFzc0xpc3QucmVtb3ZlKHRoaXMuY29uc3RydWN0b3IuRUxfU0hPVyk7XG4gICAgfSk7XG4gICAgdGhpcy5fZWwuY2xhc3NMaXN0LmFkZChgJHt0aGlzLmNvbnN0cnVjdG9yLkVMX1NIT1d9YCk7XG4gIH1cblxuICBoaWRlKCkge1xuICAgIHRoaXMuX2VsLmNsYXNzTGlzdC5yZW1vdmUodGhpcy5jb25zdHJ1Y3Rvci5FTF9TSE9XKTtcbiAgfVxuXG4gIHRvZ2dsZSgpIHtcbiAgICB0aGlzLl9lbC5jbGFzc0xpc3QuY29udGFpbnModGhpcy5jb25zdHJ1Y3Rvci5FTF9TSE9XKVxuICAgICAgPyB0aGlzLmhpZGUoKVxuICAgICAgOiB0aGlzLnNob3coKTtcbiAgfVxuXG4gIGRpc3Bvc2UoKSB7XG4gICAgdGhpcy5fZWwucmVtb3ZlRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsIHRoaXMuX29uQ2xpY2tGbik7XG4gIH1cblxuICBnZXQgdmFsdWUoKSB7XG4gICAgcmV0dXJuIHRoaXMuX2VsVG9nZ2xlLnZhbHVlO1xuICB9XG5cbiAgc2V0IHZhbHVlKHZhbHVlKSB7XG4gICAgbGV0IGlzRXhpc3RzID0gZmFsc2U7XG4gICAgdGhpcy5fZWwucXVlcnlTZWxlY3RvckFsbChcIi5zZWxlY3RfX29wdGlvblwiKS5mb3JFYWNoKChvcHRpb24pID0+IHtcbiAgICAgIGlmIChvcHRpb24uZGF0YXNldC52YWx1ZSA9PT0gdmFsdWUpIHtcbiAgICAgICAgaXNFeGlzdHMgPSB0cnVlO1xuICAgICAgICB0aGlzLl91cGRhdGVPcHRpb24ob3B0aW9uKTtcbiAgICAgIH1cbiAgICB9KTtcbiAgICBpZiAoIWlzRXhpc3RzKSB7XG4gICAgICB0aGlzLl9yZXNldCgpO1xuICAgIH1cbiAgfVxuXG4gIGdldCBzZWxlY3RlZEluZGV4KCkge1xuICAgIHJldHVybiB0aGlzLl9lbFRvZ2dsZS5kYXRhc2V0LmluZGV4O1xuICB9XG5cbiAgc2V0IHNlbGVjdGVkSW5kZXgoaW5kZXgpIHtcbiAgICBjb25zdCBvcHRpb24gPSB0aGlzLl9lbC5xdWVyeVNlbGVjdG9yKFxuICAgICAgYC5zZWxlY3RfX29wdGlvbltkYXRhLWluZGV4PVwiJHtpbmRleH1cIl1gXG4gICAgKTtcbiAgICBpZiAob3B0aW9uKSB7XG4gICAgICB0aGlzLl91cGRhdGVPcHRpb24ob3B0aW9uKTtcbiAgICB9XG4gICAgdGhpcy5fcmVzZXQoKTtcbiAgfVxufVxuXG5JdGNDdXN0b21TZWxlY3QuaGlkZU9wZW5TZWxlY3QoKTtcbiIsImltcG9ydCB7IGdldEFwaURhdGEsIHB1dEFwaURhdGEsIGNzcmZ0b2tlbiB9IGZyb20gXCIuL2dldF9wb3N0LmpzXCI7XG5pbXBvcnQgeyBJdGNDdXN0b21TZWxlY3QgfSBmcm9tIFwiLi9pdGMtY3VzdG9tLXNlbGVjdC5qc1wiO1xuaW1wb3J0IHsgbm9kZXMsIHVybHMgfSBmcm9tIFwiLi9jb25zdHMuanNcIjtcblxuLy8gINCf0L7Qu9GD0YfQsNC10Lwg0YLQtdC60YPRidC10LPQviDQv9C+0LvRjNC30L7QstCw0YLQtdC70Y9cbmFzeW5jIGZ1bmN0aW9uIGdldEN1cnJlbnRVc2VyKCkge1xuICBjb25zdCBjdXJfdXNlciA9IGF3YWl0IGdldEFwaURhdGEodXJscy5DVVJSRU5UKTtcbiAgcmV0dXJuIGN1cl91c2VyWzBdO1xufVxuXG5jb25zdCBjdXJyZW50X3VzZXIgPSBhd2FpdCBnZXRDdXJyZW50VXNlcigpO1xuXG4vLyDQn9C+0LvRg9GH0LDQtdC8INGB0L/QuNGB0L7QuiDQutC+0LzQvdCw0YIg0YPRh9Cw0YHRgtC90LjQutC+0Lwg0LrQvtGC0L7RgNGL0YUg0Y/QstC70Y/QtdC80YHRj1xuYXN5bmMgZnVuY3Rpb24gZ2V0Um9vbXMoKSB7XG4gIHJldHVybiBhd2FpdCBnZXRBcGlEYXRhKHVybHMuUk9PTVMpO1xufVxuXG5sZXQgcm9vbXMgPSBhd2FpdCBnZXRSb29tcygpO1xuXG4vLyDQo9GB0YLQsNC90LDQstC70LjQstCw0LXQvCDRgtC10LrRg9GJ0YPRjiDQutC+0LzQvdCw0YLRgyAo0J/QtdGA0LLRg9GOINC40Lcg0YHQv9C40YHQutCwINC00L7RgdGC0YPQv9C90YvRhSlcbmxldCBjdXJyZW50X3Jvb20gPSB7IGlkOiAwLCBuYW1lOiBcIiBcIiB9O1xuaWYgKHJvb21zLmxlbmd0aCA+IDApIHtcbiAgY3VycmVudF9yb29tLmlkID0gcm9vbXNbMF0uaWQ7XG4gIGN1cnJlbnRfcm9vbS5uYW1lID0gcm9vbXNbMF0ubmFtZTtcbiAgY3VycmVudF9yb29tLm1lbWJlcnMgPSByb29tc1swXS5tZW1iZXJzO1xufVxuXG4vLyDQntGC0L7QsdGA0LDQttCw0LXQvCDRg9GH0LDRgdGC0L3QuNC60L7QsiDQutC+0LzQvdCw0YLRiyjQutGA0L7QvNC1INGB0LXQsdGPKVxuc2hvd1Jvb21NZW1iZXJzKGN1cnJlbnRfcm9vbS5pZCk7XG5cbi8vINCk0L7RgNC80LjRgNGD0LXQvCDRgdC/0LjRgdC+0Log0LrQvtC80L3QsNGCXG5sZXQgbGkgPSBcIlwiO1xuaWYgKHJvb21zLmxlbmd0aCA+IDApIHtcbiAgY3VycmVudF9yb29tLmlkID0gcm9vbXNbMF0uaWQ7XG4gIGZvciAobGV0IHJvb20gb2Ygcm9vbXMpIHtcbiAgICBjb25zdCBsaV9ibG9jayA9IGBcbiAgICAgICAgPGxpIGlkPSR7cm9vbS5pZH0gY2xhc3M9XCJsaS1vZmZcIj5cbiAgICAgICAgICAgIDxwPiR7cm9vbS5uYW1lfTwvcD5cbiAgICAgICAgPC9saT5gO1xuICAgIGxpID0gbGkgKyBsaV9ibG9jaztcbiAgfVxufVxubm9kZXMucm9vbXMuaW5uZXJIVE1MID0gbGk7XG5cbmNvbnNvbGUubG9nKGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoXCIucm9vbXMgbGlcIikpO1xuaWYgKGN1cnJlbnRfcm9vbS5pZCAhPT0gMCkge1xuICBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChjdXJyZW50X3Jvb20uaWQpLmNsYXNzTmFtZSA9IFwibGktb25cIjtcbn1cblxuLy8g0J7RgtC+0LHRgNCw0LbQsNC10Lwg0YHQvtC+0LHRidC10L3QuNGPINCyINC60L7QvNC90LDRgtC1XG5hd2FpdCBnZXRBcGlEYXRhKHNob3dNZXNzYWdlcywgdXJscy5NRVNTQUdFUyArIGA/dGFyZ2V0PSR7Y3VycmVudF9yb29tLmlkfWApO1xuXG4vLyDQpNC+0YDQvNC40YDRg9C10Lwg0YHQv9C40YHQvtC6INC/0L7Qu9GM0LfQvtCy0LDRgtC10LvQtdC5INC90LAg0YHRgtGA0LDQvdC40YfQutC1XG5hc3luYyBmdW5jdGlvbiBzaG93VXNlcnNEYXRhKGFwaURhdGEpIHtcbiAgbGV0IGxpID0gXCJcIjtcbiAgY29uc3QgdXNlcnMgPSBhd2FpdCBhcGlEYXRhO1xuICBmb3IgKGxldCB1c2VyIG9mIHVzZXJzKSB7XG4gICAgY29uc3QgbGlfYmxvY2sgPSBgXG4gICAgICAgIDxsaSBpZD0ke3VzZXIudXNlcm5hbWV9IG9uY2xpY2s9XCJ1c2VySWQoaWQpXCI+XG4gICAgICAgICAgICA8aW1nIHNyYz1cIi91cGxvYWRzLyR7dXNlci5hdmF0YXJ9XCIgYWx0PVwiYXZhdGFyXCIgLz5cbiAgICAgICAgICAgIDxwPiR7dXNlci51c2VybmFtZX08L3A+XG4gICAgICAgIDwvbGk+YDtcbiAgICBsaSA9IGxpICsgbGlfYmxvY2s7XG4gIH1cbiAgbm9kZXMudXNlcnMuaW5uZXJIVE1MID0gbGk7XG59XG5cbi8vINCk0L7RgNC80LjRgNGD0LXQvCDRgdC/0LjRgdC+0Log0YPRh9Cw0YHRgtC90LjQutC+0LIg0LIg0LrQvtC80L3QsNGC0LVcbmZ1bmN0aW9uIHNob3dSb29tTWVtYmVycyhpZCkge1xuICBnZXRSb29tcygpLnRoZW4oKHJlc3VsdCkgPT4ge1xuICAgIHJvb21zID0gcmVzdWx0O1xuICAgIG5vZGVzLnVzZXJzLmlubmVySFRNTCA9IFwiXCI7XG4gICAgbGV0IGxpID0gXCJcIjtcbiAgICBmb3IgKGxldCByb29tIG9mIHJvb21zKSB7XG4gICAgICBpZiAocm9vbS5pZCA9PSBpZCkge1xuICAgICAgICBmb3IgKGxldCB1c2VyIG9mIHJvb20ubWVtYmVycykge1xuICAgICAgICAgIGlmICh1c2VyLmlkICE9PSBjdXJyZW50X3VzZXIuaWQpIHtcbiAgICAgICAgICAgIGNvbnN0IGxpX2Jsb2NrID0gYFxuICAgICAgICAgICAgICAgICAgICA8bGkgaWQ9JHt1c2VyLnVzZXJuYW1lfT5cbiAgICAgICAgICAgICAgICAgICAgICAgIDxpbWcgc3JjPVwiL3VwbG9hZHMvJHt1c2VyLmF2YXRhcn1cIiBhbHQ9XCJhdmF0YXJcIiAvPlxuICAgICAgICAgICAgICAgICAgICAgICAgPHA+JHt1c2VyLnVzZXJuYW1lfTwvcD5cbiAgICAgICAgICAgICAgICAgICAgPC9saT5gO1xuICAgICAgICAgICAgbGkgPSBsaSArIGxpX2Jsb2NrO1xuICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICBub2Rlcy51c2Vycy5pbm5lckhUTUwgPSBsaTtcbiAgICAgIH1cbiAgICB9XG4gIH0pO1xufVxuXG4vLyDQn9C+0LvRg9GH0LDQtdC8INGB0L7QvtCx0YnQtdC90LjRjyDRgSDRgdC10YDQstC10YDQsFxuYXN5bmMgZnVuY3Rpb24gc2hvd01lc3NhZ2VzKGFwaURhdGEpIHtcbiAgbGV0IGxpID0gXCJcIjtcbiAgY29uc3QgbWVzc2FnZXMgPSBhd2FpdCBhcGlEYXRhO1xuICBmb3IgKGxldCBtZXNzYWdlIG9mIG1lc3NhZ2VzKSB7XG4gICAgY29uc3QgbGlfYmxvY2sgPSBgXG4gICAgPGxpIGlkPSR7bWVzc2FnZS5hdXRob3J9PlxuICAgIDxoND4ke21lc3NhZ2UuYXV0aG9yfTwvaDQ+XG4gICAgPHA+JHttZXNzYWdlLnRleHR9PC9wPlxuICA8L2xpPmA7XG4gICAgbGkgPSBsaSArIGxpX2Jsb2NrO1xuICB9XG4gIG5vZGVzLm1lc3NhZ2UuaW5uZXJIVE1MID0gbGk7XG59XG5cbi8vINCh0L/QuNGB0L7QuiDQstGB0LXRhSDQv9C+0LvRjNC30L7QstCw0YLQtdC70LXQuVxuLy8gZ2V0QXBpRGF0YShzaG93VXNlcnNEYXRhLCB1cmxzLlVTRVJTKTtcblxuLy/QodC+0LfQtNCw0LXQvCDQvdC+0LLRg9GOINGH0LDRgiDQutC+0LzQvdCw0YLRg1xuYXN5bmMgZnVuY3Rpb24gdXNlcklkKGlkKSB7XG4gIGNvbnN0IHJvb21zID0gYXdhaXQgZ2V0QXBpRGF0YSh1cmxzLlJPT01TKTtcbiAgbGV0IHJvb21fZXhpc3QgPSBhd2FpdCByb29tRXhpc3Qocm9vbXMsIGlkKTtcbiAgbGV0IHJvb21fZGF0YSA9IHtcbiAgICBuYW1lOiBpZCxcbiAgfTsgLy9cblxuICBpZiAoZ2V0Q3VycmVudFVzZXIoKS5sZW5ndGggIT09IDApIHtcbiAgICAvLyDQn9GA0L7QstC10YDRj9C10Lwg0LXRgdGC0Ywg0LvQuCDRg9C20LUg0YLQsNC60LDRjyDQutC+0LzQvdCw0YLQsFxuICAgIGlmIChyb29tX2V4aXN0WzFdKSB7XG4gICAgICByb29tSWQocm9vbV9leGlzdFswXSk7XG4gICAgfSBlbHNlIHtcbiAgICAgIC8vINGB0L7Qt9C00LDQtdC8INC60L7QvNC90LDRgtGDXG4gICAgICBwdXRBcGlEYXRhKHJvb21fZGF0YSwgdXJscy5ST09NUylcbiAgICAgICAgLnRoZW4oKHJlcykgPT4ge1xuICAgICAgICAgIHJldHVybiByZXMuanNvbigpO1xuICAgICAgICB9KVxuICAgICAgICAudGhlbigoKSA9PiB7XG4gICAgICAgICAgLy8g0J7RgtC+0LHRgNCw0LbQsNC10Lwg0L3QvtCy0YPRjiDQutC+0LzQvdCw0YLRg1xuICAgICAgICB9KTtcbiAgICB9XG4gIH0gZWxzZSB7XG4gICAgYWxlcnQoXCLQktC+0LnQtNC40YLQtSDQuNC70Lgg0LfQsNGA0LXQs9C40YHRgtGA0LjRgNGD0LnRgtC10YHRjCwg0YfRgtC+0LHRiyDQvtGC0L/RgNCw0LLQu9GP0YLRjCDRgdC+0L7QsdGJ0LXQvdC40Y9cIik7XG4gIH1cbn1cblxuLy8g0J/RgNC+0LLQtdGA0Y/QtdC8INGB0YPRidC10YHRgtCy0YPQtdGCINC70Lgg0LrQvtC80L3QsNGC0LBcbmZ1bmN0aW9uIHJvb21FeGlzdChpZCkge1xuICBmb3IgKGxldCBpIG9mIHJvb21zKSB7XG4gICAgaWYgKGkubmFtZSA9PT0gaWQpIHtcbiAgICAgIHJldHVybiBbdHJ1ZV07XG4gICAgfVxuICB9XG4gIHJldHVybiBmYWxzZTtcbn1cblxuLy8g0J/QtdGA0LXRhdC+0LQg0LIg0LrQvtC80L3QsNGC0YNcbmZ1bmN0aW9uIHJvb21JZChpZCkge1xuICBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChjdXJyZW50X3Jvb20uaWQpLmNsYXNzTmFtZSA9IFwibGktb2ZmXCI7XG4gIGN1cnJlbnRfcm9vbS5pZCA9IGlkO1xuICBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChjdXJyZW50X3Jvb20uaWQpLmNsYXNzTmFtZSA9IFwibGktb25cIjtcbiAgbm9kZXMudXNlcnMuaW5uZXJIVE1MID0gXCJcIjtcbiAgc2hvd1Jvb21NZW1iZXJzKGlkKTtcbiAgZ2V0QXBpRGF0YShzaG93TWVzc2FnZXMsIHVybHMuTUVTU0FHRVMgKyBgP3RhcmdldD0ke2lkfWApO1xufVxuXG5kb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKFwidWwgbGlcIikuZm9yRWFjaChmdW5jdGlvbiAoY2xpY2spIHtcbiAgY2xpY2suYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsIGZ1bmN0aW9uICgpIHtcbiAgICByb29tSWQodGhpcy5pZCk7XG4gIH0pO1xufSk7XG5cbi8vINCe0YLQv9GA0LDQstC70Y/QtdC8INGB0L7QvtCx0YnQtdC90LjQtVxubGV0IGZvcm0gPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcIm1lc3NhZ2UtZm9ybVwiKTtcbmZvcm0ub25zdWJtaXQgPSBhc3luYyAoZSkgPT4ge1xuICBlLnByZXZlbnREZWZhdWx0KCk7XG4gIGxldCBteV9mb3JtID0gbmV3IEZvcm1EYXRhKGZvcm0pO1xuXG4gIG15X2Zvcm0uYXBwZW5kKFwidGFyZ2V0XCIsIGN1cnJlbnRfcm9vbS5pZCk7XG4gIGlmIChteV9mb3JtLmdldChcInRhcmdldFwiKSAhPSBcIjBcIiAmJiBteV9mb3JtLmdldChcInRleHRcIikgIT0gXCJcIikge1xuICAgIGxldCBtZXNzYWdlID0ge1xuICAgICAgY3NyZm1pZGRsZXdhcmV0b2tlbjogYCR7bXlfZm9ybS5nZXQoXCJjc3JmbWlkZGxld2FyZXRva2VuXCIpfWAsXG4gICAgICB0ZXh0OiBgJHtteV9mb3JtLmdldChcInRleHRcIil9YCxcbiAgICAgIGF1dGhvcjogY3VycmVudF91c2VyLnVzZXJuYW1lLFxuICAgICAgdGFyZ2V0OiBteV9mb3JtLmdldChcInRhcmdldFwiKSxcbiAgICB9O1xuICAgIHB1dEFwaURhdGEobWVzc2FnZSwgdXJscy5NRVNTQUdFUykudGhlbigocmVzcG9uc2UpID0+IHtcbiAgICAgIGNvbnNvbGUubG9nKHJlc3BvbnNlLmpzb24oKSk7XG4gICAgfSk7XG4gIH1cbiAgZS50YXJnZXQucmVzZXQoKTtcbn07XG5cbi8vINCa0L3QvtC/0LrQsCDQtNC+0LHQsNCy0LjRgtGMINGD0YfQsNGB0YLQvdC40LrQsFxuYXN5bmMgZnVuY3Rpb24gYWRkQnV0dG9uKCkge1xuICBjb25zdCByZXNwb25zZSA9IGF3YWl0IGZldGNoKHVybHMuVVNFUlMpO1xuICBpZiAocmVzcG9uc2Uub2spIHtcbiAgICBjb25zdCBkYXRhID0gYXdhaXQgcmVzcG9uc2UuanNvbigpO1xuICAgIGNvbnN0IHZhbHVlcyA9IE9iamVjdC5rZXlzKGRhdGEpLm1hcCgoa2V5LCBpbmRleCkgPT4ge1xuICAgICAgcmV0dXJuIGA8bGkgY2xhc3M9XCJpdGMtc2VsZWN0X19vcHRpb25cIiBkYXRhLXNlbGVjdD1cIm9wdGlvblwiIGRhdGEtdmFsdWU9XCIke2RhdGFba2V5XS5pZH1cIiBkYXRhLWluZGV4PVwiJHtpbmRleH1cIj4ke2RhdGFba2V5XS51c2VybmFtZX08L2xpPmA7XG4gICAgfSk7XG4gICAgZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIi5pdGMtc2VsZWN0X19vcHRpb25zXCIpLmlubmVySFRNTCA9IHZhbHVlcy5qb2luKFwiXCIpO1xuICAgIGRvY3VtZW50LklUQyA9IG5ldyBJdGNDdXN0b21TZWxlY3QoXCIjc2VsZWN0LTFcIik7XG4gICAgZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIi5pdGMtc2VsZWN0X190b2dnbGVcIikuZGlzYWJsZWQgPSBmYWxzZTtcbiAgfVxufVxuXG5hZGRCdXR0b24oKTtcblxuZG9jdW1lbnRcbiAgLnF1ZXJ5U2VsZWN0b3IoXCIjc2VsZWN0LTFcIilcbiAgLmFkZEV2ZW50TGlzdGVuZXIoXCJpdGMuc2VsZWN0LmNoYW5nZVwiLCAoZSkgPT4ge1xuICAgIGNvbnN0IGJ0biA9IGUudGFyZ2V0LnF1ZXJ5U2VsZWN0b3IoXCIuaXRjLXNlbGVjdF9fdG9nZ2xlXCIpO1xuXG4gICAgY29uc3QgZGF0YSA9IHtcbiAgICAgIGNzcmZtaWRkbGV3YXJldG9rZW46IGNzcmZ0b2tlbixcbiAgICAgIHJvb206IGN1cnJlbnRfcm9vbS5pZCxcbiAgICAgIG1lbWJlcjogYnRuLnZhbHVlLFxuICAgIH07XG4gICAgaWYgKHJvb21zLmxlbmd0aCA+IDApIHtcbiAgICAgIGZvciAobGV0IHVzZXIgb2YgY3VycmVudF9yb29tLm1lbWJlcnMpIHtcbiAgICAgICAgaWYgKGJ0bi52YWx1ZSA9PSB1c2VyLmlkKSB7XG4gICAgICAgICAgYWxlcnQoXCLQrdGC0L7RgiDQv9C+0LvRjNC30L7QstCw0YLQtdC70Ywg0YPQttC1INC10YHRgtGMINCyINGN0YLQvtC5INC60L7QvNC90LDRgtC1XCIpO1xuICAgICAgICAgIGJyZWFrO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIHB1dEFwaURhdGEoZGF0YSwgdXJscy5NRU1CRVIpLnRoZW4oKHJlc3BvbnNlKSA9PiB7XG4gICAgICAgICAgICBjb25zb2xlLmxvZyhcItCf0L7Qu9GM0LfQvtCy0LDRgtC10LvRjCDQtNC+0LHQsNCy0LvQtdC9OiBcIiwgcmVzcG9uc2UuanNvbigpKTtcbiAgICAgICAgICAgIHNob3dSb29tTWVtYmVycyhjdXJyZW50X3Jvb20uaWQpO1xuICAgICAgICAgIH0pO1xuICAgICAgICAgIGJyZWFrO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgfSBlbHNlIHtcbiAgICAgIGFsZXJ0KFwi0KHQvtC30LTQudGC0LUg0LrQvtC80L3QsNGC0YNcIik7XG4gICAgfVxuICAgIGJ0bi5kYXRhc2V0LmluZGV4ID0gLTE7XG4gICAgYnRuLnRleHRDb250ZW50ID0gXCLQlNC+0LHQsNCy0LjRgtGMINGD0YfQsNGB0YLQvdC40LrQsFwiO1xuICB9KTtcblxuZXhwb3J0IHsgcm9vbUlkLCB1c2VySWQgfTtcbiIsIi8vIFRoZSBtb2R1bGUgY2FjaGVcbnZhciBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX18gPSB7fTtcblxuLy8gVGhlIHJlcXVpcmUgZnVuY3Rpb25cbmZ1bmN0aW9uIF9fd2VicGFja19yZXF1aXJlX18obW9kdWxlSWQpIHtcblx0Ly8gQ2hlY2sgaWYgbW9kdWxlIGlzIGluIGNhY2hlXG5cdHZhciBjYWNoZWRNb2R1bGUgPSBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX19bbW9kdWxlSWRdO1xuXHRpZiAoY2FjaGVkTW9kdWxlICE9PSB1bmRlZmluZWQpIHtcblx0XHRyZXR1cm4gY2FjaGVkTW9kdWxlLmV4cG9ydHM7XG5cdH1cblx0Ly8gQ3JlYXRlIGEgbmV3IG1vZHVsZSAoYW5kIHB1dCBpdCBpbnRvIHRoZSBjYWNoZSlcblx0dmFyIG1vZHVsZSA9IF9fd2VicGFja19tb2R1bGVfY2FjaGVfX1ttb2R1bGVJZF0gPSB7XG5cdFx0Ly8gbm8gbW9kdWxlLmlkIG5lZWRlZFxuXHRcdC8vIG5vIG1vZHVsZS5sb2FkZWQgbmVlZGVkXG5cdFx0ZXhwb3J0czoge31cblx0fTtcblxuXHQvLyBFeGVjdXRlIHRoZSBtb2R1bGUgZnVuY3Rpb25cblx0X193ZWJwYWNrX21vZHVsZXNfX1ttb2R1bGVJZF0obW9kdWxlLCBtb2R1bGUuZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXyk7XG5cblx0Ly8gUmV0dXJuIHRoZSBleHBvcnRzIG9mIHRoZSBtb2R1bGVcblx0cmV0dXJuIG1vZHVsZS5leHBvcnRzO1xufVxuXG4iLCJ2YXIgd2VicGFja1F1ZXVlcyA9IHR5cGVvZiBTeW1ib2wgPT09IFwiZnVuY3Rpb25cIiA/IFN5bWJvbChcIndlYnBhY2sgcXVldWVzXCIpIDogXCJfX3dlYnBhY2tfcXVldWVzX19cIjtcbnZhciB3ZWJwYWNrRXhwb3J0cyA9IHR5cGVvZiBTeW1ib2wgPT09IFwiZnVuY3Rpb25cIiA/IFN5bWJvbChcIndlYnBhY2sgZXhwb3J0c1wiKSA6IFwiX193ZWJwYWNrX2V4cG9ydHNfX1wiO1xudmFyIHdlYnBhY2tFcnJvciA9IHR5cGVvZiBTeW1ib2wgPT09IFwiZnVuY3Rpb25cIiA/IFN5bWJvbChcIndlYnBhY2sgZXJyb3JcIikgOiBcIl9fd2VicGFja19lcnJvcl9fXCI7XG52YXIgcmVzb2x2ZVF1ZXVlID0gKHF1ZXVlKSA9PiB7XG5cdGlmKHF1ZXVlICYmIHF1ZXVlLmQgPCAxKSB7XG5cdFx0cXVldWUuZCA9IDE7XG5cdFx0cXVldWUuZm9yRWFjaCgoZm4pID0+IChmbi5yLS0pKTtcblx0XHRxdWV1ZS5mb3JFYWNoKChmbikgPT4gKGZuLnItLSA/IGZuLnIrKyA6IGZuKCkpKTtcblx0fVxufVxudmFyIHdyYXBEZXBzID0gKGRlcHMpID0+IChkZXBzLm1hcCgoZGVwKSA9PiB7XG5cdGlmKGRlcCAhPT0gbnVsbCAmJiB0eXBlb2YgZGVwID09PSBcIm9iamVjdFwiKSB7XG5cdFx0aWYoZGVwW3dlYnBhY2tRdWV1ZXNdKSByZXR1cm4gZGVwO1xuXHRcdGlmKGRlcC50aGVuKSB7XG5cdFx0XHR2YXIgcXVldWUgPSBbXTtcblx0XHRcdHF1ZXVlLmQgPSAwO1xuXHRcdFx0ZGVwLnRoZW4oKHIpID0+IHtcblx0XHRcdFx0b2JqW3dlYnBhY2tFeHBvcnRzXSA9IHI7XG5cdFx0XHRcdHJlc29sdmVRdWV1ZShxdWV1ZSk7XG5cdFx0XHR9LCAoZSkgPT4ge1xuXHRcdFx0XHRvYmpbd2VicGFja0Vycm9yXSA9IGU7XG5cdFx0XHRcdHJlc29sdmVRdWV1ZShxdWV1ZSk7XG5cdFx0XHR9KTtcblx0XHRcdHZhciBvYmogPSB7fTtcblx0XHRcdG9ialt3ZWJwYWNrUXVldWVzXSA9IChmbikgPT4gKGZuKHF1ZXVlKSk7XG5cdFx0XHRyZXR1cm4gb2JqO1xuXHRcdH1cblx0fVxuXHR2YXIgcmV0ID0ge307XG5cdHJldFt3ZWJwYWNrUXVldWVzXSA9IHggPT4ge307XG5cdHJldFt3ZWJwYWNrRXhwb3J0c10gPSBkZXA7XG5cdHJldHVybiByZXQ7XG59KSk7XG5fX3dlYnBhY2tfcmVxdWlyZV9fLmEgPSAobW9kdWxlLCBib2R5LCBoYXNBd2FpdCkgPT4ge1xuXHR2YXIgcXVldWU7XG5cdGhhc0F3YWl0ICYmICgocXVldWUgPSBbXSkuZCA9IC0xKTtcblx0dmFyIGRlcFF1ZXVlcyA9IG5ldyBTZXQoKTtcblx0dmFyIGV4cG9ydHMgPSBtb2R1bGUuZXhwb3J0cztcblx0dmFyIGN1cnJlbnREZXBzO1xuXHR2YXIgb3V0ZXJSZXNvbHZlO1xuXHR2YXIgcmVqZWN0O1xuXHR2YXIgcHJvbWlzZSA9IG5ldyBQcm9taXNlKChyZXNvbHZlLCByZWopID0+IHtcblx0XHRyZWplY3QgPSByZWo7XG5cdFx0b3V0ZXJSZXNvbHZlID0gcmVzb2x2ZTtcblx0fSk7XG5cdHByb21pc2Vbd2VicGFja0V4cG9ydHNdID0gZXhwb3J0cztcblx0cHJvbWlzZVt3ZWJwYWNrUXVldWVzXSA9IChmbikgPT4gKHF1ZXVlICYmIGZuKHF1ZXVlKSwgZGVwUXVldWVzLmZvckVhY2goZm4pLCBwcm9taXNlW1wiY2F0Y2hcIl0oeCA9PiB7fSkpO1xuXHRtb2R1bGUuZXhwb3J0cyA9IHByb21pc2U7XG5cdGJvZHkoKGRlcHMpID0+IHtcblx0XHRjdXJyZW50RGVwcyA9IHdyYXBEZXBzKGRlcHMpO1xuXHRcdHZhciBmbjtcblx0XHR2YXIgZ2V0UmVzdWx0ID0gKCkgPT4gKGN1cnJlbnREZXBzLm1hcCgoZCkgPT4ge1xuXHRcdFx0aWYoZFt3ZWJwYWNrRXJyb3JdKSB0aHJvdyBkW3dlYnBhY2tFcnJvcl07XG5cdFx0XHRyZXR1cm4gZFt3ZWJwYWNrRXhwb3J0c107XG5cdFx0fSkpXG5cdFx0dmFyIHByb21pc2UgPSBuZXcgUHJvbWlzZSgocmVzb2x2ZSkgPT4ge1xuXHRcdFx0Zm4gPSAoKSA9PiAocmVzb2x2ZShnZXRSZXN1bHQpKTtcblx0XHRcdGZuLnIgPSAwO1xuXHRcdFx0dmFyIGZuUXVldWUgPSAocSkgPT4gKHEgIT09IHF1ZXVlICYmICFkZXBRdWV1ZXMuaGFzKHEpICYmIChkZXBRdWV1ZXMuYWRkKHEpLCBxICYmICFxLmQgJiYgKGZuLnIrKywgcS5wdXNoKGZuKSkpKTtcblx0XHRcdGN1cnJlbnREZXBzLm1hcCgoZGVwKSA9PiAoZGVwW3dlYnBhY2tRdWV1ZXNdKGZuUXVldWUpKSk7XG5cdFx0fSk7XG5cdFx0cmV0dXJuIGZuLnIgPyBwcm9taXNlIDogZ2V0UmVzdWx0KCk7XG5cdH0sIChlcnIpID0+ICgoZXJyID8gcmVqZWN0KHByb21pc2Vbd2VicGFja0Vycm9yXSA9IGVycikgOiBvdXRlclJlc29sdmUoZXhwb3J0cykpLCByZXNvbHZlUXVldWUocXVldWUpKSk7XG5cdHF1ZXVlICYmIHF1ZXVlLmQgPCAwICYmIChxdWV1ZS5kID0gMCk7XG59OyIsIi8vIGRlZmluZSBnZXR0ZXIgZnVuY3Rpb25zIGZvciBoYXJtb255IGV4cG9ydHNcbl9fd2VicGFja19yZXF1aXJlX18uZCA9IChleHBvcnRzLCBkZWZpbml0aW9uKSA9PiB7XG5cdGZvcih2YXIga2V5IGluIGRlZmluaXRpb24pIHtcblx0XHRpZihfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZGVmaW5pdGlvbiwga2V5KSAmJiAhX193ZWJwYWNrX3JlcXVpcmVfXy5vKGV4cG9ydHMsIGtleSkpIHtcblx0XHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBrZXksIHsgZW51bWVyYWJsZTogdHJ1ZSwgZ2V0OiBkZWZpbml0aW9uW2tleV0gfSk7XG5cdFx0fVxuXHR9XG59OyIsIl9fd2VicGFja19yZXF1aXJlX18ubyA9IChvYmosIHByb3ApID0+IChPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwob2JqLCBwcm9wKSkiLCIvLyBkZWZpbmUgX19lc01vZHVsZSBvbiBleHBvcnRzXG5fX3dlYnBhY2tfcmVxdWlyZV9fLnIgPSAoZXhwb3J0cykgPT4ge1xuXHRpZih0eXBlb2YgU3ltYm9sICE9PSAndW5kZWZpbmVkJyAmJiBTeW1ib2wudG9TdHJpbmdUYWcpIHtcblx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgU3ltYm9sLnRvU3RyaW5nVGFnLCB7IHZhbHVlOiAnTW9kdWxlJyB9KTtcblx0fVxuXHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgJ19fZXNNb2R1bGUnLCB7IHZhbHVlOiB0cnVlIH0pO1xufTsiLCIiLCIvLyBzdGFydHVwXG4vLyBMb2FkIGVudHJ5IG1vZHVsZSBhbmQgcmV0dXJuIGV4cG9ydHNcbi8vIFRoaXMgZW50cnkgbW9kdWxlIHVzZWQgJ21vZHVsZScgc28gaXQgY2FuJ3QgYmUgaW5saW5lZFxudmFyIF9fd2VicGFja19leHBvcnRzX18gPSBfX3dlYnBhY2tfcmVxdWlyZV9fKFwiLi9zdGF0aWMvc2NyaXB0cy90ZW1wX3NjcmlwdHMvc2NyaXB0LmpzXCIpO1xuIiwiIl0sIm5hbWVzIjpbXSwic291cmNlUm9vdCI6IiJ9