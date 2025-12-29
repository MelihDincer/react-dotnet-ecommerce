import { IProduct } from "../model/IProduct";
import Product from "./Product";

export interface Props {
  products: IProduct[];
  addProduct: () => void;
}

export default function ProductList({ products, addProduct }: Props) {
  return (
    <>
      <button className="btn btn-primary" onClick={addProduct}>
        Ürün Ekle
      </button>
      <div className="row">
        {products.map((p: IProduct) => (
          <Product key={p.id} product={p} />
        ))}
      </div>
    </>
  );
}
