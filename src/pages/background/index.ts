import { listenerTagLoadingMessage } from '@/pages/background/TagsLoading';
import { createMobileList } from '@/common/passage-certificate';

if (process.env.NODE_ENV === 'development') {
  listenerTagLoadingMessage();
  // listenerDataInfoMessage(mobiles);
}
console.log('This is the background page.');

export {};
