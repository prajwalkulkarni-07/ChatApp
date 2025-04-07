import { Link } from "react-router-dom";
import GenderCheckbox from "../components/GenderCheckbox";
import { useState } from "react";
import useSignup from "../hooks/useSignup";

const SignUp = () => {
	const [inputs, setInputs] = useState({
		fullName: "",
		username: "",
		password: "",
		confirmPassword: "",
		gender: "",
	});
	const { loading, signup } = useSignup();

	const handleCheckboxChange = (gender: "male" | "female") => {
		setInputs({ ...inputs, gender });
	};

	const handleSubmitForm = (e: React.FormEvent) => {
		e.preventDefault();
		signup(inputs);
	};

	return (
		<div className='flex flex-col items-center justify-center min-w-96 mx-auto'>
			<div className='login-container w-full'>
				<h1 className='text-3xl font-bold text-center mb-8'>
					Join <span className='text-blue-500'>ChatApp</span>
				</h1>

				<form onSubmit={handleSubmitForm} className='space-y-6'>
					<div>
						<label className='label'>
							<span className='text-base label-text'>Full Name</span>
						</label>
						<input
							type='text'
							placeholder='John Doe'
							className='w-full input input-bordered h-10 input-style'
							value={inputs.fullName}
							onChange={(e) => setInputs({ ...inputs, fullName: e.target.value })}
						/>
					</div>

					<div>
						<label className='label'>
							<span className='text-base label-text'>Username</span>
						</label>
						<input
							type='text'
							placeholder='johndoe'
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
						<label className='label'>
							<span className='text-base label-text'>Confirm Password</span>
						</label>
						<input
							type='password'
							placeholder='Confirm Password'
							className='w-full input input-bordered h-10 input-style'
							value={inputs.confirmPassword}
							onChange={(e) => setInputs({ ...inputs, confirmPassword: e.target.value })}
						/>
					</div>

					<GenderCheckbox selectedGender={inputs.gender} onCheckboxChange={handleCheckboxChange} />

					<div>
						<button className='btn btn-block btn-primary' disabled={loading}>
							{loading ? (
								<span className='loading loading-spinner'></span>
							) : (
								"Sign Up"
							)}
						</button>
					</div>
				</form>

				<div className='mt-6 text-center'>
					<Link
						to='/login'
						className='text-sm hover:text-blue-500 transition-colors duration-200'
					>
						Already have an account? Login
					</Link>
				</div>
			</div>
		</div>
	);
};
export default SignUp;