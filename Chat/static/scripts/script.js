// url`s my server
const rooms_url = "/api/room/";
const users_url = "/api/users/";
const current_user = "/api/currentuser/";
const message = "/api/message/";
const member_url = "/api/member/";
const rooms_Node = document.querySelector(".rooms");
const users_Node = document.querySelector(".users");
const message_node = document.querySelector(".messages");

// Получаем данные с сервера
function getApiData(callback, url, node) {
  fetch(url)
    .then((response) => {
      return response.json();
    })
    .then((data) => {
      callback(data, node);
    });
}
// Формируем список комнат
function showRoomsData(apiData, node) {
  let li = "";
  apiData.forEach((element) => {
    const li_block = `
    <li id=${element.id} onclick="roomId(id)">
      <p>${element.name}</p>
    </li>`;
    li = li + li_block;
  });
  node.innerHTML = li;
}
// Формируем список пользователей на страничке
function showUsersData(apiData, node) {
  let li = "";
  apiData.forEach((element) => {
    const li_block = `
    <li id=${element.username} onclick="userId(id)">
    <img src="/uploads/${element.avatar}" alt="avatar" />
    <p>${element.username}</p>
  </li>`;
    li = li + li_block;
  });
  node.innerHTML = li;
}

function showMessages(apiData, node) {
  let li = "";
  apiData.forEach((element) => {
    const li_block = `
    <li id=${element.author}>
    <h3>${element.author}</h3>
    <p>${element.text}</p>
  </li>`;
    li = li + li_block;
  });
  node.innerHTML = li;
}

function clearMessages(node) {
  let li = "";
  node.innerHTML = li;
}

// Получаем список чат комнат и выводим на страничку
getApiData(showRoomsData, rooms_url, rooms_Node);
// Список всех пользователей
getApiData(showUsersData, users_url, users_Node);

// Получаем токен
const crsftoken = getCookie("csrftoken");
function getCookie(cname) {
  let name = cname + "=";
  let decodedCookie = decodeURIComponent(document.cookie);
  let ca = decodedCookie.split(";");
  for (let i = 0; i < ca.length; i++) {
    let c = ca[i];
    while (c.charAt(0) == " ") {
      c = c.substring(1);
    }
    if (c.indexOf(name) == 0) {
      return c.substring(name.length, c.length);
    }
  }
  return "";
}

// Получаем какие нибудь данные от сервера
async function getApi(url) {
  let response = await fetch(url);
  let rooms = await response.json();
  return rooms;
}

// Создаем новую чат комнату
function userId(id) {
  let room_data = {
    name: id,
  };
  let member_data = {
    room: id,
    member: id,
  };

  // Проверяем есть ли уже такая комната
  getApi(rooms_url).then((result) => {
    if (roomExist(result, id)) {
      console.log("Комната уже есть");
    } else {
      putApiData(room_data, rooms_url);
      setTimeout(() => {
        console.log("timer");
        putApiData(member_data, member_url);
      }, 100);
    }
  });
}

// Проверяем существует ли комната
function roomExist(rooms, id) {
  for (i of rooms) {
    if (i.name === id) {
      return true;
    }
  }
  return false;
}

// Отправляем на сервер новую комнату
function putApiData(data, url) {
  fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json;charset=utf-8",
      "X-CSRFTOKEN": crsftoken,
    },
    body: JSON.stringify(data),
  }).then((response) => {
    let result = response.json().then((result) => {
      console.log(result);
    });
  });
}

function roomId(id) {
  clearMessages(message_node);
  get_uri = message + "?target=" + id;
  console.log(get_uri);
  getApiData(showMessages, get_uri, message_node);
  console.log(id);
}

// getApi(current_user).then((user) => {
//   if (user[0].username == id) {
//     return true;
//   } else {
//     console.log("Нестоит писать самому себе");
//     return false;
//   }
// })
