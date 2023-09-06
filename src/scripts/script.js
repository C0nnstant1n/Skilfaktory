import "../style/main.scss";
import { getApiData, putApiData, csrftoken } from "./get_post";
import { ItcCustomSelect } from "./itc-custom-select";
import { nodes, urls } from "./consts";

//  Получаем текущего пользователя
async function getCurrentUser() {
  const cur_user = await getApiData(urls.CURRENT);
  return cur_user[0];
}

const current_user = await getCurrentUser();

// Получаем список комнат участником которых являемся
async function getRooms() {
  return getApiData(urls.ROOMS);
}

let rooms = await getRooms();

// Устанавливаем текущую комнату (Первую из списка доступных)
const current_room = { id: 0, name: "", members: [] };
if (rooms.length > 0) {
  current_room.id = rooms[0].id;
  current_room.name = rooms[0].name;
  current_room.members = rooms[0].members;
}

// Формируем список участников в комнате
function showRoomMembers(id) {
  getRooms().then((result) => {
    rooms = result;
    nodes.users.innerHTML = "";
    let li = "";
    for (const room of rooms) {
      if (room.id === id) {
        for (const user of room.members) {
          if (user.id !== current_user.id) {
            const li_block = `
                    <li id=${user.username}>
                        <img src="/uploads/${user.avatar}" alt="avatar" />
                        <p>${user.username}</p>
                    </li>`;
            li += li_block;
          }
        }
        nodes.users.innerHTML = li;
      }
    }
  });
}

// Отображаем участников комнаты(кроме себя)
showRoomMembers(current_room.id);

// Формируем список комнат
let li = "";
if (rooms.length > 0) {
  current_room.id = rooms[0].id;
  for (const room of rooms) {
    const li_block = `
        <li id=${room.id} class="li-off">
            <p>${room.name}</p>
        </li>`;
    li += li_block;
  }
}
nodes.rooms.innerHTML = li;

if (current_room.id !== 0) {
  document.getElementById(current_room.id).className = "li-on";
}

// Получаем сообщения с сервера
async function showMessages(apiData) {
  li = "";
  const messages = await apiData;
  for (const message of messages) {
    const li_block = `
    <li id=${message.author}>
    <h4>${message.author}</h4>
    <p>${message.text}</p>
  </li>`;
    li += li_block;
  }
  nodes.message.innerHTML = li;
}

// Отображаем сообщения в комнате
await getApiData(showMessages, `${urls.MESSAGES}?target=${current_room.id}`);

// Формируем список пользователей на страничке
// async function showUsersData(apiData) {
//   let li = "";
//   const users = await apiData;
//   for (const user of users) {
//     const li_block = `
//         <li id=${user.username} onclick="userId(id)">
//             <img src="/uploads/${user.avatar}" alt="avatar" />
//             <p>${user.username}</p>
//         </li>`;
//     li += li_block;
//   }
//   nodes.users.innerHTML = li;
// }

// Список всех пользователей
// getApiData(showUsersData, urls.USERS);

// Проверяем существует ли комната
function roomExist(id) {
  for (const i of rooms) {
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
  getApiData(showMessages, `${urls.MESSAGES}?target=${id}`);
}

// Создаем новую чат комнату
async function userId(id) {
  rooms = await getApiData(urls.ROOMS);
  const room_exist = roomExist(rooms, id);
  const room_data = {
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

document.querySelectorAll("ul li").forEach((click) => {
  click.addEventListener("click", function () {
    roomId(Number(this.id));
  });
});

// Отправляем сообщение
const form = document.getElementById("message-form");
form.onsubmit = async (e) => {
  e.preventDefault();
  const my_form = new FormData(form);

  my_form.append("target", current_room.id);
  if (my_form.get("target") !== "0" && my_form.get("text") !== "") {
    const message = {
      csrfmiddlewaretoken: `${my_form.get("csrfmiddlewaretoken")}`,
      text: `${my_form.get("text")}`,
      author: current_user.username,
      target: my_form.get("target"),
    };
    putApiData(message, urls.MESSAGES);
  }
  e.target.reset();
};

// Кнопка добавить участника
async function addButton() {
  const response = await fetch(urls.USERS);
  if (response.ok) {
    const data = await response.json();
    const values = Object.keys(data).map((key, index) => {
      return `<li class="itc-select__option" data-select="option" 
      data-value="${data[key].id}" data-index="${index}">
      ${data[key].username}</li>`;
    });
    document.querySelector(".itc-select__options").innerHTML = values.join("");
    document.ITC = new ItcCustomSelect("#select-1");
    document.querySelector(".itc-select__toggle").disabled = false;
  }
}

addButton();

document.querySelector("#select-1").addEventListener("itc.select.change", (e) => {
  const btn = e.target.querySelector(".itc-select__toggle");

  const data = {
    csrfmiddlewaretoken: csrftoken,
    room: current_room.id,
    member: btn.value,
  };
  if (rooms.length > 0) {
    if (current_room.members.some((o) => o.id === Number(btn.value))) {
      alert("Этот пользователь уже тут");
    } else {
      putApiData(data, urls.MEMBER).then(() => {
        showRoomMembers(current_room.id);
      });
    }
  } else {
    alert("Создйте комнату");
  }
  btn.dataset.index = -1;
  btn.textContent = "Добавить участника";
});

export { roomId, userId };
