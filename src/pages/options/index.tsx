import React from 'react';
import ReactDOM from 'react-dom/client';

import Options from './Options';
import './index.scss';
import { dataList, configList } from './config';

let params = {
  dataList,
  configList,
};
const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement);
root.render(
  <React.StrictMode>
    <Options {...params} />
  </React.StrictMode>
);
