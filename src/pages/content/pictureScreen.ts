import { IndexObj } from '@/pages/types';
import { sendFilesForServices, sendMessageScreenIndex } from '@/pages/content/messageStore';
import { BaseToBlob, queryEle } from '@/pages/content/tools';
let drawFiles: any = null;

export const createCanvasScreen = (files: any) => {
  drawFiles = files;
  queryDom('body').style.overflow = 'hidden';
  if (CON) clearEveryLis();
  CON = createDom('div', 'container_screen_dashed');
  queryDom('body').appendChild(CON);
  draw(files);
  settingMouse();
};

function queryDom(str: string): any {
  return document.querySelector(str);
}
function createDom(dom: string, cla: string, text?: string): any {
  let d = document.createElement(dom);
  d.className = cla;
  if (text) {
    d.textContent = text;
  }
  return d;
}
let CON: any = null;
let domT: any = null;
let domR: any = null;
let domB: any = null;
let domL: any = null;
let domC: any = null;
let poiT: any = null;
let poiR: any = null;
let poiB: any = null;
let poiL: any = null;
let CONV: any = null;
let mouseEnter: any = null;
let start: any = null;
let end: any = null;

let w = window.innerWidth;
let h = window.innerHeight;
function draw(files: any) {
  let canvas1 = createDom('canvas', 'container_canvas');
  canvas1.width = w * 2;
  canvas1.height = h * 2;
  canvas1.style.width = w + 'px';
  canvas1.style.height = h + 'px';
  let ctx: any = canvas1.getContext('2d');
  let img = new Image();
  img.src = files;
  img.onload = function () {
    ctx.drawImage(img, 0, 0, w * 2, h * 2);
  };
  CON.appendChild(canvas1);
}

function clickCoordinate(e: any, bool?: boolean) {
  if (!start) {
    start = { x: e.clientX, y: e.clientY };
  }
  if (bool || start?.x === end?.x || !end) {
    if (mouseEnter === 'right') {
      start.y = e.clientY;
      end.x = e.clientX;
    }
    if (mouseEnter === 'left') {
      start.x = e.clientX;
      end.y = e.clientY;
    }
    if (mouseEnter === 'top') {
      start = { x: e.clientX, y: e.clientY };
    }
    if (mouseEnter === 'bottom') {
      end = { x: e.clientX, y: e.clientY };
    }
  }
  if (start.x > end.x || start.y > end.y) {
    let c = { ...end };
    end = { ...start };
    start = { ...c };
  }
  if (end?.x > start?.x) {
    CONV.style.opacity = '1';
  }
  refreshDom(start, end);
}

function createSDom() {
  domT = createDom('div', 'domT');
  domR = createDom('div', 'domR');
  domB = createDom('div', 'domB');
  domL = createDom('div', 'domL');
  domC = createDom('div', 'domC');
  queryDom('.DomView').appendChild(domT);
  queryDom('.DomView').appendChild(domR);
  queryDom('.DomView').appendChild(domB);
  queryDom('.DomView').appendChild(domL);
  queryDom('.DomView').appendChild(domC);
}
function createSPoint() {
  poiT = createDom('div', 'poiT');
  poiL = createDom('div', 'poiL');
  poiR = createDom('div', 'poiR');
  poiB = createDom('div', 'poiB');
  queryDom('.DomPoi').appendChild(poiT);
  queryDom('.DomPoi').appendChild(poiR);
  queryDom('.DomPoi').appendChild(poiB);
  queryDom('.DomPoi').appendChild(poiL);
}
function createControl() {
  CONV = createDom('div', 'control-list');
  let btnC = createDom('div', 'control-confirm-btn', '确认');
  let btnD = createDom('div', 'control-disable-btn', '取消');
  CONV.appendChild(btnC);
  btnC.addEventListener('click', () => {
    getBaseAndUpload(start, end);
  });
  btnD.addEventListener('click', () => {
    clearEveryLis();
  });
  CONV.appendChild(btnD);
  queryDom('body').appendChild(CONV);
}

const AddUploadImage = (e: { imageUrl: any }) => {
  let imgView: any = queryEle('.UploadImg');
  imgView?.remove();
  imgView = document.createElement('div');
  imgView.className = 'UploadImg';
  // let imgFiles: any = createDom('img', 'UploadImgText');
  // imgFiles.src = e.imageUrl;
  // imgView.appendChild(imgFiles);
  imgView.style.backgroundImage = 'url(' + e.imageUrl + ')';
  imgView.addEventListener('mousedown', (e: any) => {
    document.oncontextmenu = function () {
      return false;
    };
    if (e.button === 2) {
      imgView.removeEventListener('mousedown', () => {});
      DelUploadImage();
      return;
    }
  });
  document.body.appendChild(imgView);
};
const DelUploadImage = () => {
  let imgView: any = queryEle('.UploadImg');
  imgView?.remove();
};
// 获取截图
function getBaseAndUpload(s: IndexObj, e: IndexObj) {
  if (!drawFiles) return;
  downLoadImg(s, e);

  // sendFilesForServices(drawFiles, (e) => {
  //   AddUploadImage(e);
  //   clearEveryLis();
  // });
}

