import {
  CircularProgress,
  Typography,
  Box,
  Grid,
  TableContainer,
  Table,
  TableRow,
  TableCell,
  Stack,
  Divider,
} from "@mui/material";
import SearchOffIcon from "@mui/icons-material/SearchOff";
import { useEffect, useState } from "react";
import { useParams } from "react-router";
import { IProduct } from "../../model/IProduct";
import requests from "../../api/requests";
import { LoadingButton } from "@mui/lab";
import { AddShoppingCart } from "@mui/icons-material";
import { useCartContext } from "../../context/CartContext";
import { toast } from "react-toastify";
import { currencyTRY } from "../../utils/formatCurrency";

export default function ProductDetails() {
  const { cart, setCart } = useCartContext();
  const { id } = useParams<{ id: string }>();
  const [product, setProduct] = useState<IProduct | null>(null);
  const [loading, setLoading] = useState(true);
  const [isAdded, setIsAdded] = useState(false);

  const item = cart?.cartItems.find((i) => i.productId == product?.id);

  useEffect(() => {
    requests.Catalog.details(Number(id))
      .then((data) => setProduct(data))
      .catch((error) => console.log(error))
      .finally(() => setLoading(false));
  }, [id]); //sadece id değiştiğinde fetch request yapılacak.

  function handleAddItem(id: number) {
    setIsAdded(true);
    requests.Cart.addItem(id)
      .then((cart) => {
        setCart(cart);
        toast.success("Sepetinize eklendi.");
      })
      .catch((error) => console.log(error))
      .finally(() => setIsAdded(false));
  }

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
        <Divider sx={{ mb: 2 }} />
        <Typography variant="h4" color="secondary">
          {currencyTRY.format(product.price)}
        </Typography>
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
        <Stack direction="row" spacing={2} sx={{ mt: 3 }} alignItems="center">
          <LoadingButton
            variant="outlined"
            loadingPosition="start"
            startIcon={<AddShoppingCart />}
            loading={isAdded}
            onClick={() => handleAddItem(product.id)}
          >
            Sepete Ekle
          </LoadingButton>
          {item?.quantity! > 0 && (
            <Typography variant="body2">
              Sepetinize {item?.quantity} adet eklendi.
            </Typography>
          )}
        </Stack>
      </Grid>
    </Grid>
  );
}
