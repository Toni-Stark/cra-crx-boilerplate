import { DomDataSheet, getHostDataParams } from '../config';
import { stylesContextTwo } from '@/pages/content/component/styleSheet';
import {
  AskServicesEdiTYPE,
  changeInfoServices,
  copyInfoToServices,
  sendMessageScreenIndex,
  sendMessageSetIndex,
  sendMessageStoreIndex,
} from '@/pages/content/messageStore';
import { MessageEventType } from '@/pages/types';
import {
  chooseEDICateData,
  chooseImgServices,
  DispatchEvent,
  putDownEDIData,
  putDownICPData,
} from '@/pages/content/output';
import { createDom, createTextNode, queryEle, queryEleAll } from '@/pages/content/tools';
import {
  CHANGE_INFO_SERVICES,
  CHANGE_ONE_PASS_SERVICES,
  CHANGE_PLACE_SERVICES,
  COPY_INFO_TO_SERVICES,
  EDI,
  EDI_CATE,
  EDI_STORE,
  ICP,
} from '@/common/agreement';
import { createCanvasScreen, createStartScreenBtn, queryDom } from '@/pages/content/pictureScreen';
import { checkStringInto, getQueryParams } from '@/common/passage-certificate';

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
    } else {
      return null;
    }
  });
  return path.slice(res);
};

export const createContentView = () => {
  createContentStyle(stylesContextTwo);
  let dom: any = queryEle('body');
  let floatView = queryEle('.floatModal');
  let modalView = queryEle('.floatView');
  let screenView = queryEle('.screen_btn_float');
  if (floatView) floatView.remove();
  if (modalView) modalView.remove();
  if (screenView) screenView.remove();

  let params = getQueryParams(document.location.href);
  floatView = createDom({ tag: 'div', cla: 'floatView' });
  dom.appendChild(floatView);
  if (params?.action === 'goods_edit') {
    settingServerIndex(EDI);
  } else if (params?.cid) {
    CreateConfigModal();
    AskServicesEdiTYPE();
    settingServerIndex(ICP);
  } else {
    CreateDataModal();
    StartScreenFlash();
    if (checkStringInto(document.location.href, 'login')) {
      settingLogin('icp');
    }
    if (checkStringInto(document.location.href, 'adminapg7r86drsx')) {
      settingLogin('edi');
    }
  }
  if (checkStringInto(document.location.href, 'Mzbv6GAE')) {
    settingLogin('local');
  }
  if (checkStringInto(document.location.href, '915a4390')) {
    settingLogin('prod');
  }
  if (DomDataSheet.hasOwnProperty(RegUrlConfig(document.location))) {
    DomDataSheet[RegUrlConfig(document.location)]();
  }
};

