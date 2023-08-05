import {getData, putApiData} from "./get_post.js"
import {urls, nodes} from "./consts.js";


//  Получаем текущего пользователя
async function getCurrentUser() {
    const cur_user = await getData(urls.CURRENT)
    return cur_user[0].username
}

// Получаем JSON данные с сервера
function getApiData(callback, url) {
    getData(url).then((response) => {
        return callback(response)
    })
}

// Формируем список комнат
function showRoomsData(apiData) {
    let li = "";
    if (apiData.length > 0) {
        window.current_room = apiData[0].id
        apiData.forEach((element) => {
            if (element.name === getCurrentUser()) {
                const li_block = `
              <li id=${element.id} class="li-off">
                <p>${element.author}</p>
                <script type="module">
                import {roomId} from "./script";
                const el = document.querySelector(id)
                console.log(el)
                el.addEventListener('click', () => {roomId(id)}
                </script>
              </li>`;
                li = li + li_block;
            } else {
                const li_block =`
                <li id=${element.id} class="li-off" onclick="roomId(${element.id})">
                    <p>${element.name}</p>
                    <script type="module">
                    import {roomId} from "/static/scripts/script.js";
                    window.roomId = roomId
                    </script>
                </li>`;
                li = li + li_block;
            }
        });
    } else {
        return
    }
    nodes.rooms.innerHTML = li;
    document.getElementById(window.current_room).className = "li-on";
    getApiData(showMessages, urls.MESSAGES);
}


// Формируем список пользователей на страничке
function showUsersData(apiData) {
    let li = "";
    apiData.forEach((element) => {
        const li_block = `
    <li id=${element.username}">
    <img src="/uploads/${element.avatar}" alt="avatar" />
    <p>${element.username}</p>
  </li>`;
        li = li + li_block;
    });
    nodes.users.innerHTML = li;
}

function showMessages(apiData) {
    let li = "";
    apiData.forEach((element) => {
        const li_block = `
    <li id=${element.author}>
    <h4>${element.author}</h4>
    <p>${element.text}</p>
  </li>`;
        li = li + li_block;
    });
    nodes.message.innerHTML = li;
}

// Получаем список чат комнат и выводим на страничку
getApiData(showRoomsData, urls.ROOMS);
// Список всех пользователей
getApiData(showUsersData, urls.USERS);

const qq = document.getElementById('qq')
console.log(qq)
// qq.onclick = () => alert("The native handler");
// qq.addEventListener("click", console.log('clik'));

// Создаем новую чат комнату
// function userId(id) {
//   let room_data = {
//     name: id,
//   };

//   if (getCurrentUser().length !== 0) {
//     // Проверяем есть ли уже такая комната
//     getApiData(urls.ROOMS).then((result) => {
//       if (roomExist(result, id)) {
//         console.log("Комната уже есть");
//       } else {
//         putApiData(room_data, urls.ROOMS).then((res) => {
//           return res.json()
//         }).then((r) => {
//           console.log(r)})
//       }
//     });
//   } else {
//     alert("Войдите или зарегистрируйтесть, чтобы отправлять сообщения");
//   }
// }

// Проверяем существует ли комната
function roomExist(rooms, id) {
    for (let i of rooms) {
        if (i.name === id) {
            return true;
        }
    }
    return false;
}


// Переход в комнату
function roomId(id) {
    document.getElementById(window.current_room).className = "li-off";
    window.current_room = id;
    document.getElementById(window.current_room).className = "li-on";
    getApiData(showMessages, message + id);
}

// Отправляем сообщение
// let form = document.getElementById("form");
// if (form !== null){
// form.onsubmit = async (e) => {
//   e.preventDefault();
//   let my_form = new FormData(form);
//
//   my_form.append("target", window.current_room);
//   my_form.append("author", cur_user[0].username);
//
//   let response = await fetch(message, {
//     method: "POST",
//     body: my_form,
//   });
//   console.log(response)
// };}

export {roomId}