import "bootstrap/dist/css/bootstrap.min.css";

const products = [
  { id: 1, productName: "Ürün 1", stock: 10, isActive: true },
  { id: 2, productName: "Ürün 2", stock: 20, isActive: false },
  { id: 3, productName: "Ürün 3", stock: 30, isActive: true },
  { id: 4, productName: "Ürün 4", stock: 40, isActive: false },
  { id: 5, productName: "Ürün 5", stock: 50, isActive: true },
];

function App() {
  return (
    <>
      <div className="container">
        <Header />
        <ProductList />
      </div>
    </>
  );
}

function Header() {
  return <h1 className="text-center my-3">HEADER</h1>;
}

function ProductList() {
  return (
    <div className="row">
      {products.map((p) => (
        <Product key={p.id} product={p} />
      ))}
    </div>
  );
}

function Product(props: any) {
  return (
    <>
      <div className="col-4">
        <div className="card my-3">
          <div className="card-header">{props.product.productName}</div>
          <div className="card-body">
            <figure>
              <blockquote className="blockquote">
                <p>
                  <b>Stok: </b>
                  {props.product.stock}
                </p>
              </blockquote>
              <figcaption className="blockquote-footer">
                Durum:
                <cite title="Source Title">
                  {props.product.isActive ? (
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
            </figure>
          </div>
        </div>
      </div>
    </>
  );
}

export default App;
