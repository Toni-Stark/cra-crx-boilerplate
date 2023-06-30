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
let objData = {
  address: '成都青羊区青羊总部经济基地1栋B座10层',
  company_name: '成都未尔科技有限公司',
  context:
    '岗位职责\r1、通信网络的建模和仿真；\r2、通信网络协议的模型设计和开发。\r任职要求\r1、通信/计算机相关专业本科及以上学历；\r2、理解通信网络协议栈结构，熟悉TCP/IP协议栈；\r3、理解计算机网络仿真；\r4、具备C++开发经验者优先。',
  msg: 'put_down_data',
  personnel: '陈女士',
  title: '通信和网络仿真工程师（校招）',
  type: 'copy_info_to_services',
};
