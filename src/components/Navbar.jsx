import React, { useState } from 'react'
import logo from "../images/logo.png"
import arrow from "../images/arrow.png"
import { Link } from 'react-router-dom'
export const Navbar = () => {
    const [navOpen, setNavOpen] = useState(true);
    const navOpenFunction = () => {
        setNavOpen(!navOpen);
    }
    return (
        <nav className={`p-6 ${navOpen ? "w-1/5" : "w-[8%]"} items-center transition-all flex flex-col gap-10 text-white border-r-[1px] border-gray-500 border-opacity-40 border-dashed`}>
            <div className={`flex ${navOpen ? "justify-between" : "justify-center"} items-center h-6 w-full`}>
                <img src={logo} alt="" className={`w-8 h-8 ${!navOpen && "hidden"} `} />
                <img src={arrow} alt="" className={`w-6 h-6 ${navOpen ? "rotate-180" : "rotate-0"} cursor-pointer`} onClick={() => navOpenFunction()} />
            </div>
            <div className={`w-full ${navOpen ? "bg-[#002bbb]" : "bg-transparent"} flex flex-row rounded-lg ${navOpen && "px-6"} py-3 ${navOpen ? "justify-between" : "justify-center"} items-center`}>
                <div>
                    <img src={logo} alt="" className='w-8 h-8' />
                </div>
                <div className={`font-bold text-xl ${!navOpen ? "hidden":""} `}>
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
                            <p className={`inline-block ${!navOpen && "hidden"}`}>Dashboard</p>
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
                            <p className={`inline-block ${!navOpen && "hidden"}`}>Categories</p>
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
                            <p className={`inline-block self-center ${!navOpen && "hidden"}`}>Transactions</p>
                        </div>
                    </Link>
                </div>
            </div>
        </nav>
    )
}
