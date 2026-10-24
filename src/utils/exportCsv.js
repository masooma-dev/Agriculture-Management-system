export default function exportCsv(rows, name = 'export.csv') {
  if (!rows.length) return;
  const keys = Object.keys(rows[0]).filter((k) => k !== 'imageBase64');
  const csv = [
    keys.join(','),
    ...rows.map((r) => keys.map((k) => `"${String(r[k] ?? '').replace(/"/g, '""')}"`).join(',')),
  ].join('\n');
  const a = document.createElement('a');
  a.href = URL.createObjectURL(new Blob([csv], { type: 'text/csv' }));
  a.download = name;
  a.click();
}