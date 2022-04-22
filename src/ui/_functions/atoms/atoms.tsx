import { atom } from 'recoil';
import { User } from 'src/domain/User';

export const defUser: User = {
  name: '',
  id: 0,
  token: '',
  lang: 'es',
};

export const userAtom = atom({
  key: 'userAtom',
  default: defUser,
});

export const i18nAtom = atom({
  key: 'i18nAtom',
  default: {} as any,
});

export const toastAtom = atom({
  key: 'toastAtom',
  default: [] as any,
});
