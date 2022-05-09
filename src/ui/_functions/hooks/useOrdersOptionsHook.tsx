import { useEffect, useState } from 'react';

import { orderService } from 'src/services/orderService';

export const useOrdersOptionsHook = () => {
  // set hook states
  const [parsedOrders, setParsedOrders] = useState([] as any);
  const [orders, setOrders] = useState([] as any);

  // fetch orders from database
  const fetchOrders = async () => {
    try {
      const response = await orderService.getAllOrders();
      setOrders(response);
    } catch (error) {
      console.log(error);
    }
    return [];
  };

  // parse orders to be dropdown options
  const parseOrders = () => {
    // parse order
    if (orders.length > 0) {
      const nParsedOrders = orders.map((order: any) => ({
        value: order.id,
        label: order.name,
      }));
      setParsedOrders(nParsedOrders);
    }
  };

  // useEffect to fetch orders as it loads
  useEffect(() => {
    fetchOrders();
  }, []);

  // useEffect to parse orders when orders changes
  useEffect(() => {
    parseOrders();
  }, [orders]);

  // return hook state value
  return parsedOrders;
};
