import Chrome from "../api/Chrome";

const NoteReducerActionTypeSet = "NOTES_SET";
const CurrentNoteReducerActionTypeSet = "CURRENT_NOTE_SET";
const notesStorageKey = "notes";
export const currentNoteStorageKey = "current-note";

const reducer = (state = [], action) => {
  switch (action.type) {
    case NoteReducerActionTypeSet:
      return action.data;
    default:
      return state;
  }
};

export const currentNoteReducer = (state = { front: "", back: "" }, action) => {
  console.log("current note:", state, action);
  switch (action.type) {
    case CurrentNoteReducerActionTypeSet:
      return action.data;
    default:
      return state;
  }
};

export const addNote = note => {
  return async dispatch => {
    let notes;
    try {
      notes = await Chrome.GetLocal(notesStorageKey);
      if (!notes) {
        notes = [];
      }
      notes = notes.filter(n =>
        n.front !== note.front ? n : Object.assign(n, note)
      );
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

export const deleteNote = key => {
  return async dispatch => {
    let notes;
    try {
      notes = await Chrome.GetLocal(notesStorageKey);
      if (!notes) {
        return;
      }

      notes = notes.filter(note => note.front !== key);
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
  return async dispatch => {
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
  return async dispatch => {
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

export const initCurrentNote = () => {
  return async dispatch => {
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

export const setCurrentNote = note => {
  return async dispatch => {
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
