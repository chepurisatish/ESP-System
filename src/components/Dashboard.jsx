import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Card, CardContent, Typography, Button, Grid } from "@mui/material";
import axios from "axios";

const Dashboard = () => {
  const [products, setProducts] = useState([]);
  const [qty, setQty] = useState("");
  const [orders, setOrders] = useState([]);
  const [orderQty, setOrderQty] = useState("");

  const getProducts = async () => {
    try {
      const res = await axios.get("http://localhost:8000/products");
      setProducts(res.data);
      const quantity = res.data.reduce((acc, cv) => acc + cv.qty, 0);
      console.log("qty", quantity);
      setQty(quantity);
    } catch (err) {
      console.log(err);
    }
  };
  const getOrders = async () => {
    try {
      const res = await axios.get("http://localhost:8000/orders");
      setOrders(res.data);
      const orderQty = res.data.length;
      console.log("qty", orderQty);
      setOrderQty(orderQty);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    getProducts();
    getOrders();
  }, []);

  return (
    <div style={{ height: "100vh", padding: "10px", paddingTop: "30px" }}>
      <Grid container spacing={3}>
        <Grid item xs={12} md={6}>
          <Card>
            <CardContent>
              <Typography variant="h5" component="h2" gutterBottom>
                Total Products
              </Typography>
              <Typography variant="h3">{qty}</Typography>
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={12} md={6}>
          <Card>
            <CardContent>
              <Typography variant="h5" component="h2" gutterBottom>
                Total Orders
              </Typography>
              <Typography variant="h3">{orderQty}</Typography>
            </CardContent>
          </Card>
        </Grid>
      </Grid>

      <div style={{ marginTop: "20px" }}>
        <Button
          variant="contained"
          color="primary"
          component={Link}
          to="/products"
        >
          Manage Products
        </Button>
        <Button
          variant="contained"
          color="primary"
          component={Link}
          to="/orders"
          style={{ marginLeft: "10px" }}
        >
          Manage Orders
        </Button>
      </div>
    </div>
  );
};

export default Dashboard;
