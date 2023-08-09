export const FetchApi = ({ url, method, data, type }: FetchType) => {
  return new Promise((resolve, reject) => {
    let contentType = 'application/json';
    if (type === 'form') {
      contentType = 'application/x-www-form-urlencoded';
    }
    const option: any = {
      method,
      mode: 'cors',
      headers: {
        'Content-Type': contentType,
      },
      body: JSON.stringify(data),
    };
    fetch(link, option).then((res) => {
      switch (res.status) {
        case 200:
          res.text().then((result: any) => {
            let resultData = JSON.parse(result);
            if (result.code === 200) {
              return resolve({ data: resultData.data });
            } else {
              return resolve({ data: resultData.data });
            }
          });
          break;
        default:
          return resolve(res);
      }
    });
  });
};

export const PostAPI = async (params: FetchType) => {
  return await FetchApi({ ...params, method: 'POST' });
};

export const GetAPI = async (params: FetchType) => {
  return await FetchApi({ ...params, method: 'GET' });
};

export type FetchType = {
  url: string;
  data?: any;
  method?: any;
  type?: string;
};
