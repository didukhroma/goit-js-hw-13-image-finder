import '@pnotify/core/dist/BrightTheme.css';
import { error, success, defaultStack } from '@pnotify/core/dist/PNotify.js';
function pnotifyError(string) {
  return error({
    title: string,
    text: 'Please enter a more specific name!!!',
    icon: false,
    hide: false,
    closer: true,
    sticker: false,
    destroy: true,
    delay: 1000,
  });
}
function pnotifySuccess() {
  return success({
    title: 'Desktop Success',
    text: 'All done! Come back to my tab!',
    hide: false,
  });
}

function closeAllNotice() {
  return defaultStack.close();
}
export default { pnotifyError, closeAllNotice, pnotifySuccess };
