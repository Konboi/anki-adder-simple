/*global chrome*/

const SetLocal = async (key, value) => {
  if (!chrome.storage || !chrome.storage.local) {
    console.log("not support chrome.storage.local");
    throw "not support chrome.storage.local";
  }

  return new Promise((resolve, reject) => {
    let obj = {};
    obj[key] = value;
    chrome.storage.local.set(obj, () => {
      const err = chrome.runtime.lastError;
      if (err) {
        reject(err.message);
      }
      resolve(value);
    });
  });
};

const GetLocal = async key => {
  if (!chrome.storage || !chrome.storage.local) {
    console.log("not support chrome.storage.local");
    throw "not support chrome.storage.local";
  }

  return new Promise(resolve => {
    chrome.storage.local.get(key, result => {
      resolve(result[key]);
    });
  });
};

export default { SetLocal, GetLocal };
