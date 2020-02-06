import Chrome from "../api/Chrome";

const NoteReducerActionTypeSet = "NOTES_SET";

const NotesStorageKey = "notes";

const reducer = (state = [], action) => {
  switch (action.type) {
    case NoteReducerActionTypeSet:
      return action.data;
    default:
      return state;
  }
};

export const addNote = note => {
  return async dispatch => {
    let notes;
    try {
      notes = await Chrome.GetLocal(NotesStorageKey);
      if (!notes) {
        notes = [];
      }
      notes.push(note);

      await Chrome.SetLocal(NotesStorageKey, notes);
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
      notes = await Chrome.GetLocal(NotesStorageKey);
      notes = notes.filter(note => note.front !== key);
      await Chrome.SetLocal(NotesStorageKey, notes);
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
      await Chrome.SetLocal(NotesStorageKey, []);
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
      notes = await Chrome.GetLocal(NotesStorageKey);
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

export default reducer;
