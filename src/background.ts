/*global chrome*/
import Chrome from "./api/Chrome";
import { currentNoteStorageKey } from "./reducer/noteReducer";

const addToAnki = (data: any) => {
  const word = data.selectionText;
  Chrome.SetLocal(currentNoteStorageKey, { front: word, back: "" });
};

chrome.contextMenus.create({
  title: "add anki",
  type: "normal",
  contexts: ["all"],
  onclick: addToAnki
});
