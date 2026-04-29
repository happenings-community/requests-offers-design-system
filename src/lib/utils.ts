export function md(text: string): string {
  return text
    .replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;')
    .replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>')
    .replace(/\*(.+?)\*/g, '<em>$1</em>')
    .replace(/^- (.+)$/gm, '<li>$1</li>')
    .replace(/(<li>[\s\S]+?<\/li>)/g, '<ul>$1</ul>')
    .replace(/\n/g, '<br>');
}

export function toggleArr(arr: string[], val: string): string[] {
  return arr.includes(val) ? arr.filter(v => v !== val) : [...arr, val];
}

export function addLink(links: string[], inp: string): [string[], string] {
  return inp.trim() ? [[...links, inp.trim()], ''] : [links, inp];
}

export async function copyToClipboard(text: string) {
  try { await navigator.clipboard.writeText(text); } catch { /* silent */ }
}
