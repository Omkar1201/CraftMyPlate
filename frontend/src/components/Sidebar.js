import React, { useState, useEffect, useContext, useRef } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { CgProfile } from "react-icons/cg";
import { IoWarningOutline } from "react-icons/io5";
import Modal from 'react-modal';
import { GoSignOut } from "react-icons/go";
import { IoMdCreate } from "react-icons/io";
import { GoHome } from "react-icons/go";
import { CiLogin } from "react-icons/ci";
import { TiUserDelete } from 'react-icons/ti';
import { AiOutlineUserDelete } from 'react-icons/ai';
import './Sidebar.css'
export default function Sidebar() {
    const isloggedin = true
    const [isSidebarClicked, setIsSidebarClicked] = useState(false);
    const [expanded, setExpanded] = useState(false);
    const [signoutModalIsOpen, setSignoutModalIsOpen] = useState(false);
    const [deletAccount, setdeleteAccount] = useState(false)
    const location = useLocation()
    const sidebarRef = useRef(null);

    const handleSidebarClick = () => {
        setIsSidebarClicked(!isSidebarClicked);
        setExpanded(!expanded);
    };

    useEffect(() => {
        if (expanded) {
            document.body.classList.add('no-scroll');
        } else {
            document.body.classList.remove('no-scroll');
        }
    }, [expanded]);

    const handleClickOutside = (event) => {
        if (sidebarRef.current && !sidebarRef.current.contains(event.target)) {
            setIsSidebarClicked(false);
            setExpanded(false);
        }
    };

    useEffect(() => {
        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
        // eslint-disable-next-line
    }, []);

    return (
        <div ref={sidebarRef}>
            <div className={`animated-div z-10 ${expanded ? 'expanded' : ''} top-[5rem] left-0 absolute h-screen border bg-white overflow-auto`}>
                <div className="py-4 px-3">
                    {
                        !isloggedin &&
                        <div className=''>
                            <Link to='/register' onClick={handleSidebarClick}>
                                <button className='border w-full px-4 py-1 bg-black text-white font-semibold'>
                                    Register
                                </button>
                            </Link>
                        </div>
                    }
                    <div className=' my-8 flex flex-col gap-4 font-semibold text-start'>
                        <Link to='/' onClick={handleSidebarClick}>
                            <div className={`flex items-center gap-4 px-4 py-1 rounded-md  ${location.pathname === '/' ? 'bg-zinc-100' : ''}`}>
                                <div className='text-[1.2rem]'>
                                    <GoHome />
                                </div>
                                <div className=''>
                                    Home
                                </div>
                            </div>
                        </Link>
                        <Link to='/createpost' onClick={handleSidebarClick}>
                            <div className={`flex items-center gap-4 px-4 py-1 rounded-md ${location.pathname === '/createpost' ? 'bg-zinc-100' : ''}`}>
                                <div className='text-[1.2rem]'>
                                    <IoMdCreate />
                                </div>
                                <div>
                                    Create post
                                </div>
                            </div>
                        </Link>
                        <Link to='/profile/myblogs' onClick={handleSidebarClick}>
                            <div className={`flex items-center gap-4 px-4 py-1 rounded-md ${location.pathname === '/profile/myblogs' ? 'bg-zinc-100' : ''}`}>
                                <div className='text-[1.2rem]'>
                                    <CgProfile />
                                </div>
                                <div >
                                    {
                                        isloggedin ?
                                            localStorage.getItem('username')
                                            :
                                            <div>
                                                Profile
                                            </div>
                                    }
                                </div>
                            </div>
                        </Link>

                        {
                            isloggedin ? (
                                <>
                                    <button onClick={() => { setSignoutModalIsOpen(true); handleSidebarClick() }} className={` w-full flex items-center gap-4 px-4 py-1 rounded-md ${location.pathname === '/Signin' ? 'bg-zinc-100' : ''}`}>
                                        <div className='text-[1.2rem]'>
                                            <GoSignOut />
                                        </div>
                                        <div>
                                            Sign Out
                                        </div>
                                    </button>
                                    <button className={`w-full flex items-center gap-4 px-4 py-1 rounded-md text-white active:bg-red-600 bg-red-500`} onClick={() => { setdeleteAccount(true); handleSidebarClick() }}>
                                        <div className='text-[1.2rem]'>
                                            <TiUserDelete />
                                        </div>
                                        <div>
                                            Delete Account
                                        </div>
                                    </button>
                                </>
                            ) :
                                (
                                    <Link to='/Signin' onClick={handleSidebarClick}>
                                        <button className={` w-full flex items-center gap-4 px-4 py-1 ${location.pathname === '/Signin' ? 'bg-zinc-100' : ''}`}>
                                            <div className='text-[1.2rem]'>
                                                <CiLogin />
                                            </div>
                                            <div>
                                                Log in
                                            </div>
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
                                    setSignoutModalIsOpen(false);
                                }} className='border px-3 rounded-md border-gray-300 font-semibold py-1 hover:bg-gray-100'>Sign Out</button>
                                <button onClick={() => setSignoutModalIsOpen(false)} className='border px-3 rounded-md hover:bg-gray-100 border-gray-300 font-semibold py-1'>Cancel</button>
                            </div>
                        </Modal>

                        {/* Delete account modal */}
                        <Modal
                            isOpen={deletAccount}
                            onRequestClose={() => setdeleteAccount(false)}
                            contentLabel="delte account Confirmation"
                            className='custom-modal'
                        >
                            <h2 className=' text-[1.2rem] font-semibold flex items-center gap-4'><span className='text-[1.7rem] text-red-600 flex justify-center items-center rounded-full p-1 bg-red-200'><AiOutlineUserDelete /></span>Are you sure you want to Delete Account?</h2>
                            <div className='flex gap-4'>
                                <button onClick={() => {
                                    setdeleteAccount(false);
                                }} className='border px-3 bg-red-500 text-white rounded-md border-gray-300 font-semibold py-1 hover:bg-red-600'>Delete Account</button>
                                <button onClick={() => setdeleteAccount(false)} className='border px-3 rounded-md hover:bg-gray-100 border-gray-300 font-semibold py-1'>Cancel</button>
                            </div>
                        </Modal>
                    </div>

                </div>
            </div>
            <div className='flex  flex-col gap-[0.4rem] cursor-pointer' onClick={handleSidebarClick}>
                {isSidebarClicked ? (
                    <div className='w-[1.7rem] border-black'>
                        <svg
                            className='h-8 w-8'
                            fill='none'
                            viewBox='0 0 24 24'
                            stroke='currentColor'
                        >
                            <path
                                strokeLinecap='round'
                                strokeLinejoin='round'
                                strokeWidth={2}
                                d='M6 18L18 6M6 6l12 12'
                            />
                        </svg>
                    </div>
                ) : (
                    <>
                        <div className='w-[1.5rem] border border-black'></div>
                        <div className='w-[1.5rem] border border-black'></div>
                        <div className='w-[1.5rem] border border-black'></div>
                    </>
                )}
            </div>
        </div>
    );
}
