const coll = document.getElementsByClassName("collapsible");
let i, n;
const collapse = document.getElementsByClassName("content")

console.log(window.screen.availWidth)

for (n of collapse) {
    n.style.display = "none"
}

for (i = 0; i < coll.length; i++) {
    coll[i].addEventListener("click", function () {
        this.classList.toggle("active");
        const content = this.nextElementSibling;
        if (content.style.display === "grid") {
            content.style.display = "none";
        } else {
            content.style.display = "grid";
        }
    });
}

let popup = document.getElementById('photo-popup')
popup_toggle = document.getElementById('logo-btn')
popup_close = document.querySelector('.close')
popup_content = document.getElementById('popup-content')

popup_toggle.onclick = function () {
    popup.style.display = "flex"
}

popup_close.onclick = function () {
    popup.style.display = "none"
}

window.onclick = function (e) {
    if (e.target == popup_content) {
        popup.style.display = "none"
    }
}