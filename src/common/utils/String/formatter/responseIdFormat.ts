export default function responseIdFormat(responseId: number | string): string {
  return String(responseId).padStart(5, '0');
}
