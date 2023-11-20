import {
  ASK_CATE_TO_SERVICES,
  CHANGE_INFO_SERVICES,
  CHANGE_ONE_PASS_SERVICES,
  CHANGE_PLACE_SERVICES,
  COPY_INFO_TO_SERVICES,
  EDI,
  EDI_CATE,
  EDI_STORE,
  ICP,
  OPEN_DETAIL_EDIT_ACTIVITY,
  PUT_DOWN_EDI_DATA,
  PUT_DOWN_ICP_DATA,
  SCREENSHOT_SHORTCUT,
  SETTING_INDEX_EDI_SERVICES,
  SETTING_INDEX_ICP_SERVICES,
  UPLOAD_IMG_FILES,
  WAKE_FILE_SELECTION,
} from '@/common/agreement';
import {
  gettingStorage,
  sendMessageCallback,
  sendMessageQueryCurrent,
  settingStorage,
} from '@/pages/background/SettingStore';
import { createPeopleNameList, getTranslateAddress } from '@/common/passage-certificate';
import { GetAPI, UploadFiles } from '@/pages/background/FetchStore';
import { InfoType } from '@/pages/types';
import { isJSONString } from '@/pages/content/tools';

let defaultAddress = '成都';

export const listenerDataInfoMessage = (mobiles: string[]) => {
  chrome.runtime.onMessage?.removeListener(() => {});
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
            address:
              response?.address || getTranslateAddress(res.config?.address || defaultAddress),
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
    if (response?.type === CHANGE_PLACE_SERVICES) {
      gettingStorage('config', (res) => {
        if (!res) return true;
        if (res.config.type === ICP) {
          sendMessageQueryCurrent(res.config.serverId, {
            msg: PUT_DOWN_ICP_DATA,
            address:
              response?.address || getTranslateAddress(res.config?.address || defaultAddress),
          });
        }
        return true;
      });
    }
    if (response?.type === CHANGE_INFO_SERVICES) {
      gettingStorage('config', (res) => {
        if (!res) return true;
        if (res.config.type === ICP) {
          sendMessageQueryCurrent(res.config.serverId, {
            msg: PUT_DOWN_ICP_DATA,
            phone: mobiles[0],
            personnel: createPeopleNameList(),
          });
          mobiles.splice(0, 1);
        }
        return true;
      });
    }
    if (response?.type === CHANGE_ONE_PASS_SERVICES) {
      gettingStorage('config', (res) => {
        if (!res) return true;
        if (res.config.type === ICP) {
          let list = isJSONString(response?.params.json);
          if (list) {
            for (let i = 0; i < 6; i++) {
              list = list.concat(list);
            }
          }
          getCurrentData(
            mobiles,
            { ...response?.params, json: list },
            sender.tab?.id,
            res.config?.address
          );
        }
      });
    }
    return true;
  });
};

const getCurrentData = (mobiles: any, params: Partial<InfoType>, id: any, address: any) => {
  GetAPI({
    url: params.url + '/index/admin/column',
  }).then((res: any) => {
    let data: any[] = res.data;
    let list: any = [];
    data.map((item) => {
      if (item?.child) {
        list = list.concat(item.child);
      }
      return item;
    });
    startEditInfo(params, { url: params.url, list, index: 0, id, page: 1 }, mobiles, address);
  });
};

const startEditInfo = (message: any, params: any, mobiles: any, address: any) => {
  const { url, list, index, id, page } = params;
  if (index >= list.length) {
    console.log('所有内容执行完毕');
    return;
  }
  GetAPI({
    url: url + '/index/admin/data?cid=' + list[index].id + '&page=' + page,
  }).then((res: any) => {
    const { current_page, data, per_page, total } = res.data;
    if (total > current_page * per_page) {
      openOnceDataDetail(message, params, { data, hand: true, idx: 0, id }, mobiles, address);
    } else {
      openOnceDataDetail(message, params, { data, hand: false, idx: 0, id }, mobiles, address);
    }
  });
};

let editTimer: any = null;
const openOnceDataDetail = (message: any, props: any, option: any, mobiles: any, address: any) => {
  const { data, hand, idx, id } = option;
  if (idx >= data.length) {
    console.log('执行完毕', props);
    if (hand) {
      startEditInfo(message, { ...props, page: props.page + 1 }, mobiles, address);
    } else {
      startEditInfo(message, { ...props, page: 0, index: props.index + 1 }, mobiles, address);
    }
    clearTimeout(editTimer);
    editTimer = null;
    return;
  }
  // contacts: form['contacts'].checked,
  // area: form['area'].checked,
  // json: form['json'].value,
  // url: document.location.origin,
  let params: any = {
    msg: OPEN_DETAIL_EDIT_ACTIVITY,
    cid: data[idx].column_id,
    id: data[idx].id,
    idx,
    hand,
  };
  if (message.area || (!message.area && !message.contacts)) {
    params.address = getTranslateAddress(address || defaultAddress);
  }
  console.log(typeof message.json, message.json);
  if (message.json) {
    params.phone = message.json[0].phone;
    params.personnel = message.json[0].personnel;
    message.json.splice(0, 1);
  } else if (message.contacts || (!message.area && !message.contacts)) {
    params.phone = mobiles[0];
    params.personnel = createPeopleNameList();
  }
  mobiles.splice(0, 1);
  sendMessageCallback(id, params, (e: any) => {
    console.log('回执', e);

    editTimer = setTimeout(() => {
      openOnceDataDetail(message, props, { data, hand, idx: e.idx, id }, mobiles, address);
    }, 5000);
  });
};
