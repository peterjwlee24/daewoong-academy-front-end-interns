'use client'
import Link from 'next/link'
import React, { useState, useEffect } from 'react'

export default function NavBar({ zIndex }) {
  
  return (
    <nav className="flex items-center justify-between bg-blue-400 h-14 text-slate-50 w-full">
      {/* Logo */}
      <Link href="/" className="sm:text-sm md:text-2xl ml-2">
        Daewoong <span className="text-yellow-300">Academy</span>
      </Link>
    </nav>
  )
}
