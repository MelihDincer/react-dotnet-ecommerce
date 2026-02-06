import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { IconButton } from "@mui/material";
import { Delete } from "@mui/icons-material";
import { useCartContext } from "../../context/CartContext";

export default function ShoppingCartPage() {
  const { cart } = useCartContext();

  if (!cart) return <h1>Sepetinizde ürün yok!</h1>;

  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell></TableCell>
            <TableCell></TableCell>
            <TableCell align="right">Fiyat</TableCell>
            <TableCell align="right">Adet</TableCell>
            <TableCell align="right">Toplam</TableCell>
            <TableCell align="right"></TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {cart.cartItems.map((item) => (
            <TableRow
              key={item.productId}
              sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
            >
              <TableCell component="th" scope="row">
                <img
                  src={`http://localhost:5047/images/${item.imageUrl}`}
                  style={{ height: 80 }}
                />
              </TableCell>
              <TableCell component="th" scope="row">
                {item.name}
              </TableCell>
              <TableCell align="right">{item.price}₺</TableCell>
              <TableCell align="right">{item.quantity}</TableCell>
              <TableCell align="right">{item.price * item.quantity}₺</TableCell>
              <TableCell align="right">
                <IconButton color="error">
                  <Delete />
                </IconButton>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
