"use client"
import Link from 'next/link'
import React, { useState, useEffect } from 'react'
import { buttonVariants } from "@/components/ui/button"
import { ModeToggle } from './theme-toggle'
import { HamburgerMenuIcon } from '@radix-ui/react-icons'
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet"
import LoadingBar from 'react-top-loading-bar'
import { usePathname } from 'next/navigation'

const Navbar = () => {

  const [progress, setProgress] = useState(0)
  const pathname = usePathname()

  useEffect(() => {

    setProgress(30)

    setTimeout(() => {
      setProgress(70)
    }, 200);

    setTimeout(() => {
      setProgress(1000)
    }, 800);

  }, [pathname])

  useEffect(() => {

    setTimeout(() => {
      setProgress(0)
    }, 900);

  }, [])


  return (
    <nav className='flex justify-between h-16 top-0 border backdrop-blur px-10 sticky items-center mb-4 gap-2 z-10'>
      <LoadingBar
        color='#f11946'
        progress={progress}
        onLoaderFinished={() => setProgress(0)}
      />
      <div className='font-bold md:text-xl text-[16px]'>
        Technical Blogs
      </div>

      {/* Desktop Navigation Links */}
      <ul className='md:flex gap-5 px-3 items-center hidden'>
        <li><Link href={"/"}>Home</Link></li>
        <li><Link href={"/about"}>About</Link></li>
        <li><Link href={"/blog"}>Blog</Link></li>
        <li><Link href={"/contact"}>Contacts</Link></li>
        <li className="buttons space-x-2">
          <Link href={"/login"} className={buttonVariants({ variant: "outline" })}>Login</Link>
          <Link href={"/signup"} className={buttonVariants({ variant: "outline" })}>Sign Up</Link>
        </li>
        <li>
          <ModeToggle />
        </li>
      </ul>

      <div className='flex items-center justify-center gap-3 md:hidden'>
        <ModeToggle />

        <Sheet>
          <SheetTrigger>
            <HamburgerMenuIcon className="w-6 h-6 cursor-pointer" />
          </SheetTrigger>

          <SheetContent
            className="bg-white dark:bg-gray-900 dark:text-white bg-opacity-100 shadow-lg z-50 p-6"
            side="right"
          >
            <SheetHeader>
              <SheetTitle>Menu</SheetTitle>
            </SheetHeader>

            <ul className='space-y-4 flex flex-col items-start'>
              <li className='border-2 border-black'><Link href={"/"}>Home</Link></li>
              <li><Link href={"/about"}>About</Link></li>
              <li><Link href={"/blog"}>Blog</Link></li>
              <li><Link href={"/contact"}>Contacts</Link></li>
            </ul>
            <ul className='hidden md:block'>
              <li><Link href={"/login"} className={buttonVariants({ variant: "outline" })}>Login</Link></li>
              <li><Link href={"/signup"} className={buttonVariants({ variant: "outline" })}>Sign Up</Link></li>
              <li>
                <ModeToggle />
              </li>
            </ul>
            <ul className='flex flex-row my-4 gap-2 md:hidden'>
              <li><Link href={"/login"} className={buttonVariants({ variant: "outline" })}>Login</Link></li>
              <li><Link href={"/signup"} className={buttonVariants({ variant: "outline" })}>Sign Up</Link></li>
            </ul>
          </SheetContent>
        </Sheet>
      </div>
    </nav>
  )
}

export default Navbar
