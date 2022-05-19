import { useState } from 'react'

//utils
function isRequired(value) {
	return value != null && value.trim().length > 0
}

function minLength(value, min) {
	return isRequired(value) && value.trim().length >= min
}

function emailPattern(value) {
	const pattern = /^[^@ ]+@[^@ ]+\.[^@ .]{2,}$/
	return isRequired(value) && pattern.test(value.trim())
}

// validator
const validations = [
	({ email }) => emailPattern(email) || { email: 'Email is invalid' },
	({ email }) => isRequired(email) || { email: 'Email is required' },
	({ password }) => minLength(password, 5) || { password: 'Too short. Must be 5 or more' },
	({ password }) => isRequired(password) || { password: 'Password is required' },
]

function validate(validations, values) {
	const errors = validations
		.map(validation => validation(values))
		.filter(validation => typeof validation === 'object')

	// console.log({ values, errors })
	return { isValid: errors.length === 0, errors: errors.reduce((errors, error) => ({ ...errors, ...error }), {}) }
}

function initialize(name, initialState) {
	return function () {
		return validate(validations, initialState)[name]
	}
}

export function useForm(initialState = {}) {
	const [inputs, setInputs] = useState(initialState)
	const [isValid, setValid] = useState(false) // useState(initialize('isValid', initialState))
	const [errors, setErrors] = useState({}) // useState(initialize('errors', initialState))
	const [touched, setTouched] = useState({})

	const handleSubmit = callback => e => {
		e?.preventDefault()
		const { isValid: _isValid, errors: _errors } = validate(validations, inputs)
		setValid(_isValid)
		setErrors(_errors)

		if (_isValid) {
			callback?.(inputs, e)
		}
	}

	const onChange = e => {
		e.persist()

		setInputs(_inputs => ({
			..._inputs,
			[e.target.name]: e.target.value,
		}))
		setTouched(_touched => ({ ..._touched, [e.target.name]: true }))
	}

	return {
		onChange,
		handleSubmit,
		inputs,
		isValid,
		errors,
		touched,
	}
}
