import axios from "axios";
import config from "../config";

const uri = `${config.defaultAnkiConnectUri}:${config.defaultAnkiConnectPort}`;

const version = () => {
  const req = {
    action: "version",
    version: config.supportAnkiConnectVersion
  };

  return axios.post(uri, req).then(result => {
    if (result.data.error) {
      throw new AnkiConnectAPIError(result.data.error);
    }
    return result.data.result;
  });
};

const deckNames = () => {
  const req = {
    action: "deckNames",
    version: config.supportAnkiConnectVersion
  };

  return axios.post(uri, req).then(result => {
    if (result.data.error) {
      throw new AnkiConnectAPIError(result.data.error);
    }
    return result.data.result;
  });
};

const modelNames = () => {
  const req = {
    action: "modelNames",
    version: config.supportAnkiConnectVersion
  };

  return axios.post(uri, req).then(result => {
    if (result.data.error) {
      throw new AnkiConnectAPIError(result.data.error);
    }
    return result.data.result;
  });
};

const addNote = ({ deckName, modelName, note }) => {
  const req = {
    action: "addNote",
    version: config.supportAnkiConnectVersion,
    params: {
      note: {
        deckName: deckName,
        modelName: modelName,
        fields: {
          Front: note.front,
          Back: note.back
        },
        tags: [...note.tags],
        options: {
          allowDuplicate: false
        }
      }
    }
  };

  return axios.post(uri, req).then(result => {
    if (result.data.error) {
      throw new AnkiConnectAPIError(result.data.error);
    }
    return result.data.result;
  });
};

const addNotes = ({ deckName, modelName, notes }) => {
  const addNotes = notes.map(note => ({
    deckName: deckName,
    modelName: modelName,
    fields: {
      Front: note.front,
      Back: note.back
    },
    tags: [...note.tags],
    options: {
      allowDuplicate: false
    }
  }));

  const req = {
    action: "addNotes",
    version: config.supportAnkiConnectVersion,
    params: {
      notes: addNotes
    }
  };

  return axios.post(uri, req).then(result => {
    if (result.data.error) {
      throw new AnkiConnectAPIError(result.data.error);
    }
    return result.data.result;
  });
};

class AnkiConnectAPIError {
  constructor(message) {
    this.message = message;
    this.name = "AnkiConnectAPIError";
  }
}

export default { version, deckNames, modelNames, addNote, addNotes };
