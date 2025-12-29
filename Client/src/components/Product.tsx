import { IProduct } from "../model/IProduct";

export interface Props {
  product: IProduct;
}

export default function Product({ product }: Props) {
  return (
    <>
      <div className="col-4">
        <div className="card my-3">
          <div className="card-header">{product.name}</div>
          <div className="card-body">
            <figure>
              <blockquote className="blockquote">
                <p>
                  <b>Stok: </b>
                  {product.stock}
                </p>
              </blockquote>
              <figcaption className="blockquote-footer">
                Durum:
                <cite title="Source Title">
                  {product.isActive ? (
                    <span className="badge rounded-pill text-bg-success">
                      Stokta
                    </span>
                  ) : (
                    <span className="badge rounded-pill text-bg-danger">
                      Stokta Yok
                    </span>
                  )}
                </cite>
              </figcaption>
              <figcaption className="blockquote-footer">
                Fiyat:
                <cite title="Source Title">
                  {product.price > 70000 ? (
                    <span className="badge rounded-pill text-bg-danger">
                      {product.price}
                    </span>
                  ) : (
                    <span className="badge rounded-pill text-bg-success">
                      {product.price}
                    </span>
                  )}
                </cite>
              </figcaption>
            </figure>
          </div>
        </div>
      </div>
    </>
  );
}
