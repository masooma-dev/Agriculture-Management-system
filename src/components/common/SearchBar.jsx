export default function SearchBar({ value, onChange, placeholder = 'Search...' }) {
  return (
    <input
      className="form-control mb-3"
      style={{ maxWidth: 320 }}
      placeholder={placeholder}
      value={value}
      onChange={(e) => onChange(e.target.value)}
    />
  );
}