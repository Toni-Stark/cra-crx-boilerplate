import React from 'react';
import logo from '../../assets/img/logo.svg';
import tabPng from '../../assets/img/tabItem.png';
import { CREATE_SERVER_TEMPLATE, SETTING_EDI_POINT, SETTING_ICP_POINT } from '@/common/agreement';

const Popup = () => {
  const checkModalOpen = async (msg: string) => {
    const tab: any = await chrome.tabs.query({ active: true, currentWindow: true });
    console.log(tab, '当前页面信息');
    // chrome.tabs.sendMessage(tab[0].id, { create: msg });
    chrome.tabs.captureVisibleTab(tab[0].windowId, {}, function (base64) {
      //发送到 content_script.js
      // sendMessageToContentScript({ type: 'get_screenshot_data', payload: base64 }, (response) => {
      console.log('response:', base64);
      // });
    });
  };

  return (
    <div className="App">
      <div className="AppHeader">
        <img src={logo} className="App-logo" alt="logo" />
        数据输出页面设置
      </div>
      <div className="ModalContent">
        当前页面数据模板选择
        <div className="ModalList">
          <div className="ModalItem" onClick={() => checkModalOpen(SETTING_ICP_POINT)}>
            <img src={tabPng} alt="" />
            商城edu
          </div>
          <div className="ModalItem" onClick={() => checkModalOpen(SETTING_EDI_POINT)}>
            <img src={tabPng} alt="" />
            分类icp
          </div>
          <div className="ModalItem" onClick={() => checkModalOpen(CREATE_SERVER_TEMPLATE)}>
            <img src={tabPng} alt="" />
            新增模板
          </div>
        </div>
      </div>
    </div>
  );
};

export default Popup;
