import {
  COPY_INFO_TO_SERVICES,
  EDI,
  ICP,
  PUT_DOWN_EDI_DATA,
  PUT_DOWN_ICP_DATA,
  SETTING_INDEX_EDI_SERVICES,
  SETTING_INDEX_ICP_SERVICES,
} from '@/common/agreement';
import {
  gettingStorage,
  sendMessageQueryCurrent,
  settingStorage,
} from '@/pages/background/SettingStore';
import { createPeopleNameList, getTranslateAddress } from '@/common/passage-certificate';

export const listenerDataInfoMessage = (mobiles: string[]) => {
  chrome.runtime.onMessage.addListener(function (response, sender, sendResponse) {
    console.log(response?.type === COPY_INFO_TO_SERVICES, COPY_INFO_TO_SERVICES);
    if (response?.type === COPY_INFO_TO_SERVICES) {
      gettingStorage('config', (res) => {
        console.log(response, 'type', sender, 'storage', res);
        if (!res) return true;
        if (res.config.type === ICP) {
          sendMessageQueryCurrent(res.config.serverId, {
            msg: PUT_DOWN_ICP_DATA,
            ...response,
            phone: mobiles[0],
            personnel: createPeopleNameList(),
            address: response?.address || getTranslateAddress(res.config?.address || '成都'),
            cate: res.config.cate,
          });
          mobiles.splice(0, 1);
        }
        if (res.config.type === EDI) {
          sendMessageQueryCurrent(res.config.serverId, {
            msg: PUT_DOWN_EDI_DATA,
            ...response,
          });
        }
      });
      return true;
    }
    if (response?.type === SETTING_INDEX_ICP_SERVICES) {
      const { tab } = sender;
      settingStorage(
        {
          config: { type: ICP, serverId: tab?.id, cate: response.cate, address: response?.address },
        },
        () => {
          console.log('设置成功');
        }
      );
      return true;
    }
    if (response?.type === SETTING_INDEX_EDI_SERVICES) {
      const { tab } = sender;
      settingStorage(
        {
          config: { type: EDI, serverId: tab?.id, cate: response.cate, address: response?.address },
        },
        () => {
          console.log('设置成功');
        }
      );
      return true;
    }
    return true;
  });
};
