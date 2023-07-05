import { COPY_INFO_TO_SERVICES, SETTING_INDEX_SERVICES } from '@/common/agreement';

export const copyInfoToServices = (info: any) => {
  chrome.runtime.sendMessage({ ...info, type: COPY_INFO_TO_SERVICES }).then((res) => {
    console.log('info-res------------------>');
    console.log(res);
    console.log('info-res------------------>');
  });
};
export const sendMessageSetIndex = (key: string, addText: string) => {
  chrome.runtime
    .sendMessage({ type: SETTING_INDEX_SERVICES, cate: key, address: addText })
    .then((res) => {
      console.log('info-res------------------>');
      console.log(res);
      console.log('info-res------------------>');
    });
};
