import { DomDataSheet, getHostDataParams } from '../config';
import { stylesContextTwo } from '@/pages/content/component/styleSheet';
import { copyInfoToServices, sendMessageSetIndex } from '@/pages/content/messageStore';
import { MessageEventType } from '@/common/types';
import { putDownEDIData, putDownICPData } from '@/pages/content/output';
import { createDom, queryEle } from '@/pages/content/tools';
import { EDI, ICP } from '@/common/agreement';

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
  let regVal = local.pathname.match(reg);
  let path = local.host + (regVal ? regVal[0] : '');
  let list = [
    '58',
    '5i5j',
    'zu.anjuke',
    'anjuke',
    'baixing',
    'zhipin',
    'che168',
    'ichong123',
    'ziroom',
    'taobao',
    'tmall',
  ];
  let res: number = 0;
  list.find((item) => {
    res = path.indexOf(item);
    if (res >= 0) {
      return item;
    }
  });
  return path.slice(res);
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
  // CreateEDIModal();
  CreateDataModal();
  settingServerIndex(ICP);
  settingServerIndex(EDI);
  if (DomDataSheet.hasOwnProperty(RegUrlConfig(document.location))) {
    DomDataSheet[RegUrlConfig(document.location)]();
  }
};

// const CreateEDIModal = () => {
//   let floatView = queryEle('.floatView');
//   let EDIModal: any = queryEle('.floatView>.EDIModal');
//   EDIModal?.remove();
//   EDIModal = createDom({ tag: 'div', cla: 'EDIModal', txt: 'EDI提交' });
//   floatView?.appendChild(EDIModal);
//   EDIModal.addEventListener('click', () => {
//     createICPInfo();
//   });
// };
const CreateDataModal = () => {
  let floatView = queryEle('.floatView');
  let ReviewModal: any = queryEle('.floatView>.ReviewModal');
  ReviewModal?.remove();
  ReviewModal = createDom({ tag: 'div', cla: 'ReviewModal', txt: '收集' });
  floatView?.appendChild(ReviewModal);
  ReviewModal.addEventListener('click', () => {
    createDataInfo();
  });
};

const createDataInfo = () => {
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

const settingServerIndex = (msg: string) => {
  let CateData: any[] = [
    { name: '租房', key: 'ZU_FANG' },
    { name: '招聘', key: 'ZHAO_PING' },
    { name: '卖房', key: 'MAI_FANG' },
    { name: '卖车', key: 'MAI_CHE' },
    { name: '手机&宠物', key: 'SHOU_JI' },
  ];
  let queDom = '.SERVER_INDEX';

  if (msg === EDI) {
    CateData = [{ name: '商品', key: 'SHANG_PING' }];
    queDom = '.EDI_SERVER_INDEX';
  }
  let Index: any = queryEle(queDom);
  if (Index) Index.remove();
  let dom: any = queryEle('body');
  if (msg === ICP) {
    Index = createDom({ tag: 'div', cla: 'SERVER_INDEX', txt: 'icp设置' });
  }
  if (msg === EDI) {
    Index = createDom({ tag: 'div', cla: 'EDI_SERVER_INDEX', txt: 'edi设置' });
  }
  let CateList = createDom({ tag: 'div', cla: 'CateList' });
  CateData.map((item, index) => {
    let tagDom = createDom({ tag: 'div', cla: `CateItem ${item.key}`, txt: item.name });
    tagDom.addEventListener('click', (e: any) => {
      let key = e.target.className.split('CateItem ')[1];
      addMessageModal();
      if (msg === ICP) {
        let selectDom: any = queryEle('.el-cascader>.el-cascader__label');
        selectDom?.click();
        if (selectDom) {
          setTimeout(() => {
            let addText = document.querySelector('.el-cascader-menu>li');
            if (addText?.textContent) {
              console.log('设置icp数据');
              sendMessageSetIndex({ key, addText: addText?.textContent, type: ICP });
            }
          }, 200);
        }
      }
      if (msg === EDI) {
        sendMessageSetIndex({ key, type: EDI });
      }
    });
    CateList.appendChild(tagDom);
    return item;
  });
  Index?.appendChild(CateList);
  dom?.appendChild(Index);
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

export const putDownDataForIcpServer = (
  sender: chrome.runtime.MessageSender,
  request: MessageEventType<any>
) => {
  putDownICPData(request);
};
export const putDownDataForEdiServer = (
  sender: chrome.runtime.MessageSender,
  request: MessageEventType<any>
) => {
  putDownEDIData(request);
};
