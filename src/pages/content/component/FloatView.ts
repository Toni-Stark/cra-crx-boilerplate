import { DomDataSheet, getHostDataParams } from '../config';
import { stylesContextTwo } from '@/pages/content/component/styleSheet';
import { copyInfoToServices, sendMessageSetIndex } from '@/pages/content/messageStore';
import { MessageEventType } from '@/common/types';
import { putDownICPData } from '@/pages/content/output';
import { createDom, queryEle } from '@/pages/content/tools';

// 设置css;
export const createContentStyle = (css: string) => {
  let style: any = document.createElement('style');
  style.type = 'text/css';
  try {
    style.appendChild(document.createTextNode(css));
  } catch (ex) {
    style.styleSheet.cssText = css;
  }
  let head = document.getElementsByTagName('head')[0];
  head.appendChild(style);
};

export const RegUrlConfig = (local: any) => {
  let reg = '^/[a-zA-Z0-9_-]*/';
  let path = local.host + local.pathname.match(reg)[0];
  let i58 = path.indexOf('58');
  let i5i = path.indexOf('5i5j');
  let izu = path.indexOf('zu.anjuke');
  let ian = path.indexOf('anjuke');
  let iba = path.indexOf('baixing');
  if (i58 >= 0) {
    return path.slice(i58);
  }
  if (i5i >= 0) {
    return path.slice(i5i);
  }
  if (izu >= 0) {
    return path.slice(izu);
  }
  if (ian >= 0) {
    return path.slice(ian);
  }
  if (iba >= 0) {
    return path.slice(iba);
  }
};

export const createContentView = () => {
  createContentStyle(stylesContextTwo);
  let dom: any = queryEle('body');
  let floatView = queryEle('.floatModal');
  let modalView = queryEle('.floatView');
  if (floatView) floatView.remove();
  if (modalView) modalView.remove();
  floatView = createDom({ tag: 'div', cla: 'floatView' });
  dom.appendChild(floatView);
  CreateEDIModal();
  CreateICPModal();
  // CreateMapModal();
  settingServerIndex();
  if (DomDataSheet.hasOwnProperty(RegUrlConfig(document.location))) {
    DomDataSheet[RegUrlConfig(document.location)]();
  }
};

const CreateEDIModal = () => {
  let floatView = queryEle('.floatView');
  let EDIModal: any = queryEle('.floatView>.EDIModal');
  EDIModal?.remove();
  EDIModal = createDom({ tag: 'div', cla: 'EDIModal', txt: 'EDI提交' });
  floatView?.appendChild(EDIModal);
  EDIModal.addEventListener('click', () => {});
};
const CreateICPModal = () => {
  let floatView = queryEle('.floatView');
  let ICPModal: any = queryEle('.floatView>.ICPModal');
  ICPModal?.remove();
  ICPModal = createDom({ tag: 'div', cla: 'ICPModal', txt: 'ICP提交' });
  floatView?.appendChild(ICPModal);
  ICPModal.addEventListener('click', () => {
    createICPInfo();
  });
};

const createICPInfo = () => {
  let params: any = getHostDataParams(document.location);
  copyInfoToServices(params);
};

// const CreateMapModal = () => {
//   let iframe: any = queryEle('.iframe');
//   iframe?.remove();
//   iframe = document.createElement('iframe');
//   iframe.src = 'https://map.so.com/';
//   iframe.className = 'OnlyIframe';
//   document.body.appendChild(iframe);
// };

const settingServerIndex = () => {
  let CateData = [
    { name: '租房', key: 'ZU_FANG' },
    { name: '招聘', key: 'ZHAO_PING' },
    { name: '卖房', key: 'MAI_FANG' },
    { name: '卖车', key: 'MAI_CHE' },
    { name: '手机', key: 'SHOU_JI' },
  ];
  let Index = queryEle('.SERVER_INDEX');
  if (Index) Index.remove();
  let dom: any = queryEle('body');
  Index = createDom({ tag: 'div', cla: 'SERVER_INDEX', txt: '设置输出' });
  let CateList = createDom({ tag: 'div', cla: 'CateList' });
  CateData?.map((item, index) => {
    let tagDom = createDom({ tag: 'div', cla: `CateItem ${item.key}`, txt: item.name });
    tagDom.addEventListener('click', (e: any) => {
      let key = e.target.className.split('CateItem ')[1];
      addMessageModal();
      let selectDom: any = queryEle('.el-cascader>.el-cascader__label');
      selectDom?.click();
      if (selectDom) {
        setTimeout(() => {
          let addText = document.querySelector('.el-cascader-menu>li');
          if (addText?.textContent) {
            sendMessageSetIndex(key, addText?.textContent);
          }
        }, 200);
      }
    });
    CateList.appendChild(tagDom);
    return item;
  });
  Index.appendChild(CateList);
  dom.appendChild(Index);
};

export const delModal = () => {
  // let floatView = queryEle('.floatView');
  // if (floatView) floatView.remove();
};

export const addMessageModal = () => {
  let floatView: any = queryEle('.floatView');
  let domView = queryEle('.floatModel');
  domView?.remove();
  domView = createDom({ tag: 'div', cla: 'floatModel' });
  floatView.appendChild(domView);
};

export const putDownDataForServer = (
  sender: chrome.runtime.MessageSender,
  request: MessageEventType<any>
) => {
  console.log('[request]', request);
  putDownICPData(request);
};
