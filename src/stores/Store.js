import { EventEmitter } from "events";
import dispatcher from "../dispatcher";

class FluxStore extends EventEmitter {
    constructor() {
        super()
        this.mlbData = 'Null'
        this.nbaData = 'Null'
        this.local = false
        this.api = false
        this.api_online = false 
        this.selected = false
        this.tab = 'BASKETBALL'
    }

    // MLB Data
    MLBLocalData() {
        this.mlbData = require('../assets/mlb.json')
    }
    MLBAPIData() {
        fetch("http://localhost:3001/mlb_game", {
            method: 'GET',
          })
            .then(async response => {
              const data = await response.json();
              this.mlbData = data[0]
              this.api_online = true
            })
            .catch(error => {
              this.api_online = false
              console.error("There was an error, auto connection failed!", error);
            });
          }

    getMLBData() {
        return this.mlbData
    }

    // NBA Data
    NBALocalData() {
        this.nbaData = require('../assets/nba.json')
    }
    NBAAPIData() {
        fetch("http://localhost:3001/nba_game", {
            method: 'GET',
          })
            .then(async response => {
              const data = await response.json();
              this.nbaData = data[0]
              this.api_online = true
            })
            .catch(error => {
              this.api_online = false
              console.error("There was an error, auto connection failed!", error);
            });
          }

    getNBAData() {
        return this.nbaData
    }

    getOnline() {
        return this.api_online
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
                this.NBALocalData()
                this.emit("change")
            break;
            case "CREATE_API":
                this.MLBAPIData()
                this.NBAAPIData()
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