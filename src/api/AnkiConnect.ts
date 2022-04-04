import axios from "axios";
import {
  defaultAnkiConnectUri,
  defaultAnkiConnectPort,
  supportAnkiConnectVersion,
} from "../config";
import Note from "../model/Note";

const uri = `${defaultAnkiConnectUri}:${defaultAnkiConnectPort}`;

const version = () => {
  const req = {
    action: "version",
    version: supportAnkiConnectVersion,
  };

  return axios.post(uri, req).then((result) => {
    if (result.data.error) {
      throw new AnkiConnectAPIError(result.data.error);
    }
    return result.data.result;
  });
};

const deckNames = () => {
  const req = {
    action: "deckNames",
    version: supportAnkiConnectVersion,
  };

  return axios.post(uri, req).then((result) => {
    if (result.data.error) {
      throw new AnkiConnectAPIError(result.data.error);
    }
    return result.data.result;
  });
};

const modelNames = () => {
  const req = {
    action: "modelNames",
    version: supportAnkiConnectVersion,
  };

  return axios.post(uri, req).then((result) => {
    if (result.data.error) {
      throw new AnkiConnectAPIError(result.data.error);
    }
    return result.data.result;
  });
};

const addNote = (note: Note) => {
  const req = {
    action: "addNote",
    version: supportAnkiConnectVersion,
    params: {
      note: {
        deckName: note.deckName,
        modelName: note.modelName,
        fields: {
          Front: note.front,
          Back: note.back,
        },
        tags: [...note.tags],
        options: {
          allowDuplicate: false,
        },
      },
    },
  };

  return axios.post(uri, req).then((result) => {
    if (result.data.error) {
      throw new AnkiConnectAPIError(result.data.error);
    }
    return result.data.result;
  });
};

const addNotes = (notes: Note[]) => {
  const addNotes = notes.map((note) => ({
    deckName: note.deckName,
    modelName: note.modelName,
    fields: {
      Front: note.front,
      Back: note.back,
    },
    tags: [...note.tags],
    options: {
      allowDuplicate: false,
    },
  }));

  const req = {
    action: "addNotes",
    version: supportAnkiConnectVersion,
    params: {
      notes: addNotes,
    },
  };

  return axios.post(uri, req).then((result) => {
    if (result.data.error) {
      throw new AnkiConnectAPIError(result.data.error);
    }
    return result.data.result;
  });
};

class AnkiConnectAPIError {
  message: string;
  name: string;

  constructor(message: string) {
    this.message = message;
    this.name = "AnkiConnectAPIError";
  }
}

export { version, deckNames, modelNames, addNote, addNotes };
