import {
  ASK_CATE_TO_SERVICES,
  COPY_INFO_TO_SERVICES,
  EDI,
  EDI_CATE,
  EDI_STORE,
  ICP,
  PUT_DOWN_EDI_DATA,
  PUT_DOWN_ICP_DATA,
  SCREENSHOT_SHORTCUT,
  SETTING_INDEX_EDI_SERVICES,
  SETTING_INDEX_ICP_SERVICES, SETTING_LIST_DATA,
  UPLOAD_IMG_FILES,
  WAKE_FILE_SELECTION,
} from '@/common/agreement';
import {
  gettingStorage,
  sendMessageQueryCurrent,
  settingStorage,
} from '@/pages/background/SettingStore';
import { createPeopleNameList, getTranslateAddress } from '@/common/passage-certificate';
import { UploadFiles } from '@/pages/background/FetchStore';

export const listenerDataInfoMessage = (mobiles: string[]) => {
  chrome.runtime.onMessage.addListener(function (response, sender, sendResponse) {
    if (response?.type === COPY_INFO_TO_SERVICES) {
      gettingStorage('config', (res) => {
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
          if (response.cate === EDI_STORE) {
            sendMessageQueryCurrent(res.config.serverId, {
              msg: EDI_STORE,
              key: response.key,
            });
            return true;
          }
          if (response.cate === EDI_CATE) {
            sendMessageQueryCurrent(res.config.serverId, {
              msg: EDI_CATE,
              key: response.key,
            });
            return true;
          }
          sendMessageQueryCurrent(res.config.serverId, {
            msg: PUT_DOWN_EDI_DATA,
            ...response,
            cate: res.config.cate,
            list: res.config?.list,
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
          console.log('设置成功ICP');
        }
      );
      return true;
    }
    if (response?.type === SETTING_INDEX_EDI_SERVICES) {
      const { tab } = sender;
      settingStorage(
        {
          config: { type: EDI, serverId: tab?.id, cate: response.cate, list: response.listData },
        },
        () => {
          console.log('设置成功EDI');
        }
      );
      return true;
    }
    if (response?.type === SCREENSHOT_SHORTCUT) {
      chrome.tabs.captureVisibleTab(async (dataUrl) => {
        if (!dataUrl) return;
        const tabInfo: any = sender.tab;
        sendMessageQueryCurrent(tabInfo.id, {
          msg: SCREENSHOT_SHORTCUT,
          img: dataUrl,
        });
      });
    }
    if (response?.type === WAKE_FILE_SELECTION) {
      gettingStorage('config', (res) => {
        if (!res?.config?.serverId) return;
        sendMessageQueryCurrent(res.config.serverId, {
          msg: WAKE_FILE_SELECTION,
        });
      });
    }
    if (response?.type === ASK_CATE_TO_SERVICES) {
      gettingStorage('config', (res) => {
        if (!sender?.tab?.id) return;
        if (!res?.config) return;
        sendMessageQueryCurrent(sender.tab.id, {
          msg: ASK_CATE_TO_SERVICES,
          list: res.config.list,
        });
      });
    }
    if (response?.type === UPLOAD_IMG_FILES) {
      if (!sender?.tab?.id) return;
      let str: string = response.files;
      UploadFiles(response.files, response.blob).then(() => {
        console.log('logs');
      });
      sendResponse({ imageUrl: str });
    }
    return true;
  });
};
