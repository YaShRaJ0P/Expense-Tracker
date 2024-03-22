import React, { useState } from 'react'
import logo from "../images/logo.png"
import arrow from "../images/arrow.png"
import { Link } from 'react-router-dom'
export const Navbar = () => {
    const [rotate, setrotate] = useState('rotate-180')
    const rotateFunction = () => {
        rotate === 'rotate-180' ? setrotate('rotate-0') : setrotate('rotate-180');
    }
    return (
        <nav className='p-6 w-1/5 flex flex-col gap-10 text-white border-r-[1px] border-gray-500 border-opacity-40 border-dashed'>
            <div>
                <div className='flex justify-between'>
                    <img src={logo} alt="" className='w-8 h-8' />
                    <img src={arrow} alt="" className={`w-6 h-6 ${rotate} cursor-pointer`} onClick={rotateFunction} />
                </div>
            </div>
            <div className='w-full bg-[#002bbb] flex flex-row rounded-lg px-6 py-3 justify-between'>
                <div>
                    <img src={logo} alt="" className='w-8 h-8' />
                </div>
                <div className='font-bold text-xl'>
                    Yash Raj
                </div>
            </div>
            <div className='flex flex-col gap-3'>
                <div id="dashboard" className=' flex w-full items-center flex-row font-semibold gap-2 px-5 cursor-pointer'>
                    <Link to="/">
                        <div className="flex flex-row items-center gap-2">
                            <lord-icon
                                src="https://cdn.lordicon.com/fkaukecx.json"
                                trigger="loop-on-hover"
                                colors="primary:#ABA49E"
                                target="#dashboard"
                                className="w-8 h-8">
                            </lord-icon>
                            <p className='inline-block'>Dashboard</p>
                        </div>
                    </Link>
                </div>
                <div id="categories" className=' flex w-full items-center flex-row font-semibold gap-2 px-5 cursor-pointer'>
                    <Link to="/categories">
                        <div className="flex flex-row items-center gap-2">
                            <lord-icon
                                src="https://cdn.lordicon.com/jnikqyih.json"
                                trigger="loop-on-hover"
                                colors="primary:#ABA49E"
                                target="#categories"
                                className="w-8 h-8">
                            </lord-icon>
                            <p className='inline-block'>Categories</p>
                        </div>
                    </Link>
                </div>
                <div id="transactions" className=' flex w-full items-center flex-row font-semibold gap-2 px-5 cursor-pointer'>
                    <Link to="/transactions">
                        <div className='flex flex-row items-center gap-2'>
                            <lord-icon
                                src="https://cdn.lordicon.com/gjjvytyq.json"
                                trigger="loop-on-hover"
                                colors="primary:#ABA49E"
                                target="#transactions"
                                className="w-8 h-8">
                            </lord-icon>
                            <p className='inline-block self-center'>Transactions</p>
                        </div>
                    </Link>
                </div>
            </div>
        </nav>
    )
}
