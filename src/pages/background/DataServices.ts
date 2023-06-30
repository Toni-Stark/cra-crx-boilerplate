import { COPY_INFO_TO_SERVICES, PUT_DOWN_DATA, SETTING_INDEX_SERVICES } from '@/common/agreement';
import {
  gettingStorage,
  sendMessageQueryCurrent,
  settingStorage,
} from '@/pages/background/SettingStore';
import { createPeopleNameList, getTranslateAddress } from '@/common/passage-certificate';

export const listenerDataInfoMessage = (mobiles: string[]) => {
  chrome.runtime.onMessage.addListener(function (response, sender, sendResponse) {
    if (response?.type === COPY_INFO_TO_SERVICES) {
      gettingStorage('config', (res) => {
        if (!res) return true;
        console.log(response, 'frash', res);
        sendMessageQueryCurrent(res.config.serverId, {
          msg: PUT_DOWN_DATA,
          ...response,
          phone: mobiles[0],
          personnel: createPeopleNameList(),
          address: response?.address || getTranslateAddress('成都'),
          cate: res.config.cate,
        });
        mobiles.splice(0, 1);
      });
      return true;
    }
    if (response?.type === SETTING_INDEX_SERVICES) {
      const { tab } = sender;
      settingStorage({ config: { serverId: tab?.id, cate: response.cate } }, () => {
        console.log('设置成功');
      });
      return true;
    }
    return true;
  });
};
