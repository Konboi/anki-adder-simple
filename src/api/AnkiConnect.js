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

class AnkiConnectAPIError {
  constructor(message) {
    this.message = message;
    this.name = "AnkiConnectAPIError";
  }
}

export default { version, deckNames };
