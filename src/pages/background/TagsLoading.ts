import { SETTING_LIST_DATA } from '@/common/agreement';
let tabTimer: any = {};
export const listenerTagLoadingMessage = () => {
  chrome.tabs.onUpdated.addListener(function (tabId, info, tab) {
    if (tab.status !== 'complete') return;
    if (tab?.url && tab.url.indexOf('corp-query-search') < 0) return;
    tabTimer[tabId] = setTimeout(() => {
      clearTimeout(tabTimer[tabId]);
      tabTimer[tabId] = null;
      chrome.tabs.sendMessage(tabId, { msg: SETTING_LIST_DATA });
    }, 1000);
  });
  chrome.webRequest.onCompleted.addListener(
    (detail) => {
      if (detail.url.indexOf('corp-query-search') >= 0) {
        chrome.tabs.sendMessage(detail.tabId, { msg: SETTING_LIST_DATA });
      }
    },
    { urls: ['<all_urls>'] }
  );
};
