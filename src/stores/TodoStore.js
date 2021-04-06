import { EventEmitter } from "events";

class TodoStore extends EventEmitter {
    constructor() {
        super()
        this.todos = 'Yolo'
    }

    createTodo(text) {
        this.todos.push({
            text
        })

        this.emit("change")
    }

    getAll() {
        return this.todos;
    }
}

const todoStore = new TodoStore();

export default todoStore;