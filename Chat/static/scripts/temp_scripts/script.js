import { getApiData, putApiData, csrftoken } from "./get_post.js";
import { ItcCustomSelect } from "./itc-custom-select.js";
import { nodes, urls } from "./consts.js";

//  Получаем текущего пользователя
async function getCurrentUser() {
  const cur_user = await getApiData(urls.CURRENT);
  return cur_user[0];
}

const current_user = await getCurrentUser();

// Получаем список комнат участником которых являемся
async function getRooms() {
  return await getApiData(urls.ROOMS);
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
nodes.rooms.innerHTML = li;

console.log(document.querySelectorAll(".rooms li"));
if (current_room.id !== 0) {
  document.getElementById(current_room.id).className = "li-on";
}

// Отображаем сообщения в комнате
await getApiData(showMessages, urls.MESSAGES + `?target=${current_room.id}`);

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
  nodes.users.innerHTML = li;
}

// Формируем список участников в комнате
function showRoomMembers(id) {
  getRooms().then((result) => {
    rooms = result;
    nodes.users.innerHTML = "";
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
        nodes.users.innerHTML = li;
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
  nodes.message.innerHTML = li;
}

// Список всех пользователей
// getApiData(showUsersData, urls.USERS);

//Создаем новую чат комнату
async function userId(id) {
  const rooms = await getApiData(urls.ROOMS);
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
      putApiData(room_data, urls.ROOMS)
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
  nodes.users.innerHTML = "";
  showRoomMembers(id);
  getApiData(showMessages, urls.MESSAGES + `?target=${id}`);
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
    putApiData(message, urls.MESSAGES).then((response) => {
      console.log(response.json());
    });
  }
  e.target.reset();
};

// Кнопка добавить участника
async function addButton() {
  const response = await fetch(urls.USERS);
  if (response.ok) {
    const data = await response.json();
    const values = Object.keys(data).map((key, index) => {
      return `<li class="itc-select__option" data-select="option" data-value="${data[key].id}" data-index="${index}">${data[key].username}</li>`;
    });
    document.querySelector(".itc-select__options").innerHTML = values.join("");
    document.ITC = new ItcCustomSelect("#select-1");
    document.querySelector(".itc-select__toggle").disabled = false;
  }
}

addButton();

document
  .querySelector("#select-1")
  .addEventListener("itc.select.change", (e) => {
    const btn = e.target.querySelector(".itc-select__toggle");

    const data = {
      csrfmiddlewaretoken: csrftoken,
      room: current_room.id,
      member: btn.value,
    };
    if (rooms.length > 0) {
      for (let user of current_room.members) {
        if (btn.value == user.id) {
          alert("Этот пользователь уже есть в этой комнате");
          break;
        } else {
          putApiData(data, urls.MEMBER).then((response) => {
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

export { roomId, userId };
