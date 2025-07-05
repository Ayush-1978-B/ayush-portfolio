import React from 'react'
import { logoIconsList } from '../constants/Index'

function LgoSection() {
    const LogoIcon=({icon})=>{
        return (
            <div className="flex-none flex-centre marquee-item">
                <img src={icon.imgPath} />
            </div>
        )
    }
  return (
    <div className="md:my-20 my-10 relative">
        <div className='gradient-edge'/>
        <div className='gradient-edge'/>

        <div className="marquee h-52">
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