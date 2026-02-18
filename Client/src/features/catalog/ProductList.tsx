import { Grid } from "@mui/material";
import { IProduct } from "../../model/IProduct";
import Product from "./Product";

export interface Props {
  products: IProduct[];
}

export default function ProductList({ products }: Props) {
  return (
    <Grid container rowSpacing={3} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
      {products.map((p: IProduct) => (
        <Grid key={p.id} size={{ xs: 6, md: 4, lg: 3 }}>
          <Product key={p.id} product={p} />
        </Grid>
      ))}
    </Grid>
  );
}
