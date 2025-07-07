import React from 'react'
import { logoIconsList } from '../constants/Index'

function LgoSection() {
    const LogoIcon=({icon})=>{
        return (
            <div className="flex-none flex-centre marquee-item">
                <img 
                    src={icon.imgPath} 
                    alt={icon.name || 'Logo'}
                    className="h-16 w-auto opacity-80 hover:opacity-100 transition-opacity duration-300 filter brightness-110"
                />
            </div>
        )
    }
  return (
    <div className="md:my-20 my-10 relative overflow-hidden">
        {/* Subtle background for better logo visibility */}
        <div className="absolute inset-0 bg-black bg-opacity-5 rounded-lg"></div>
        
        {/* Gradient edges with better transparency */}
        <div className='gradient-edge-left'/>
        <div className='gradient-edge-right'/>

        <div className="marquee h-52 relative z-10">
            <div className='marquee-box md:gap-12 gap-5'>
                {logoIconsList.map((icon,index)=>(
                    <LogoIcon key={index} icon={icon} />
                ))}

            </div>
        </div>
    </div>
  )
}

export default LgoSection