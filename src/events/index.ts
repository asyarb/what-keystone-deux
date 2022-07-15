import ready from "./ready.js"

const EVENTS = [ready]

export class Events {
  static all() {
    return EVENTS
  }
}
