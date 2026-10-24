import exportCsv from '../../utils/exportCsv';

export default function ExportButton({ rows, name = 'export.csv' }) {
  return (
    <button className="btn btn-outline-success btn-sm" onClick={() => exportCsv(rows, name)}>
      ⬇ Export CSV
    </button>
  );
}