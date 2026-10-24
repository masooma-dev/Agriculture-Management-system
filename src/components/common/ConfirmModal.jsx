export default function ConfirmModal({ show, title = 'Confirm delete', message = 'This cannot be undone.', onConfirm, onCancel }) {
  if (!show) return null;
  return (
    <>
      <div className="modal d-block" tabIndex="-1" onClick={onCancel}>
        <div className="modal-dialog modal-dialog-centered" onClick={(e) => e.stopPropagation()}>
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title">{title}</h5>
              <button className="btn-close" onClick={onCancel} />
            </div>
            <div className="modal-body">{message}</div>
            <div className="modal-footer">
              <button className="btn btn-secondary" onClick={onCancel}>Cancel</button>
              <button className="btn btn-danger" onClick={onConfirm}>Delete</button>
            </div>
          </div>
        </div>
      </div>
      <div className="modal-backdrop show" />
    </>
  );
}