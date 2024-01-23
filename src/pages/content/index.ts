import {
  chooseFileSelection,
  createContentView,
  putDownDataForEdiServer,
  putDownDataForIcpServer,
  putFilesOfScreen,
  settingCateChooseValue,
  settingCateListModal,
} from '@/pages/content/component/FloatView';
import {
  ASK_CATE_TO_SERVICES,
  EDI_CATE,
  EDI_STORE,
  OPEN_DETAIL_EDIT_ACTIVITY,
  OPEN_MOUSE_LISTENER,
  PUT_DOWN_EDI_DATA,
  PUT_DOWN_ICP_DATA,
  SCREENSHOT_SHORTCUT,
  UPLOAD_IMG_FILES,
  UPLOAD_IMG_FILES_EDI,
  WAKE_FILE_SELECTION,
} from '@/common/agreement';
import { MessageEventType } from '@/pages/types';
import {
  currentHandEditDetail,
  settingImageFileCurrentEDI,
  settingImageFileCurrentICP,
} from '@/pages/content/output';
chrome.runtime.onMessage.addListener(
  (
    request: MessageEventType,
    sender: chrome.runtime.MessageSender,
    sendResponse: (response: string) => void
  ) => {
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
    if (request?.msg === SCREENSHOT_SHORTCUT) {
      putFilesOfScreen(sender, request);
      return;
    }
    if (request?.msg === WAKE_FILE_SELECTION) {
      chooseFileSelection();
      return;
    }
    if (request?.msg === ASK_CATE_TO_SERVICES) {
      settingCateListModal(sender, request);
      return;
    }
    if (request?.msg === UPLOAD_IMG_FILES) {
      settingImageFileCurrentICP(sender, request);
      return;
    }
    if (request?.msg === UPLOAD_IMG_FILES_EDI) {
      settingImageFileCurrentEDI(sender, request);
      return;
    }
    if (request?.msg === EDI_STORE) {
      settingCateChooseValue(sender, request);
      return;
    }
    if (request?.msg === EDI_CATE) {
      settingCateChooseValue(sender, request);
      return;
    }
    if (request?.msg === OPEN_DETAIL_EDIT_ACTIVITY) {
      currentHandEditDetail(request, sendResponse);
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
