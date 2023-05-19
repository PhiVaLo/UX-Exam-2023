import React from 'react';

const ModalCancelBooking = ({ closeCancelModal }) => {
  return (
    <div className="modal show" style={{ display: 'block', position: 'initial' }}>
      <div className="modal-dialog">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title">Cancel Booking for x?</h5>
            <button type="button" className="close" onClick={closeCancelModal} aria-label="Close">
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <div className="modal-body">
            <p>You are about to cancel a booking for x.</p>
          </div>
          <div className="modal-footer">
            <button type="button" className="btn btn-secondary" onClick={closeCancelModal}>Close</button>
            <button type="button" className="btn btn-primary">Confirm</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ModalCancelBooking;