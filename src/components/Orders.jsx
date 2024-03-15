import React, { useEffect, useState } from "react";
import {
  Typography,
  Table,
  TableContainer,
  TableHead,
  TableBody,
  TableRow,
  TableCell,
  Button,
} from "@mui/material";
import axios from "axios";

const Orders = () => {
  const [orders, setOrders] = useState([]);

  const handleDeleteOrder = async (id) => {
    const res = await axios.delete(`http://localhost:8000/orders/${id}`);
    getOrders();
  };

  const getOrders = async () => {
    try {
      const res = await axios.get("http://localhost:8000/orders");
      setOrders(res.data);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    getOrders();
  }, []);

  return (
    <div>
      <Typography pt="30px" variant="h4" gutterBottom>
        Orders Management
      </Typography>

      <TableContainer>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Order ID</TableCell>
              <TableCell>Customer Name</TableCell>
              <TableCell>Order Date</TableCell>
              <TableCell>Status</TableCell>
              <TableCell>Action</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {orders.map((order) => (
              <TableRow key={order.orderId}>
                <TableCell>{order.orderId}</TableCell>
                <TableCell>{order.customer_name}</TableCell>
                <TableCell>{order.order_date}</TableCell>
                <TableCell>{order.status}</TableCell>
                <TableCell>
                  <Button
                    onClick={() => {
                      handleDeleteOrder(order.id);
                    }}
                  >
                    Delete
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
};

export default Orders;
