/**
 * Adapted from https://github.com/gitdagray/react_hooks_axios
 */

import { useState, useEffect } from 'react'
import axios from 'axios'

export function useAxios() {
	const [response, setResponse] = useState([])
	const [error, setError] = useState('')
	const [loading, setLoading] = useState(false)
	const [controller, setController] = useState()

	const axiosFetch = async configObj => {
		const { method = 'get', url, requestConfig = {} } = configObj

		try {
			setLoading(true)
			const ctrl = new AbortController()
			setController(ctrl)
			const res = await axios[method.toLowerCase()](url, {
				...requestConfig,
				signal: ctrl.signal,
			})
			// console.log(res)
			setResponse(res.data)
		} catch (err) {
			// console.log(err.message)
			setError(err.message)
		} finally {
			setLoading(false)
		}
	}

	useEffect(() => {
		// console.log(controller)

		// useEffect cleanup function
		return () => controller && controller.abort()
	}, [controller])

	return { response, error, loading, axiosFetch }
}
