import React from 'react'
import { Avatar, Dropdown, Navbar } from "flowbite-react";
import { Link, NavLink } from 'react-router-dom';

function Header() {
  return (
    <>
        <nav className="fixed top-0 z-50 w-full bg-white border-b border-gray-200 dark:bg-gray-800 dark:border-gray-700">  
            <Navbar fluid rounded>
            <Navbar.Brand href="https://www.podbic.com/index.html">
                <img src="https://www.podbic.com/assets/images/logo.png" style={{marginLeft:"30px"}}className="mr-3 h-6 sm:h-9" alt="Podbic Logo" />
                {/* <span className="self-center whitespace-nowrap text-xl font-semibold dark:text-white">Podbic</span> */}
            </Navbar.Brand>
            <div className="flex md:order-2">
                <Dropdown
                arrowIcon={false}
                inline
                label={
                    <Avatar alt="User settings"  rounded />
                }
                >
                <Dropdown.Header>
                    <span className="block text-sm">Podbic Test</span>
                    <span className="block truncate text-sm font-medium">name@podbic.com</span>
                </Dropdown.Header>
                <Dropdown.Item>Dashboard</Dropdown.Item>
                <Dropdown.Item>Settings</Dropdown.Item>
                <Dropdown.Item>Earnings</Dropdown.Item>
                <Dropdown.Divider />
                <Dropdown.Item>Sign out</Dropdown.Item>
                </Dropdown>
                <Navbar.Toggle />
            </div>
            <Navbar.Collapse>
                {/* <Navbar.Link href="/" active>
                Home
                </Navbar.Link> */}
                {/* <Navbar.Link href="about">About</Navbar.Link> */}
                <Navbar.Link active>
                 {/* <Link to={"/"} >Home</Link> */}
                 <NavLink to="user"
                    className={({ isActive }) =>
                    isActive ? "text-blue-600 font-bold" : "text-gray-700"
                    }>
                     Home
                 </NavLink>
                </Navbar.Link>
                {/* <Navbar.Link href="about">About</Navbar.Link> */}
                <Navbar.Link>
                    {/* <Link to={"about"} >About</Link> */}
                    <NavLink to="user"
                    className={({ isActive }) =>
                    isActive ? "text-blue-600 font-bold" : "text-gray-700"
                    }>
                     About
                 </NavLink>
                </Navbar.Link>
                <Navbar.Link href="#">Services</Navbar.Link>
                <Navbar.Link href="#">Pricing</Navbar.Link>
                <Navbar.Link href="#">Contact</Navbar.Link>
            </Navbar.Collapse>
            </Navbar>
        </nav>
    </>
  )
}

export default Header