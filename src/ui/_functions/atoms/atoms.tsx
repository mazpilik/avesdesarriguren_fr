import { atom } from 'recoil';
import { User } from 'src/domain/User';

export const defUser: User = {
  name: '',
  id: 0,
  token: '',
};

export const userAtom = atom({
  key: 'userAtom',
  default: defUser,
});
