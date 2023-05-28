import React from 'react';

const ModalAddParticipant = ({ closeAddModal }) => {
  return (
    <div className="modal show" style={{ display: 'block', position: 'initial' }}>
      <div className="modal-dialog">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title">Add Participant</h5>
            <button type="button" className="close" onClick={closeAddModal} aria-label="Close">
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <div className="modal-body">
            <form>
              <div className="mb-3">
                <label htmlFor="exampleForm.ControlInput1" className="form-label">Email address</label>
                <input type="email" className="form-control" id="exampleForm.ControlInput1" placeholder="name@example.com" autoFocus />
              </div>
            </form>
          </div>
          <div className="modal-footer">
            <button type="button" className="btn btn-secondary" onClick={closeAddModal}>Close</button>
            <button type="button" className="btn btn-primary">Confirm</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ModalAddParticipant;