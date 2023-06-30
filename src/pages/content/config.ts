import { queryEle } from '@/pages/content/tools';
import { ElementType } from '@/common/types';
import { RegUrlConfig } from '@/pages/content/component/FloatView';

export const Boss = {
  title: '.job-banner>.inner>.job-primary>.info-primary>.name>h1',
  context: '.job-box>.inner>.job-detail>.job-detail-section>.job-sec-text',
  company_name: '.job-detail>.job-detail-company>.detail-section-item .company-name',
  personnel: '.job-detail-section>.job-boss-info>.name',
  address: '.company-address>.job-location>.location-address',
};
export const CZ58 = {
  title: '.house-title>h1',
  context: '.introduce-item>li:last-child>.a2',
};
export const ESF58 = {
  title: '.props-main>.banner>.banner-title>.title',
  context: '.houseIntro-content-wrap',
  place: '.maininfo-model-item-2>.maininfo-model-strong>.maininfo-model-strong-num',
  unit: '.maininfo>.maininfo-model>.maininfo-model-item>.maininfo-model-strong',
  price: '.maininfo-price-num',
  situation: '.maininfo-model>.maininfo-model-item:nth-child(2)>.maininfo-model-weak',
};
export const ESC58 = {
  title: '.info-title',
  context: '.info-usr-desc_cont',
  mileage: '.info-meta-s>.info-meta>.info-meta_val',
};
export const ESSJ58 = {
  title: '.detail-title__name',
  context: '.description_con',
  price: '.infocard__container__item__main__text--price',
};
export const JD = {
  title: '.container>.viewad-main>.viewad-content>.viewad-header .viewad-title>h1',
};
export const TaoBao = {
  title: '.container>.viewad-main>.viewad-content>.viewad-header .viewad-title>h1',
};

export const DomTipsView = (str: string | null) => {
  let view = document.createElement('div');
  view.className = 'tipsView';
  view.textContent = str;
  return view;
};
const createInputDom = (dom: string, value?: string) => {
  let domView = document.createElement('div');
  let elements: any;
  if (dom === 'input') {
    domView.className = 'textViews';
    elements = document.createElement(dom);
    elements.className = 'textTips';
    elements.value = value;
  } else if (dom === 'textarea') {
    domView.className = 'areaViews';
    elements = document.createElement(dom);
    elements.className = 'areaTips';
    elements.textContent = value;
  }
  domView.appendChild(elements);
  return domView;
};

export const GetBossData = (data: DomParamsType): DomParamsType => {
  const { title, context, company_name, personnel, address } = data;
  let params: any = {};
  params.title = queryEle(title)?.textContent;
  params.context = queryEle(context)?.innerHTML.replaceAll('<br>', '\r');
  params.company_name = queryEle(company_name)?.textContent?.replace('公司名称', '');
  params.personnel = queryEle(personnel)?.textContent?.slice(0, 3);
  params.address = queryEle(address)?.textContent;
  return AddBossTips(data, params);
};
export const SetBossData = (): DomDataType => {
  let valList: any = document.getElementsByClassName('textTips');
  let areaList: any = document.getElementsByClassName('areaTips');
  return {
    title: valList[0]?.value,
    context: areaList[0]?.textContent,
    company_name: valList[2]?.value,
    personnel: valList[1]?.value,
    address: valList[3].value,
  };
};
export const AddBossTips = (data: any, params: any): DomParamsType => {
  const { title, context, company_name, personnel, address } = data;
  let titleInput: any = createInputDom('input', params.title);
  let titleDom: ElementType = queryEle(title);
  titleDom?.parentNode?.replaceChild(titleInput, titleDom);
  titleInput.appendChild(DomTipsView('标题'));

  let contextInput: any = createInputDom('textarea', params.context);
  let contextDom = queryEle(context);
  contextDom?.parentNode?.replaceChild(contextInput, contextDom);
  contextInput.appendChild(DomTipsView('内容'));

  let companyInput: any = createInputDom('input', params.company_name);
  let companyDom = queryEle(company_name);
  companyDom?.parentNode?.replaceChild(companyInput, companyDom);
  companyInput.appendChild(DomTipsView('公司'));

  let personnelInput: any = createInputDom('input', params.personnel);
  let personnelDom = queryEle(personnel);
  personnelDom?.parentNode?.replaceChild(personnelInput, personnelDom);
  personnelInput.appendChild(DomTipsView('联系人'));

  let addressInput: any = createInputDom('input', params.address);
  let addressDom = queryEle(address);
  addressDom?.parentNode?.replaceChild(addressInput, addressDom);
  addressInput.appendChild(DomTipsView('地址'));
  return {
    title: titleInput.value,
    textarea: contextInput.textContent,
    company_name: companyInput.value,
    personnel: personnelInput.value,
    address: addressInput.value,
  };
};

