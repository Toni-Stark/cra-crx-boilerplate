import { trimSpecial } from '@/common/passage-certificate';
import {
  getAreaRandom,
  getChePriceRandom,
  getMinxRandom,
  getPriceRandom,
  getRegRandom,
  queryEle,
  queryEleAll,
} from '@/pages/content/tools';
import { sitType, situationType, unitType } from '@/pages/types';
import { EDI_CATE, EDI_STORE } from '@/common/agreement';

export const PERMANENT: any = {
  title: '.is-required>.el-form-item__content>.el-input>.el-input__inner',
  context:
    '.el-row>.el-col>div:nth-child(5)>.el-form-item__content>.el-textarea>.el-textarea__inner',
  address:
    '.el-row>.el-col>div:nth-child(6)>div:nth-child(2)>.el-form-item>.el-form-item__content>.el-input>.el-input__inner',
  sle_address: '.el-cascader-menus>.el-cascader-menu>.el-cascader-menu__item',
  personnel:
    '.el-row>.el-col>div:nth-child(7)>div>.el-form-item>.el-form-item__content>.el-input>.el-input__inner',
  phone:
    '.el-row>.el-col>div:nth-child(7)>div:nth-child(2)>.el-form-item>.el-form-item__content>.el-input>.el-input__inner',
};

export const ZU_FANG: any = {
  price:
    '.el-col>div>.el-form-item:nth-child(1)>.el-form-item__content>.el-input-group>.el-input__inner',
  house:
    '.el-select-dropdown>.el-scrollbar>.el-select-dropdown__wrap>.el-scrollbar__view>.el-select-dropdown__item',
  area: '.el-col>div>.el-form-item:nth-child(3)>.el-form-item__content>.el-input-group>.el-input__inner',
};
export const ZHAO_PING: any = {
  company_name:
    '.el-col>div>.el-form-item:nth-child(1)>.el-form-item__content>.el-input>.el-input__inner',
  price:
    '.el-col>div>.el-form-item:nth-child(2)>.el-form-item__content>.el-select>.el-input>.el-input__inner',
  desc: '.el-col>div>.el-form-item:nth-child(3)>.el-form-item__content>.el-textarea>.el-textarea__inner',
};
export const MAI_FANG: any = {
  unit: '.el-col>div>.el-form-item:nth-child(1)>.el-form-item__content>.el-select>.el-input>.el-input__inner',
  place: '.el-col>div>.el-form-item:nth-child(2)>.el-form-item__content>.el-input>.el-input__inner',
  direction:
    '.el-col>div>.el-form-item:nth-child(3)>.el-form-item__content>.el-select>.el-input>.el-input__inner',
  situation:
    '.el-col>div>.el-form-item:nth-child(4)>.el-form-item__content>.el-select>.el-input>.el-input__inner',
  price: '.el-col>div>.el-form-item:nth-child(5)>.el-form-item__content>.el-input>.el-input__inner',
};
export const MAI_CHE: any = {
  price: '.el-col>div>.el-form-item:nth-child(2)>.el-form-item__content>.el-input>.el-input__inner',
  mileage:
    '.el-col>div>.el-form-item:nth-child(1)>.el-form-item__content>.el-input>.el-input__inner',
};
export const SHOU_JI: any = {
  price: '.el-col>div>.el-form-item>.el-form-item__content>.el-input>.el-input__inner',
};

export const SET_DATE: any = {
  focus:
    '.el-row>.el-col:nth-child(2)>.el-form-item>.el-form-item__content>.el-date-editor>.el-input__inner',
  nextYear: '.el-icon-d-arrow-right',
  date: '.el-date-table>tbody>.el-date-table__row>.next-month>div>span',
  submit: '.is-plain',
};

export const ALL_SHANG_PING: any = {
  title: '#tab1>.form-table>tbody>tr>td>.form-control',
  price: '#goodsBaseBody>tr>td:nth-child(4)>.form-control',
};

export const SHANG_PING: any = {
  e_price: '#goodsBaseBody>tr>td:nth-child(3)>.form-control',
  user: '#tab1>.form-table>tbody>tr:nth-child(3)>td>.form-control',
  users: '#tab1>.form-table>tbody>tr:nth-child(3)>td>.form-control>option',
  cate: '#tab1>.form-table>tbody>tr:nth-child(4)>td>.btn-primary',
  context: '.ck-editor__editable_inline',
};

export const DispatchEvent = (dom: any, event: string) => {
  let e = new Event(event);
  dom?.dispatchEvent(e);
};

export const handDownICPData = (data: any, callback: any) => {
  for (let i in PERMANENT) {
    if (data.hasOwnProperty(i)) {
      let formEle: any = queryEle(PERMANENT[i]);
      if (i === 'context') {
        formEle.value = trimSpecial(data[i]);
      } else {
        if (formEle) {
          formEle.value = data[i];
        }
      }
      DispatchEvent(formEle, 'input');
    }
  }
  let btn: any = queryEle('.app-container .container .el-row .el-button--primary');
  btn?.click();
  callback();
};

