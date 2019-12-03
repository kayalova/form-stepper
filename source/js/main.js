const forms = [...document.querySelectorAll(".form")]
const formContainer = document.querySelector('.form-wrapper')
const btnContainer = document.querySelector('.btn-wrapper')
const successMsg = document.querySelector('.success-container')

const btnNext = document.querySelector("#next")
const btnPrev = document.querySelector("#prev")
const btnSend = document.querySelector("#send")

const formStepper = new FormStepper(forms)

btnPrev.addEventListener('click', () => {
    formStepper.prev()
    updateFormView(formStepper)
    updateButtonView(formStepper)
})

btnNext.addEventListener('click', () => {
    const { index, forms } = formStepper
    const isValid = isValidForm(forms[index])

    if (!isValid)
        return showErrorText(forms[index]);

    formStepper.next(isValid)
    updateFormView(formStepper)
    updateButtonView(formStepper)
})

btnSend.addEventListener('click', () => {
    const { index, forms } = formStepper
    const isValid = isValidForm(forms[index])

    if (!isValid)
        return showErrorText(forms[index]);

    hideForms()
    showSuccessMsg()
})

forms.forEach(form => {
    form.addEventListener('input', ({ target }) => {
        let { index, forms } = formStepper
        if (form === forms[index]) {
            removeErrorText(target)
        }
    })
})

function showSuccessMsg() {
    successMsg.classList.remove('hidden');
}

function hideForms() {
    formContainer.classList.add('hidden')
    btnContainer.classList.add('hidden')
}

function removeErrorText(input) {
    const errorText = input.nextElementSibling
    errorText.classList.add('transparent')
}

function showErrorText(form) {
    const inputs = getInvalidInputs(form)
    const checkboxes = getInvalidCheckbox(form);

    [...inputs, ...checkboxes].forEach(addErrorStyle)
}

function addErrorStyle(input) {
    const errorText = input.nextElementSibling;
    errorText.classList.remove('transparent')
}

function getInvalidCheckbox(form) {
    return [...form.elements].filter(elem => elem.type === 'checkbox' && !elem.checked)
}

function getInvalidInputs(form) {
    const inputs = [...form.querySelectorAll('[required]')]
    return inputs.filter(input => input.value.trim().length === 0)
}

function updateButtonView(stepper) {
    const { forms, index } = stepper
    btnPrev.disabled = index === 0

    if (btnPrev.disabled) {
        btnPrev.classList.add('disabled')
    }
    else {
        btnPrev.classList.contains('disabled') ? btnPrev.classList.remove('disabled') : null
    }

    if (index === forms.length - 1) {
        btnNext.classList.add('hidden')
        btnSend.classList.remove('hidden')
    }
    else {
        btnNext.classList.contains('hidden') ? btnNext.classList.remove('hidden') : null
        btnSend.classList.add('hidden')

    }

}

function updateFormView(stepper) {
    const { index, forms } = stepper
    forms.forEach(form => {
        if (form === forms[index]) {
            form.classList.add('form__active')
        }
        else {
            form.classList.contains('form__active') ? form.classList.remove('form__active') : null
        }
    })
}

function isValidForm(form) {
    let isValid = true

    const invalidInputs = getInvalidInputs(form);
    const invalidCheckboxes = getInvalidCheckbox(form);

    if (invalidInputs.length > 0 || invalidCheckboxes.length > 0) {
        isValid = false;
    }

    return isValid;
}
