import { EventEmitter } from "events";
import dispatcher from "../dispatcher";

class FluxStore extends EventEmitter {
    constructor() {
        super()
        this.mlbData = 'Null'
        this.local = false
        this.api = false
        this.selected = false
        this.tab = 'BASKETBALL'
    }

    // MLB Data
    MLBLocalData() {
        this.mlbData = require('../assets/mlb.json')
    }
    MLBAPIData() {
        fetch("http://localhost:3000/mlb_game", {
            method: 'GET',
          })
            .then(async response => {
              const data = await response.json();
              this.mlbData = data
            })
            .catch(error => {
              console.error("There was an error, auto connection failed!", error);
            });
          }

    getMLBData() {
        return this.mlbData
    }


    getLocal() {
        return this.local
    }
    getAPI() {
        return this.api
    }
    getSelected() {
        return this.selected
    }





    // Bottom Bar
    getTab() {
        return this.tab
    }    

    handleActions(action) {
        switch(action.text) {
            case "CREATE_LOCAL":
                this.MLBLocalData()
                console.log('LOCAL')
                this.emit("change")
            break;
            case "CREATE_API":
                this.MLBAPIData()
                console.log('API')
                this.emit("change")
            break;
            // API OR LOCAL
            case "TOGGLE_API_ON":
                this.api = true
                this.emit("change")
            break;
            case "TOGGLE_API_OFF":
                this.api = false
                this.emit("change")
            break;
            case "TOGGLE_LOCAL_ON":
                this.local = true
                this.emit("change")
            break;
            case "TOGGLE_LOCAL_OFF":
                this.local = false
                this.emit("change")
            break;
            case "SELECTED":
                this.selected = true
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