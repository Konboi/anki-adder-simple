const NoteReducerActionTypeAdd = "NOTE_ADD";
const NoteReducerActionTypeDelete = "NOTE_Delete";
const NoteReducerActionTypeReset = "NOTE_RESET";

const reducer = (state = [], action) => {
  switch (action.type) {
    case NoteReducerActionTypeAdd:
      return state.concat(action.data)
      case NoteReducerActionTypeDelete:
        return state.filter(note => note.front !== action.data)
    case NoteReducerActionTypeReset:
      return []
    default:
      return state;
  }
};

export const addNote = ({ deckName, modelName, front, back, tags }) => {
  return async dispatch => {
    const note
    dispatch({
      type: NoteReducerActionTypeAdd,
      data: note,
    })
  };
};

export const deleteNote = (key) => {
  return async dispatch => {
      dispatch({
        type: NoteReducerActionTypeDelete,
        data: key,
      })
  }
}

export const resetNotes = () => {
  return async dispatch => {
      dispatch({
        type: NoteReducerActionTypeDelete,
      })
  }
}

export default reducer;
