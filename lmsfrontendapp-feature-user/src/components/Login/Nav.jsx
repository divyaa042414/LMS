import React, { useState } from "react";
import { Button, Checkbox, Label, Modal, ModalBody, ModalHeader, TextInput } from "flowbite-react";
// import courseImage from "../assets/java-full-stack.jpg"; // Adjust path as needed
import {
   Footer,
   FooterBrand,
   FooterCopyright,
   FooterDivider,
   FooterIcon,
   FooterLink,
   FooterLinkGroup,
   FooterTitle,
 } from "flowbite-react";
 import { BsDribbble, BsFacebook, BsGithub, BsInstagram, BsTwitter } from "react-icons/bs";


function Nav() {
  const [openModal, setOpenModal] = useState(false);
  const [email, setEmail] = useState("");
  const [menuOpen, setMenuOpen] = useState(false);

  function onCloseModal() {
    setOpenModal(false);
    setEmail("");
  }

  return (
    <div>
      {/* Navbar */}
      <nav className="bg-white border-gray-200 dark:bg-gray-900">
        <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
          {/* Logo */}
          <a href="https://flowbite.com/" className="flex items-center space-x-3 rtl:space-x-reverse">
            <img src="https://www.podbic.com/assets/images/logo.png" className="h-8" alt="Flowbite Logo" />
            {/* <span className="self-center text-2xl font-semibold whitespace-nowrap dark:text-white">Podbic</span> */}
          </a>

          {/* Right Section */}
          <div className="flex md:order-2 space-x-3 md:space-x-0 rtl:space-x-reverse">
            {/* Login Button with Modal */}
            <Button onClick={() => setOpenModal(true)} className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
              Login
            </Button>
            <Modal show={openModal} size="md" onClose={onCloseModal} popup>
              <ModalHeader>Login</ModalHeader>
              <ModalBody>
                <div className="space-y-6">
                  <h3 className="text-xl font-medium text-gray-900 dark:text-white">Sign in to our platform</h3>
                  <div>
                    <Label htmlFor="email" className="mb-2 block">Your email</Label>
                    <TextInput id="email" placeholder="name@company.com" value={email} onChange={(e) => setEmail(e.target.value)} required />
                  </div>
                  <div>
                    <Label htmlFor="password" className="mb-2 block">Your password</Label>
                    <TextInput id="password" type="password" required />
                  </div>
                  <div className="flex justify-between">
                    <div className="flex items-center gap-2">
                      <Checkbox id="remember" />
                      <Label htmlFor="remember">Remember me</Label>
                    </div>
                    <a href="#" className="text-sm text-cyan-700 hover:underline dark:text-cyan-500">Lost Password?</a>
                  </div>
                  <Button className="w-full">Log in to your account</Button>
                  <div className="flex justify-between text-sm font-medium text-gray-500 dark:text-gray-300">
                    Not registered?&nbsp;
                    <a href="#" className="text-cyan-700 hover:underline dark:text-cyan-500">Create account</a>
                  </div>
                </div>
              </ModalBody>
            </Modal>

            {/* Mobile Menu Button */}
            <button onClick={() => setMenuOpen(!menuOpen)} className="inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600">
              <span className="sr-only">Open main menu</span>
              <svg className="w-5 h-5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 17 14">
                <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M1 1h15M1 7h15M1 13h15" />
              </svg>
            </button>
          </div>

          {/* Menu Items */}
          <div className={`items-center justify-between ${menuOpen ? "block" : "hidden"} w-full md:flex md:w-auto md:order-1`}>
            <ul className="flex flex-col font-medium p-4 md:p-0 mt-4 border border-gray-100 rounded-lg bg-gray-50 md:space-x-8 rtl:space-x-reverse md:flex-row md:mt-0 md:border-0 md:bg-white dark:bg-gray-800 md:dark:bg-gray-900 dark:border-gray-700">
              <li><a href="#" className="block py-2 px-3 md:p-0 text-white bg-blue-700 rounded-md md:bg-transparent md:text-blue-700 dark:text-blue-500" aria-current="page">Home</a></li>
              <li><a href="#" className="block py-2 px-3 md:p-0 text-gray-900 hover:bg-gray-100 md:hover:bg-transparent md:hover:text-blue-700 dark:text-white dark:hover:bg-gray-700 dark:hover:text-white">About</a></li>
              <li><a href="#" className="block py-2 px-3 md:p-0 text-gray-900 hover:bg-gray-100 md:hover:bg-transparent md:hover:text-blue-700 dark:text-white dark:hover:bg-gray-700 dark:hover:text-white">Services</a></li>
              <li><a href="#" className="block py-2 px-3 md:p-0 text-gray-900 hover:bg-gray-100 md:hover:bg-transparent md:hover:text-blue-700 dark:text-white dark:hover:bg-gray-700 dark:hover:text-white">Contact</a></li>
            </ul>
          </div>
        </div>
      </nav>

      {/* Courses Section */}
      <div className="mt-16 text-center">
        <h1 className="text-red-500 text-xl">DISCOVER COURSES</h1>
        <h1 className="text-red-500 text-4xl font-bold">Our Popular Online Courses</h1>
      </div>

      {/* Course Cards */}
      <div className="flex flex-wrap justify-center gap-6 mt-6">
        {[...Array(6)].map((_, index) => (
          <div key={index} className="max-w-sm bg-white border border-gray-200 rounded-lg shadow-sm dark:bg-gray-800 dark:border-gray-700">
            <a href="#">
              {/* <img className="rounded-t-lg" src={courseImage} alt="Java Full Stack" /> */}
            </a>
            <div className="p-5">
              <a href="#">
                <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">Java Full Stack</h5>
              </a>
              <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">Java full stack development refers to the development of applications using Java for both front-end and back-end.</p>
              <a href="#" className="inline-flex items-center px-3 py-2 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800">
                Read more
                <svg className="w-3.5 h-3.5 ms-2" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 10">
                  <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M1 5h12m0 0L9 1m4 4L9 9" />
                </svg>
              </a>
            </div>
          </div>
        ))}
       <Footer bgDark>
      <div className="w-full">
        <div className="grid w-full grid-cols-2 gap-8 px-6 py-8 md:grid-cols-4">
          <div>
            <FooterTitle title="Company" />
            <FooterLinkGroup col>
              <FooterLink href="#">About</FooterLink>
              <FooterLink href="#">Careers</FooterLink>
              <FooterLink href="#">Brand Center</FooterLink>
              <FooterLink href="#">Blog</FooterLink>
            </FooterLinkGroup>
          </div>
          <div>
            <FooterTitle title="help center" />
            <FooterLinkGroup col>
              <FooterLink href="#">Discord Server</FooterLink>
              <FooterLink href="#">Twitter</FooterLink>
              <FooterLink href="#">Facebook</FooterLink>
              <FooterLink href="#">Contact Us</FooterLink>
            </FooterLinkGroup>
          </div>
          <div>
            <FooterTitle title="legal" />
            <FooterLinkGroup col>
              <FooterLink href="#">Privacy Policy</FooterLink>
              <FooterLink href="#">Licensing</FooterLink>
              <FooterLink href="#">Terms &amp; Conditions</FooterLink>
            </FooterLinkGroup>
          </div>
          <div>
            <FooterTitle title="download" />
            <FooterLinkGroup col>
              <FooterLink href="#">iOS</FooterLink>
              <FooterLink href="#">Android</FooterLink>
              <FooterLink href="#">Windows</FooterLink>
              <FooterLink href="#">MacOS</FooterLink>
            </FooterLinkGroup>
          </div>
        </div>
        <div className="w-full bg-gray-700 px-4 py-6 sm:flex sm:items-center sm:justify-between">
          <FooterCopyright href="#" by="Flowbite™" year={2022} />
          <div className="mt-4 flex space-x-6 sm:mt-0 sm:justify-center">
            <FooterIcon href="#" icon={BsFacebook} />
            <FooterIcon href="#" icon={BsInstagram} />
            <FooterIcon href="#" icon={BsTwitter} />
            <FooterIcon href="#" icon={BsGithub} />
            <FooterIcon href="#" icon={BsDribbble} />
          </div>
        </div>
      </div>
    </Footer>
      </div>
    </div>
  );
}

export default Nav;
