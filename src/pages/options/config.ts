// 菜单栏;
import { LST } from '@/pages/types';

export let configList = [
  { title: '数据录入管理', keyValue: LST.DATA_MANAGER },
  { title: '工具状态管理', keyValue: LST.TOOLS_STATUS },
  { title: '插件配置管理', keyValue: LST.EXTENSIONS_OPTIONS },
  { title: '服务接口管理', keyValue: LST.SERVERS_API },
];
// 历史录入数据;
export let dataList = [
  { title: '京东数据', updateTime: '6/14 17:38' },
  { title: '拼多多数据', updateTime: '6/14 17:38' },
  { title: '淘宝数据', updateTime: '6/14 17:38' },
  { title: '百姓网数据', updateTime: '6/14 17:42' },
];

export let params = {
  dataList,
  configList,
};
