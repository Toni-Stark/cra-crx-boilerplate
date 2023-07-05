import { createContentView, putDownDataForServer } from '@/pages/content/component/FloatView';
import { OPEN_MOUSE_LISTENER, PUT_DOWN_DATA } from '@/common/agreement';
import { MessageEventType } from '@/common/types';
console.log('context');
chrome.runtime.onMessage.addListener(
  (
    request: MessageEventType,
    sender: chrome.runtime.MessageSender,
    sendResponse: (response: string) => void
  ) => {
    if (document.readyState !== 'complete') return;
    console.log('[content.js]', request, sender);
    if (request?.msg === OPEN_MOUSE_LISTENER) {
      createContentView();
      return;
    }
    if (request?.msg === PUT_DOWN_DATA) {
      putDownDataForServer(sender, request);
      return;
    }
    sendResponse('received');
    if (process.env.NODE_ENV === 'development') {
      if (request.type === 'window.location.reload') {
        console.log('current page will reload.');
        window.location.reload();
      }
    }
  }
);
export {};
