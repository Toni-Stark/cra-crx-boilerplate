import {
  COPY_INFO_TO_SERVICES,
  EDI,
  SETTING_INDEX_EDI_SERVICES,
  SETTING_INDEX_ICP_SERVICES,
} from '@/common/agreement';

export const copyInfoToServices = (info: any) => {
  chrome.runtime.sendMessage({ ...info, type: COPY_INFO_TO_SERVICES }).then((res) => {
    console.log('info-res------------------>');
    console.log(res);
    console.log('info-res------------------>');
  });
};
export const sendMessageSetIndex = ({ key, addText, type }: any) => {
  console.log(type, '属于哪一个类型');
  let val = SETTING_INDEX_ICP_SERVICES;
  if (type === EDI) {
    val = SETTING_INDEX_EDI_SERVICES;
  }

  chrome.runtime.sendMessage({ type: val, cate: key, address: addText }).then((res) => {
    console.log('info-res------------------>');
    console.log(res);
    console.log('info-res------------------>');
  });
};
