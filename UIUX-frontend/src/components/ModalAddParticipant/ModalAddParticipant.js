/* 
 js bootstrap with some minor changes from 
    https://getbootstrap.com/docs/4.0/components/modal/ 
 */

import React from 'react';
import { FaTimes } from "react-icons/fa";
import "./ModalAddParticipant.css"

const ModalAddParticipant = ({ closeAddModal }) => {
  return (
    <div className="modal show" style={{ display: 'block', position: 'initial' }}>
      <div className="modal-dialog">
        <div className="modal-content">
          <div className="modal-header bg-dark">
            <h5 className="modal-title text-light">Add Participant</h5>
            <button type="button" className="btn" onClick={closeAddModal} aria-label="Close">
              <FaTimes />
            </button>
          </div>
          <div className="modal-body bg-dark">
            <form>
              <div className="mb-3">
                <label htmlFor="exampleForm.ControlInput1" className="form-label text-light">Email address</label>
                <input type="email" className="form-control bg-dark " id="exampleForm.ControlInput1" placeholder="name@example.com" autoFocus />
              </div>
            </form>
          </div>
          <div className="modal-footer bg-dark">
            <button type="button" className="btn btn-secondary" onClick={closeAddModal}>Close</button>
            <button type="button" className="btn btn-primary">Confirm</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ModalAddParticipant;