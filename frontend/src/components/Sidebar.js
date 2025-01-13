import React, { useState, useEffect, useContext, useRef } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { CgProfile } from "react-icons/cg";
import { CiLogin } from "react-icons/ci";
import { MdRestaurantMenu } from "react-icons/md";
import { FiShoppingCart } from "react-icons/fi";
import { CartContext } from '../context/CartContext';
import './Sidebar.css'
export default function Sidebar() {
    const { isLoggedIn, cart } = useContext(CartContext)
    const [isSidebarClicked, setIsSidebarClicked] = useState(false);
    const [expanded, setExpanded] = useState(false);
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
                        !isLoggedIn &&
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
                                    <MdRestaurantMenu />
                                </div>
                                <div className=''>
                                    Menu
                                </div>
                            </div>
                        </Link>
                        <Link to='/cart' onClick={handleSidebarClick}>
                            <div className={`flex items-center relative gap-4 px-4 py-1 rounded-md ${location.pathname === '/createpost' ? 'bg-zinc-100' : ''}`}>
                                <div className='text-[1.4rem]'>
                                    <FiShoppingCart />
                                </div>
                                <div className='border border-black rounded-full text-center absolute top-[-0.5rem] left-[1.6rem] w-[1.1rem] text-[0.7rem] bg-gray-100'>{cart.length}</div>
                                <div>
                                    Cart
                                </div>
                            </div>
                        </Link>
                        <div className={`flex items-center gap-4 px-4 py-1 rounded-md ${location.pathname === '/profile/myblogs' ? 'bg-zinc-100' : ''}`}>
                            <div className='text-[1.2rem]'>
                                <CgProfile />
                            </div>
                            <div >
                                {
                                    isLoggedIn ?
                                        localStorage.getItem('name')
                                        :
                                        <div>
                                            Profile
                                        </div>
                                }
                            </div>
                        </div>
                        {
                            !isLoggedIn &&
                            <Link to='/login' onClick={handleSidebarClick}>
                                <button className={` w-full flex items-center gap-4 px-4 py-1 ${location.pathname === '/Signin' ? 'bg-zinc-100' : ''}`}>
                                    <div className='text-[1.2rem]'>
                                        <CiLogin />
                                    </div>
                                    <div>
                                        Log in
                                    </div>
                                </button>
                            </Link>

                        }
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
