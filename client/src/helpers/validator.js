export default class Validator {

    validate(e, validateForm, formData = null) {

        const { name, value, type, checked, files, options, multiple } = e.target;

        if (multiple) {
            // Handle multi-select change
            const selectedValues = [];
            for (let i = 0; i < options.length; i++) {
                if (options[i].selected) {
                    selectedValues.push(options[i].value);
                }
            }

            return {
                formData: { [name]: selectedValues },
                error: { [name]: validateForm(name, selectedValues) }
            }
        }

        if (type === 'checkbox') {

            // Special condition for single checkbox
            if (name === 'status') {
                return {
                    formData: { [name]: value },
                    error: { [name]: validateForm(name, value) }
                }
            }

            const error = validateForm(name, value)
            const newFormData = { ...formData }

            if (checked) {
                newFormData[name] = [...(newFormData[name] || []), value]
            } else {
                newFormData[name] = (newFormData[name] || []).filter((val) => val !== value)
            }

            return { formData: newFormData, error: { [name]: error } }

        } else if (type === 'file') {
            const file = files[0]
            const error = validateForm(name, file)
            return {
                formData: { [name]: file },
                error: { [name]: error }
            }
        } else {
            const error = validateForm(name, value)
            return {
                formData: { [name]: value },
                error: { [name]: error }
            }
        }
    }

    submit(formData, validateForm) {
        const updatedErrors = {}
        Object.entries(formData).forEach(([key, value]) => {
            updatedErrors[key] = validateForm(key, value)
        })
        const allErrorsFalse = Object.values(updatedErrors).every(error => error === false)

        if (allErrorsFalse) {
            return formData
        }

        return { errors: updatedErrors }
    }

    submitFile(formData, validateForm) {
        const updatedErrors = Object.fromEntries(
            Object.entries(formData).map(([key, value]) => [key, validateForm(key, value)])
        )

        const allErrorsFalse = Object.values(updatedErrors).every(error => error === false)

        if (allErrorsFalse) {
            const newFormData = new FormData()
            Object.entries(formData).forEach(([key, value]) => {
                newFormData.append(key, value)
            })
            return newFormData
        }

        return { errors: updatedErrors }

    }

}
