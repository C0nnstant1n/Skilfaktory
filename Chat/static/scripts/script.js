import {getApiData, putApiData} from "./get_post.js"
import {nodes, urls} from "./consts.js";


//  Получаем текущего пользователя
async function getCurrentUser() {
    const cur_user = await getApiData(urls.CURRENT)
    return cur_user[0]
}

const current_user = await getCurrentUser()

async function getCurrentRoom() {
    const cur_room = await getApiData(urls.ROOMS)
    return cur_room[0]
}

let current_room = await getCurrentRoom()

console.log(current_user.username, current_room)


// Формируем список комнат
async function showRoomsData(apiData) {
    let li = "";
    const rooms = await apiData
    if (rooms.length > 0) {
        current_room.id = rooms[0].id

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
    document.getElementById(current_room.id).className = "li-on";
    await getApiData(showMessages, urls.MESSAGES + `?target=${current_room.id}`);
    return document.getElementById(current_room.id)
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

// Формируем список участников в комнате
async function showRoomMembers(apiData) {
    let li = ""
    const room = await apiData
    for (let user of room.members) {
        if (user.id != current_user.id) {
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
// Спиок участников комнаты
if (typeof current_room !== 'undefined') {
    getApiData(showRoomMembers, urls.ROOMS + current_room.id)
}

// Список всех пользователей
// getApiData(showUsersData, urls.USERS);

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
    document.getElementById(current_room.id).className = "li-off";
    current_room.id = id;
    document.getElementById(current_room.id).className = "li-on";
    getApiData(showRoomMembers, urls.ROOMS + current_room.id)
    getApiData(showMessages, urls.MESSAGES + `?target=${id}`);
}


// Отправляем сообщение
let form = document.getElementById("message-form");
form.onsubmit = async (e) => {
    e.preventDefault();
    let my_form = new FormData(form);

    my_form.append("target", current_room.id);
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
            console.log(response.json())
        })
    })
};

export {roomId, userId}



