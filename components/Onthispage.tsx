"use client"

import { cn } from '@/lib/utils'
import React from 'react'
import { useState, useEffect } from 'react'

const Onthispage = ({ htmlcontent, className }: { htmlcontent: string, className: string }) => {

  interface Linktype {
    id: string
    text: string
  }

  const [links, setlinks] = useState<null | Linktype[]>(null)

  useEffect(() => {

    const temp = document.createElement("div");
    temp.innerHTML = htmlcontent

    const headings = temp.querySelectorAll('h2, h3')

    const generatedLinks: Linktype[] = []

    headings.forEach((heading, index) => {
      const id = heading.id || `heading-${index}`
      heading.id = id

      generatedLinks.push({
        id: id,
        text: (heading as HTMLElement).innerText
      })
    })

    setlinks(generatedLinks)

  }, [htmlcontent])


  return (
    <div className={cn('hidden md:block ', className)}>
      <div className="sticky top-20 ">
        <h2>On this page</h2>
        <ul className='not-prose text-sm '>
          {links && links.map((link) => {
            return <li key={link.id} className='text-black hover:text-[#808080] font-bold  dark:text-gray-400 dark:hover:text-white'>
              <a href={`#${link.id}`}>{link.text}</a>
            </li>
          })}
        </ul>
      </div>
    </div>
  )
}

export default Onthispage