export const putDownICPData = (data: any) => {
  for (let i in PERMANENT) {
    if (data.hasOwnProperty(i)) {
      let formEle: any = queryEle(PERMANENT[i]);
      if (i === 'context') {
        formEle.value = trimSpecial(data[i]);
      } else {
        if (formEle) {
          formEle.value = data[i];
        }
      }
      DispatchEvent(formEle, 'input');
    }
    if (i === 'sle_address') {
      let clickDom: any = queryEle('.el-cascader__label');
      clickDom.click();
      setTimeout(() => {
        let formEle: any = queryEle(PERMANENT[i]);
        formEle.click();
      }, 200);
    }
  }
  if (data.cate === 'ZU_FANG') {
    for (let i in ZU_FANG) {
      if (i === 'price') {
        let ranNum: any = getPriceRandom(data.title, data.context);
        let formEle: any = queryEle(ZU_FANG[i]);
        formEle.value = ranNum;
        DispatchEvent(formEle, 'input');
      }
      if (i === 'house') {
        let clickDom: any = queryEle(
          '.el-col>div>.el-form-item:nth-child(2)>.el-form-item__content>.el-select'
        );
        clickDom?.click();
        setTimeout(() => {
          let ranNum: any = getRegRandom(data.title, data.context);
          if (ranNum?.index === 1) {
            let formEle: any = queryEle(PERMANENT['context']);
            formEle.textContent = ranNum.text;
            ranNum = ranNum.num;
          }
          let text: any = queryEle(ZU_FANG[i] + ':nth-child(' + ranNum + ')>span');
          text?.click();
        }, 200);
      }
      if (i === 'area') {
        let formEle: any = queryEle(ZU_FANG[i]);
        formEle.value = getAreaRandom(data.title, data.context);
        DispatchEvent(formEle, 'input');
      }
    }
  }
  if (data.cate === 'ZHAO_PING') {
    for (let i in ZHAO_PING) {
      if (i === 'company_name') {
        let formEle: any = queryEle(ZHAO_PING[i]);
        formEle.value = data[i];
        DispatchEvent(formEle, 'input');
      }
      if (i === 'desc') {
        let formEle: any = queryEle(ZHAO_PING[i]);
        formEle.value = data[i] || '';
        DispatchEvent(formEle, 'input');
      }
      if (i === 'price') {
        let clickDom: any = queryEle(ZHAO_PING[i]);
        clickDom.click();
        setTimeout(() => {
          let ranNum = Math.floor(Math.random() * 4.5);
          let text: any = queryEle(
            '.el-select-dropdown>.el-scrollbar>.el-select-dropdown__wrap>.el-scrollbar__view>.el-select-dropdown__item:nth-child(' +
              ranNum +
              ')>span'
          );
          text?.click();
        }, 200);
      }
    }
  }
  if (data.cate === 'MAI_FANG') {
    for (let i in MAI_FANG) {
      if (i === 'price') {
        let formEle: any = queryEle(MAI_FANG[i]);
        formEle.value = data[i];
        DispatchEvent(formEle, 'input');
      }
      if (i === 'unit') {
        let clickDom: any = queryEle(MAI_FANG[i]);
        clickDom.click();
        setTimeout(() => {
          let index = data.unit?.slice(0, 2);
          if (['1室', '2室', '3室', '4室'].includes(index)) {
            index = unitType[index];
          } else {
            index = 2;
          }
          let list: any = queryEleAll('.el-scrollbar__view');
          let text = list[0].querySelectorAll('.el-select-dropdown__item')[index];
          text?.click();
        }, 200);
      }
      if (i === 'place') {
        let formEle: any = queryEle(MAI_FANG[i]);
        formEle.value = data[i];
        DispatchEvent(formEle, 'input');
      }
      if (i === 'direction') {
        let clickDom: any = queryEle(MAI_FANG[i]);
        clickDom.click();
        setTimeout(() => {
          let index = data['context'].indexOf('朝向');
          let val = data['context'].slice(index + 2, index + 3);
          let num: any = 1;
          if (['东', '南', '西', '北', '东南', '南北'].includes(val)) {
            num = situationType[val];
          }
          let list: any = queryEleAll('.el-scrollbar__view');
          let text = list[1].querySelectorAll('.el-select-dropdown__item')[num];
          text?.click();
        }, 200);
      }
      if (i === 'situation') {
        let num: any = 3;
        let str: any = data.situation;
        if (
          data.situation &&
          ['毛坯', '毛坯房', '简装', '简装修', '中等', '精装', '精装修', '豪华'].includes(str)
        ) {
          num = sitType[data.situation];
        }
        let clickDom: any = queryEle(MAI_FANG[i]);
        clickDom.click();
        setTimeout(() => {
          let list: any = queryEleAll('.el-scrollbar__view');
          let text = list[2].querySelectorAll('.el-select-dropdown__item')[num];
          text?.click();
        }, 200);
      }
    }
  }
  if (data.cate === 'MAI_CHE') {
    for (let i in MAI_CHE) {
      if (i === 'price') {
        let formEle: any = queryEle(MAI_CHE[i]);
        formEle.value = getChePriceRandom(data.title, data.context, data[i]);
        DispatchEvent(formEle, 'input');
      }
      if (i === 'mileage') {
        let ranNum: any = getMinxRandom(data.title, data.context, data[i]);
        let formEle: any = queryEle(MAI_CHE[i]);
        formEle.value = ranNum;
        DispatchEvent(formEle, 'input');
      }
    }
  }
  if (data.cate === 'SHOU_JI') {
    for (let i in SHOU_JI) {
      if (i === 'price') {
        let ranNum: any = getPriceRandom(data.title, data.context, data[i]);
        let formEle: any = queryEle(SHOU_JI[i]);
        formEle.value = ranNum;
        DispatchEvent(formEle, 'input');
      }
    }
  }

  let dom1: any = queryEle(SET_DATE.focus);
  DispatchEvent(dom1, 'focus');
  setTimeout(() => {
    let dom2: any = queryEle(SET_DATE.nextYear);
    DispatchEvent(dom2, 'click');
    DispatchEvent(dom2, 'click');
    DispatchEvent(dom2, 'click');
    setTimeout(() => {
      let dom3: any = queryEle(SET_DATE.date);
      dom3.click();
      setTimeout(() => {
        let dom4: any = queryEle(SET_DATE.submit);
        DispatchEvent(dom4, 'click');
      }, 100);
    }, 100);
  }, 100);
};
export const putDownEDIData = (data: any) => {
  for (let i in ALL_SHANG_PING) {
    if (data.hasOwnProperty(i)) {
      let formEle: any = queryEle(ALL_SHANG_PING[i]);
      if (formEle) {
        formEle.value = data[i];
      }
      DispatchEvent(formEle, 'input');
    }
  }
  if (data.cate === 'SHANG_PING') {
    for (let i in SHANG_PING) {
      if (i === 'e_price') {
        let ranNum: any = data?.e_price ? data?.e_price : 200;
        let formEle: any = queryEle(SHANG_PING[i]);
        formEle.value = ranNum;
        DispatchEvent(formEle, 'input');
        let formEleEval: any = queryEle('#goodsBaseBody>tr>td:nth-child(4)>.input-sm');
        formEleEval.value = ranNum;
        DispatchEvent(formEleEval, 'input');
      }
    }
  }
};

