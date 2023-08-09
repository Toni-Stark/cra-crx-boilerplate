import React, { useMemo, useLayoutEffect, useState } from 'react';
import { LST } from '@/pages/types';

const getStorage = (key: string) => localStorage.getItem(key);
const setStorage = (key: string, val: string) => localStorage.setItem(key, val);

const Options: React.FC<PropsType> = ({ dataList, configList }: Partial<PropsType>) => {
  const [active, setActive] = useState(undefined);
  useLayoutEffect(() => {
    const OptionsStorage = getStorage(LST.OPTIONS_STORAGE);
    if (OptionsStorage) {
      let optionsStorage = JSON.parse(OptionsStorage);
      setActive(optionsStorage.active);
    }
  }, []);

  const bindCheckManager = (item: any) => {
    const OptionsStorage = getStorage(LST.OPTIONS_STORAGE);
    let optionsStorage;
    if (OptionsStorage) {
      optionsStorage = JSON.parse(OptionsStorage);
      optionsStorage.active = item;
    } else {
      optionsStorage = { active: item };
    }
    setActive(item);
    setStorage(LST.OPTIONS_STORAGE, JSON.stringify(optionsStorage));
  };

  const currentManagerList = useMemo(() => {
    return (
      <div className="SettingList">
        {configList?.map((item) => (
          <div
            key={item.keyValue}
            className={active === item.keyValue ? 'active' : ''}
            onClick={() => bindCheckManager(item.keyValue)}
          >
            {item.title}
          </div>
        ))}
      </div>
    );
  }, [configList, active]);
  const currentDataList = useMemo(() => {
    return (
      <div className="SettingContent">
        {dataList?.map((item, index) => (
          <div key={item.title + index} className="SettingItem">
            {item.title}
            <div className="ChangeTime">最近更新：{item.updateTime}</div>
          </div>
        ))}
      </div>
    );
  }, [dataList]);
  return (
    <div className="OptionsContainer">
      <div className="SettingViews">
        <div className="SettingTabs">
          <div className="SettingTitle">菜单栏</div>
          {currentManagerList}
        </div>
        {currentDataList}
      </div>
    </div>
  );
};

export default Options;

interface PropsType {
  dataList: Array<DataType>;
  configList: Array<ConfigType>;
}
interface DataType {
  title: string;
  updateTime: string;
}
interface ConfigType {
  title: string;
  keyValue: string;
}
