import { seedAll } from '../../data/seedData';

export default function SeedButton() {
  return (
    <button
      className="btn btn-outline-light btn-sm me-2"
      onClick={() => window.confirm('Replace current data with demo data?') && seedAll()}
    >
      Load demo data
    </button>
  );
}