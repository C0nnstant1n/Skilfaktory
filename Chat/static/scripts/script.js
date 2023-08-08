import {getApiData, putApiData} from "./get_post.js"
import {nodes, urls} from "./consts.js"
import {ItcCustomSelect} from "./itc-custom-select.js"


//  Получаем текущего пользователя
async function getCurrentUser() {
    const cur_user = await getApiData(urls.CURRENT)
    return cur_user[0].username
}

// Формируем список комнат
async function showRoomsData(apiData) {
    let li = "";
    const rooms = await apiData
    if (rooms.length > 0) {
        window.current_room = rooms[0].id

        for (let room of rooms) {
            const li_block = `
            <li id=${room.id} class="li-off" onclick="roomId(${room.id})">
                <p>${room.name}</p>
            </li>`;
            li = li + li_block;
        }
    } else {
        return
    }
    nodes.rooms.innerHTML = li;
    document.getElementById(window.current_room).className = "li-on";
    await getApiData(showMessages, urls.MESSAGES + `?target=${window.current_room}`);
    return document.getElementById(window.current_room)
}


// Формируем список пользователей на страничке
async function showUsersData(apiData) {
    let li = "";
    const users = await apiData
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

async function showMessages(apiData) {
    let li = "";
    const messages = await apiData
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

// Получаем список чат комнат и выводим на страничку
getApiData(showRoomsData, urls.ROOMS);
// Список всех пользователей
getApiData(showUsersData, urls.USERS);

//Создаем новую чат комнату
async function userId(id) {
    const rooms = await getApiData(urls.ROOMS)
    let room_exist = await roomExist(rooms, id)
    let room_data = {
        name: id,
    };//

    if (getCurrentUser().length !== 0) {
        // Проверяем есть ли уже такая комната
        if (room_exist[1]) {
            roomId(room_exist[0])
        } else {
            // создаем комнату
            putApiData(room_data, urls.ROOMS).then((res) => {
                return res.json()
            }).then((room) => {
                // Отображаем новую комнату
                getApiData(showRoomsData, urls.ROOMS)
            })
        }
    } else {
        alert("Войдите или зарегистрируйтесь, чтобы отправлять сообщения");
    }
}

// Проверяем существует ли комната
async function roomExist(rooms, id) {
    const response = await rooms
    for (let i of response) {
        if (i.name === id) {
            return [i.id, true]
        }
    }
    return false;
}


// Переход в комнату
function roomId(id) {
    document.getElementById(window.current_room).className = "li-off";
    window.current_room = id;
    document.getElementById(window.current_room).className = "li-on";
    getApiData(`room/${id}`).then((response) => {
        const h = document.getElementById("room")
        h.innerHTML = `Комната: ${response.name}`
    })
    getApiData(showMessages, urls.MESSAGES + `?target=${id}`);
}

// Selector
(async () => {
    const response = await fetch(urls.USERS)
    if (response.ok) {
        const data = await response.json();
        const values = Object.values(data).map((key, index) => {
            return `<li class="itc-select__option" data-select="option" data-value="${key.username}" data-index="${index}">${data[index].username}</li>`;
        });
        document.querySelector('.itc-select__options').innerHTML = values.join('');
        new ItcCustomSelect('#select-1');
        document.querySelector('.itc-select__toggle').disabled = false;
    }
})();


// Отправляем сообщение
let message_form = document.getElementById("message-form");
message_form.onsubmit = async (e) => {
    e.preventDefault();
    let my_form = new FormData(message_form);

    my_form.append("target", window.current_room);
    getCurrentUser().then((response) => {
        return response
    }).then((user) => {
        let message = {
            "csrfmiddlewaretoken": `${my_form.get("csrfmiddlewaretoken")}`,
            "text": `${my_form.get("text")}`,
            "author": user,
            "target": my_form.get("target")
        }
        putApiData(message, urls.MESSAGES).then((response) => {
            document.getElementById("message").value = ''
            console.log(response.json())

        })
    })
};

// Изменяем комнату
const room_form = document.getElementById("form-change-room");
room_form.onsubmit = async (e) => {
    e.preventDefault();
    let my_form = new FormData(room_form)

  const { elements } = room_form
  const data = Array.from(elements)
    .filter((item) => !!item.name)
    .map((element) => {
      const { name, value } = element

      return { name, value }
    })
    let arr = {}
    for (let i of data){
        arr += `${i.name}: ${i.value}\n`
    }
    console.log(arr)
    console.log(arr.json())
}

export {roomId, userId}


