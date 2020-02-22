import Chrome from "../api/Chrome";
import { Dispatch } from "redux";
import { Note } from "../components/Note";

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
    let notes;
    try {
      notes = await Chrome.GetLocal(notesStorageKey);
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

      await Chrome.SetLocal(notesStorageKey, notes);
    } catch (e) {
      throw e.message;
    }

    dispatch({
      type: NoteReducerActionTypeSet,
      data: notes
    });
  };
};

export const deleteNote = (key: string) => {
  return async (dispatch: Dispatch) => {
    let notes;
    try {
      notes = await Chrome.GetLocal(notesStorageKey);
      if (!notes) {
        return;
      }

      notes = notes.filter((note: Note) => note.front !== key);
      await Chrome.SetLocal(notesStorageKey, notes);
    } catch (e) {
      throw e.message;
    }

    dispatch({
      type: NoteReducerActionTypeSet,
      data: notes
    });
  };
};

export const resetNotes = () => {
  return async (dispatch: Dispatch) => {
    try {
      await Chrome.SetLocal(notesStorageKey, []);
    } catch (e) {
      throw e.message;
    }

    dispatch({
      type: NoteReducerActionTypeSet,
      data: []
    });
  };
};

export const initNotes = () => {
  return async (dispatch: Dispatch) => {
    let notes;
    try {
      notes = await Chrome.GetLocal(notesStorageKey);
      if (!notes) {
        notes = [];
      }
    } catch (e) {
      throw e.message;
    }

    dispatch({
      type: NoteReducerActionTypeSet,
      data: notes
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
      note = await Chrome.GetLocal(currentNoteStorageKey);
      if (!note) {
        note = { front: "", back: "" };
      }
    } catch (e) {
      throw e.message;
    }

    dispatch({
      type: CurrentNoteReducerActionTypeSet,
      data: note
    });
  };
};

export const setCurrentNote = (note: Note) => {
  return async (dispatch: Dispatch) => {
    try {
      await Chrome.SetLocal(currentNoteStorageKey, note);
    } catch (e) {
      throw e.message;
    }

    dispatch({
      type: CurrentNoteReducerActionTypeSet,
      data: note
    });
  };
};

export default reducer;
