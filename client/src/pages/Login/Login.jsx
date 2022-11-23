import './Login.scss';
import { Person } from '@mui/icons-material';
import HttpsIcon from '@mui/icons-material/Https';
import ErrorIcon from '@mui/icons-material/Error';
import { useRef } from 'react';

const Login = () => {
	const PF = process.env.REACT_APP_PUBLIC_FOLDER;
	const username = useRef('');
	const password = useRef('');

	const handleSubmit = (e) => {
		e.preventDefault();
		if (!username.current.value) {
			document.querySelector('.error.username-error').style.visibility =
				'visible';
		} else {
			document.querySelector('.error.username-error').style.visibility =
				'hidden';
		}
		if (!password.current.value) {
			document.querySelector('.error.password-error').style.visibility =
				'visible';
		} else {
			document.querySelector('.error.password-error').style.visibility =
				'hidden';
		}
	};
	return (
		<div
			className='wrapper'
			style={{ backgroundImage: `url(${PF + '/background.png'})` }}>
			<div className='main'>
				<form action='post' className='form'>
					<span className='title'>Login</span>
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
						<span className='label'>Password</span>
						<div className='input-field'>
							<HttpsIcon className='icon' />
							<input
								type='password'
								name='username'
								placeholder='Type your username'
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
					<div className='forgot-pass'>
						<span>Forgot password?</span>
					</div>
					<div className='btn-container'>
						<div className='wrap-btn'>
							<div className='btn-bg'></div>
							<button onClick={(e) => handleSubmit(e)}>
								Login
							</button>
						</div>
					</div>
				</form>
			</div>
		</div>
	);
};

export default Login;
