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
