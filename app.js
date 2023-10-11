"use strict";

import DataStore from "./lib/datastore.js";
import {
  attachInputToStateUpdate,
  attachClickToStateUpdate,
} from "./lib/utils.js";

const textData = new DataStore("");
const numberData = new DataStore(0);

const TextOutput = (d) => {
  document.getElementById("textOutput").innerText = d;
};

const OtherTextOutput = (d) => {
  document.getElementById("otherTextOutput").innerText = d;
};

textData.attach(TextOutput);
textData.attach(OtherTextOutput);
numberData.attach(TextOutput);
numberData.attach(OtherTextOutput);

attachClickToStateUpdate("doButton", [
  { dataStore: textData, data: () => "Hello World" },
  { dataStore: numberData, data: () => 782817 },
]);
attachClickToStateUpdate("resetButton", [
  { dataStore: textData, data: () => "" },
  { dataStore: numberData, data: () => 0 },
]);

attachInputToStateUpdate("textField", [{ dataStore: textData }]);
textData.attach((d) => (document.getElementById("textField").value = d));

attachInputToStateUpdate("numberField", [{ dataStore: numberData }]);
numberData.attach((n) => (document.getElementById("numberField").value = n));
