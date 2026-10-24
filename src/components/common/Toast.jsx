import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { hideToast } from '../../store/uiSlice';

export default function Toast() {
  const t = useSelector((s) => s.ui.toast);
  const d = useDispatch();

  useEffect(() => {
    if (!t) return;
    const id = setTimeout(() => d(hideToast()), 2500);
    return () => clearTimeout(id);
  }, [t, d]);

  if (!t) return null;
  return (
    <div className="position-fixed bottom-0 end-0 p-3" style={{ zIndex: 2000 }}>
      <div className={`alert alert-${t.type === 'error' ? 'danger' : 'success'} shadow mb-0`}>{t.msg}</div>
    </div>
  );
}