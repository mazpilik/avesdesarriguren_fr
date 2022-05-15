import { Families } from 'src/domain/Family';

// parse families to primereact dropdown options
export const parseFamilies = (families: Families) => {
  if (families.length > 0) {
    const nParsedFamilies = families.map((family: any) => ({
      value: family.id,
      label: family.name,
    }));
    return nParsedFamilies;
  }
  return [];
};
