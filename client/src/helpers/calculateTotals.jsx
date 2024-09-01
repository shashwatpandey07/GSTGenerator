function calculateTotals(items, shipping) {
  let total_amt = 0;
  let discount_amt = 0;
  let subtotal = 0;
  let sgst = 0;
  let cgst = 0;
  let cess = 0;

  for (let item of items) {
    let total = item.price * item.qty;
    total_amt += total;
    total -= (item.dis * total) / 100;
    discount_amt += total_amt - total;
    subtotal += total;
    sgst += (total * item.sgst) / 100;
    cgst += (total * item.cgst) / 100;
    cess += (total * item.cess) / 100;
  }

  return {
    total_amt: parseFloat(total_amt.toFixed(2)),
    discount_amt: parseFloat(discount_amt.toFixed(2)),
    subtotal: parseFloat(subtotal.toFixed(2)),
    sgst: parseFloat(sgst.toFixed(2)),
    cgst: parseFloat(cgst.toFixed(2)),
    cess: parseFloat(cess.toFixed(2)),
    total: (subtotal + sgst + cgst + cess + parseFloat(shipping)).toFixed(2),
  };
}

export default calculateTotals;
