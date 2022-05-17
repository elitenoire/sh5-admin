/**
 * Adapted from
 * https://github.com/Malik-Idrees/react-tailwind-sidebar-darkmode/
 */

import { createContext, useContext, useEffect, useState, useMemo, useCallback } from 'react'

const KEY_COLOR_SCHEME = 'color-scheme'

const SCHEME_MAP = {
	light: false,
	dark: true,
}

const MODE_MAP = {
	0: 'light',
	1: 'dark',
}

const getInitialMode = (key, initialMode) => () => {
	if (typeof window !== 'undefined' && window.localStorage) {
		// checks for a previous user preference in localStorage, and uses the browser's color scheme as a backup:
		const userScheme = window.localStorage.getItem(key)
		if (typeof userScheme === 'string') {
			return SCHEME_MAP[userScheme] || false
		}

		const userMedia = window.matchMedia('prefers-color-scheme:dark')
		if (userMedia.matches) {
			return true // 'dark'
		}
		return initialMode // false -> light theme as the default;
	}
}

const applyDarkMode = (key, mode) => {
	const root = window.document.documentElement
	// const isDark = rawColorScheme === 'dark'
	const _scheme = MODE_MAP[Number(mode)]

	root.classList.remove(MODE_MAP[Number(!mode)])
	root.classList.add(_scheme)
	// support daisyui
	root.setAttribute('data-theme', _scheme)
	localStorage.setItem(key, _scheme)
}

const DarkModeContext = createContext()

export const DarkMode = ({ key = KEY_COLOR_SCHEME, initialMode = false, children }) => {
	const [darkMode, setDarkMode] = useState(getInitialMode(key, initialMode))

	const toggle = useCallback(() => {
		setDarkMode(_mode => !_mode)
	}, [])

	const value = useMemo(
		() => ({
			darkMode,
			toggle,
		}),
		[darkMode, toggle]
	)

	useEffect(() => {
		applyDarkMode(key, darkMode)
	}, [key, darkMode])

	return <DarkModeContext.Provider value={value}>{children}</DarkModeContext.Provider>
}

export function useDarkMode() {
	return useContext(DarkModeContext)
}
