import {
  createContentView,
} from '@/pages/content/component/FloatView';
import {
  OPEN_MOUSE_LISTENER, SETTING_LIST_DATA,
} from '@/common/agreement';
import { MessageEventType } from '@/pages/types';
chrome.runtime.onMessage.addListener(
  (
    request: MessageEventType,
    sender: chrome.runtime.MessageSender,
    sendResponse: (response: string) => void
  ) => {
    if (document.readyState !== 'complete') return;
    if (request?.msg === SETTING_LIST_DATA) {
      createContentView();
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
