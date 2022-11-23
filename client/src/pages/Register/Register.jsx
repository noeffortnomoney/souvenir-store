import './Register.scss';
import { Person } from '@mui/icons-material';
import HttpsIcon from '@mui/icons-material/Https';
import EmailIcon from '@mui/icons-material/Email';
import ErrorIcon from '@mui/icons-material/Error';
import { useRef } from 'react';

const Register = () => {
	const PF = process.env.REACT_APP_PUBLIC_FOLDER;
	const username = useRef('');
	const email = useRef('');
	const password = useRef('');
	const cfpassw = useRef('');

	const handleSubmit = (e) => {
		e.preventDefault();
		if (!username.current.value) {
			document.querySelector('.error.username-error').style.visibility =
				'visible';
		} else {
			document.querySelector('.error.username-error').style.visibility =
				'hidden';
		}
		if (!email.current.value) {
			document.querySelector('.error.email-error').style.visibility =
				'visible';
		} else {
			if (
				!/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(
					email.current.value
				)
			) {
				document.querySelector('.error.email-error .log').innerHTML =
					'Email is not valid';
				document.querySelector('.error.email-error').style.visibility =
					'visible';
			} else {
				document.querySelector('.error.email-error').style.visibility =
					'hidden';
			}
		}

		if (!password.current.value) {
			document.querySelector('.error.password-error').style.visibility =
				'visible';
		} else {
			document.querySelector('.error.password-error').style.visibility =
				'hidden';
		}

		if (password.current.value !== cfpassw.current.value) {
			document.querySelector('.error.cfpassw-error').style.visibility =
				'visible';
		} else {
			document.querySelector('.error.cfpassw-error').style.visibility =
				'hidden';
		}
	};

	return (
		<div
			className='wrapper'
			style={{ backgroundImage: `url(${PF + '/background.png'})` }}>
			<div className='main'>
				<form action='post' className='form'>
					<span className='title'>Register</span>
					<div className='wrap-input'>
						<span className='label'>Username</span>
						<div className='input-field'>
							<Person className='icon' />
							<input
								type='text'
								name='username'
								placeholder='Type your username'
								className='input'
								ref={username}
							/>
							<div className='error username-error'>
								<span className='log'>
									Username is required
								</span>
								<ErrorIcon className='err-icon' />
							</div>
						</div>
					</div>
					<div className='wrap-input'>
						<span className='label'>Email</span>
						<div className='input-field'>
							<EmailIcon className='icon' />
							<input
								type='text'
								name='username'
								placeholder='Type your email'
								className='input'
								ref={email}
							/>
							<div className='error email-error'>
								<span className='log'>Email is required</span>
								<ErrorIcon className='err-icon' />
							</div>
						</div>
					</div>
					<div className='wrap-input'>
						<span className='label'>Password</span>
						<div className='input-field'>
							<HttpsIcon className='icon' />
							<input
								type='text'
								name='username'
								placeholder='Type your password'
								className='input'
								ref={password}
							/>
							<div className='error password-error'>
								<span className='log'>
									Password is required
								</span>
								<ErrorIcon className='err-icon' />
							</div>
						</div>
					</div>
					<div className='wrap-input'>
						<span className='label'>Confirm password</span>
						<div className='input-field'>
							<HttpsIcon className='icon' />
							<input
								type='text'
								name='username'
								placeholder='Type again password'
								className='input'
								ref={cfpassw}
							/>
							<div className='error cfpassw-error'>
								<span className='log'>
									Password is not match
								</span>
								<ErrorIcon className='err-icon' />
							</div>
						</div>
					</div>
					<div className='forgot-pass'>
						<span>Forgot password?</span>
					</div>
					<div className='btn-container'>
						<div className='wrap-btn'>
							<div className='btn-bg'></div>
							<button onClick={(e) => handleSubmit(e)}>
								Register
							</button>
						</div>
					</div>
				</form>
			</div>
		</div>
	);
};

export default Register;