export const chooseEDICateData = (data: any) => {
  if (data.msg === EDI_CATE) {
    let formEle: any = queryEle(SHANG_PING['user']);
    let formEls: any = queryEleAll(SHANG_PING['users']);
    let arr = [];
    for (let i = 0; i < formEls.length; i++) {
      arr.push(formEls[i].value);
    }
    formEle.value = arr[data.key];
  }
  if (data.msg === EDI_STORE) {
    let btn: any = queryEle(SHANG_PING['cate']);
    btn.click();
    setTimeout(() => {
      let num = data.key;
      let conDom: any = queryEle('.aui_state_full>iframe');
      let domList = conDom?.contentDocument.querySelectorAll('#categoryBox>.select>li>label');
      domList[num].click();
      setTimeout(() => {
        let confirm: any = queryEle('.aui_state_highlight');
        confirm?.click();
      }, 1000);
    }, 2000);
  }
};

export const settingImageFileCurrentICP = (data: any, params: any) => {
  let input: any = document.querySelector('.avatar-uploader .el-upload__input');
  UploadImageNoBaseAndAddElement(params.upload_file, input);
};
export const settingImageFileCurrentEDI = (data: any, params: any) => {
  let input: any = document.querySelector('#fileUpload');
  UploadImageNoBaseAndAddElement(params.upload_file, input);
};

const UploadImageNoBaseAndAddElement = (src: string, imgView: any) => {
  let file = base64ToFileTypeImage(src, new Date().getTime() + '.jpg');
  const dataTransfer = new DataTransfer();
  dataTransfer.items.add(file);
  imgView.files = dataTransfer.files;
  let e = new Event('change');
  imgView.dispatchEvent(e);
  return;
};

export const base64ToFileTypeImage = (base64Data: any, fileName: any) => {
  let data = base64Data.split(',');
  const bstr = window.atob(data[1]);
  let type = 'image/png';
  let n = bstr.length;
  const u8arr = new Uint8Array(n);
  while (n--) {
    u8arr[n] = bstr.charCodeAt(n);
  }
  return new File([u8arr], `${fileName}`, {
    type: type,
  });
};
export const chooseImgServices = () => {
  let upDom = document.querySelector('.el-upload--text');
  let e = new Event('click');
  upDom?.dispatchEvent(e);
};

export const currentHandEditDetail = (data: any, callback: any) => {
  document.location.hash = '/index/infoEdit?cid=' + data.cid + '&id=' + data.id;
  if (document.readyState === 'complete') {
    let params: any = {};
    if (data?.address) {
      params['address'] = data.address;
    }
    if (data?.phone && data?.personnel) {
      params['phone'] = data.phone;
      params['personnel'] = data.personnel;
    }

    handDownICPData(params, () => {
      console.log('加载动作');
      callback({ idx: data.idx + 1, hand: data.hand });
    });
  }
};
