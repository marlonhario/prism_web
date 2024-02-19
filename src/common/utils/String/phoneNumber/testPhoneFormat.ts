export default function testPhoneFormat(phone: string): boolean {
  return /^0(0?4|5)([\s-]?[0-9]){7}[0-9]$/.test(phone);
}
