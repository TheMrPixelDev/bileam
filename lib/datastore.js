"use strict";

export default class DataStore {
  /**
   * @param {any} initialData
   */
  constructor(initialData) {
    this.subscribers = [];
    this.state = initialData;
  }

  /**
   * Notifies all subscribers functions about the state update and the data it contains.
   */
  notify() {
    this.subscribers.forEach((subscriber) => subscriber(this.state));
  }

  /**
   *
   * @param {any} data
   */
  updateState(data) {
    this.state = data;
    this.notify();
  }

  /**
   * @returns {any}
   */
  getState() {
    return this.state;
  }

  /**
   * @param {(state: any) => void} renderFunction
   */
  attach(renderFunction) {
    this.subscribers.push(renderFunction);
  }
}
