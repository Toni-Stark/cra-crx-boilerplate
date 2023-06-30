// 重置querySelectorAPI

import { CreateElementType, ElementType } from '@/common/types';

export const queryEle = (str: string): ElementType => {
  return document.querySelector(str);
};

export const queryEleAll = (str: string): NodeListOf<Element> => {
  return document.querySelectorAll(str);
};

// 创建dom元素
export const createDom = ({ tag, cla, sty, val, txt }: CreateElementType): Element => {
  let dom: any = document.createElement(tag);
  try {
    if (cla) {
      dom.className = cla;
    }
    if (sty) {
      dom.style = sty;
    }
    if (val) {
      dom.value = val;
    }
    if (txt) {
      dom.textContent = txt;
    }
  } catch (err) {
    console.log(err, 'err');
  }
  return dom;
};
