import {getApiData, putApiData, updateApiData} from "./get_post.js"
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

// Показываем участников комнаты
async function showMembersData(apiData) {
    console.log(apiData)
    let li = "";
    const members = await apiData
    for (let user of members) {
        const li_block = `
        <li id=${user.username} onclick="userId(id)">
            <img src="/uploads/${user.avatar}" alt="avatar" />
            <p>${user.username}</p>
            <div class="user-btn" id=${user.username + user.id}>
            <svg width="16" height="16" fill="currentColor" class="x-square" viewBox="0 0 16 16">
  <path d="M14 1a1 1 0 0 1 1 1v12a1 1 0 0 1-1 1H2a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1h12zM2 0a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2H2z"/>
  <path d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708z"/>
</svg>
</div>
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
    document.getElementById(window.current_room).className = "li-off";
    window.current_room = id;
    document.getElementById(window.current_room).className = "li-on";
    getApiData(urls.ROOMS+id+'/').then((response) => {
        const h = document.getElementById("room")
        h.innerHTML = `Комната: ${response.name}`
    })
    getApiData(showMessages, urls.MESSAGES + `?target=${id}`);
    getApiData(showMembersData, urls.ROOMS+id+"/members")
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
        arr[i.name] = i.value
    }
    if (arr.name){
        delete arr.username
        console.log(arr.name)
        await updateApiData(arr, urls.ROOMS+window.current_room+"/").then((response) =>{
            console.log(response)}).then(() => {roomId(window.current_room)})
    }else {
        console.log("false", arr)}
}

export {roomId, userId}



