import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import plusIcon from '../assets/icon-plus-light.svg';
import { updateInvoice } from '../redux/reducers/invoicesSlice';

function EditInvoice({ currentInvoice, setInvoiceId, setIsVisible }) {
    const [formData, setFormData] = useState(currentInvoice);
    const [itemsArr, setItemsArr] = useState([]);

    const items = formData && formData.items;
    const defaultSelectValue = formData && formData.paymentTerms;

    const [selectedOption, setSelectedOption] = useState('');

    const dispatch = useDispatch();

    const createdAt = formData?.createdAt;
    const paymentTerm = formData?.paymentTerms;

    const handleChange = (e) => {
        if (e.target.name.includes('senderAddress')) {
            switch (e.target.name) {
                case 'senderAddress-street':
                    setFormData({
                        ...formData,
                        senderAddress: {
                            ...formData.senderAddress,
                            street: e.target.value
                        }
                    });
                    break;
                case 'senderAddress-city':
                    setFormData({
                        ...formData,
                        senderAddress: {
                            ...formData.senderAddress,
                            city: e.target.value
                        }
                    });
                    break;
                case 'senderAddress-postCode':
                    setFormData({
                        ...formData,
                        senderAddress: {
                            ...formData.senderAddress,
                            postCode: e.target.value
                        }
                    });
                    break;
                case 'senderAddress-country':
                    setFormData({
                        ...formData,
                        senderAddress: {
                            ...formData.senderAddress,
                            country: e.target.value
                        }
                    });
                    break;
                default:
                    setFormData(currentInvoice);
            }
        } else if (e.target.name.includes('clientAddress')) {
            switch (e.target.name) {
                case 'clientAddress-street':
                    setFormData({
                        ...formData,
                        clientAddress: {
                            ...formData.clientAddress,
                            street: e.target.value
                        }
                    });
                    break;
                case 'clientAddress-city':
                    setFormData({
                        ...formData,
                        clientAddress: {
                            ...formData.clientAddress,
                            city: e.target.value
                        }
                    });
                    break;
                case 'clientAddress-postCode':
                    setFormData({
                        ...formData,
                        clientAddress: {
                            ...formData.clientAddress,
                            postCode: e.target.value
                        }
                    });
                    break;
                case 'clientAddress-country':
                    setFormData({
                        ...formData,
                        clientAddress: {
                            ...formData.clientAddress,
                            country: e.target.value
                        }
                    });
                    break;
                default:
                    setFormData(currentInvoice);
            }
        } else {
            setFormData({
                ...formData,
                [e.target.name]: e.target.value.trim()
            });
        }
    };

    const saveItems = () => {
        let cancelOption = document.getElementById('edit-invoice-cancel');
        let saveAllOption = document.getElementById('save-all');

        setFormData({
            ...formData,
            items: itemsArr
        });

        cancelOption.disabled = false;
        cancelOption.classList.remove('cancel-disabled');
        saveAllOption.disabled = false;
        saveAllOption.classList.remove('save-all-disabled');
    };

    const handleItems = () => {
        let items = document.getElementsByClassName('edit-invoice__items-container__item');
        let cancelOption = document.getElementById('edit-invoice-cancel');
        let saveAllOption = document.getElementById('save-all');

        let arr = [];

        for (const item of items) {
            let obj = {
                name: '',
                quantity: '',
                price: '',
                total: ''
            };

            obj.name = item.children[0].value;
            obj.quantity = Number(item.children[1].value);
            obj.price = +item.children[2].value;
            obj.total = (Number(item.children[1].value * item.children[2].value));

            if (obj.name && obj.quantity && obj.price && obj.total) {
                item.children[3].value = (+obj.total).toFixed(2);
                arr.push(obj);

                if (arr.length) {
                    setItemsArr(arr);
                }
            }

            const itemTotals = arr && arr.map(item => item.total);

            const total = itemTotals && itemTotals.reduce((total, current) => {
                let value = +total + +current;

                return value.toFixed(2);
            }, 0);

            if (total) {
                setFormData({
                    ...formData,
                    total: +total
                });

            }
        };

        cancelOption.disabled = true;
        cancelOption.classList.add('cancel-disabled');

        saveAllOption.disabled = true;
        saveAllOption.classList.add('save-all-disabled');
    }

    const handlePaymentTerms = (e) => {
        setSelectedOption(e.target.value);

        setFormData({
            ...formData,
            paymentTerms: Number(e.target.value)
        });
    };

    const addInvoiceItem = () => {
        setFormData({
            ...formData,
            items: [
                ...formData.items,
                {
                    name: '',
                    quantity: '',
                    price: '',
                    total: ''
                }
            ]
        });

    };

    const openInvoiceItem = (id) => {
        const viewInvoiceComponent = document.querySelector('.view-invoice');
        const mainComponent = document.querySelector('.main');

        setInvoiceId(id);

        mainComponent.classList.add('hide');
        viewInvoiceComponent.classList.add('display');
    };

    const closeEditInvoice = () => {
        openInvoiceItem(currentInvoice.id);
        setIsVisible(false);
    };

    const cancelEditInvoice = () => {
        setIsVisible(false);
        openInvoiceItem(currentInvoice.id);
    };

    const saveAll = () => {
        const invoiceId = currentInvoice.id;
        const dataObj = formData;

        dispatch(updateInvoice({ invoiceId, dataObj }));

        closeEditInvoice();
    };

    const renderedItems = formData && formData.items.map((item, i) => (
        <div key={i} id={`edit-invoice-item-${i}`} className='edit-invoice__items-container__item'>
            <input className='item-name' type='text' defaultValue={item.name} onChange={handleItems} />
            <input className='item-qty' type='text' defaultValue={item.quantity} onChange={handleItems} />
            <input className='item-price' type='text' defaultValue={item.price} onChange={handleItems} />
            <input className='item-total' type='text' defaultValue={item.total} readOnly />
        </div>
    ));

    useEffect(() => {
        setItemsArr(items);
    }, [items]);

    useEffect(() => {
        setFormData(currentInvoice);
    }, [currentInvoice]);

    useEffect(() => {
        setSelectedOption(defaultSelectValue);
    }, [defaultSelectValue]);

    useEffect(() => {
        const date = new Date(createdAt);

        if (paymentTerm && createdAt) {
            const invoiceDate = new Date(date.getTime() + Math.abs(date.getTimezoneOffset() * 60000));
            invoiceDate.setDate(invoiceDate.getDate() + paymentTerm);

            if (invoiceDate) {
                setFormData({
                    ...formData,
                    paymentDue: invoiceDate.toISOString().slice(0, 10)
                });
            }
        }
        //eslint-disable-next-line
    }, [createdAt, paymentTerm]);

    return (
        <>
            <div id="edit-invoice-overlay"></div>
            <div id="edit-invoice-modal" className="edit-invoice">
                <h1>
                    Edit
                    <span>#</span>{currentInvoice?.id}
                </h1>

                <h2>Bill From</h2>

                <div className="edit-invoice__field">
                    <label>Street Address</label>
                    <input name="senderAddress-street" type="text" defaultValue={formData?.senderAddress?.street} onChange={handleChange} />
                </div>


                <div className="edit-invoice__location">
                    <div className="edit-invoice__field">
                        <label>City</label>
                        <input name="senderAddress-city" type="text" defaultValue={formData?.senderAddress?.city} onChange={handleChange} />
                    </div>

                    <div className="edit-invoice__field">
                        <label>Post Code</label>
                        <input name="senderAddress-postCode" type="text" defaultValue={formData?.senderAddress?.postCode} onChange={handleChange} />
                    </div>

                    <div className="edit-invoice__field">
                        <label>Country</label>
                        <input name="senderAddress-country" type="text" defaultValue={formData?.senderAddress?.country} onChange={handleChange} />
                    </div>
                </div>

                <h2>Bill To</h2>

                <div className="edit-invoice__field">
                    <label>Client's Name</label>
                    <input name="clientName" defaultValue={formData?.clientName} type="text" onChange={handleChange} />
                </div>

                <div className="edit-invoice__field">
                    <label>Client's Email</label>
                    <input name="clientEmail" type="text" defaultValue={formData?.clientEmail} placeholder="e.g. email@example.com" onChange={handleChange} />
                </div>

                <div className="edit-invoice__field">
                    <label>Street Address</label>
                    <input name="clientAddress-street" type="text" defaultValue={formData?.clientAddress?.street} onChange={handleChange} />
                </div>


                <div className="edit-invoice__location">
                    <div className="new-invoice__field">
                        <label>City</label>
                        <input name="clientAddress-city" type="text" defaultValue={formData?.clientAddress?.city} onChange={handleChange} />
                    </div>

                    <div className="edit-invoice__field">
                        <label>Post Code</label>
                        <input name="clientAddress-postCode" type="text" defaultValue={formData?.clientAddress?.postCode} onChange={handleChange} />
                    </div>

                    <div className="edit-invoice__field">
                        <label>Country</label>
                        <input name="clientAddress-country" type="text" defaultValue={formData?.clientAddress?.country} onChange={handleChange} />
                    </div>
                </div>

                <div className="edit-invoice__date-terms">
                    <div className="edit-invoice__field">
                        <label id="invoice-date-label">Invoice Date</label>
                        <input name="createdAt" type="date" defaultValue={formData?.createdAt} onChange={handleChange} />
                    </div>

                    <div className="edit-invoice__field">
                        <label htmlFor="payment-terms">Payment Terms</label>

                        <select name="payment-terms" value={selectedOption} onChange={handlePaymentTerms}>
                            <option id="option1" disabled>Select term</option>
                            <option value="1">Next 1 Day</option>
                            <option value="7">Next 7 Days</option>
                            <option value="14">Next 14 Days</option>
                            <option value="30">Next 30 Days</option>
                        </select>
                    </div>
                </div>

                <div className="edit-invoice__field">
                    <label>Project Description</label>
                    <input name="description" type="text" defaultValue={formData?.description} placeholder="e.g. Graphic Design Service" onChange={handleChange} />
                </div>

                <h2>Item List</h2>

                <div className="edit-invoice__list-items">
                    <span>Item Name</span>
                    <span>Qty.</span>
                    <span>Price</span>
                    <span>Total</span>
                </div>

                <div id="invoice-items-container" className="edit-invoice__items-container">
                    {renderedItems}
                </div>

                <div className="edit-invoice__add-item__container">
                    <button className="edit-invoice__add-item" onClick={addInvoiceItem}>
                        <img src={plusIcon} alt="add-icon" />
                        Add New Item
                    </button>

                    <button className="edit-invoice__save-changes" onClick={saveItems}>
                        Save Items
                    </button>
                </div>

                <div className="edit-invoice__options">
                    <div>
                        <button id="edit-invoice-cancel" className="edit-invoice__options__cancel" onClick={cancelEditInvoice}>Cancel</button>
                        <button id="save-all" className="edit-invoice__options__save-all" onClick={saveAll}>Save All</button>
                    </div>
                </div>
            </div>
        </>
    )
}

export default EditInvoice;