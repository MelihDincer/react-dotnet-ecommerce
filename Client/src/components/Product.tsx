import {
  Button,
  Card,
  CardActions,
  CardContent,
  CardMedia,
  Typography,
} from "@mui/material";
import { IProduct } from "../model/IProduct";
import SearchIcon from "@mui/icons-material/Search";
import { AddShoppingCart } from "@mui/icons-material";

export interface Props {
  product: IProduct;
}

export default function Product({ product }: Props) {
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
        >
          Add To Cart
        </Button>
        <Button
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
