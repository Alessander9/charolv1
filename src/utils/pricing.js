export function parsePrice(priceStr) {
  return parseFloat(priceStr.replace(/[^0-9.]/g, ''));
}
