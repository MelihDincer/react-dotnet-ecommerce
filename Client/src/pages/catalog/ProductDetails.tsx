import {
  CircularProgress,
  Typography,
  Box,
  Grid,
  TableContainer,
  Table,
  TableRow,
  TableCell,
} from "@mui/material";
import SearchOffIcon from "@mui/icons-material/SearchOff";
import { useEffect, useState } from "react";
import { useParams } from "react-router";
import { IProduct } from "../../model/IProduct";

export default function ProductDetails() {
  const { id } = useParams();
  const [product, setProduct] = useState<IProduct | null>(null);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    fetch(`http://localhost:5047/api/Products/${id}`)
      .then((response) => response.json())
      .then((data) => setProduct(data))
      .catch((error) => console.log(error))
      .finally(() => setLoading(false));
  }, [id]); //sadece id değiştiğinde fetch request yapılacak.

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
  if (!product)
    return (
      <Box
        textAlign="center"
        mt={6}
        display="flex"
        flexDirection="column"
        alignItems="center"
      >
        <SearchOffIcon sx={{ fontSize: 80, color: "text.disabled", mb: 2 }} />
        <Typography variant="h5" fontWeight={600}>
          Ürün Bulunamadı
        </Typography>
        <Typography variant="body1" color="text.secondary" mt={1}>
          Aradığınız ürün mevcut değil ya da kaldırılmış olabilir.
        </Typography>
      </Box>
    );
  if (!product) return <h5>Product not found...</h5>;

  return (
    <Grid container spacing={2}>
      <Grid size={{ xl: 3, lg: 4, md: 5, sm: 6, xs: 12 }}>
        <img
          src={`http://localhost:5047/images/${product.imageUrl}`}
          style={{ width: "100%" }}
        />
      </Grid>
      <Grid size={{ xl: 9, lg: 8, md: 7, sm: 6, xs: 12 }}>
        <Typography variant="h3"> {product.name}</Typography>

        <TableContainer>
          <Table>
            <TableRow>
              <TableCell>Name</TableCell>
              <TableCell>{product.name}</TableCell>
            </TableRow>
            <TableRow>
              <TableCell>Description</TableCell>
              <TableCell>{product.description}</TableCell>
            </TableRow>
            <TableRow>
              <TableCell>Stock</TableCell>
              <TableCell>{product.stock}</TableCell>
            </TableRow>
          </Table>
        </TableContainer>
      </Grid>
    </Grid>
  );
}
