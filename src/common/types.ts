const LST: ThingMap = {
  // options_page_setting_type;
  DATA_MANAGER: 'DATA_MANAGER',
  TOOLS_STATUS: 'TOOLS_STATUS',
  EXTENSIONS_OPTIONS: 'EXTENSIONS_OPTIONS',
  SERVERS_API: 'SERVERS_API',

  // options_storage
  OPTIONS_STORAGE: 'OPTIONS_STORAGE',
};

export { LST };

interface ThingMap {
  [thingName: string]: Thing;
}

type Thing = string;

export type MessageEventType<T = any> = {
  type: string;
  data?: T;
  msg?: string;
  create?: string;
};

export interface CreateElementType {
  tag: string;
  cla?: string;
  sty?: string;
  val?: string;
  txt?: string;
}

export type ElementType = Element | HTMLInputElement | null;

export enum situationType {
  '东',
  '南',
  '西',
  '北',
  '东南' = 1,
  '南北' = 1,
}
export enum unitType {
  '1室',
  '2室',
  '3室',
  '4室',
}

export enum sitType {
  '毛坯',
  '毛坯房' = 0,
  '简装',
  '简装修' = 1,
  '中等',
  '精装',
  '精装修' = 3,
  '豪华',
}
