import React, { useEffect, useState } from "react";
import plusIcon from '../assets/icon-plus-light.svg';
import deleteIcon from '../assets/icon-delete.svg';
import deleteIconRed from '../assets/icon-delete-red.svg';
import { useDispatch } from 'react-redux';
import { addInvoice } from '../redux/reducers/invoicesSlice';

function NewInvoice() {
    const initialFormData = Object.freeze({
        id: '',
        createdAt: '',
        paymentDue: '',
        description: '',
        paymentTerms: '',
        clientName: '',
        clientEmail: '',
        status: '',
        senderAddress: {
            street: '',
            city: '',
            postCode: '',
            country: ''
        },
        clientAddress: {
            street: '',
            city: '',
            postCode: '',
            country: ''
        },
        items: [
            {
                name: '',
                quantity: '',
                price: '',
                total: ''
            },
        ],
        total: ''
    });

    const [formData, setFormData] = useState(initialFormData);
    const [selectedOption, setSelectedOption] = useState('');
    const [items, setItems] = useState([]);
    const [itemsArr, setItemsArr] = useState([]);
    const [isNotValid, setIsNotValid] = useState(null);

    const dispatch = useDispatch();

    const createdAt = formData.createdAt;
    const paymentTerm = formData.paymentTerms;
    const status = formData.status;

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
                    setFormData(initialFormData);
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
                    setFormData(initialFormData);
            }
        } else {
            setFormData({
                ...formData,
                [e.target.name]: e.target.value.trim()
            });
        }
    };

    const handlePaymentTerms = (e) => {
        setSelectedOption(e.target.value);

        setFormData({
            ...formData,
            paymentTerms: Number(e.target.value)
        });
    };

    const closeNewInvoice = () => {
        let modal = document.getElementById('new-invoice-modal');
        let modalOverlay = document.getElementById('new-invoice-overlay');
        let inputs = document.getElementsByTagName('input');

        modal.classList.remove('visible');
        modalOverlay.classList.remove('overlay');

        setFormData(initialFormData);
        setSelectedOption('');
        setIsNotValid(null);

        for (const input of inputs) {
            input.value = '';
        }
    };

    const removeInvoiceItem = (id) => {
        let items = document.getElementsByClassName(
            'new-invoice__items-container__item'
        );

        for (const item of items) {
            if (item.id === id) {
                item.remove();
            }
        }
    };

    const addInvoiceItem = () => {
        let newItem = `<div></div>`;

        setItems([...items, newItem]);
    };

    const handleItems = () => {
        let items = document.getElementsByClassName('new-invoice__items-container__item');
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
            }
        }

        if (arr.length) {
            setItemsArr(arr);
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

    const getRedTrashIcon = (id) => {
        let icon = document.getElementById(id);

        icon.src = deleteIconRed;
    };

    const getOriginalTrashIcon = (id) => {
        let icon = document.getElementById(id);

        icon.src = deleteIcon;
    };

    const validateForm = () => {
        for (const key in formData) {
            if (formData[key] === '') {
                setIsNotValid(true);
            } else {
                setIsNotValid(false)
            }
        }
    }

    const saveAsDraft = () => {
        setFormData({
            ...formData,
            status: 'draft'
        });

        validateForm();
    };

    const saveAsPending = () => {
        setFormData({
            ...formData,
            status: 'pending'
        });

        validateForm();
    };

    const renderedItems = items && items.map((item, i) => (
        <div key={i} id={`invoice-item-${i}`} className='new-invoice__items-container__item'>
            <input className='item-name' type='text' onChange={handleItems} />
            <input className='item-qty' type='text' onChange={handleItems} />
            <input className='item-price' type='text' onChange={handleItems} />
            <input className='item-total' type='text' readOnly />
            <img id={`trash-icon-${i}`} className='trash-icon' src={deleteIcon} alt='trash-icon' onClick={() => removeInvoiceItem(`invoice-item-${i}`)} onMouseEnter={() => getRedTrashIcon(`trash-icon-${i}`)} onMouseLeave={() => getOriginalTrashIcon(`trash-icon-${i}`)} />
        </div>
    ));


    useEffect(() => {
        const date = new Date(createdAt);
        const arr = [];

        let randomLetter;

        for (let i = 0; i < 2; i++) {
            randomLetter = String.fromCharCode(65 + Math.floor(Math.random() * 26));

            arr.push(randomLetter);
        }

        for (let i = 0; i < 4; i++) {
            let randomNumber = Math.floor(Math.random() * 10);

            arr.push(randomNumber);
        }

        let invoiceId = `${arr[0]}${arr[1]}${arr[2]}${arr[3]}${arr[4]}${arr[5]}`;

        if (invoiceId) {
            setFormData({
                ...formData,
                id: invoiceId
            });
        }

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

    useEffect(() => {
        setFormData({
            ...formData,
            items: itemsArr
        });
        //eslint-disable-next-line
    }, [itemsArr]);

    useEffect(() => {
        if (status && isNotValid === false) {
            dispatch(addInvoice({ formData }));
            closeNewInvoice();
            window.location.reload();
        }
        //eslint-disable-next-line
    }, [status, isNotValid]);

    return (
        <>
            <div id="new-invoice-overlay"></div>
            <div id="new-invoice-modal" className="new-invoice">
                <h1>New Invoice</h1>

                <h2>Bill From</h2>

                <div className="new-invoice__field">
                    <label>Street Address</label>
                    <input name="senderAddress-street" type="text" onChange={handleChange} />
                </div>


                <div className="new-invoice__location">
                    <div className="new-invoice__field">
                        <label>City</label>
                        <input name="senderAddress-city" type="text" onChange={handleChange} />
                    </div>

                    <div className="new-invoice__field">
                        <label>Post Code</label>
                        <input name="senderAddress-postCode" type="text" onChange={handleChange} />
                    </div>

                    <div className="new-invoice__field">
                        <label>Country</label>
                        <input name="senderAddress-country" type="text" onChange={handleChange} />
                    </div>
                </div>

                <h2>Bill To</h2>

                <div className="new-invoice__field">
                    <label>Client's Name</label>
                    <input name="clientName" type="text" onChange={handleChange} />
                </div>

                <div className="new-invoice__field">
                    <label>Client's Email</label>
                    <input name="clientEmail" type="text" placeholder="e.g. email@example.com" onChange={handleChange} />
                </div>

                <div className="new-invoice__field">
                    <label>Street Address</label>
                    <input name="clientAddress-street" type="text" onChange={handleChange} />
                </div>


                <div className="new-invoice__location">
                    <div className="new-invoice__field">
                        <label>City</label>
                        <input name="clientAddress-city" type="text" onChange={handleChange} />
                    </div>

                    <div className="new-invoice__field">
                        <label>Post Code</label>
                        <input name="clientAddress-postCode" type="text" onChange={handleChange} />
                    </div>

                    <div className="new-invoice__field">
                        <label>Country</label>
                        <input name="clientAddress-country" type="text" onChange={handleChange} />
                    </div>
                </div>

                <div className="new-invoice__date-terms">
                    <div className="new-invoice__field">
                        <label id="invoice-date-label">Invoice Date</label>
                        <input name="createdAt" type="date" onChange={handleChange} />
                    </div>

                    <div className="new-invoice__field">
                        <label htmlFor="payment-terms">Payment Terms</label>

                        <select name="payment-terms" value={selectedOption} onChange={handlePaymentTerms}>
                            <option id="option1" value="" disabled>Select term</option>
                            <option value="1">Next 1 Day</option>
                            <option value="7">Next 7 Days</option>
                            <option value="14">Next 14 Days</option>
                            <option value="30">Next 30 Days</option>
                        </select>
                    </div>
                </div>

                <div className="new-invoice__field">
                    <label>Project Description</label>
                    <input name="description" type="text" placeholder="e.g. Graphic Design Service" onChange={handleChange} />
                </div>

                <h2>Item List</h2>

                <div className="new-invoice__list-items">
                    <span>Item Name</span>
                    <span>Qty.</span>
                    <span>Price</span>
                    <span>Total</span>
                </div>

                <div className="new-invoice__items-container">
                    {renderedItems}
                </div>

                <button className="new-invoice__add-item" onClick={addInvoiceItem}>
                    <img src={plusIcon} alt="add-icon" />
                    Add New Item
                </button>

                <div className="new-invoice__options">
                    <div>
                        <button id="discard" onClick={closeNewInvoice}>Discard</button>
                    </div>

                    <div>
                        <button id="save-draft" onClick={saveAsDraft}>Save as Draft</button>
                        <button id="save-send" onClick={saveAsPending}>Save & Send</button>
                    </div>
                </div>

                {isNotValid &&
                    <div className="new-invoice__errors">
                        <p> - All fields must be added</p>
                        <p> - An item must be added</p>
                    </div>
                }

            </div>
        </>
    );
}

export default NewInvoice;
