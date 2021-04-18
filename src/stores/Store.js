import { EventEmitter } from "events";
import dispatcher from "../dispatcher";

class FluxStore extends EventEmitter {
    constructor() {
        super()
        this.todos = 'Yolo'
        this.mlbData = 'Null'
        this.local = false
        this.local_selected = false
        this.tab = 'BASKETBALL'
    }

    getLocalJson() {
        this.mlb_json = require('../assets/mlb.json')
        this.emit("change")
    }

    createTodo() {
        this.todos = this.mlb_json.league;
        this.emit("change")
    }

    getMLBDataHost() {
        fetch("http://localhost:3000/mlb_game", {
            method: 'GET',
          })
            .then(async response => {
              const data = await response.json();
              console.log(data)
            })
            .catch(error => {
              console.error("There was an error, auto connection failed!", error);
            });
          }

    getMLBData() {
        return this.mlbData
    }

    getAll() {
        return this.todos;
    }

    getLocal() {
        return this.local
    }
    getLocalSelected() {
        return this.local_selected
    }

    // Bottom Bar
    getTab() {
        return this.tab
    }    

    handleActions(action) {
        switch(action.text) {
            case "CREATE_LOCAL":
                this.getLocalJson()
                console.log(this.mlb_json)
                this.createTodo()
            break;
            case "TOGGLE_LOCAL_ON":
                this.local = true
                this.emit("change")
            break;
            case "TOGGLE_LOCAL_OFF":
                this.local = false
                this.emit("change")
            break;
            case "LOCAL_SELECTED":
                this.local_selected = true
                this.emit("change")
            break;
            // Bottom Selection
            case "BASKETBALL":
                this.tab = 'BASKETBALL'
                console.log(0)
                this.emit("change")
            break;
            case "BASEBALL":
                this.tab = 'BASEBALL'
                console.log(1)
                this.getMLBDataHost()
                this.emit("change")
            break;
            case "INFO":
                this.tab = 'INFO'
                console.log(2)
                this.emit("change")
            break;
            default:
                console.log("default")
            break;
        }
    }
}

const fluxStore = new FluxStore();
dispatcher.register(fluxStore.handleActions.bind(fluxStore));

window.dispatcher = dispatcher;

export default fluxStore;