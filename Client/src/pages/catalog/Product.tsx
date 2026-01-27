import {
  Button,
  Card,
  CardActions,
  CardContent,
  CardMedia,
  Typography,
} from "@mui/material";
import { IProduct } from "../../model/IProduct";
import SearchIcon from "@mui/icons-material/Search";
import { AddShoppingCart } from "@mui/icons-material";
import { Link } from "react-router";
import { useState } from "react";
import requests from "../../api/requests";
import Stack from "@mui/material/Stack";

export interface Props {
  product: IProduct;
}

export default function Product({ product }: Props) {
  const [loading, setLoading] = useState(false);

  function handleAddItem(productId: number) {
    setLoading(true);
    requests.Cart.addItem(productId)
      .then((cart) => console.log(cart))
      .catch((error) => console.log(error))
      .finally(() => setLoading(false));
  }

  return (
    <Card>
      <CardMedia
        image={`http://localhost:5047/images/${product.imageUrl}`}
        sx={{ height: 180, backgroundSize: "contain" }}
      />
      <CardContent>
        <Typography
          gutterBottom
          variant="h6"
          component="h2"
          color="text-secondary"
        >
          {product.name}
        </Typography>
        <Typography variant="body2" color="secondary">
          {(product.price / 100).toFixed()} ₺
        </Typography>
      </CardContent>
      <CardActions>
        <Button
          size="small"
          variant="outlined"
          startIcon={<AddShoppingCart />}
          color="success"
          loading={loading}
          loadingPosition="start"
          onClick={() => handleAddItem(product.id)}
        >
          Add To Cart
        </Button>
        <Button
          component={Link}
          to={`/catalog/${product.id}`}
          size="small"
          variant="outlined"
          startIcon={<SearchIcon />}
          color="primary"
        >
          View
        </Button>
      </CardActions>
    </Card>
  );
}
