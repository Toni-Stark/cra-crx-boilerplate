import { data_maps } from '@/assets/js/map';
import { Random } from '@/pages/content/tools';

export const PathUrl = [
  'www.zhipin.com',
  'jn.58.com',
  '58.com',
  'www.jd.com',
  'www.taobao.com',
  'baixing.com',
];

// 常规网页验证
const httpReg = '^/((http|https)://)?([a-zA-Z0-9]{0,5}).([a-zA-Z0-9])*(.com|.cn|/)/';
export const pathUrlReg = (url: string) => {
  let isTrue = false;
  PathUrl.map((item) => {
    if (url.indexOf(item) > 0) {
      isTrue = true;
    }
    if (url.match(httpReg)) {
      isTrue = true;
    }
    return item;
  });
  return isTrue;
};

export const createMobileList = () => {
  function getMobile() {
    const prefixArray = ['130', '131', '132', '133', '135', '137', '138', '170', '187', '189'];
    const i = parseInt(String(10 * Math.random()));
    let prefix = prefixArray[i];
    for (let j = 0; j < 8; j++) {
      prefix = prefix + Math.floor(Math.random() * 10);
    }
    return prefix;
  }
  let list = [];
  for (let i = 0; i < 300; i++) {
    list.push(getMobile());
  }
  return Array.from(new Set(list));
};

export const createPeopleNameList = () => {
  let NAMES =
    '尹黎易常武莫贺赖龚文顾侯邵孟龙万段漕钱汤郝孔白崔康毛邱秦江史范方石姚谭廖邹熊金陆余潘杜戴夏钟汪田任姜苏卢蒋蔡贾丁魏薛叶阎程曹袁邓许傅沈曾彭吕梁宋郑谢韩唐冯于董萧徐孙胡朱高林何郭马罗王李刘陈杨赵黄周吴公';
  let NICK_NAME = ['先生', '女士'];
  let nameIndex = Math.floor(Math.random() * 99.9);
  let nickIndex = Math.floor(Math.random() * 1.99);
  return NAMES.substring(nameIndex, nameIndex + 1) + NICK_NAME[nickIndex];
};

export const getTranslateAddress = (str: string) => {
  const getData = (obj: any) => {
    let arr = Object.keys(obj.c);
    let num = Math.floor(Math.random() * (arr.length - 0.1));
    return obj.c[arr[num]];
  };
  const getLast = () => {
    let arr1 = ['栋', '幢'];
    let arr2 = ['区'];
    let arr3 = ['A', 'B', 'C', 'D'];
    let arr4 = ['层', '楼'];
    let arr5 = ['号'];
    let arr6 = ['东', '南', '西', '北'];
    let bool = Math.floor(Math.random() * 2);
    let str = '';
    if (bool) {
      let b = Math.floor(Math.random() * 2);
      str =
        arr6[Random(arr6.length)] +
        '面' +
        Random(30, true) +
        arr1[b] +
        Random(28, true) +
        '-' +
        Random(12, true);
    } else {
      str =
        arr3[Random(arr3.length)] +
        Random(10, true) +
        arr2[Random(arr2.length)] +
        Random(20, true) +
        arr5[Random(arr5.length)] +
        Random(18, true) +
        arr4[Random(arr4.length)];
    }
    return str;
  };
  const getCoin = (regStr: any) => {
    let r = regStr.slice(-1, regStr.length);
    let po = getLast();
    if (
      [
        '街',
        '路',
        '道',
        '园',
        '港',
        '湾',
        '岗',
        '口',
        '桥',
        '沟',
        '门',
        '碑',
        '村',
        '店',
        '坎',
        '镇',
      ].includes(r)
    ) {
      return po;
    }
    if (
      ['溪', '湖', '江', '坝', '埂', '塘', '寺', '滩', '河', '铺', '驿', '石', '梁'].includes(r)
    ) {
      return '街道' + po;
    }
    if (['堰', '泉'].includes(r)) {
      return '古镇' + po;
    }
    if (['塔', '山', '峡'].includes(r)) {
      return '风景区' + po;
    }
    return '镇' + po;
  };
  let data: any;
  function getMapsIndex(list: any): any {
    let arrIndex;
    arrIndex = list[Math.floor(Math.random() * (list.length - 0.1))];
    return data_maps[arrIndex];
  }
  if (['四川', '成都'].includes(str)) {
    data = getMapsIndex([5101]);
  }
  if (['重庆'].includes(str)) {
    data = getMapsIndex([5001]);
  }
  if (['山东', '济南', '淄博', '青岛'].includes(str)) {
    data = getMapsIndex([3701, 3702, 3703]);
  }
  if (['贵州', '贵阳', '遵义'].includes(str)) {
    data = getMapsIndex([5201, 5203]);
  }
  if (['湖北', '武汉', '襄阳'].includes(str)) {
    data = getMapsIndex([5201, 5203]);
  }
  if (['天津'].includes(str)) {
    data = getMapsIndex([1201]);
  }
  if (['湖南', '岳阳', '长沙', '衡阳', '邵阳'].includes(str)) {
    data = getMapsIndex([4306, 4301, 4304, 4305]);
  }
  if (['内蒙古', '包头', '呼和浩特'].includes(str)) {
    data = getMapsIndex([1501, 1502]);
  }
  if (['辽宁', '沈阳', '大连'].includes(str)) {
    data = getMapsIndex([2101, 2102]);
  }
  if (['广西', '南宁'].includes(str)) {
    data = getMapsIndex([4501, 4501]);
  }
  let distinguish = getData(data);

  let county = getData(distinguish);
  let coin = getCoin(county.n);

  return str + '市' + distinguish.n + '区' + county.n + coin;
};

export function trimSpecial(str: string) {
  if (str !== '') {
    // const pattern =
    //     /[\.`~!@#$^\-&*()=|{}':;',\\\[\]<>\/?~！@#￥……&*（）——|{}【】'；：""'。，、？\s]/g;
    const pattern = /([`~#$^lt&ns*()=|{};,\\[\]bp<>/！…【】；？])|((展开更多))/g;
    str = str.replace(pattern, '');
  }
  return str;
}
