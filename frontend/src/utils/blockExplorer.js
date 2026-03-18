export function txHashExplorerUrl(txHash) {
  if (!txHash) return "#";
  return `https://explorer.opengradient.com/tx/${txHash}`;
}
