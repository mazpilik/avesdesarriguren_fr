import { IOrder } from 'src/domain/Order';

export interface IGetOrderById {
  page: number;
  limit: number;
  sortBy: string;
  sortDirection: string;
  where: string;
}

export const orderService = {
  getAllOrders: async () => {
    const response = await fetch(`${process.env.REACT_APP_API_URL}/orders`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });
    if (response.status === 200) {
      const orders = await response.json();
      return orders;
    }
    return [];
  },
  getOrdersBy: async (opts:IGetOrderById) => {
    const {
      page, limit, sortBy, sortDirection, where,
    } = opts;
    const response = await fetch(
      `${process.env.REACT_APP_API_URL}/orders/sorted/${page}/${limit}/${sortBy}/${sortDirection}${where !== '' ? `/${where}` : ''}`,
      {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      },
    );
    if (response.status === 200) {
      const orders = await response.json();
      return orders;
    }
    return [];
  },
  getOrder: async (id: string) => {
    const response = await fetch(`${process.env.REACT_APP_API_URL}/orders/${id}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${localStorage.getItem('token')}`,
      },
    });
    if (response.status === 200) {
      const order = await response.json();
      return order;
    }
    return [];
  },
  createOrder: async (order: IOrder, token:string) => {
    const response = await fetch(`${process.env.REACT_APP_API_URL}/orders`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(order),
    });
    return response;
  },
  updateOrder: async (order: IOrder, token:string) => {
    const response = await fetch(`${process.env.REACT_APP_API_URL}/orders/${order.id}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}}`,
      },
      body: JSON.stringify(order),
    });
    if (response.status === 200) {
      const updatedOrder = await response.json();
      return updatedOrder;
    }
    return [];
  },
  getTotalRecords: async (where = '') => {
    const response = await fetch(`${process.env.REACT_APP_API_URL}/orders/number${where !== '' ? `/${where}` : ''}`, {
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
  findOrdersByName: async (name: string) => {
    const response = await fetch(`${process.env.REACT_APP_API_URL}/orders/find/${name}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });
    if (response.status === 200) {
      const orders = await response.json();
      return orders;
    }
    return [];
  },
  deleteRecord: async (id: number, token:string) => {
    const response = await fetch(`${process.env.REACT_APP_API_URL}/orders/${id}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
    });
    if (response.status === 200) {
      const deletedOrder = await response.json();
      return deletedOrder;
    }
    return [];
  },
};
