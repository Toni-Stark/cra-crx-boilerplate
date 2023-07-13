import {
  createContentView,
  putDownDataForEdiServer,
  putDownDataForIcpServer,
} from '@/pages/content/component/FloatView';
import { OPEN_MOUSE_LISTENER, PUT_DOWN_EDI_DATA, PUT_DOWN_ICP_DATA } from '@/common/agreement';
import { MessageEventType } from '@/common/types';
console.log('context');
chrome.runtime.onMessage.addListener(
  (
    request: MessageEventType,
    sender: chrome.runtime.MessageSender,
    sendResponse: (response: string) => void
  ) => {
    console.log(request, sender);
    if (document.readyState !== 'complete') return;
    if (request?.msg === OPEN_MOUSE_LISTENER) {
      createContentView();
      return;
    }
    if (request?.msg === PUT_DOWN_ICP_DATA) {
      putDownDataForIcpServer(sender, request);
      return;
    }
    if (request?.msg === PUT_DOWN_EDI_DATA) {
      putDownDataForEdiServer(sender, request);
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
