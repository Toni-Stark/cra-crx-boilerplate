// 重置querySelectorAPI
import { CreateElementType, ElementType } from '@/pages/types';

export const ImageMime = 'image/png';

export const queryEle = (str: string): ElementType => {
  return document.querySelector(str);
};

export const queryEleAll = (str: string): NodeListOf<Element> => {
  return document.querySelectorAll(str);
};

// 创建dom元素
export const createDom = ({ tag, cla, sty, val, txt, url }: CreateElementType): Element => {
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
    if (url) {
      dom.src = url;
    }
  } catch (err) {
    console.log(err, 'err');
  }
  return dom;
};

// 创建一段上下文
export const createTextNode = (text: string) => {
  return document.createTextNode(text);
};

export const getRegRandom = (title: any, context: any) => {
  let reg = /[0-9一二三四五两](室|(居室)|房)/;
  let tVal = title?.match(reg);
  let cVal = context?.match(reg);
  if (!tVal && !cVal) {
    return Math.ceil(Math.random() * 4);
  }
  let val = '';
  if (cVal) {
    val = cVal[0].slice(0, 1);
  }
  if (tVal) {
    val = tVal[0].slice(0, 1);
  }
  if ([1, '一', '1'].includes(val)) return 1;
  if ([2, '二', '2'].includes(val)) return 2;
  if ([3, '三', '3'].includes(val)) return 3;
  if ([4, '四', '4'].includes(val)) return 4;
  if ([5, '五', '5'].includes(val)) return 5;
  if ([6, '六', '6'].includes(val)) return 6;
  if (cVal) {
    let arr = context.split('');
    arr[cVal.index] = '2';
    arr = arr.join('');
    return { index: 1, num: 2, text: arr };
  }
  return 2;
};

export const getAreaRandom = (title: any, context: any) => {
  let reg = /[0-9]{1,3}(平|(平米)|(平方)|(m²))/;
  let numReg = /\d+/;
  let tReg = title?.match(reg);
  let cReg = context?.match(reg);
  if (!tReg && !cReg) {
    return Math.ceil(Math.random() * 10) * 10 + 45;
  }
  if (tReg) {
    return tReg[0].match(numReg)[0];
  }
  if (cReg) {
    return cReg[0].match(numReg)[0];
  }
};

export const getMinxRandom = (title: any, context: any, val: any) => {
  let reg = /[0-9.]{1,4}((万公里)|(万里))/;
  let numReg = /\d+/;
  let tReg = title?.match(reg);
  let cReg = context?.match(reg);
  if (val) {
    return val;
  }
  if (!tReg && !cReg) {
    return Math.ceil(Math.random() * 15);
  }
  if (tReg) {
    return tReg[0].match(numReg)[0];
  }
  if (cReg) {
    return cReg[0].match(numReg)[0];
  }
};

export const getChePriceRandom = (title: any, context: any, val: any) => {
  let reg = /[0-9.]{1,5}(元|(万元))/;
  let numReg = /[\d.]+/;
  let tReg = title?.match(reg);
  let cReg = context?.match(reg);
  if (val) {
    return val;
  }
  if (!tReg && !cReg) {
    return (Math.random() * 20).toFixed(1) + '0';
  }
  if (tReg) {
    return tReg[0].match(numReg)[0];
  }
  if (cReg) {
    return cReg[0].match(numReg)[0];
  }
};
export const getPriceRandom = (title: any, context: any, val?: any) => {
  let reg = /[0-9]{1,5}(元|(万元))/;
  let numReg = /\d+/;
  let tReg = title?.match(reg);
  let cReg = context?.match(reg);
  if (val) {
    return val;
  }
  if (!tReg && !cReg) {
    return Math.ceil(Math.random() * 20 + 5) * 100;
  }
  if (tReg) {
  }
  if (cReg) {
    return cReg[0].match(numReg)[0];
  }
};

export const noStr = (str: any) => {
  let reg = /[\d.]+/;
  return str ? str.match(reg)[0] : '';
};

export const BaseToBlob = (tmp_base64: string) => {
  if (!tmp_base64) return;
  var arr: any = tmp_base64.split(','),
    mime = arr[0].match(/:(.*?);/)[1],
    bstr = atob(arr[1]),
    n = bstr.length,
    u8arr = new Uint8Array(n);
  while (n--) {
    u8arr[n] = bstr.charCodeAt(n);
  }
  return new Blob([u8arr], { type: mime }); //返回blob对象
};
export const isJSONString = (str: string) => {
  try {
    JSON.parse(str);
    return JSON.parse(str);
  } catch (error) {
    return false;
  }
};

export const Random = (val: number, bool = false) => {
  return Math.floor(Math.random() * val) + (bool ? 1 : 0);
};
