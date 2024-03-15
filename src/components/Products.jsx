import React, { useEffect, useState } from "react";
import {
  Card,
  CardContent,
  Typography,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Grid,
  Stack,
} from "@mui/material";
import axios from "axios";

const Products = () => {
  const [products, setProducts] = useState([]);
  const [openDialog, setOpenDialog] = useState(false);
  const [formData, setFormData] = useState({
    title: "",
    category: "",
    price: "",
    qty: "",
  });
  const [selectedProductId, setSelectedProductId] = useState(null);

  const handleAddProduct = async () => {
    try {
      const res = await axios.post("http://localhost:8000/products", formData);
      console.log("post res", res);
      if (res.status === 201) {
        setOpenDialog(false);
        getProducts();
      }
    } catch (err) {
      console.log(err);
    }
  };

  const handleDeleteProduct = async (productId) => {
    const res = await axios.delete(
      `http://localhost:8000/products/${productId}`
    );
    getProducts();
  };

  const handleChange = (e) => {
    if (e.target.name === "qty") {
      setFormData({ ...formData, [e.target.name]: parseInt(e.target.value) });
    } else {
      setFormData({ ...formData, [e.target.name]: e.target.value });
    }
  };

  const handleEdit = (productId) => {
    const selectedProduct = products.find(
      (product) => product.id === productId
    );
    setFormData({
      ...selectedProduct,
      title: selectedProduct.title,
      category: selectedProduct.category,
      price: selectedProduct.price,
      qty: selectedProduct.qty,
    });
    setSelectedProductId(productId);
    setOpenDialog(true);
  };

  const handleUpdateProduct = async () => {
    try {
      const res = await axios.put(
        `http://localhost:8000/products/${selectedProductId}`,
        formData
      );
      console.log("put res", res);
      if (res.status === 200) {
        setOpenDialog(false);
        getProducts();
      }
    } catch (err) {
      console.log(err);
    }
  };

  const getProducts = async () => {
    try {
      const res = await axios.get("http://localhost:8000/products");
      setProducts(res.data);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    getProducts();
  }, []);

  return (
    <div style={{ padding: "10px" }}>
      <Stack direction="row" justifyContent="space-between" alignItems="center">
        <Typography pt="30px" variant="h4" gutterBottom>
          Products Management
        </Typography>
        <Button
          sx={{ height: "2.4rem" }}
          size="small"
          variant="contained"
          color="primary"
          onClick={() => setOpenDialog(true)}
        >
          Add Product
        </Button>
      </Stack>
      <Grid container spacing={3}>
        {products.map((product) => (
          <Grid item xs={12} sm={6} md={4} key={product.id}>
            <Card>
              <CardContent>
                <Typography variant="body1" gutterBottom>
                  <span style={{ fontWeight: "bold" }}>Category:</span>{" "}
                  {product.category}
                </Typography>
                <Typography variant="body1" gutterBottom>
                  <span style={{ fontWeight: "bold" }}>Price:</span> $
                  {product.price}
                </Typography>
                <Typography variant="body1" gutterBottom>
                  <span style={{ fontWeight: "bold" }}>Stock Quantity:</span>{" "}
                  {product.qty}
                </Typography>
                <Stack direction="row" spacing={1}>
                  <Button
                    variant="outlined"
                    color="primary"
                    onClick={() => handleEdit(product.id)}
                  >
                    Edit
                  </Button>
                  <Button
                    variant="outlined"
                    color="primary"
                    onClick={() => handleDeleteProduct(product.id)}
                  >
                    Delete
                  </Button>
                </Stack>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>

      <Dialog open={openDialog} onClose={() => setOpenDialog(false)}>
        <DialogTitle>
          {selectedProductId ? "Edit Product" : "Add Product"}
        </DialogTitle>
        <DialogContent>
          <TextField
            label="Name"
            name="title"
            value={formData.title}
            onChange={handleChange}
            fullWidth
            margin="normal"
          />
          <TextField
            label="Category"
            name="category"
            value={formData.category}
            onChange={handleChange}
            fullWidth
            margin="normal"
          />
          <TextField
            label="Price"
            name="price"
            value={formData.price}
            onChange={handleChange}
            type="number"
            fullWidth
            margin="normal"
          />
          <TextField
            label="Stock Quantity"
            name="qty"
            value={formData.qty}
            onChange={handleChange}
            type="number"
            fullWidth
            margin="normal"
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenDialog(false)}>Cancel</Button>
          {selectedProductId ? (
            <Button onClick={handleUpdateProduct} color="primary">
              Update
            </Button>
          ) : (
            <Button onClick={handleAddProduct} color="primary">
              Add
            </Button>
          )}
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default Products;
