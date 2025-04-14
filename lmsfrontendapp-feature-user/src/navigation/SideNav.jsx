import React from 'react'
import { Sidebar } from "flowbite-react";
import {
  HiArrowSmRight,
  HiChartPie,
  HiInbox,
  HiOutlineMinusSm,
  HiOutlinePlusSm,
  HiShoppingBag,
  HiTable,
  HiUser,
} from "react-icons/hi";
import { twMerge } from "tailwind-merge";
import { Link, NavLink } from 'react-router-dom';

function SideNav() {
  return (
    <>
         <aside id="logo-sidebar" className="fixed top-0 left-0 z-40 w-64 h-screen pt-14 transition-transform -translate-x-full bg-white border-r border-gray-200 sm:translate-x-0 dark:bg-gray-800 dark:border-gray-700" aria-label="Sidebar">
      <Sidebar aria-label="Sidebar with multi-level dropdown example">
      <Sidebar.Items>
        <Sidebar.ItemGroup>
          <Sidebar.Item>
                <NavLink to="dashboard"
                    className={({ isActive }) =>
                    isActive ? "text-blue-600 font-bold" : "text-gray-700"
                    }>
                     Dashboard
                 </NavLink>
          </Sidebar.Item>
          <Sidebar.Collapse
            icon={HiShoppingBag}
            label="Course Delivery"
            renderChevronIcon={(theme, open) => {
              const IconComponent = open ? HiOutlineMinusSm : HiOutlinePlusSm;

              return <IconComponent aria-hidden className={twMerge(theme.label.icon.open[open ? 'on' : 'off'])} />;
            }}
          >
            <Sidebar.Item href="/batches">Batches</Sidebar.Item>
            <Sidebar.Item href="curriculum">Curriculm</Sidebar.Item>
            <Sidebar.Item href="questionbank">Question Bank</Sidebar.Item>
            <Sidebar.Item href='studymaterials '>Study Materials</Sidebar.Item>
            <Sidebar.Item href="addnewdata">New Data</Sidebar.Item>
            
            
          </Sidebar.Collapse>
          {/* <Sidebar.Item href="#" icon={HiInbox}>
            Inbox
          </Sidebar.Item> */}
          <Sidebar.Collapse
            icon={HiUser}
            label="Users"
            renderChevronIcon={(theme, open) => {
              const IconComponent = open ? HiOutlineMinusSm : HiOutlinePlusSm;

              return <IconComponent aria-hidden className={twMerge(theme.label.icon.open[open ? 'on' : 'off'])} />;
            }}
          >
            <Sidebar.Item href="/learners">Learner</Sidebar.Item>
            <Sidebar.Item href="/addinstructors">Admin&Instructors</Sidebar.Item>
            
          </Sidebar.Collapse>
          <Sidebar.Item href="#" icon={HiShoppingBag}>
            Settings
          </Sidebar.Item>
          <Sidebar.Item href="login" icon={HiArrowSmRight}>
            Sign In
          </Sidebar.Item>
          <Sidebar.Item href="#" icon={HiTable}>
            Sign Up
          </Sidebar.Item>
        </Sidebar.ItemGroup>
      </Sidebar.Items>
    </Sidebar>
    </aside>
    </>
  )
}

export default SideNav