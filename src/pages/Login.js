import { User, Lock1, StatusUp } from 'iconsax-react'
import { ReactComponent as LogoSvg } from '../assets/brand/logo.svg'
import { useForm } from '../hooks/useForm'
import { useAuth } from '../hooks/useAuth'

function Login() {
	const { inputs, onChange, handleSubmit, errors } = useForm({
		email: '',
		password: '',
	})

	const { login } = useAuth()

	const loginAdmin = (data, e) => {
		login(data)
	}

	return (
		<div className="bg-base-200 flex relative min-h-screen items-center">
			<div className="mx-auto max-w-lg py-6 px-4 z-10">
				<form
					noValidate
					onSubmit={handleSubmit(loginAdmin)}
					className="ds-card w-full rounded-3xl bg-base-100 shadow-lg shadow-primary/10 dark:shadow-none dark:border dark:border-base-content/10"
				>
					<div className="ds-card-body">
						<div className="flex flex-col items-center">
							<span className="w-20 h-20 p-4 mb-4 rounded-full bg-primary text-primary-content">
								<LogoSvg className="fill-current" />
							</span>
							<h1 className="text-3xl font-semibold">Admin Login</h1>
							<p className="text-lg opacity-75">Use your credentials to gain access.</p>
						</div>
						<div className="ds-form-control">
							<label htmlFor="form-email" className="ds-label">
								Email
							</label>
							<div className="relative">
								<input
									name="email"
									id="form-email"
									type="email"
									placeholder="admin@demo.com"
									className={`ds-input ds-input-bordered w-full pr-12${
										errors.email ? ' ds-input-error' : ''
									}`}
									value={inputs.email}
									onChange={onChange}
								/>
								<label
									htmlFor="form-email"
									className="absolute inset-y-0 inline-flex items-center right-4"
								>
									<User variant="TwoTone" />
								</label>
							</div>
							{errors.email && <p className="text-sm text-error mt-1">{errors.email}</p>}
						</div>
						<div className="ds-form-control">
							<label htmlFor="form-password" className="ds-label">
								Password
							</label>
							<div className="relative">
								<input
									name="password"
									id="form-password"
									type="password"
									placeholder="password"
									className={`ds-input ds-input-bordered w-full pr-12${
										errors.password ? ' ds-input-error' : ''
									}`}
									value={inputs.password}
									onChange={onChange}
								/>
								<label
									htmlFor="form-password"
									className="absolute inset-y-0 inline-flex items-center right-4"
								>
									<Lock1 variant="TwoTone" />
								</label>
							</div>
							{errors.password && <p className="text-sm text-error mt-1">{errors.password}</p>}
						</div>
						<div className="ds-card-actions pt-4 justify-center">
							<button
								type="submit"
								className="ds-btn ds-btn-primary ds-btn-block"
								// disabled={(touched.email || touched.password) && !isValid}
							>
								Log In
							</button>
						</div>
					</div>
				</form>
				<p className="text-sm opacity-40 text-center pt-4">
					Developed and maintained by Group 3 for SH5.0 Internship Capstone.
				</p>
				<p className="font-medium text-sm opacity-40 text-center pt-0">💙 2022</p>
			</div>
			<Lock1 className="absolute w-32 h-32 opacity-10 hover:opacity-20 rotate-45 top-40 left-20 transition-opacity" />
			<StatusUp className="absolute w-32 h-32 opacity-10 hover:opacity-20 -rotate-12 bottom-40 right-10 transition-opacity" />
		</div>
	)
}

export default Login
