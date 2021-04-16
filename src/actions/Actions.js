import dispatcher from "../dispatcher";

export function flux(text) {
    dispatcher.dispatch({
        text: text
    })
}