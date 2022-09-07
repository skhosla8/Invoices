import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { filterInvoices } from '../redux/reducers/invoicesSlice';

function StatusDropdown() {
    const [invoicesCopy, setInvoicesCopy] = useState([]);
    const invoices = useSelector(state => state.invoices.allInvoices);

    const dispatch = useDispatch();

    const filterByStatus = (currStatus, prevStatus, nextStatus) => {
        let currInput = document.getElementById(currStatus);
        let prevInput = document.getElementById(prevStatus);
        let nextInput = document.getElementById(nextStatus);

        let filtered;

        if (currInput.checked && prevInput.checked && nextInput.checked) {
            filtered = invoicesCopy.filter(invoice => invoice.status === currStatus || invoice.status === prevStatus || invoice.status === nextStatus);
            dispatch(filterInvoices({ filtered }));
        } else if (prevInput.checked && nextInput.checked) {
            filtered = invoicesCopy.filter(invoice => invoice.status !== currStatus);
            dispatch(filterInvoices({ filtered }));
        } else if (currInput.checked && prevInput.checked) {
            filtered = invoicesCopy.filter(invoice => invoice.status === currStatus || invoice.status === prevStatus);
            dispatch(filterInvoices({ filtered }));
        } else if (currInput.checked && nextInput.checked) {
            filtered = invoicesCopy.filter(invoice => invoice.status === currStatus || invoice.status === nextStatus);
            dispatch(filterInvoices({ filtered }));
        } else if (prevInput.checked) {
            filtered = invoicesCopy.filter(invoice => invoice.status === prevStatus);
            dispatch(filterInvoices({ filtered }));
        } else if (nextInput.checked) {
            filtered = invoicesCopy.filter(invoice => invoice.status === nextStatus);
            dispatch(filterInvoices({ filtered }));
        } else if (currInput.checked) {
            filtered = invoicesCopy.filter(invoice => invoice.status === currStatus);
            dispatch(filterInvoices({ filtered }));
        } else {
            filtered = invoicesCopy;
            dispatch(filterInvoices({ filtered }));
        }
    };

    useEffect(() => {
        setInvoicesCopy(invoices);
        //eslint-disable-next-line
    }, []);

    return (
        <div id="dropdown-status" className="status-dropdown">
            <div className="status-dropdown__container">
                <input id="draft" className="status-dropdown__container__checkbox" type="checkbox" value="draft" onClick={() => filterByStatus('draft', 'paid', 'pending')} />
                <label htmlFor="draft">Draft</label>
            </div>

            <div className="status-dropdown__container">
                <input id="pending" className="status-dropdown__container__checkbox" type="checkbox" value="pending" onClick={() => filterByStatus('pending', 'draft', 'paid')} />
                <label htmlFor="pending">Pending</label>
            </div>

            <div className="status-dropdown__container">
                <input id="paid" className="status-dropdown__container__checkbox" type="checkbox" value="paid" onClick={() => filterByStatus('paid', 'pending', 'draft')} />
                <label htmlFor="paid">Paid</label>
            </div>
        </div>
    )
}

export default StatusDropdown; 