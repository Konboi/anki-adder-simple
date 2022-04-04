/*global chrome*/
import { SetLocal } from "./api/Chrome";
import { currentNoteStorageKey } from "./reducer/noteReducer";

const addToAnki = (info: chrome.contextMenus.OnClickData) => {
  const word = info.selectionText;
  SetLocal(currentNoteStorageKey, { front: word, back: "" });
};

chrome.contextMenus.create({
  title: "add anki",
  type: "normal",
  contexts: ["all"],
  onclick: addToAnki,
});
