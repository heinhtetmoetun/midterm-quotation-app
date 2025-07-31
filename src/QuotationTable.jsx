import {
  Box,
  Typography,
  Button,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
} from "@mui/material";
import { CiShoppingCart } from "react-icons/ci";
import { MdClear } from "react-icons/md";
import { BsFillTrashFill } from "react-icons/bs";

function QuotationTable({ data, deleteByIndex, clearAll }) {
  if (!data || data.length === 0) {
    return (
      <Box sx={{ mt: 4 }}>
        <Typography variant="h5">Quotation</Typography>
        <Typography variant="body1" sx={{ mt: 1 }}>
          <CiShoppingCart /> No items
        </Typography>
      </Box>
    );
  }

  const totalAmount = data.reduce(
    (sum, item) => sum + item.qty * item.ppu - item.discount,
    0
  );

  const totalDiscount = data.reduce((sum, item) => sum + item.discount, 0);

  return (
    <Box sx={{ mt: 4 }}>
      <Typography variant="h5" gutterBottom>
        Quotation
      </Typography>

      <Button
        variant="outlined"
        color="error"
        onClick={clearAll}
        startIcon={<MdClear />}
        sx={{ mb: 2 }}
      >
        Clear
      </Button>

      <TableContainer component={Paper}>
        <Table>
          <TableHead sx={{ bgcolor: "#f5f5f5" }}>
            <TableRow>
              <TableCell align="center">-</TableCell>
              <TableCell align="center">Qty</TableCell>
              <TableCell>Item</TableCell>
              <TableCell align="center">Price/Unit</TableCell>
              <TableCell align="center">Discount</TableCell>
              <TableCell align="right">Amount</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {data.map((item, i) => {
              const amount = item.qty * item.ppu - item.discount;

              return (
                <TableRow key={i}>
                  <TableCell align="center">
                    <BsFillTrashFill
                      onClick={() => deleteByIndex(i)}
                      style={{ cursor: "pointer" }}
                    />
                  </TableCell>
                  <TableCell align="center">{item.qty}</TableCell>
                  <TableCell>{item.item}</TableCell>
                  <TableCell align="center">{item.ppu}</TableCell>
                  <TableCell align="center">{item.discount}</TableCell>
                  <TableCell align="right">{amount.toFixed(2)}</TableCell>
                </TableRow>
              );
            })}
          </TableBody>
          <tfoot>
            <TableRow>
              <TableCell colSpan={4} />
              <TableCell align="right">
                <strong>Total Discount:</strong>
              </TableCell>
              <TableCell align="right">
                {totalDiscount.toFixed(2)}
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell colSpan={4} />
              <TableCell align="right">
                <strong>Total:</strong>
              </TableCell>
              <TableCell align="right">
                {totalAmount.toFixed(2)}
              </TableCell>
            </TableRow>
          </tfoot>
        </Table>
      </TableContainer>
    </Box>
  );
}

export default QuotationTable;
