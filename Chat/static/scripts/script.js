// url`s my server
const rooms_url = "/api/room";
const users_url = "/api/users";
const current_user = "/api/currentuser";
const message = "/api/message";
const room_members = "/api/RoomMembers";
const rooms_Node = document.querySelector(".rooms");

// Получаем текущего пользователя
function getCurrentUser(url, callback) {
  const user = new XMLHttpRequest();
  user.open("get", url, true);
  user.onload = function () {
    if (user.status != 200) {
      console.log("Статус ответа: ", xhr.status);
    } else {
      const result = JSON.parse(user.response);
      if (callback) {
        callback(result);
      }
    }
  };
  user.onerror = function () {
    console.log(`Ошибка запроса, Статус ответа:  ${xhr.status}`);
  };
  user.send();
}

// Получает чат комнаты
const fetchRooms = async (url) => {
  const response = await fetch(url);
  const json = await response.json();
  return json;
};

// Получаем чат комнаты
const rooms = fetchRooms(rooms_url);
rooms.then(
  (result) => console.log("rooms:", result),
  (error) => console.log("Rejected: " + error)
);

// Получаем пользователей
const users = fetchRooms(users_url);
users.then(
  (result) => console.log("users:", result),
  (error) => console.log("Rejected: " + error)
);

function displayResult(apiData, cur_node) {
  let cards = "";
  // console.log("start cards", apiData);

  apiData.forEach((item) => {
    const cardBlock = `
      <li id=${item.id}>    
        <p>${item.username}</p>
      </li>
    `;
    cards = cards + cardBlock;
    console.log(cards);
  });
  cur_node.innerHTML = cards;
}

a = getCurrentUser(current_user, displayResult(rooms_Node));
console.log(a);
