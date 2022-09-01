export const formatStatus = (status) => {
    let newStatus = status.split('');
    let remaining = status.slice(1);

    return `${newStatus[0].toUpperCase()}${remaining}`;
};

export const formatDate = (date) => {
    let newDate = new Date(date);
    let formattedDate = new Date(newDate.getTime() + Math.abs(newDate.getTimezoneOffset() * 60000)).toString().split(' ');

    formattedDate.splice(0, 1);
    formattedDate.splice(3);

    return `${formattedDate[1]} ${formattedDate[0]} ${formattedDate[2]}`;
};

export const navigateToHomepage = () => {
    let mainComponent = document.querySelector('.main');
    let viewInvoiceComponent = document.querySelector('.view-invoice');

    viewInvoiceComponent.classList.remove('display');
    mainComponent.classList.remove('hide');
    window.location.reload();
};

