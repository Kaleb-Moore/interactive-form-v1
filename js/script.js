
const shirtDesign = document.getElementById('design');
const shirtDesignOptions = document.querySelectorAll('#design option');
const shirtColor = document.getElementById('color');
const shirtColorOptions = document.querySelectorAll('#color option');

const jobRoleDropDown = document.getElementById('title');
const otherField = document.getElementById('other-job-role');

const activities = document.getElementById('activities');
const activitiesOptions = document.querySelectorAll("[type='checkbox']");

const paymentType = document.getElementById('payment');
const paymentTypeOptions = document.querySelectorAll('#payment option');

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

//counters for functions
let totalActivitiesCost = 0;
let activitiesChecked = 0;
let validatorNum = 0;

//loop for focus/blur on the activities
for (let i = 0; i < activitiesOptions.length; i++) {
    activitiesOptions[i].addEventListener('focus', () => {
        activitiesOptions[i].parentElement.classList.add('focus');
    });
    activitiesOptions[i].addEventListener('blur', () => {
        activitiesOptions[i].parentElement.classList.remove('focus');
    });
}

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

//When a box is checked it adds the cost to the total at the bottom. 
//It will update if activities are removed. Also disabled the activities if the time and date are conflicting
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

    const clicked = e.target;
    const clickedType = clicked.getAttribute('data-day-and-time');
        
    for (let i = 0; i < activitiesOptions.length; i++) {
    const checkboxType = activitiesOptions[i].getAttribute('data-day-and-time');
    
        if (checkboxType === clickedType && clicked !== activitiesOptions[i]) {
            if (clicked.checked) {
            activitiesOptions[i].disabled = true;
            activitiesOptions[i].parentElement.className = 'disabled';
            } else {
            activitiesOptions[i].disabled = false;
            activitiesOptions[i].parentElement.classList.remove('disabled');
            }
        }
    }
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

nameElement.addEventListener('input', (e) => {
    validateName();
    const currentNameValue = e.target.value;

    if(!validateName()) {
        if (currentNameValue === '') {
            nameElement.nextElementSibling.textContent = `Name field cannot be blank.`
        } else {
            nameElement.nextElementSibling.textContent = `You have entered ${currentNameValue}. Name field cannot contain symbols or numbers.`;
        }
    }

});


//When form submits, checks to make sure all fields are valid
form.addEventListener('submit', (e) => {
    validateName();
    validateEmail();
    validateActivities();

    //Only trigger this validation if credit card is selected as payment type
    if (paymentTypeOptions[1].selected) {
        validateCreditCardNumber();
        validateZipCode();
        validateCVV();
    } 

    //Validate that all 7 fields are filled out properly (7 Fields - because credit card is selected)
    if (paymentTypeOptions[1].selected && validatorNum < 7) {
        e.preventDefault();
        validatorNum = 0;
    }

    //Validate that both fields are filled out properly (3 Fields - because credit card is not selected)
    if (paymentTypeOptions[2].selected && validatorNum < 3) {
        e.preventDefault();
        validatorNum = 0;
    }
    if (paymentTypeOptions[3].selected && validatorNum < 3) {
        e.preventDefault();
        validatorNum = 0;
    }
});

//Parameters set for if a field was valid or not. Also adds to the counter for the form submit
const validator = (valid, element) => {
    if (valid) {
        validatorNum++;
        element.parentElement.classList.add('valid');
        element.parentElement.classList.remove('not-valid');
        element.parentElement.lastElementChild.style.display = 'none';
    } else {
        element.parentElement.classList.add('not-valid');
        element.parentElement.classList.remove('valid');
        element.parentElement.lastElementChild.style.display = 'block';
    }
    return validator;
}

//Validation code for all fields
const validateName = () => {
    const nameValue = nameElement.value.trim();
    const nameIsValid = /^[a-z ,.'-]+$/i.test(nameValue);
    if (nameIsValid) {
        validator(nameIsValid, nameElement);
    } else {
        validator(nameIsValid, nameElement);
    }
}

const validateEmail = () => {
    const emailValue = email.value;
    const emailIsValid = /^[^@]+@[^@.]+\.[a-z]+$/i.test(emailValue);
    validator(emailIsValid, email);
    return emailIsValid;
}

const validateActivities = () => {
    const activitiesIsValid = activitiesChecked > 0;
    if (activitiesIsValid) {
        validatorNum++;
        activities.firstChild.nextSibling.classList.add('valid');
        activities.firstChild.nextSibling.classList.remove('not-valid');
        activities.lastElementChild.style.display = 'none';
    } else {
        activities.firstChild.nextSibling.classList.add('not-valid');
        activities.firstChild.nextSibling.classList.remove('valid');
        activities.lastElementChild.style.display = 'block';
    }
    return activitiesIsValid;
}

const validateCreditCardNumber = () => {
    const creditCardValue = creditCard.value;
    const creditCardIsValid = /^[^@-\s]{13,16}$/.test(creditCardValue);
    validator(creditCardIsValid, creditCard);
    return creditCardIsValid;
}

const validateZipCode = () => {
    const zipCodeValue = zipCode.value;
    const zipCodeIsValid = /^[^@-]{5}$/.test(zipCodeValue);
    validator(zipCodeIsValid, zipCode);
    return zipCodeIsValid;
}

const validateCVV = () => {
    const cvvValue = cvv.value;
    const cvvIsValid = /^[^@-]{3}$/.test(cvvValue);
    validator(cvvIsValid, cvv);
    return cvvIsValid;
}
