import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { filterInvoices } from '../redux/reducers/invoicesSlice';

function StatusDropdown() {
    const [invoicesCopy, setInvoicesCopy] = useState([]);
    const invoices = useSelector(state => state.invoices.allInvoices);

    const dispatch = useDispatch();

    const filterByStatus = (status, prevElem, nextElem) => {
        let input = document.getElementById(status);
        let prevInput = document.getElementById(prevElem);
        let nextInput = document.getElementById(nextElem);


        if (input.checked) {
            let filtered = invoices.filter(invoice => invoice.status === status);

            prevInput.disabled = true;
            nextInput.disabled = true;
            dispatch(filterInvoices({ filtered }));
        } else {
            let filtered = invoicesCopy;

            prevInput.disabled = false;
            nextInput.disabled = false;
            dispatch(filterInvoices({ filtered }));
        };
    };

    useEffect(() => {
        setInvoicesCopy(invoices);
        //eslint-disable-next-line
    }, []);

    return (
        <div id="dropdown-status" className="status-dropdown">
            <div className="status-dropdown__container">
                <input id="draft" className="status-dropdown__container__checkbox" type="checkbox" value="draft" onChange={() => filterByStatus('draft', 'paid', 'pending')} />
                <label htmlFor="draft">Draft</label>
            </div>

            <div className="status-dropdown__container">
                <input id="pending" className="status-dropdown__container__checkbox" type="checkbox" value="pending" onChange={() => filterByStatus('pending', 'draft', 'paid')} />
                <label htmlFor="pending">Pending</label>
            </div>

            <div className="status-dropdown__container">
                <input id="paid" className="status-dropdown__container__checkbox" type="checkbox" value="paid" onChange={() => filterByStatus('paid', 'pending', 'draft')} />
                <label htmlFor="paid">Paid</label>
            </div>
        </div>
    )
}

export default StatusDropdown; 