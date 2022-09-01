import React, { useRef } from 'react';
import { useDispatch } from 'react-redux';
import { deleteInvoice } from '../redux/reducers/invoicesSlice';
import { navigateToHomepage } from '../utilities';

function DeleteModal({ invoiceId }) {
    const deleteModalOverlay = useRef(null);
    const deleteModal = useRef(null);

    const dispatch = useDispatch();

    const closeDeleteModal = () => {
        deleteModal.current.classList.remove('display');
        deleteModalOverlay.current.classList.remove('overlay');
    };

    const deleteItem = () => {
        dispatch(deleteInvoice({ invoiceId }));
        navigateToHomepage();
        closeDeleteModal();
    };

    return (
        <>
            <div id="delete-modal-overlay" ref={deleteModalOverlay}></div>
            <div className="delete-modal" ref={deleteModal}>
                <h1>Confirm Deletion</h1>

                <p>Are you sure you want to delete invoice #{invoiceId}? This action cannot be undone.</p>

                <div>
                    <button className="delete-modal__cancel" onClick={closeDeleteModal}>Cancel</button>
                    <button className="delete-modal__delete" onClick={deleteItem}>Delete</button>
                </div>
            </div>
        </>
    )
}

export default DeleteModal;