// 下载图片
const downLoadImg = (s: IndexObj, e: IndexObj) => {
  // 选择用下载方式保存图片
  let w = window.innerWidth;
  let h = window.innerHeight;
  const Img = new Image();
  Img.src = drawFiles;
  Img.onload = () => {
    let iw = w / Img.width;
    let ih = h / Img.height;
    let canvas2 = document.createElement('canvas');
    canvas2.width = e.x - s.x;
    canvas2.height = e.y - s.y;
    canvas2.style.width = e.x - s.x + 'px';
    canvas2.style.height = e.y - s.y + 'px';
    let cth: any = canvas2.getContext('2d');
    cth.drawImage(
      Img,
      s.x / iw,
      s.y / ih,
      (e.x - s.x) / iw,
      (e.y - s.y) / ih,
      0,
      0,
      e.x - s.x,
      e.y - s.y
    );
    downLoadUrl(canvas2.toDataURL(), new Date().getTime() + '.png');
    // downLoadUrl(cth, new Date().getTime() + '.png');
  };
};

const downLoadUrl = (url: any, name: string) => {
  let blob: any = BaseToBlob(url);
  sendFilesForServices(url, blob, (e) => {
    AddUploadImage(e);
    clearEveryLis();
  });
  return;
  // 下载到本地
  let saveLink = document.createElement('a');
  saveLink.style.display = 'none';
  saveLink.href = url;
  saveLink.download = name;
  let event = document.createEvent('MouseEvents');
  event.initMouseEvent(
    'click',
    true,
    false,
    window,
    0,
    0,
    0,
    0,
    0,
    false,
    false,
    false,
    false,
    0,
    null
  );
  saveLink.dispatchEvent(event);
  setTimeout(
    () =>
      function () {
        document.body.removeChild(saveLink); //保存完后删除临时a节点
      },
    500
  );

  // 唤醒中台图片选择
  // wakeFileSelection();
};

function settingMouse() {
  CON.appendChild(createDom('div', 'DomView'));
  createSDom();
  queryDom('.domC').appendChild(createDom('div', 'DomPoi'));
  createSPoint();
  createControl();
  CON.addEventListener('mousedown', (e: any) => {
    document.oncontextmenu = function () {
      return false;
    };
    if (e.button === 2) {
      clearEveryLis();
      return;
    }
    if (mouseEnter === null) {
      mouseEnter = 'bottom';
    }
    clickCoordinate(e);
  });
  CON.addEventListener('mouseup', () => {
    mouseEnter = null;
  });
  CON.addEventListener('mousemove', (e: any) => {
    if (!mouseEnter) return;
    clickCoordinate(e, true);
  });
  poiT.addEventListener('mousedown', () => {
    mouseEnter = 'top';
  });
  poiR.addEventListener('mousedown', () => {
    mouseEnter = 'right';
  });
  poiB.addEventListener('mousedown', () => {
    mouseEnter = 'bottom';
  });
  poiL.addEventListener('mousedown', () => {
    mouseEnter = 'left';
  });
}

function refreshDom(s: IndexObj, e: IndexObj) {
  domT.style.width = e.x + 'px';
  domT.style.height = s.y + 'px';
  domR.style.left = e.x + 'px';
  domR.style.right = '0';
  domR.style.height = e.y + 'px';
  domR.style.top = '0';
  domL.style.left = '0';
  domL.style.width = s.x + 'px';
  domL.style.bottom = '0';
  domL.style.top = s.y + 'px';
  domB.style.left = s.x + 'px';
  domB.style.right = '0';
  domB.style.bottom = '0';
  domB.style.top = e.y + 'px';
  domC.style.left = s.x + 'px';
  domC.style.right = w - e.x + 'px';
  domC.style.bottom = h - e.y + 'px';
  domC.style.top = s.y + 'px';
  CONV.style.top = e.y - 55 + 'px';
  CONV.style.left = e.x + 5 + 'px';
}

export const clearEveryLis = () => {
  mouseEnter = null;
  start = null;
  end = null;
  CON.removeEventListener('mousedown', () => {});
  CON.removeEventListener('mouseup', () => {});
  CON.removeEventListener('mousemove', () => {});
  poiT.removeEventListener('mousedown', () => {});
  poiR.removeEventListener('mousedown', () => {});
  poiB.removeEventListener('mousedown', () => {});
  poiL.removeEventListener('mousedown', () => {});
  queryDom('body').removeChild(CON);
  queryDom('body').removeChild(CONV);
  queryDom('body').style.overflow = 'auto';
  CON = null;
  CONV = null;
  setTimeout(() => {
    document.oncontextmenu = function () {
      return true;
    };
  }, 1000);
};

export const createStartScreenBtn = () => {
  let btn = createDom('div', 'screen_btn_float', '截屏');
  btn.addEventListener('click', () => {
    sendMessageScreenIndex();
  });
  queryDom('body').appendChild(btn);
};
