// url`s my server
// import "../style/lk/style.css";
const rooms_url = "/api/room/";
const users_url = "/api/users/";
const current_user = "/api/currentuser/";
const message = "/api/message/?target=";
const member_url = "/api/member/";
const rooms_Node = document.querySelector(".rooms");
const users_Node = document.querySelector(".users");
const message_node = document.querySelector(".messages");
window.current_room = 0

//  Получаем текущего пользователя
function getCurrentUser() {
  const xhr = new XMLHttpRequest()

  xhr.onload = function () {
    console.log(`Статус: ${xhr.status}`)
  }

  xhr.onerror = function () {
    console.log("Ошибка запроса")
  }

  xhr.open("get", current_user, false)
  xhr.send()
  return JSON.parse(xhr.response)
}
const cur_user = getCurrentUser();

// Получаем данные с сервера
function getApiData(callback, url) {
  fetch(url)
    .then((response) => {
      return response.json();
    })
    .then((data) => {
      callback(data);
    });
  return 0
}
// Формируем список комнат
function showRoomsData(apiData) {
  let li = "";
  if (apiData.length >0){
  window.current_room = apiData[0].id
  apiData.forEach((element) => {
    if (element.name === cur_user[0].username) {
      const li_block = `
      <li id=${element.id} class="li-off" onclick="roomId(id)">
        <p>${element.author}</p>
      </li>`;
      li = li + li_block;
    } else {
      const li_block = `
      <li id=${element.id} class="li-off" onclick="roomId(id)">
        <p>${element.name}</p>
      </li>`;
      li = li + li_block;
    }
  });}else {return}
  rooms_Node.innerHTML = li;
  document.getElementById(window.current_room).className = "li-on"
  showMessages(apiData)
}
// Формируем список пользователей на страничке
function showUsersData(apiData) {
  let li = "";
  apiData.forEach((element) => {
    const li_block = `
    <li id=${element.username} onclick="userId(id)">
    <img src="/uploads/${element.avatar}" alt="avatar" />
    <p>${element.username}</p>
  </li>`;
    li = li + li_block;
  });
  users_Node.innerHTML = li;
}

function showMessages(apiData) {
  console.log(apiData)
  let li = "";
  apiData.forEach((element) => {
    const li_block = `
    <li id=${element.author}>
    <h4>${element.author}</h4>
    <p>${element.text}</p>
  </li>`;
    li = li + li_block;
  });
  message_node.innerHTML = li;
}

function clearMessages(node) {
  node.innerHTML = "";
}

// Получаем список чат комнат и выводим на страничку
getApiData(showRoomsData, rooms_url)
// Список всех пользователей
getApiData(showUsersData, users_url);

// Получаем токен
function getCookie(name) {
  let cookieValue = null;
  if (document.cookie && document.cookie !== '') {
    const cookies = document.cookie.split(';');
    for (let i = 0; i < cookies.length; i++) {
      const cookie = cookies[i].trim();
      // Does this cookie string begin with the name we want?
      if (cookie.substring(0, name.length + 1) === (name + '=')) {
        cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
        break;
      }
    }
  }
  return cookieValue;
}
const csrftoken = getCookie('csrftoken');

// Получаем какие нибудь данные от сервера
async function getApi(url) {
  let response = await fetch(url);
  return await response.json();
}

// Создаем новую чат комнату
function userId(id) {
  let room_data = {
    name: id,
  };

  if (cur_user.length !== 0) {
    // Проверяем есть ли уже такая комната
    getApi(rooms_url).then((result) => {
      if (roomExist(result, id)) {
        console.log("Комната уже есть");
      } else {
        putApiData(room_data, rooms_url);
      }
    });
  } else {
    alert("Войдите или зарегистрируйтесть, чтобы отправлять сообщения");
  }
}

// Проверяем существует ли комната
function roomExist(rooms, id) {
  for (let i of rooms) {
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
      "X-CSRFTOKEN": csrftoken,
    },
    body: JSON.stringify(data),
  }).then((response) => {
    response.json().then((result) => {
      console.log(result);
    });
  });
}


// Переход в комнату
function roomId(id) {
  document.getElementById(window.current_room).className = "li-off"
  window.current_room = id;
  document.getElementById(window.current_room).className = "li-on"
  getApiData(showMessages, (message + id));
}

// Отправляем сообщение
let form = document.getElementById("form");
if (form !== null){
form.onsubmit = async (e) => {
  e.preventDefault();
  let my_form = new FormData(form);

  my_form.append("target", window.current_room);
  my_form.append("author", cur_user[0].username);

  let response = await fetch(message, {
    method: 'POST',
    body: my_form
  });
  console.log(response)
};}
