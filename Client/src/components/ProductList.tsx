import { Button } from "@mui/material";
import { IProduct } from "../model/IProduct";
import Product from "./Product";

export interface Props {
  products: IProduct[];
  addProduct: () => void;
}

export default function ProductList({ products, addProduct }: Props) {
  return (
    <>
      <Button variant="contained" onClick={addProduct}>
        Ürün Ekle
      </Button>

      <div className="row">
        {products.map((p: IProduct) => (
          <Product key={p.id} product={p} />
        ))}
      </div>
    </>
  );
}