export const Get58czData = (data: DomParamsType): DomParamsType => {
  const { title, context } = data;
  let params: any = {};
  params.title = queryEle(title)?.textContent;
  params.context = queryEle(context)?.innerHTML.replaceAll('<br>', '\r');
  console.log(params, 'GetCQ58Data');
  return AddCZ58Tips(data, params);
};
export const Set58czData = (): DomDataType => {
  let valList: any = document.getElementsByClassName('textTips');
  let areaList: any = document.getElementsByClassName('areaTips');
  return {
    title: valList[0]?.value,
    context: areaList[0]?.textContent,
  };
};
export const AddCZ58Tips = (data: any, params: any): DomParamsType => {
  const { title, context } = data;
  let titleInput: any = createInputDom('input', params.title);
  let titleDom = queryEle(title);
  titleDom?.parentNode?.replaceChild(titleInput, titleDom);
  titleInput.appendChild(DomTipsView('标题'));

  let contextInput: any = createInputDom('textarea', params.context);
  let contextDom = queryEle(context);
  contextDom?.parentNode?.replaceChild(contextInput, contextDom);
  contextInput.appendChild(DomTipsView('内容'));
  return {
    title: titleInput.value,
    textarea: contextInput.textContent,
  };
};

export const Get58esfData = (data: DomParamsType): DomParamsType => {
  const { title, context, place, unit, price, situation } = data;
  let params: any = {};
  params.title = queryEle(title)?.textContent;
  params.context = queryEle(context)?.textContent;
  params.place = queryEle(place)?.textContent;
  params.unit = queryEle(unit)?.textContent;
  params.price = queryEle(price)?.textContent;
  params.situation = queryEle(situation)?.textContent;
  return AddESF58Tips(data, params);
};
export const Set58esfData = (): DomDataType => {
  let valList: any = document.getElementsByClassName('textTips');
  let areaList: any = document.getElementsByClassName('areaTips');
  return {
    title: valList[0]?.value,
    context: areaList[0]?.textContent,
    place: valList[3]?.value,
    unit: valList[2]?.value,
    price: valList[1].value,
    situation: valList[4].value,
  };
};
export const AddESF58Tips = (data: any, params: any): DomParamsType => {
  const { title, context, place, unit, price, situation } = data;
  let titleInput: any = createInputDom('input', params.title);
  let titleDom = queryEle(title);
  titleDom?.parentNode?.replaceChild(titleInput, titleDom);
  titleInput.appendChild(DomTipsView('标题'));

  let contextInput: any = createInputDom('textarea', params.context);
  let contextDom = queryEle(context);
  contextDom?.parentNode?.replaceChild(contextInput, contextDom);
  contextInput.appendChild(DomTipsView('内容'));

  let placeInput: any = createInputDom('input', params.place);
  let placeDom = queryEle(place);
  placeDom?.parentNode?.replaceChild(placeInput, placeDom);
  placeInput.appendChild(DomTipsView('面积'));

  let unitInput: any = createInputDom('input', params.unit);
  let unitDom = queryEle(unit);
  unitDom?.parentNode?.replaceChild(unitInput, unitDom);
  unitInput.appendChild(DomTipsView('规格'));

  let priceInput: any = createInputDom('input', params.price);
  let priceDom = queryEle(price);
  priceDom?.parentNode?.replaceChild(priceInput, priceDom);
  priceInput.appendChild(DomTipsView('价格'));

  let situationInput: any = createInputDom('input', params.situation);
  let situationDom = queryEle(situation);
  situationDom?.parentNode?.replaceChild(situationInput, situationDom);
  situationInput.appendChild(DomTipsView('风格'));
  return {
    title: titleInput.value,
    textarea: contextInput.textContent,
    place: placeInput.textContent,
    unit: unitInput.textContent,
    price: priceInput.textContent,
    situation: situationInput.textContent,
  };
};

