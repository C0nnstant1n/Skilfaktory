import {ItcCustomSelect} from "./itc-custom-select.js"

// const select1 = new ItcCustomSelect('#select-1');

(async() => {
    const response = await fetch("/api/users/")
    if (response.ok) {
        const data= await response.json();
        const selector = document.querySelector('.itc-select__options').innerHTML
        let values = ""
        for (let i of data){
            values = `<li class=\"itc-select__option\" data-select=\"option\" data-value=${i.username} data-index=${i.id}>${i.username}</li>`
            console.log(values)
            values.join('');
        }
        console.log(values)
        new ItcCustomSelect('#select-1');
        document.querySelector('.itc-select__toggle').disabled = false;
    }
})();

// Отправляем форму
let form = document.getElementById("form");
// form.onsubmit = async (e) => {
//     e.preventDefault();
//     let my_form = new FormData(form);
//
//     my_form.append("author", cur_user[0].username);
//
//     let response = await fetch(message, {
//         method: 'POST',
//         body: my_form
//     });
//     console.log(response)
// };