const settingLogin = (key: any) => {
  let loginView = queryEle('.loginView');
  loginView?.remove();
  loginView = createDom({ tag: 'div', cla: 'loginView', txt: '填写账号' });
  loginView.addEventListener('click', () => {
    console.log('填入', key);
    if (key === 'edi') {
      queryDom('input[name="admin_name"]').value = 'admin';
      queryDom('input[name="password"]').value = 'yKp6mTdP';
    }
    if (key === 'icp') {
      let name = queryDom('input[name="username"]');
      name.value = 'admin';
      DispatchEvent(name, 'input');
      let password = queryDom('input[name="password"]');
      password.value = 'yKp6mTdP';
      DispatchEvent(password, 'input');
    }
    if (key === 'local') {
      queryDom('input[name="username"]').value = 'g8dCzE31';
      queryDom('input[name="password"]').value = 'rjfXaXzE';
      setTimeout(() => {
        queryDom('#login-button').click();
      }, 500);
    }
    if (key === 'prod') {
      queryDom('#username').value = 'ulravx79';
      queryDom('#password').value = 'A4uMbuz94l3bnW27';
      setTimeout(() => {
        queryDom('.login_btn').click();
      }, 500);
    }
  });
  queryDom('body').appendChild(loginView);
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
  console.log(floatView, '3423424');
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
const settingICPConfig = (key: any) => {
  let selectDom: any = queryEle('.el-cascader>.el-cascader__label');
  selectDom?.click();
  if (selectDom) {
    setTimeout(() => {
      let addText = document.querySelector('.el-cascader-menu>li');
      if (addText?.textContent) {
        sendMessageSetIndex({ key, addText: addText?.textContent, type: ICP });
      }
    }, 200);
  }
};

const settingEDICateList = (key: any) => {
  let btn: any = queryEle('#tab1>.form-table>tbody>tr:nth-child(4)>td>.btn-primary');
  btn.click();
  let cateList: any = [];
  let storeList: any = [];
  setTimeout(() => {
    let conDom: any = queryEle('.aui_state_full>iframe');
    let cateDom: any = conDom?.contentDocument.querySelectorAll('#categoryBox>.select>li>label');
    for (let i = 0; i <= cateDom.length - 1; i++) {
      cateList.push({
        ind: i,
        text: cateDom[i].textContent,
      });
    }
    let conBtn: any = queryEle('.aui_state_highlight');
    conBtn?.click();
  }, 2000);
  let storeDom = queryEleAll('#tab1>.form-table>tbody>tr:nth-child(3)>td>select>option');
  for (let i = 0; i <= storeDom.length - 1; i++) {
    storeList.push({
      ind: i,
      text: storeDom[i].textContent,
    });
  }
  setTimeout(() => {
    let listData = {
      cate: cateList,
      store: storeList,
    };
    sendMessageSetIndex({ key, type: EDI, listData });
  }, 2500);
};

const CreateConfigModal = () => {
  let dom: any = queryEle('body');
  let placeView = queryEle('.placeView');
  if (placeView) placeView.remove();
  placeView = createDom({ tag: 'div', cla: 'placeView', txt: '刷新地址' });
  dom.appendChild(placeView);
  placeView.addEventListener('click', () => {
    changeInfoServices(CHANGE_PLACE_SERVICES);
  });
  let infoView = queryEle('.infoView');
  if (infoView) infoView.remove();
  infoView = createDom({ tag: 'div', cla: 'infoView', txt: '刷新联系人' });
  dom.appendChild(infoView);
  infoView.addEventListener('click', () => {
    changeInfoServices(CHANGE_INFO_SERVICES);
  });
  let choseView = queryEle('.choseView');
  if (choseView) choseView.remove();
  choseView = createDom({ tag: 'form', cla: 'choseView' });
  let LabV = createDom({ tag: 'div', cla: 'LabV' });
  let labelC = createRadioBtn({ text: '联系人', key: 'contacts' });
  let labelA = createRadioBtn({ text: '地址', key: 'area' });
  let openBtn = createDom({ tag: 'div', cla: 'openBtn', txt: '开始' });
  let inputO: any = createDom({ tag: 'textarea', cla: 'jsonI' });
  inputO.name = 'json';
  LabV.appendChild(labelC);
  LabV.appendChild(labelA);
  choseView.appendChild(inputO);
  choseView.appendChild(LabV);
  choseView.appendChild(openBtn);
  dom.appendChild(choseView);
  openBtn.addEventListener('click', () => {
    let form: any = queryEle('.choseView');
    let params = {
      contacts: form['contacts'].checked,
      area: form['area'].checked,
      json: form['json'].value,
      url: document.location.origin,
    };
    changeInfoServices(CHANGE_ONE_PASS_SERVICES, params);
  });
};
const createRadioBtn = ({ text, key }: { text: string; key: string }) => {
  let label = createDom({ tag: 'label' });
  let check: any = createDom({ tag: 'input' });
  check.type = 'checkbox';
  check.name = key;
  let nodeText = createTextNode(text);
  label.appendChild(check);
  label.appendChild(nodeText);
  return label;
};

const settingEDIConfig = (key: any) => {
  settingEDICateList(key);
};

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
  CateData.map((item) => {
    let tagDom = createDom({ tag: 'div', cla: `CateItem ${item.key}`, txt: item.name });
    tagDom.addEventListener('click', (e: any) => {
      let key = e.target.className.split('CateItem ')[1];
      addMessageModal();
      if (msg === ICP) {
        settingICPConfig(key);
      }
      if (msg === EDI) {
        settingEDIConfig(key);
      }
    });
    CateList.appendChild(tagDom);
    return item;
  });
  Index?.appendChild(CateList);
  dom?.appendChild(Index);
};

