import React from 'react'
import { RetroGrid } from '../magicui/retro-grid'

const BackgroundGradient = () => {
  return (
    <div className="absolute inset-0 -z-10 h-full w-full items-center px-5 py-24 [background:radial-gradient(125%_125%_at_50%_10%,#000_40%,oklch(from_var(--background)_l_c_h_/_0.3)_100%)]"><RetroGrid className='absolute inset-0 -z-10 h-full w-full '/></div>
  )
}

export default BackgroundGradient