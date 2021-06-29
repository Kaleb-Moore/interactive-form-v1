
const shirtDesign = document.getElementById('design');
const shirtDesignOptions = document.querySelectorAll('#design option');
const shirtColor = document.getElementById('color');
const shirtColorOptions = document.querySelectorAll('#color option');

const jobRoleDropDown = document.getElementById('title');
const otherField = document.getElementById('other-job-role');

const activities = document.getElementById('activities');
const activitiesOptions = document.querySelectorAll('#activities-box label input')

let cost = 0;

//When page load set cursor inside Name field
document.getElementById('name').focus();

//Set page defaults
shirtColor.setAttribute('disabled', true);
otherField.hidden = true;

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

activities.addEventListener('change', (e) => {
    const checkedCost = parseInt(e.target.getAttribute('data-cost'));
    let updatedCost = document.getElementById('activities-cost');

    if (e.target.checked) {
        cost += checkedCost;
        updatedCost.innerHTML = `Total: $${cost}`;
    } else {
        cost -= checkedCost;
        updatedCost.innerHTML = `Total: $${cost}`;
    }
});