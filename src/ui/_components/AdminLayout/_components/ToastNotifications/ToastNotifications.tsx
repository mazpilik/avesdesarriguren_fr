import React, { useEffect, useRef } from 'react';
import { useRecoilValue } from 'recoil';

import { Toast } from 'primereact/toast';

import { useNotificationHook } from 'src/ui/_functions/hooks/useNotificationHook';

import { toastAtom } from 'src/ui/_functions/atoms/atoms';

export const ToastNotifications = () => {
  const notificationUtils = useNotificationHook();
  const toastContext = useRecoilValue(toastAtom);
  const toastRef = useRef<Toast>(null);

  useEffect(() => {
    if (toastContext.length > 0) {
      toastContext.forEach((toast: any) => {
        if (toastRef.current) {
          toastRef.current.show({
            severity: toast.severity,
            summary: toast.summary,
            detail: toast.detail,
          });
          notificationUtils.removeNotification(toast);
        }
      });
    }
  }, [toastContext]);

  return (
    <Toast ref={toastRef} />
  );
};
