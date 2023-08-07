import {getApiData, putApiData} from "./get_post.js";
import {urls} from "./consts.js";

const option_Node = document.querySelector(".selector");

async function showUsersData(apiData) {
    let option = "";
    const users = await apiData
    for (let element of users) {
        const option_block = `
        <option value=${element.username}>
           ${element.username}
        </option>`;
        option = option_block + option
    }
    option_Node.innerHTML = option
}

getApiData(showUsersData, urls.USERS)

// Отправляем форму
const form = document.getElementById("create_room");

form.onsubmit = (e) => {
    e.preventDefault();
    let my_form = new FormData(form);
    console.log('Обработка события')
    const members = my_form.getAll("members")


    // Создём комнату
    let room_data = {
        "csrfmiddlewaretoken": `${my_form.get("csrfmiddlewaretoken")}`,
        "name": `${my_form.get("name")}`,
    }
    putApiData(room_data, urls.ROOMS).then((response) => {
        return  response.json()}).then((room) => {
        console.log(room)
        for (let member of members) {
            let member_data = {
                "csrfmiddlewaretoken": `${my_form.get("csrfmiddlewaretoken")}`,
                "room": room.name,
                "member": member
            }

            putApiData(member_data, urls.MEMBER).then((response) =>{
                console.log(response.statusText)
            })
        }
    })
}
