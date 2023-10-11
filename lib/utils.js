"use strict";

import DataStore from "./datastore.js";

/**
 * @typedef {{ dataStore: DataStore, mutation?: (event: Event) => any }} DataMutation
 * @typedef {{ dataStore: DataStore, data: () => any }} DataGetter
 */

/**
 * @param {string} element id of the dom element
 * @param {Array<DataGetter>} attachments callback getter for the data which will be written to the state
 */
export function attachClickToStateUpdate(element, attachments) {
  const domElement = document.getElementById(element);
  domElement.onclick = () => {
    attachments.forEach((attachment) => {
      const value = attachment.data();
      attachment.dataStore.updateState(value);
    });
  };
}

/**
 * @param {string} element dom elements id
 * @param {Array<DataMutation>} attachments function which mutates the events value before it gets written to the store.
 */
export function attachChangeToStateUpdate(element, attachments) {
  const domElement = document.getElementById(element);
  domElement.onchange = getEventHandlerFunction(element, attachments);
}

/**
 * @param {string} element dom elements id
 * @param {Array<DataMutation>} attachments function which mutates the events value before it gets written to the store.
 */
export function attachInputToStateUpdate(element, attachments) {
  const domElement = document.getElementById(element);
  domElement.oninput = getEventHandlerFunction(element, attachments);
}

/**
 * @param {HTMLElement | null} element
 * @param {Array<DataMutation>} attachments
 * @returns {(event: Event) => any}
 */
function getEventHandlerFunction(element, attachments) {
  if (element === null) {
    throw new Error("This element does not exist.");
  }

  return (event) => {
    attachments.forEach((attachment) => {
      const { dataStore, mutation } = attachment;
      const value =
        mutation !== undefined ? mutation(event) : event.target.value;
      dataStore.updateState(value);
    });
  };
}
