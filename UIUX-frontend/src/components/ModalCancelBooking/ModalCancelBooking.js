/* 
 js bootstrap with some minor changes from 
    https://getbootstrap.com/docs/4.0/components/modal/ 
 */

import React from 'react';
import { FaTimes } from "react-icons/fa";

const ModalCancelBooking = ({ closeCancelModal }) => {

  return (
    <div className="modal show" style={{ display: 'block', position: 'initial' }}>
      <div className="modal-dialog">
        <div className="modal-content bg-dark">
          <div className="modal-header">
            <h5 className="modal-title text-light">Cancel Booking for x?</h5>
            <button type="button" className="btn" onClick={closeCancelModal} aria-label="Close">
              <FaTimes />
            </button>
          </div>
          <div className="modal-body text-light">
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