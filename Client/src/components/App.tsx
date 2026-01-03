import "bootstrap/dist/css/bootstrap.min.css";
import { useEffect, useState } from "react";
import { IProduct } from "../model/IProduct";
import Header from "./Header";
import ProductList from "./ProductList";
import ButtonUsage from "./ButtonUsage";

const products = [
  { id: 1, productName: "Ürün 1", stock: 10, isActive: true },
  { id: 2, productName: "Ürün 2", stock: 20, isActive: false },
  { id: 3, productName: "Ürün 3", stock: 30, isActive: true },
  { id: 4, productName: "Ürün 4", stock: 40, isActive: false },
  { id: 5, productName: "Ürün 5", stock: 50, isActive: true },
];

function App() {
  const [products, setProducts] = useState<IProduct[]>([]);

  useEffect(() => {
    fetch("http://localhost:5047/api/Products")
      .then((response) => response.json())
      .then((data) => setProducts(data));
  }, []);
  function addProduct() {
    setProducts([
      ...products,
      {
        id: 99,
        name: "Ürün 99",
        description: "Deneme",
        price: 9999,
        stock: 90,
        isActive: true,
        imageUrl: "99.JPG",
      },
    ]);
  }
  return (
    <>
      <div className="container">
        <Header products={products} />
        <ProductList products={products} addProduct={addProduct} />
      </div>
    </>
  );
}

export default App;
