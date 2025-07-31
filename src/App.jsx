import { useState, useRef } from "react";
import {
  Box,
  Grid,
  Button,
  TextField,
  Typography,
  MenuItem,
  Select,
  InputLabel,
  FormControl,
} from "@mui/material";
import QuotationTable from "./QuotationTable";

const products = [
  { code: "p001", name: "Product A", price: 100 },
  { code: "p002", name: "Product B", price: 200 },
  { code: "p003", name: "Product C", price: 150 },
  { code: "p004", name: "Product D", price: 250 },
];

function App() {
  const itemRef = useRef();
  const ppuRef = useRef();
  const qtyRef = useRef();
  const discountRef = useRef();

  const [dataItems, setDataItems] = useState([]);
  const [ppu, setPpu] = useState(products[0].price);

  const addItem = () => {
    const selected = products.find((p) => p.code === itemRef.current.value);
    const name = selected.name;
    const price = parseFloat(ppuRef.current.value);
    const qty = parseInt(qtyRef.current.value);
    const discount = parseFloat(discountRef.current.value) || 0;

    const existingIndex = dataItems.findIndex(
      (item) => item.item === name && item.ppu === price
    );

    if (existingIndex !== -1) {
      const updatedItems = [...dataItems];
      updatedItems[existingIndex] = {
        ...updatedItems[existingIndex],
        qty: updatedItems[existingIndex].qty + qty,
        discount: updatedItems[existingIndex].discount + discount,
      };
      setDataItems(updatedItems);
    } else {
      const newItem = { item: name, ppu: price, qty, discount };
      setDataItems([...dataItems, newItem]);
    }
  };

  const deleteByIndex = (index) => {
    const newData = [...dataItems];
    newData.splice(index, 1);
    setDataItems(newData);
  };

  const productChange = () => {
    const selected = products.find((p) => p.code === itemRef.current.value);
    setPpu(selected.price);
  };

  return (
    <Box sx={{ flexGrow: 1, p: 2 }}>
      <Grid container spacing={2}>
        <Grid item xs={12} md={4} sx={{ bgcolor: "#e4e4e4", p: 2 }}>
          <Typography variant="h6">Quotation Form</Typography>

          <FormControl fullWidth sx={{ mt: 2 }}>
            <InputLabel id="product-label">Item</InputLabel>
            <Select
              labelId="product-label"
              inputRef={itemRef}
              defaultValue={products[0].code}
              onChange={productChange}
              label="Item"
            >
              {products.map((p) => (
                <MenuItem key={p.code} value={p.code}>
                  {p.name}
                </MenuItem>
              ))}
            </Select>
          </FormControl>

          <TextField
            label="Price Per Unit"
            type="number"
            fullWidth
            inputRef={ppuRef}
            value={ppu}
            onChange={() => setPpu(ppuRef.current.value)}
            sx={{ mt: 2 }}
          />

          <TextField
            label="Quantity"
            type="number"
            fullWidth
            inputRef={qtyRef}
            defaultValue={1}
            sx={{ mt: 2 }}
          />

          <TextField
            label="Discount"
            type="number"
            fullWidth
            inputRef={discountRef}
            defaultValue={0}
            sx={{ mt: 2 }}
          />

          <Button
            variant="contained"
            fullWidth
            onClick={addItem}
            sx={{ mt: 3 }}
          >
            Add
          </Button>
        </Grid>

        <Grid item xs={12} md={8}>
          <QuotationTable
            data={dataItems}
            deleteByIndex={deleteByIndex}
            clearAll={() => setDataItems([])}
          />
        </Grid>
      </Grid>
    </Box>
  );
}

export default App;