export const Get58escData = (data: DomParamsType): DomParamsType => {
  const { title, context, mileage } = data;
  let params: any = {};
  params.title = queryEle(title)?.textContent;
  params.context = queryEle(context)?.textContent;
  params.mileage = queryEle(mileage)?.textContent;
  return AddESC58Tips(data, params);
};
export const Set58escData = (): DomDataType => {
  let valList: any = document.getElementsByClassName('textTips');
  let areaList: any = document.getElementsByClassName('areaTips');
  return {
    title: valList[0]?.value,
    context: areaList[0]?.textContent,
    mileage: valList[1].value,
  };
};
export const AddESC58Tips = (data: any, params: any): DomParamsType => {
  const { title, context, mileage } = data;
  let titleInput: any = createInputDom('input', params.title);
  let titleDom = queryEle(title);
  titleDom?.parentNode?.replaceChild(titleInput, titleDom);
  titleInput.appendChild(DomTipsView('标题'));

  let contextInput: any = createInputDom('textarea', params.context);
  let contextDom = queryEle(context);
  contextDom?.parentNode?.replaceChild(contextInput, contextDom);
  contextInput.appendChild(DomTipsView('内容'));

  let mileageInput: any = createInputDom('input', params.mileage);
  let mileageDom = queryEle(mileage);
  mileageDom?.parentNode?.replaceChild(mileageInput, mileageDom);
  mileageInput.appendChild(DomTipsView('里程'));
  return {
    title: titleInput.value,
    context: contextInput.textContent,
    mileage: mileageInput.textContent,
  };
};

export const Get58essjData = (data: DomParamsType): DomParamsType => {
  const { title, context, price } = data;
  let params: any = {};
  params.title = queryEle(title)?.textContent;
  params.context = queryEle(context)?.textContent;
  params.price = queryEle(price)?.textContent;
  return AddESSJ58Tips(data, params);
};
export const Set58essjData = (): DomDataType => {
  let valList: any = document.getElementsByClassName('textTips');
  let areaList: any = document.getElementsByClassName('areaTips');
  console.log(valList, 222222);
  return {
    title: valList[0]?.value,
    context: areaList[0]?.textContent,
    price: valList[1]?.value,
  };
};
export const AddESSJ58Tips = (data: any, params: any): DomParamsType => {
  const { title, context, price } = data;
  let titleInput: any = createInputDom('input', params.title);
  let titleDom = queryEle(title);
  titleDom?.parentNode?.replaceChild(titleInput, titleDom);
  titleInput.appendChild(DomTipsView('标题'));

  let contextInput: any = createInputDom('textarea', params.context);
  let contextDom = queryEle(context);
  contextDom?.parentNode?.replaceChild(contextInput, contextDom);
  contextInput.appendChild(DomTipsView('内容'));

  let str = params.price.match(/\d+/g);
  let priceInput: any = createInputDom('input', str[0]);
  let priceDom = queryEle(price);
  priceDom?.parentNode?.replaceChild(priceInput, priceDom);
  priceInput.appendChild(DomTipsView('价格'));
  return {
    title: titleInput?.value,
    context: contextInput.textContent,
    price: priceInput?.value,
  };
};

export const DomDataSheet: any = {
  'www.zhipin.com/job_detail/': () => GetBossData(Boss),
  '58.com/zufang/': () => Get58czData(CZ58),
  '58.com/ershoufang/': () => Get58esfData(ESF58),
  '58.com/ershouche/': () => Get58escData(ESC58),
  '58.com/shouji/': () => Get58essjData(ESSJ58),
  'www.jd.com': () => undefined,
  'www.taobao.com': () => undefined,
};

export const GetResultSheet: any = {
  'www.zhipin.com/job_detail/': () => SetBossData(),
  '58.com/zufang/': () => Set58czData(),
  '58.com/ershoufang/': () => Set58esfData(),
  '58.com/ershouche/': () => Set58escData(),
  '58.com/shouji/': () => Set58essjData(),
  'www.jd.com': () => undefined,
  'www.taobao.com': () => undefined,
};

export const getHostDataParams = (local: any) => {
  return GetResultSheet[RegUrlConfig(local)]();
};

type DomDataType = Record<string, Record<string, string>>;
type DomParamsType = Record<string, string>;
