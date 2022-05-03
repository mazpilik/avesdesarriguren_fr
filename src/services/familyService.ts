import { IFamily } from 'src/domain/Family';

export interface IGetFamilyById {
  page: number;
  limit: number;
  sortBy: string;
  sortDirection: string;
  where: string;
}

export const familyService = {
  getAllFamilys: async () => {
    const response = await fetch(`${process.env.REACT_APP_API_URL}/family/all`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });
    if (response.status === 200) {
      const family = await response.json();
      return family;
    }
    return [];
  },
  getFamilysBy: async (opts:IGetFamilyById) => {
    const {
      page, limit, sortBy, sortDirection, where,
    } = opts;
    const response = await fetch(
      `${process.env.REACT_APP_API_URL}/family/sorted/${page}/${limit}/${sortBy}/${sortDirection}${where !== '' ? `/${where}` : ''}`,
      {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      },
    );
    if (response.status === 200) {
      const family = await response.json();
      return family;
    }
    return [];
  },
  getFamily: async (id: string) => {
    const response = await fetch(`${process.env.REACT_APP_API_URL}/family/${id}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${localStorage.getItem('token')}`,
      },
    });
    if (response.status === 200) {
      const family = await response.json();
      return family;
    }
    return {};
  },
  createFamily: async (family: IFamily, token:string) => {
    const response = await fetch(`${process.env.REACT_APP_API_URL}/family`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(family),
    });
    return response;
  },
  updateFamily: async (family: IFamily, token:string) => {
    const sFamily = {
      orderId: family.orderId,
      name: family.name,
    };
    const response = await fetch(`${process.env.REACT_APP_API_URL}/family/${family.id}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(sFamily),
    });
    if (response.status === 200) {
      const updatedFamily = await response.json();
      return updatedFamily;
    }
    return [];
  },
  getTotalRecords: async (where = '') => {
    const response = await fetch(`${process.env.REACT_APP_API_URL}/family/number${where !== '' ? `/${where}` : ''}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });
    if (response.status === 200) {
      const orderNumber = await response.json();
      return orderNumber;
    }
    return [];
  },
  findFamilysByName: async (name: string) => {
    const response = await fetch(`${process.env.REACT_APP_API_URL}/family/find/${name}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });
    if (response.status === 200) {
      const family = await response.json();
      return family;
    }
    return [];
  },
  deleteRecord: async (id: number, token:string) => {
    const response = await fetch(`${process.env.REACT_APP_API_URL}/family/${id}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
    });
    if (response.status === 200) {
      const deletedFamily = await response.json();
      return deletedFamily;
    }
    return [];
  },
};
