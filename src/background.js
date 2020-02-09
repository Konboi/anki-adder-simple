/*global chrome*/
import Chrome from "./api/Chrome";
import { currentFrontStorageKey } from "./reducer/currentFrontReducer";

const addToAnki = data => {
  const word = data.selectionText;
  Chrome.SetLocal(currentFrontStorageKey, word);
};

chrome.contextMenus.create({
  title: "add anki",
  type: "normal",
  contexts: ["all"],
  onclick: addToAnki
});
