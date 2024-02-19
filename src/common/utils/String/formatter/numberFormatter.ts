export default function formatNumber(number: number): string {
  let formatter = Intl.NumberFormat('en', { notation: 'compact' });
  return formatter.format(number);
}
