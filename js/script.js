
const shirtDesign = document.getElementById('design');
const shirtDesignOptions = document.querySelectorAll('#design option');
const shirtColor = document.getElementById('color');
const shirtColorOptions = document.querySelectorAll('#color option');

const jobRoleDropDown = document.getElementById('title');
const otherField = document.getElementById('other-job-role');

const activities = document.getElementById('activities');
const activitiesOptions = document.querySelectorAll('#activities-box label input')

const paymentType = document.getElementById('payment');
const paymentTypeOptions = document.querySelectorAll('#payment option');

let totalActivitiesCost = 0;
let activitiesChecked = 0;

const paypal = document.getElementById('paypal');
const bitcoin = document.getElementById('bitcoin');
const creditCardFields = document.getElementById('credit-card');

const form = document.querySelector('form');
const nameElement = document.getElementById('name');
const email = document.getElementById('email')
const creditCard = document.getElementById('cc-num');
const zipCode = document.getElementById('zip');
const cvv = document.getElementById('cvv');

//When page load set cursor inside Name field
document.getElementById('name').focus();

//Set page defaults
shirtColor.setAttribute('disabled', true);
otherField.hidden = true;
paymentTypeOptions[1].selected = true;
paypal.style.display = 'none';
bitcoin.style.display = 'none';

//If 'other' is selected then the text field will show
jobRoleDropDown.addEventListener('change', (e) => {
    if (e.target.value === 'other'){
        otherField.hidden = false;
    } else {
        otherField.hidden = true;
    }
});

//When a change on design happens it enables the color selction, only colors avaliable for that design will be shown.
shirtDesign.addEventListener('change', (e) => {
    if (shirtDesignOptions !== shirtDesignOptions[0]) {
        shirtColor.removeAttribute('disabled');
    }

    if (shirtDesign)
    for  (let i = 0; i < shirtColorOptions.length; i++) {
        const target = e.target.value;
        const match = shirtColorOptions[i].getAttribute('data-theme');
        if (target !== match){
            shirtColorOptions[i].hidden = true;
        } else {
            shirtColorOptions[i].hidden = false;
        }
    }
});

//When a box is checked it adds the cost to the total at the bottom. It will update if activities are removed.
activities.addEventListener('change', (e) => {
    const checkedCost = parseInt(e.target.getAttribute('data-cost'));
    let updatedCost = document.getElementById('activities-cost');

    if (e.target.checked) {
        totalActivitiesCost += checkedCost;
        updatedCost.innerHTML = `Total: $${totalActivitiesCost}`;
    } else {
        totalActivitiesCost -= checkedCost;
        updatedCost.innerHTML = `Total: $${totalActivitiesCost}`;
    }

    (e.target.checked) ? activitiesChecked ++ : activitiesChecked --;
});

//Toggle payment methods
paymentType.addEventListener('change', (e) => {

    if (e.target.value === 'credit-card') {
        paypal.style.display = 'none';
        bitcoin.style.display = 'none';
        creditCardFields.style.display = 'block';
    }
    if (e.target.value === 'paypal') {
        bitcoin.style.display = 'none';
        paypal.style.display = 'block';
        creditCardFields.style.display = 'none';
    }
    if (e.target.value === 'bitcoin') {
        bitcoin.style.display = 'block';
        paypal.style.display = 'none';
        creditCardFields.style.display = 'none';
    }
});

//When form submits, checks to make sure all fields are valid
form.addEventListener('submit', (e) => {
    e.preventDefault();
    console.log('sumbitting form')
    validateName();
    validateEmail();
    validateActivities();

    if (paymentTypeOptions[1].selected) {
        validateCreditCardNumber();
        validateZipCode();
        validateCVV();
    }
});

const validateName = () => {
    const nameValue = nameElement.value;
    const nameIsValid = /^[a-zA-Z]* ?[a-zA-Z]*?$/.test(nameValue);
    return nameIsValid;
}

const validateEmail = () => {
    const emailValue = email.value;
    const emailIsValid = /^[^@]+@[^@.]+\.[a-z]+$/i.test(emailValue);
    return emailIsValid;
}

const validateActivities = () => {
    const activitiesIsValid = activitiesChecked > 0;
    return activitiesIsValid;
}

const validateCreditCardNumber = () => {
    const creditCardValue = creditCard.value;
    const creditCardIsValid = /^[^@-\s]{13,16}$/.test(creditCardValue);
    return creditCardIsValid;
}

const validateZipCode = () => {
    const zipCodeValue = zipCode.value;
    const zipCodeIsValid = /^[^@-]{5}$/.test(zipCodeValue);
    return zipCodeIsValid;
}

const validateCVV = () => {
    const cvvValue = cvv.value;
    const cvvIsValid = /^[^@-]{3}$/.test(cvvValue);
    return cvvIsValid;
}