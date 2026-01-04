import { CircularProgress, Typography, Box } from "@mui/material";
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

  return <Typography variant="h2">{product.name}</Typography>;
}
