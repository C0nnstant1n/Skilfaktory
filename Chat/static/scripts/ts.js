let obj = [
    {
        "id": 1,
        "username": "admin",
        "avatar": "avatar/default_avatar.png"
    },
    {
        "id": 2,
        "username": "qq",
        "avatar": "avatar/default_avatar.png"
    },
    {
        "id": 3,
        "username": "ww",
        "avatar": "avatar/default_avatar.png"
    }
]
var keys = Object.keys(obj).map((key, value) =>{
    console.log(obj[key].id,":", obj[key].username)
    // console.log(index)
});
console.log('obj contains ' + keys.length + ' keys: '+  keys);

function roomId(id) {
    document.getElementById(window.current_room).className = "li-off";
    window.current_room = id;
    document.getElementById(window.current_room).className = "li-on";
    getApiData(showMessages, message + id);
}

export {roomId}