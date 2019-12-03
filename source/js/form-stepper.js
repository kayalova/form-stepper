class FormStepper {

    constructor(forms) {
        this.forms = forms;
        this.index = 0;
    }

    isLast() {
        return this.index === this.forms.length - 1;
    }

    isFirst() {
        return this.index === 0;
    }

    next() {
        if (!this.isLast()) {
            this.index += 1;
            return this.forms[this.index]
        }
    }

    prev() {
        if (!this.isFirst()) {
            this.index -= 1;
            return this.forms[this.index]
        }
    }
}
