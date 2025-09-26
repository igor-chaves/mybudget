"use client"

import Image from "next/image"
import Link from "next/link"

import { useEffect, useState } from "react"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faBars, faXmark } from "@fortawesome/free-solid-svg-icons"

import GoToTopBtn from "./GoToTopBtn"
import "../styles/header.css"

const Header = () => {
  const [showSidebar, setShowSidebar] = useState(false)
  const [windowSize, setWindowSize] = useState(0)
  const largeScreen = 1024

  const menuLinks = ["link 1", "link 2", "link 3", "link 4", "link 5"]
  const sidebarLinks = ["SIDEBAR 1", "SIDEBAR 2", "SIDEBAR 3", "SIDEBAR 4", "SIDEBAR 5"]

  // check current screen size and close sidebar in large screen
  useEffect(() => {
    const handleResize = () => setWindowSize(window.innerWidth)
    window.addEventListener("resize", handleResize)

    if (windowSize > largeScreen) setShowSidebar(false)

    // remove o event listener do resize para evitar memory leaks
    return () => window.removeEventListener("resize", handleResize)
  }, [windowSize])

  return (
    <header>
      <div className="container-md flex items-center justify-between">
        <Image src="/logo.jpeg" width={65} height={65} alt="logo image" className="navbar-logo" />
        <nav>
          <ul className={`sidebar ${showSidebar ? "flex flex-col" : "hidden"}`}>
            <li>
              <Link onClick={() => setShowSidebar(false)} href="">
                <FontAwesomeIcon icon={faXmark} />
              </Link>
            </li>
            {sidebarLinks.map(link => {
              return (
                <li key={link}>
                  <Link href="">{link}</Link>
                </li>
              )
            })}
          </ul>

          <ul className="flex gap-8">
            {menuLinks.map(link => {
              return (
                <li key={link} className="hideOnMobile">
                  <Link href="">{link}</Link>
                </li>
              )
            })}
            <li className="open-menu-icon" onClick={() => setShowSidebar(true)}>
              <FontAwesomeIcon icon={faBars} />
            </li>
          </ul>
        </nav>
      </div>
      <GoToTopBtn />
    </header>
  )
}

export default Header
