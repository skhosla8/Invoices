import React, { useEffect, useState } from "react";
import plusIcon from '../assets/icon-plus-light.svg';
import deleteIcon from '../assets/icon-delete.svg';
import deleteIconRed from '../assets/icon-delete-red.svg';
import { useDispatch } from 'react-redux';
import { addInvoice } from '../redux/reducers/invoicesSlice';

function NewInvoice({ setIsOpen }) {
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

    const initialFormErrors = Object.freeze({
        0: false,
        1: false,
        2: false,
        3: false,
        4: false,
        5: false,
        6: false,
        7: false,
        8: false,
        9: false,
        10: false,
        11: false,
        12: false,
    });

    const [formData, setFormData] = useState(initialFormData);
    const [selectedOption, setSelectedOption] = useState('');
    const [items, setItems] = useState([]);
    const [itemsArr, setItemsArr] = useState([]);
    const [isNotValid, setIsNotValid] = useState(null);
    const [formErrors, setFormErrors] = useState(initialFormErrors);

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

                    if (e.target.value) {
                        setFormErrors({
                            ...formErrors,
                            0: false
                        });
                    }

                    break;
                case 'senderAddress-city':
                    setFormData({
                        ...formData,
                        senderAddress: {
                            ...formData.senderAddress,
                            city: e.target.value
                        }
                    });

                    if (e.target.value) {
                        setFormErrors({
                            ...formErrors,
                            1: false
                        });
                    }

                    break;
                case 'senderAddress-postCode':
                    setFormData({
                        ...formData,
                        senderAddress: {
                            ...formData.senderAddress,
                            postCode: e.target.value
                        }
                    });

                    if (e.target.value) {
                        setFormErrors({
                            ...formErrors,
                            2: false
                        });
                    }

                    break;
                case 'senderAddress-country':
                    setFormData({
                        ...formData,
                        senderAddress: {
                            ...formData.senderAddress,
                            country: e.target.value
                        }
                    });

                    if (e.target.value) {
                        setFormErrors({
                            ...formErrors,
                            3: false
                        });
                    }

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

                    if (e.target.value) {
                        setFormErrors({
                            ...formErrors,
                            6: false
                        });
                    }
                    break;
                case 'clientAddress-city':
                    setFormData({
                        ...formData,
                        clientAddress: {
                            ...formData.clientAddress,
                            city: e.target.value
                        }
                    });

                    if (e.target.value) {
                        setFormErrors({
                            ...formErrors,
                            7: false
                        });
                    }
                    break;
                case 'clientAddress-postCode':
                    setFormData({
                        ...formData,
                        clientAddress: {
                            ...formData.clientAddress,
                            postCode: e.target.value
                        }
                    });

                    if (e.target.value) {
                        setFormErrors({
                            ...formErrors,
                            8: false
                        });
                    }
                    break;
                case 'clientAddress-country':
                    setFormData({
                        ...formData,
                        clientAddress: {
                            ...formData.clientAddress,
                            country: e.target.value
                        }
                    });

                    if (e.target.value) {
                        setFormErrors({
                            ...formErrors,
                            9: false
                        });
                    }

                    break;
                default:
                    setFormData(initialFormData);
            }
        } else {
            setFormData({
                ...formData,
                [e.target.name]: e.target.value.trim()
            });

            formData.clientName &&
                setFormErrors({
                    ...formErrors,
                    4: false
                });

            formData.clientEmail &&
                setFormErrors({
                    ...formErrors,
                    5: false
                });

            e.target.name === 'createdAt' && e.target.value &&
                setFormErrors({
                    ...formErrors,
                    10: false
                });

            formData.description &&
                setFormErrors({
                    ...formErrors,
                    12: false
                });
        }

        e.target.value ?
            e.target.style.border = '1px solid #57eca2' :
            e.target.style.border = '1px solid #EC5757';
    };

    const handlePaymentTerms = (e) => {
        setSelectedOption(e.target.value);

        setFormData({
            ...formData,
            paymentTerms: Number(e.target.value)
        });

        e.target.value ?
            e.target.style.border = '1px solid #57eca2' :
            e.target.style.border = '1px solid #EC5757';

        e.target.value &&
            setFormErrors({
                ...formErrors,
                11: false
            });
    };

    const closeNewInvoice = () => {
        let inputs = document.getElementsByClassName('new-invoice__field__input');
        let dropdown = document.getElementById('terms');

        setIsOpen(false);
        setFormData(initialFormData);
        setFormErrors(initialFormErrors);
        setSelectedOption('');
        setIsNotValid(null);

        for (const input of inputs) {
            input.value = '';
            input.classList.remove('error');
            input.style.border = 'none';
        }

        dropdown.style.border = 'none';
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

            item.children[0].value ?
                item.children[0].style.border = '1px solid #57eca2' :
                item.children[0].style.border = '1px solid #EC5757';

            item.children[1].value ?
                item.children[1].style.border = '1px solid #57eca2' :
                item.children[1].style.border = '1px solid #EC5757';

            item.children[2].value ?
                item.children[2].style.border = '1px solid #57eca2' :
                item.children[2].style.border = '1px solid #EC5757';
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

    const handleFormErrors = () => {
        let inputs = document.getElementsByClassName('new-invoice__field__input');
        let dropdown = document.getElementById('terms');
        let errors = { ...initialFormErrors };

        for (let i = 0; i < inputs.length; i++) {
            if (!inputs[i].value) {
                inputs[i].classList.add('error');
                errors[i] = true;
            } else {
                inputs[i].classList.remove('error');
                errors[i] = false;
            }

            setFormErrors(errors);
        }

        if (!selectedOption) {
            dropdown.style.border = '1px solid #EC5757';
        } else {
            dropdown.style.border = '1px solid #57eca2';
        }
    };

    const validateForm = () => {
        for (const key in formData) {
            if (formData[key] === '') {
                setIsNotValid(true);
                break;

            } else {
                setIsNotValid(false);
            }
        }

        handleFormErrors();
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
            <input className='item-name new-invoice__field__input' type='text' onChange={handleItems} />
            <input className='item-qty new-invoice__field__input' type='text' onChange={handleItems} />
            <input className='item-price new-invoice__field__input' type='text' onChange={handleItems} />
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
        if (status && !isNotValid) {
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
                    <input name="senderAddress-street" className="new-invoice__field__input" type="text" onChange={handleChange} />
                    <div className="new-invoice__field__container">
                        {formErrors[0] &&
                            <div>can't be empty</div>
                        }
                    </div>
                </div>


                <div className="new-invoice__location">
                    <div className="new-invoice__field">
                        <label>City</label>
                        <input name="senderAddress-city" className="new-invoice__field__input" type="text" onChange={handleChange} />
                        <div className="new-invoice__field__container">
                            {formErrors[1] &&
                                <div>can't be empty</div>
                            }

                        </div>
                    </div>

                    <div className="new-invoice__field">
                        <label>Post Code</label>
                        <input name="senderAddress-postCode" className="new-invoice__field__input" type="text" onChange={handleChange} />
                        <div className="new-invoice__field__container">
                            {formErrors[2] &&
                                <div>can't be empty</div>
                            }

                        </div>
                    </div>

                    <div className="new-invoice__field">
                        <label>Country</label>
                        <input name="senderAddress-country" className="new-invoice__field__input" type="text" onChange={handleChange} />
                        <div className="new-invoice__field__container">
                            {formErrors[3] &&
                                <div>can't be empty</div>
                            }
                        </div>
                    </div>
                </div>

                <h2>Bill To</h2>

                <div className="new-invoice__field">
                    <label>Client's Name</label>
                    <input name="clientName" className="new-invoice__field__input" type="text" onChange={handleChange} />
                    <div className="new-invoice__field__container">
                        {formErrors[4] &&
                            <div>can't be empty</div>
                        }
                    </div>
                </div>

                <div className="new-invoice__field">
                    <label>Client's Email</label>
                    <input name="clientEmail" className="new-invoice__field__input" type="text" placeholder="e.g. email@example.com" onChange={handleChange} />
                    <div className="new-invoice__field__container">
                        {formErrors[5] &&
                            <div>can't be empty</div>
                        }
                    </div>
                </div>

                <div className="new-invoice__field">
                    <label>Street Address</label>
                    <input name="clientAddress-street" className="new-invoice__field__input" type="text" onChange={handleChange} />
                    <div className="new-invoice__field__container">
                        {formErrors[6] &&
                            <div>can't be empty</div>
                        }
                    </div>
                </div>


                <div className="new-invoice__location">
                    <div className="new-invoice__field">
                        <label>City</label>
                        <input name="clientAddress-city" className="new-invoice__field__input" type="text" onChange={handleChange} />
                        <div className="new-invoice__field__container">
                            {formErrors[7] &&
                                <div>can't be empty</div>
                            }
                        </div>
                    </div>

                    <div className="new-invoice__field">
                        <label>Post Code</label>
                        <input name="clientAddress-postCode" className="new-invoice__field__input" type="text" onChange={handleChange} />
                        <div className="new-invoice__field__container">
                            {formErrors[8] &&
                                <div>can't be empty</div>
                            }
                        </div>
                    </div>

                    <div className="new-invoice__field">
                        <label>Country</label>
                        <input name="clientAddress-country" className="new-invoice__field__input" type="text" onChange={handleChange} />
                        <div className="new-invoice__field__container">
                            {formErrors[9] &&
                                <div>can't be empty</div>
                            }
                        </div>
                    </div>
                </div>

                <div className="new-invoice__date-terms">
                    <div className="new-invoice__field">
                        <label id="invoice-date-label">Invoice Date</label>
                        <input name="createdAt" className="new-invoice__field__input" type="date" onChange={handleChange} />
                        <div className="new-invoice__field__container">
                            {formErrors[10] &&
                                <div>can't be empty</div>
                            }
                        </div>
                    </div>

                    <div className="new-invoice__field">
                        <label htmlFor="payment-terms">Payment Terms</label>

                        <select id="terms" name="payment-terms" className="new-invoice__field__input" value={selectedOption} onChange={handlePaymentTerms}>
                            <option id="option1" value="" disabled>Select term</option>
                            <option value="1">Next 1 Day</option>
                            <option value="7">Next 7 Days</option>
                            <option value="14">Next 14 Days</option>
                            <option value="30">Next 30 Days</option>
                        </select>
                        <div className="new-invoice__field__container">
                            {formErrors[11] &&
                                <div>can't be empty</div>
                            }
                        </div>
                    </div>
                </div>

                <div className="new-invoice__field">
                    <label>Project Description</label>
                    <input name="description" type="text" className="new-invoice__field__input" placeholder="e.g. Graphic Design Service" onChange={handleChange} />
                    <div className="new-invoice__field__container">
                        {formErrors[12] &&
                            <div>can't be empty</div>
                        }
                    </div>
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
