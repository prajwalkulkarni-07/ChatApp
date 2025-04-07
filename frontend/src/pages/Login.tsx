import { useState } from "react";
import { Link } from "react-router-dom";
import useLogin from "../hooks/useLogin";

const Login = () => {
	const [inputs, setInputs] = useState({
		username: "",
		password: "",
	});

	const { loading, login } = useLogin();

	const handleSubmitForm = (e: React.FormEvent) => {
		e.preventDefault();
		login(inputs.username, inputs.password);
	};

	return (
		<div className='flex flex-col items-center justify-center min-w-96 mx-auto'>
			<div className='login-container w-full'>
				<h1 className='text-3xl font-bold text-center mb-8'>
					Welcome to <span className='text-blue-500'>ChatApp</span>
				</h1>

				<form onSubmit={handleSubmitForm} className='space-y-6'>
					<div>
						<label className='label'>
							<span className='text-base label-text'>Username</span>
						</label>
						<input
							type='text'
							placeholder='Enter username'
							className='w-full input input-bordered h-10 input-style'
							value={inputs.username}
							onChange={(e) => setInputs({ ...inputs, username: e.target.value })}
						/>
					</div>

					<div>
						<label className='label'>
							<span className='text-base label-text'>Password</span>
						</label>
						<input
							type='password'
							placeholder='Enter Password'
							className='w-full input input-bordered h-10 input-style'
							value={inputs.password}
							onChange={(e) => setInputs({ ...inputs, password: e.target.value })}
						/>
					</div>

					<div>
						<button className='btn btn-block btn-primary' disabled={loading}>
							{loading ? (
								<span className='loading loading-spinner'></span>
							) : (
								"Login"
							)}
						</button>
					</div>
				</form>

				<div className='mt-6 text-center'>
					<Link
						to='/signup'
						className='text-sm hover:text-blue-500 transition-colors duration-200'
					>
						Don't have an account? Sign Up
					</Link>
				</div>
			</div>
		</div>
	);
};
export default Login;