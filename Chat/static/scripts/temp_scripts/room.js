import {urls} from "./consts.js"

class Room {
    constructor(room_data) {
        this.id = room_data.id
        this.name = room_data.name
        this.author = room_data.author
        this.members = room_data.members
    }

    setMembers(users) {
        for (let i of users){
        this.members.push(i)}
    }

    get users(){
        return this.members
    }
}

async function getRooms(url) {
    const res = await fetch(url)
    return res.json();
}

async function newRoom() {
    let data = await getRooms(urls.ROOMS)
    return new Room(data[0])
}



const new_room = {
    name: 'test',
    author: 'wer',
    members: ['qq', 'sada']
}

const new_room1 =
['admin', 'qq']

export{Room}