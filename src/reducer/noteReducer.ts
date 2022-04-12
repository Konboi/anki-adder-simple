import { GetLocal, SetLocal } from "../api/Chrome";
import { Dispatch } from "redux";
import Note from "../model/Note";

const NoteReducerActionTypeSet = "NOTES_SET";
const CurrentNoteReducerActionTypeSet = "CURRENT_NOTE_SET";
const notesStorageKey = "notes";
export const currentNoteStorageKey = "current-note";

class noteAction {
  type: string;
  data: Note[];
  constructor(type: string, data: Note[]) {
    this.type = type;
    this.data = data;
  }
}

const reducer = (state = [], action: noteAction) => {
  switch (action.type) {
    case NoteReducerActionTypeSet:
      return action.data;
    default:
      return state;
  }
};

export const addNote = (note: Note) => {
  return async (dispatch: Dispatch) => {
    let notes: Note[];
    try {
      notes = (await GetLocal(notesStorageKey)) as Note[];
      if (!notes) {
        notes = [];
      }
      if (notes.filter((n: Note) => n.front === note.front).length < 1) {
        notes.push(note);
      } else {
        // overwrite
        notes = notes.filter((n: Note) =>
          n.front !== note.front ? n : Object.assign(n, note)
        );
      }

      await SetLocal(notesStorageKey, notes);
    } catch (e: any) {
      throw e.message;
    }

    dispatch({
      type: NoteReducerActionTypeSet,
      data: notes,
    });
  };
};

export const deleteNote = (key: string) => {
  return async (dispatch: Dispatch) => {
    let notes: Note[];
    try {
      notes = (await GetLocal(notesStorageKey)) as Note[];
      if (!notes) {
        return;
      }

      notes = notes.filter((note: Note) => note.front !== key);
      await SetLocal(notesStorageKey, notes);
    } catch (e: any) {
      throw e.message;
    }

    dispatch({
      type: NoteReducerActionTypeSet,
      data: notes,
    });
  };
};

export const resetNotes = () => {
  return async (dispatch: Dispatch) => {
    try {
      await SetLocal(notesStorageKey, []);
    } catch (e: any) {
      throw e.message;
    }

    dispatch({
      type: NoteReducerActionTypeSet,
      data: [],
    });
  };
};

export const initNotes = () => {
  return async (dispatch: Dispatch) => {
    let notes;
    try {
      notes = await GetLocal(notesStorageKey);
      if (!notes) {
        notes = [];
      }
    } catch (e: any) {
      throw e.message;
    }

    dispatch({
      type: NoteReducerActionTypeSet,
      data: notes,
    });
  };
};

class currentNoteAction {
  type: string;
  data: Note;
  constructor(type: string, data: Note) {
    this.type = type;
    this.data = data;
  }
}

export const currentNoteReducer = (
  state = { front: "", back: "" },
  action: currentNoteAction
) => {
  console.log("current note:", state, action);
  switch (action.type) {
    case CurrentNoteReducerActionTypeSet:
      return action.data;
    default:
      return state;
  }
};

export const initCurrentNote = () => {
  return async (dispatch: Dispatch) => {
    let note;
    try {
      note = await GetLocal(currentNoteStorageKey);
      if (!note) {
        note = { front: "", back: "" };
      }
    } catch (e: any) {
      throw e.message;
    }

    dispatch({
      type: CurrentNoteReducerActionTypeSet,
      data: note,
    });
  };
};

export const setCurrentNote = (note: Note) => {
  return async (dispatch: Dispatch) => {
    try {
      await SetLocal(currentNoteStorageKey, note);
    } catch (e: any) {
      throw e.message;
    }

    dispatch({
      type: CurrentNoteReducerActionTypeSet,
      data: note,
    });
  };
};

export default reducer;
