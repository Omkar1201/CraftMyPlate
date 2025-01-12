import React, { useContext, useState } from 'react'
import { AiOutlineEye, AiOutlineEyeInvisible } from 'react-icons/ai'
import { Link, useNavigate } from 'react-router-dom';
import { FaRegUser } from "react-icons/fa6";
import { toast } from "react-toastify"
import axios from 'axios';
import { CartContext } from '../context/CartContext';

export default function Signin() {
	const {setisLoggedin}=useContext(CartContext)
	const [eye, seteye] = useState(true)
	const [user, setuser] = useState({ username: "", password: "" })
	const [btnloading, setbtnloading] = useState(false)
	const navigate=useNavigate()
	async function handlesubmit(event) {
		event.preventDefault();
		setbtnloading(true);
		try {
			const response = await axios.post(
				`${process.env.REACT_APP_BASE_URL}/login`,
				user,
				{
					headers: {
						'Content-Type': 'application/json',
					},
				}
			);

			if (response.data.success) {
				toast.success(`${response.data.message}`);
				setisLoggedin(true)
				localStorage.setItem("authToken", response.data.token);
				localStorage.setItem("name", response.data.username);
				navigate('/')
			} else {
				toast.warn(`${response.data.message}`);
			}
		} catch (err) {
			console.log(err.message);
		}
		setbtnloading(false);
	}
	function handleform(event) {
		setuser({
			...user,
			[event.target.name]: event.target.value
		})
	}
	return (
		<div className='flex items-center justify-center h-screen' >

			<div className='border-2 flex flex-col items-center duration-[0.5s] transition-all shadow-2xl gap-5 py-[4.2rem] px-[3rem] rounded-lg'>
				<h2 className='text-xl font-bold'>LOGIN</h2>
				<form onSubmit={handlesubmit} className=' flex flex-col items-center gap-5 rounded-lg' id='signinform'>

					<label>
						<h3 className=' text-black opacity-70 text-[0.9rem]'>Username</h3>
						<div className='border flex items-center w-fit px-1 py-[0.1rem] rounded-lg '>
							<input type='text' disabled={btnloading} required onChange={handleform} name='username' placeholder='test' className=' h-8 outline-none w-[16rem]' />
							<FaRegUser />
						</div>
					</label>
					<label>
						<h3 className=' text-black opacity-70 text-[0.9rem]'>Password</h3>
						<div className=' border flex items-center w-fit  px-2 py-[0.1rem] rounded-lg'>
							<input type={`${eye ? 'password' : 'text'}`} disabled={btnloading} required onChange={handleform} name='password' placeholder='test123' className='h-8 outline-none w-[16rem]' />
							<div onClick={() => seteye(!eye)} className=' cursor-pointer'>
								{
									eye ? <AiOutlineEye /> : <AiOutlineEyeInvisible />
								}
							</div>
						</div>
					</label>
					<div className='text-xs justify-between w-full flex'>
						<div className=''><label className='flex gap-1 appearance-none'><input type='checkbox' className='' />Remember me</label></div>
						<div className='cursor-pointer text-blue-900'>Forgot Password?</div>

					</div>
					<div className='relative'>
						<button className={`border ${btnloading ? 'opacity-30' : ''} w-[16rem] border bg-blue-500 text-white hover:bg-blue-600 font-semibold transition-all duration-[0.4] rounded-2xl px-2 py-1`} disabled={btnloading}>
							LogIn
						</button>
						{
							btnloading &&
							<div className='absolute top-2 left-[47.5%]'>
								{/* <Loading2 /> */}Loading2
							</div>
						}
					</div>
					{/* <button className=' w-[16rem] border bg-blue-500 text-white hover:bg-blue-600 font-semibold transition-all duration-[0.4] rounded-2xl px-2 py-1'>
						LogIn
					</button> */}
				</form>
				<div className='text-sm' disabled={btnloading}>
					Don't have an account? <Link to='/register'><span className='font-semibold hover:underline hover:text-blue-600 cursor-pointer text-blue-500'>Create Account</span></Link>
				</div>
			</div>
		</div>
	)
}
