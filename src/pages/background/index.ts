import { listenerTagLoadingMessage } from '@/pages/background/TagsLoading';
import { listenerDataInfoMessage } from '@/pages/background/DataServices';
import { createMobileList } from '@/common/passage-certificate';

let mobiles = createMobileList();

if (process.env.NODE_ENV === 'development') {
  listenerTagLoadingMessage();
  listenerDataInfoMessage(mobiles);
}
console.log('This is the background page.');

export {};
