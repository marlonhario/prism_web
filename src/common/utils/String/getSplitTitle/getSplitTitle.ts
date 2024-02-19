export default function getSplitTitle(title: string, index: number): string {
  const newLabel = title?.replace(/([a-z](?=[A-Z]))/g, '$1 ');
  return newLabel?.split(' ')[index];
}
