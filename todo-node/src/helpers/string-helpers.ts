export const escapeHTML = (html: string) => {
  const replacements: Record<string, string> = {
    '&': '&amp;',
    '<': '&lt;',
    '>': '&gt;',
    '"': '&quot;',
    "'": '&#39;',
    '/': '&#x2F;'
  };

  return html.replace(/[&<>"'/]/g, match => replacements[match]);
}