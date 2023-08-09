import { OPEN_MOUSE_LISTENER } from '@/common/agreement';
let tabList: any = {};
let tabTimer: any = {};
export const listenerTagLoadingMessage = () => {
  chrome.tabs.onUpdated.addListener(function (tabId, info, tab) {
    if (!tabList[tabId]) {
      tabList[tabId] = [tab.url];
    } else {
      if (tabList[tabId][tabList[tabId].length - 1] !== tab.url) tabList[tabId].push(tab.url);
    }
    if (tab.status !== 'complete') return;
    tabTimer[tabId] = setTimeout(() => {
      clearTimeout(tabTimer[tabId]);
      tabTimer[tabId] = null;
      chrome.tabs.sendMessage(tabId, { msg: OPEN_MOUSE_LISTENER });
    }, 1000);
  });
};
