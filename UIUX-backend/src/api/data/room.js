module.exports = class Room {
    constructor(json_string) {
        const obj = JSON.parse(json_string);

        this.room_id = obj.room_id;
        this.room_name = obj.room_name;
        this.room_type = obj.room_type;
    }

    toString(){
        return `Room id: ${this.room_id}, Room name: ${this.room_name}, Room type: ${this.room_type}`;
    }
}

