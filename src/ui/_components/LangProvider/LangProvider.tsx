import React, { FC, useEffect } from 'react';
import { useRecoilValue, useSetRecoilState } from 'recoil';

import { userAtom, i18nAtom } from 'src/ui/_functions/atoms/atoms';

import { langService } from 'src/services/langService';

export const LangProvider: FC = ({ children }) => {
  const user = useRecoilValue(userAtom);
  const setI18n = useSetRecoilState(i18nAtom);

  const setLang = () => {
    setI18n(langService.getLang(user.lang));
  };

  useEffect(() => {
    setLang();
  }, [user.lang]);

  return (
    // eslint-disable-next-line react/jsx-no-useless-fragment
    <>{children}</>
  );
};
