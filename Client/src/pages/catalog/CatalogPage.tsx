import { useEffect, useState } from "react";
import { IProduct } from "../../model/IProduct";
import ProductList from "./ProductList";
import { Box, CircularProgress } from "@mui/material";

export default function CatalogPage() {
  const [products, setProducts] = useState<IProduct[]>([]);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    fetch("http://localhost:5047/api/Products")
      .then((response) => response.json())
      .then((data) => setProducts(data))
      .finally(() => setLoading(false));
  }, []);
  if (loading)
    return (
      <Box
        display="flex"
        justifyContent="center"
        alignItems="center"
        height="50vh"
      >
        <CircularProgress size={40} />
      </Box>
    );
  return <ProductList products={products} />;
}