export const addMessageModal = () => {
  let floatView: any = queryEle('.floatView');
  let domView = queryEle('.floatModel');
  domView?.remove();
  domView = createDom({ tag: 'div', cla: 'floatModel' });
  floatView.appendChild(domView);
};

// 配置edi分类数据
export const SaveCategoryList = () => {
  let dom: any = queryEle('body');
  let CategoryView = queryEle('.CategoryView');
  CategoryView?.remove();
  CategoryView = createDom({ tag: 'div', cla: 'CategoryView' });
  let ReviewModal: any = queryEle('.CategoryView>.ReviewModal');
  ReviewModal?.remove();
  ReviewModal = createDom({ tag: 'div', cla: 'ReviewModal', txt: '配置分类' });
  CategoryView?.appendChild(ReviewModal);
  ReviewModal.addEventListener('click', () => {
    // getCategoryInfo();
  });
  dom.appendChild(CategoryView);
};

// 创建edi分类
export const CreateCategoryList = (list: any) => {
  const { cate, store } = list;
  let queDom = '.SET_SELLER';
  let ModalDom: any = queryEle(queDom);
  let storeDom = '.SET_STORE';
  let StoreDom: any = queryEle(storeDom);
  if (ModalDom) ModalDom.remove();
  if (StoreDom) ModalDom.remove();
  let dom: any = queryEle('body');

  ModalDom = createDom({ tag: 'div', cla: 'SET_SELLER', txt: '分类绑定' });
  let CateList = createDom({ tag: 'div', cla: 'CateList' });
  cate.map((item: { ind: any; text: any }) => {
    let tagDom = createDom({ tag: 'div', cla: `CateItem ---${item.ind}`, txt: item.text });
    tagDom.addEventListener('click', (e: any) => {
      let key = e.target.className.split('CateItem ---')[1];
      sendMessageStoreIndex({ key, type: COPY_INFO_TO_SERVICES, cate: EDI_STORE });
    });
    CateList.appendChild(tagDom);
    return item;
  });
  ModalDom?.appendChild(CateList);
  StoreDom = createDom({ tag: 'div', cla: 'SET_STORE', txt: '商户绑定' });
  let StoreList = createDom({ tag: 'div', cla: 'CateList' });
  store.map((item: { ind: any; text: any }) => {
    let tagDom = createDom({ tag: 'div', cla: `CateItem ---${item.ind}`, txt: item.text });
    tagDom.addEventListener('click', (e: any) => {
      let key = e.target.className.split('CateItem ---')[1];
      sendMessageStoreIndex({ key, type: COPY_INFO_TO_SERVICES, cate: EDI_CATE });
    });
    StoreList.appendChild(tagDom);
    return item;
  });

  ModalDom?.appendChild(CateList);
  StoreDom?.appendChild(StoreList);
  dom?.appendChild(ModalDom);
  dom?.appendChild(StoreDom);
};

// 填入icp数据
export const putDownDataForIcpServer = (
  sender: chrome.runtime.MessageSender,
  request: MessageEventType<any>
) => {
  putDownICPData(request);
};

// 填入edi数据
export const putDownDataForEdiServer = (
  sender: chrome.runtime.MessageSender,
  request: MessageEventType<any>
) => {
  putDownEDIData(request);
};
// 选择edi分类
export const settingCateChooseValue = (
  sender: chrome.runtime.MessageSender,
  request: MessageEventType<any>
) => {
  console.log('content是否接到信息', sender, request);
  chooseEDICateData(request);
};

// 快捷键触发截屏
const StartScreenFlash = () => {
  createStartScreenBtn();
  document.onkeydown = (e: any) => {
    if (e.ctrlKey && e.altKey && e.keyCode === 88) {
      sendMessageScreenIndex();
    }
  };
};
// 创建截屏背景
export const putFilesOfScreen = (sender: chrome.runtime.MessageSender, request: any) => {
  createCanvasScreen(request.img);
};
// 选择截取区域
export const chooseFileSelection = () => {
  chooseImgServices();
};
// 设置Edi分类
export const settingCateListModal = (
  sender: chrome.runtime.MessageSender,
  request: MessageEventType<any>
) => {
  if (!request?.list) return;
  CreateCategoryList(request.list);
};
