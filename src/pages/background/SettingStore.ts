export const settingStorage = (
  params: { [key: string]: any },
  callback: (() => void) | undefined
) => {
  chrome.storage.sync.set(params, callback);
};

export const gettingStorage = (key: string, callback: (res: any) => any | void) => {
  chrome.storage.sync.get(key, callback);
};

export const sendMessageQueryCurrent = (tab: number, message: any) => {
  chrome.tabs.sendMessage(tab, message);
};

export const sendMessageCallback = (tab: number, message: any, callback: any) => {
  chrome.tabs.sendMessage(tab, message, callback);
};
