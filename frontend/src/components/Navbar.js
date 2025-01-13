import React, { useContext, useState, useRef } from 'react'
import { useLocation, useNavigate, Link } from 'react-router-dom';
import { CgProfile } from "react-icons/cg";
import { BsSearch } from "react-icons/bs"
import Modal from 'react-modal';
import { GoSignOut } from "react-icons/go";
import { TiUserDelete } from "react-icons/ti";
import { PiUserThin } from "react-icons/pi";
import { IoWarningOutline } from "react-icons/io5";
import { AiOutlineUserDelete } from 'react-icons/ai';
import { FiShoppingCart } from "react-icons/fi";
import logo from '../images/CraftmyplateLogo.png'
import './Navbar.css'
import Sidebar from './Sidebar';
import { CartContext } from '../context/CartContext';

function Navbar() {
	const cur = new Date().toLocaleDateString(undefined, { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })
	const { isLoggedIn, cart, menuItems, setTempMenuItems } = useContext(CartContext);
	const [profileModal, setprofileModal] = useState(false)
	const [signoutModalIsOpen, setSignoutModalIsOpen] = useState(false);
	const [deletAccount, setdeleteAccount] = useState(false)
	const [category, setcategory] = useState("")
	const profile = useRef(null)
	const location = useLocation()
	const navigate = useNavigate()

	const handleclickmobile = (event) => {
		event.preventDefault()
		setTempMenuItems(
			menuItems.filter((item) => (
				item.name.toLowerCase().includes(category.toLowerCase()))
			))
		navigate('/')
		window.scrollTo({
			top: 2100,
			behavior: 'smooth',
		})
	}	
	const handleclick = (event) => {
		event.preventDefault()
		setTempMenuItems(
			menuItems.filter((item) => (
				item.name.toLowerCase().includes(category.toLowerCase()) || item.category.toLowerCase().includes(category.toLowerCase()))
			))
		navigate('/')
		window.scrollTo({
			top: 910,
			behavior: 'smooth',
		})
	}
	return (
		<div className=''>
			<div className='flex sidebar-container justify-center items-center gap-4 relative'>
				<div className='hidden sidebar'>
					<Sidebar />
				</div>

				<div className='text-[2rem] items-center gap-4 fontsize flex text-center font-bold'>
					<div className='w-[3rem] hidden mobile-logo cursor-pointer' onClick={() => navigate('/')}><img src={logo} alt='logo'></img></div>
					CraftMyPlate
				</div>
				<div className=' social_icons absolute top-0 right-0 text-xs flex flex-col'>
					<div>{cur}</div>
				</div>
			</div>
			<div className=' mobile-navbar flex-wrap hidden justify-around my-4 font-semibold'>

				<Link to='/'>
					<button className={`${location.pathname === '/' ? 'bg-black text-white' : 'bg-zinc-100 text-black'} px-3  py-1 w-full`}>
						Menu
					</button>
				</Link>
				<Link to='/order'>
					<button className={`${location.pathname === '/order' ? 'bg-black text-white' : 'bg-zinc-100 text-black'} px-3  py-1 w-full`}>
						My Orders
					</button>
				</Link>
				{
					!isLoggedIn &&
					<Link to='/login'>
						<button className={`${location.pathname === '/login' ? ' bg-black text-white' : ''} border px-4 py-1 border-black text-black font-semibold`}>
							Log in
						</button>
					</Link>
				}
			</div>
			<form action="" onSubmit={handleclickmobile} className=' serach-bar px-4 hidden py-3 bg-gray-100 ' id='search_mobile'>
				<div className='border inputbar border-gray-500 bg-white shadow-xl flex h-12'>
					<input type='text' value={category} onChange={(e) => setcategory(e.target.value)} placeholder='Search...' className=' w-full bg-transparent outline-none px-2' />
					<button className=' p-4 bg-black text-white flex items-center justify-center '>
						<BsSearch />
					</button>
				</div>
			</form>
			<div className=' navbar flex justify-between border flex-wrap px-4 text-[1.1rem] shadow-lg min-h-[4rem]'>
				<div className='flex first-container gap-[4rem] items-center'>
					<div className='w-[4rem] cursor-pointer' onClick={() => navigate('/')}><img src={logo} alt='logo'></img></div>
					<ul className='flex gap-[3rem] middle-container font-semibold items-center flex-wrap'>
						<Link to='/'>
							<button className='group relative'>
								Menu
								<div className={`${location.pathname === '/' ? 'border-black' : 'border-transparent group-hover:border-gray-300 '}  border-2 absolute w-full`}></div>
							</button>
						</Link>
						<Link to='/order'>
							<button className='group relative'>
								My Orders
								<div className={`${location.pathname === '/order' ? 'border-black' : 'border-transparent group-hover:border-gray-300 '}  border-2 absolute w-full`}></div>
							</button>
						</Link>
					</ul>
				</div>
				<div className='flex justify-center flex-wrap last-container items-center gap-10'>
					<form action="" onSubmit={handleclick} id='search'>
						<div className='border flex-wrap border-grey-600 shadow-xl flex items-center cursor-pointer rounded-lg'>
							<input type='text' value={category} onChange={(e) => setcategory(e.target.value)} placeholder='Search...' className=' bg-transparent outline-none px-1' />
							<button className='ml-1 p-2 bg-black active:bg-slate-700 text-white rounded-r-lg '>
								<BsSearch />
							</button>
						</div>
					</form>
					<Link to='/cart'>
						<button className=' px-4 py-1 rounded-md relative' >
							<div className='text-[2rem] font-semibold'>
								<FiShoppingCart />
							</div>
							<div className='border absolute top-[-0.3rem] right-[0.5rem] animate-bounce w-[1.2rem] text-[0.7rem] rounded-full border-black'>{cart.length}</div>
						</button>
					</Link>

					{
						isLoggedIn ? (
							<div ref={profile} className=' flex flex-col items-center group cursor-pointer'>
								<div className={`text-[2rem] w-fit group-hover:bg-gray-200`}>
									<CgProfile />
								</div>
								<div className={`text-[0.7rem]  ${location.pathname === '/profile/myblogs' ? 'font-semibold' : 'font-thin'}`}>
									{
										localStorage.getItem('name') ? localStorage.getItem('name').charAt(0).toUpperCase() + localStorage.getItem('name').slice(1) : "user"
									}
								</div>
								<div className={` z-10 custom-profile-modal ${profileModal ? 'flex' : 'hidden'} absolute top-[7.15rem] right-0 flex-col gap-5 items-start`} >
									<Link to='/profile/myblogs' className='w-full' onClick={() => setprofileModal(false)}>
										<button className={`flex items-center gap-4 px-1 w-full py-1 hover:bg-gray-100 ${location.pathname === '/profile/myblogs' ? 'bg-gray-100 hover:bg-gray-200' : ''} rounded-md`}>
											<div>
												<PiUserThin />
											</div>
											<div>
												Myblogs
											</div>
										</button>
									</Link>
									<button onClick={() => setSignoutModalIsOpen(true)} className={`flex items-center gap-4 px-1 w-full py-1 hover:bg-gray-100 rounded-md`}>
										<div>
											<GoSignOut />
										</div>
										<div>
											Sign Out
										</div>
									</button>
									<button className={`flex items-center gap-4 px-1 w-full py-1 hover:bg-red-500 rounded-md hover:text-white`} onClick={() => setdeleteAccount(true)}>
										<div className='text-[1.2rem]'>
											<TiUserDelete />
										</div>
										<div>
											Delete Account
										</div>
									</button>
								</div>
							</div>
						) :
							(

								<Link to='/login'>
									<button className=' hover:bg-black hover:text-white border px-4 py-1 bg-zinc-200 text-black font-semibold rounded-md'>
										Log in
									</button>
								</Link>
							)
					}

					<Modal
						isOpen={signoutModalIsOpen}
						onRequestClose={() => setSignoutModalIsOpen(false)}
						contentLabel="Sign Out Confirmation"
						className='custom-modal'
					>
						<h2 className=' text-[1.2rem] font-semibold flex items-center gap-4'><span className='text-[1.7rem] text-yellow-600 flex justify-center items-center rounded-full p-1 bg-yellow-100'><IoWarningOutline /></span>Are you sure you want to sign out?</h2>
						<div className='flex gap-4'>
							<button onClick={() => {
								// logout();
								setSignoutModalIsOpen(false);
								setprofileModal(false)
							}} className='border px-3 rounded-md border-gray-300 font-semibold py-1 hover:bg-gray-100'>Sign Out</button>
							<button onClick={() => setSignoutModalIsOpen(false)} className='border px-3 rounded-md hover:bg-gray-100 border-gray-300 font-semibold py-1'>Cancel</button>
						</div>
					</Modal>

					{/* Delte account modal */}
					<Modal
						isOpen={deletAccount}
						onRequestClose={() => setdeleteAccount(false)}
						contentLabel="delte account Confirmation"
						className='custom-modal'
					>
						<h2 className=' text-[1.2rem] font-semibold flex items-center gap-4'><span className='text-[1.7rem] text-red-600 flex justify-center items-center rounded-full p-1 bg-red-200'><AiOutlineUserDelete /></span>Are you sure you want to Delete Account?</h2>
						<div className='flex gap-4'>
							<button onClick={() => {
								// deleteMyAccount()
								setdeleteAccount(false);
							}} className='border px-3 bg-red-500 text-white rounded-md border-gray-300 font-semibold py-1 hover:bg-red-600'>Delete Account</button>
							<button onClick={() => setdeleteAccount(false)} className='border px-3 rounded-md hover:bg-gray-100 border-gray-300 font-semibold py-1'>Cancel</button>
						</div>
					</Modal>
				</div>
			</div>
		</div>
	)
}

export default Navbar