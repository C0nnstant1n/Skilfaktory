const option_Node = document.querySelector(".selector");

// Получаем данные с сервера
function getApiData(callback, url) {
    fetch(url)
        .then((response) => {
            return response.json();
        })
        .then((data) => {
            callback(data);
        });
    return 0;
}

function showUsersData(apiData) {
    let option = "";
    apiData.forEach((element) => {
        const option_block = `
    <option value=${element.username}>
     ${element.username}
    </option>`;
        option = option_block + option;
    });
    option_Node.innerHTML = option
}

console.log(option_Node)
getApiData(showUsersData, "/api/users/")

// Отправляем форму
const form = document.getElementById("create_room");
console.log("form")



form.onsubmit = async (e) => {
    e.preventDefault();
    let my_form = new FormData(form);
    my_form.append("members", document.select.value)
    console.log('Обработка события')
    console.log(document.select.value)
    console.log(Array.from(my_form.entries()))

    let response = await fetch("/api/room/", {
        method: 'POST',
        body: my_form
    });
    console.log(Array.from(my_form.entries()))
    console.log(response)
}





// import { ItcCustomSelect } from "./itc-custom-select.js";
//
// (async() => {
//     const response = await fetch("/api/users/")
//     if (response.ok) {
//         const data= await response.json();
//         const selector = document.querySelector('.itc-select__options').innerHTML
//         const values = Object.keys(data).map((key, index) => {
//             return `<li class="itc-select__option" data-select="option" data-value="${data[key].username}" data-index="${data[key].id}">${data[key].username}</li>`;
//         });
//         document.querySelector('.itc-select__options').innerHTML = values.join('');
//         document.select = new ItcCustomSelect('#select-1');
//         document.querySelector('.itc-select__toggle').disabled = false;
//     }
//     console.log(values);
//     new ItcCustomSelect("#select-1");
//     document.querySelector(".itc-select__toggle").disabled = false;
//   }
// })();