// url`s my server
const rooms_url = "/api/room/";
const users_url = "/api/users/";
const current_user = "/api/currentuser/";
const message = "/api/message/";
const rooms_Node = document.querySelector(".rooms");
const users_Node = document.querySelector(".users");

function getApiData(callback, url, node) {
  fetch(url)
    .then((response) => {
      return response.json();
    })
    .then((data) => {
      callback(data, node);
    });
}

function showRoomsData(apiData, node) {
  let li = "";
  apiData.forEach((element) => {
    const li_block = `
    <li ${(id = element.id)}>
      ${element.name}
    </li>`;
    li = li + li_block;
  });
  node.innerHTML = li;
}

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

getApiData(showRoomsData, rooms_url, rooms_Node);
getApiData(showUsersData, users_url, users_Node);

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

function userId(id) {
  let put_data = {
    name: id,
  };
  console.log(getRoomsUsers(id));
  putApiData(put_data);
}

function getRoomsUsers(user) {
  const rooms = new XMLHttpRequest();
  rooms.onload = function () {
    let data = JSON.parse(rooms.response);
    data.forEach((item) => {
      if (item.author == user) {
        return true;
      }
      return false;
    });

    // if (user of rooms.response["author"]) {
    //   return true;
    // } else {
    //   return false;
    // }
  };
  rooms.onerror = function () {
    console.log("Ошибка запроса");
  };
  rooms.open("get", rooms_url);
  rooms.send();
}

function putApiData(data) {
  fetch(rooms_url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json;charset=utf-8",
      "X-CSRFTOKEN": crsftoken,
    },
    body: JSON.stringify(data),
  }).then((response) => {
    let result = response.json();
    console.log(result.message);
  });
}
