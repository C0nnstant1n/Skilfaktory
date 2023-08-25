const coll = document.getElementsByClassName("collapsible");
let i, n;
const collapse = document.getElementsByClassName("content")
const experience = document.getElementsByClassName('experience')

console.log(window.innerWidth)

for (n of collapse) {
    n.style.display = "none"
}

if (window.innerWidth > 600) {experience.item(0).getElementsByTagName('button').item(0).classList.toggle('active')
collapse[2].style.display = 'grid'}


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
    if (e.target === popup_content) {
        popup.style.display = "none"
    }
}