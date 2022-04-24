import { useRecoilState, useRecoilValue } from 'recoil';

import { toastAtom, i18nAtom } from '../atoms/atoms';

export const useNotificationHook = () => {
  const [toastContext, setToastContext] = useRecoilState(toastAtom);
  const i18n = useRecoilValue(i18nAtom);
  return {
    addNotification: (notification: any) => {
      setToastContext([...toastContext, notification]);
    },
    addSuccessNotification: (message: string) => {
      setToastContext([...toastContext, {
        severity: 'success',
        summary: i18n.success,
        detail: message,
      }]);
    },
    addErrorNotification: (message: string) => {
      setToastContext([...toastContext, {
        severity: 'error',
        summary: i18n.error,
        detail: message,
      }]);
    },
    addInfoNotification: (message: string) => {
      setToastContext([...toastContext, {
        severity: 'info',
        summary: i18n.info,
        detail: message,
      }]);
    },
    removeNotification: (notification: any) => {
      const newToastContext = toastContext.filter(
        (toastObject: any) => toastObject.id !== notification.id,
      );
      setToastContext(newToastContext);
    },
  };
};
