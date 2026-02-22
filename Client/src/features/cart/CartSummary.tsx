import { Box, Paper, Typography, Divider, Button } from "@mui/material";
// import { useCartContext } from "../../context/CartContext";
import { currencyTRY } from "../../utils/formatCurrency";
import { useAppSelector } from "../../hooks/hooks";

export default function CartSummary() {
  // const { cart } = useCartContext();
  const { cart } = useAppSelector((state) => state.cart);

  const subtotal =
    cart?.cartItems.reduce(
      (total, item) => total + item.price * item.quantity,
      0,
    ) ?? 0;

  const tax = subtotal * 0.2;
  const total = subtotal + tax;

  return (
    <Paper
      elevation={3}
      sx={{
        mt: 3,
        p: 3,
        borderRadius: 3,
        width: "350px",
        marginLeft: "auto",
      }}
    >
      <Typography variant="h6" sx={{ fontWeight: 700, mb: 2 }}>
        Sipariş Özeti
      </Typography>

      <Box display="flex" justifyContent="space-between" mb={1}>
        <Typography color="text.secondary">Ara Toplam</Typography>
        <Typography>{currencyTRY.format(subtotal)}</Typography>
      </Box>

      <Box display="flex" justifyContent="space-between" mb={1}>
        <Typography color="text.secondary">Vergi (%20)</Typography>
        <Typography>{currencyTRY.format(tax)}</Typography>
      </Box>

      <Divider sx={{ my: 2 }} />

      <Box display="flex" justifyContent="space-between" mb={2}>
        <Typography sx={{ fontWeight: 700 }}>Toplam</Typography>
        <Typography sx={{ fontWeight: 700 }}>
          {currencyTRY.format(total)}
        </Typography>
      </Box>

      <Button
        fullWidth
        variant="contained"
        color="primary"
        sx={{ borderRadius: 2, py: 1.2 }}
      >
        Satın Al
      </Button>
    </Paper>
  );
}
