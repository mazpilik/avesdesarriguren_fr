import { useRecoilState } from 'recoil';

import { toastAtom } from '../atoms/atoms';

export const useNotificationHook = () => {
  const [toastContext, setToastContext] = useRecoilState(toastAtom);
  return {
    addNotification: (notification: any) => {
      setToastContext([...toastContext, notification]);
    },
    removeNotification: (notification: any) => {
      const newToastContext = toastContext.filter(
        (toastObject: any) => toastObject.id !== notification.id,
      );
      setToastContext(newToastContext);
    },
  };
};
