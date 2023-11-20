// addEventListener('fetch', (event: any) => {
//   event.respondWith(handleRequest(event.request));
// });
//
// export const handleRequest = async (request: any) => {
//   const cookieRequest = new Request(request, {
//     headers: {
//       Cookie: 'PHPSESSID=r8m3m03qh28sfhf14dcomna1lv; sidebarStatus=1',
//     },
//   });
//   return await fetch(cookieRequest);
// };

export const FetchApi = ({ url, method, data, type }: FetchType) => {
  return new Promise((resolve) => {
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
    fetch(url, option).then((res) => {
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

export const UploadFiles = async (files: any, blob: any) => {
  console.log(blob, 'logs');
  // multipart/form-data
  // application/x-www-form-urlencoded
  // multipart/form-data
  let formData = new FormData();
  formData.append('file', blob);
  fetch('http://www.scicp15.com/files/api/upload/module/index/file/file/field/thumb/cid/72', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
    },
    body: formData,
    credentials: 'include',
  })
    .then((response) => response.json())
    .then((data) => {
      // 处理上传成功后的响应
      console.log('上传成功:', data);
    })
    .catch((error) => {
      // 处理上传失败的情况
      console.error('上传失败:', error);
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
