import { useGSAP } from '@gsap/react';
import React, { useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
gsap.registerPlugin(ScrollTrigger);

function ProjectCompleted() {
   
        const sectionRef = useRef(null);
        const project1Ref = useRef(null);
        const project2Ref = useRef(null);
        const project3Ref = useRef(null);

        useGSAP(() => {
            gsap.fromTo(sectionRef.current, { opacity: 0, }, { opacity: 1, duration: 3});
            const projects = [project1Ref.current, project2Ref.current, project3Ref.current];
            projects.forEach((card, index) => {
                gsap.fromTo(card, { opacity: 0, y: 50 }, { opacity: 1, y: 0, duration: 1, delay: (index+1) * 0.3 , scrollTrigger: { trigger: card, start: 'top bottom-=100' } });
            });
        }, [])
    
    return (
        <section ref={sectionRef} id='my-projects' className=' w-full mt-20 px-5 md:px-20 py-10 md:py-20 flex items-center justify-center'>
            <div className='w-full'>
                <div className='flex xl:flex-row flex-col gap-10 justify-between'>
                    <div ref={project1Ref} className='h-full flex flex-col justify-between xl:w-[60%]'>
                        <div className='xl:h-[70vh] md:h-[50vh] h-96 relative'>
                            <img className=' w-full h-full object-cover rounded-xl absolute inset-0' src="./images/coming.jpg" alt="coming soon" />

                        </div>
                        <div className='space-y-5 mt-5'>
                            <h2 className='text-2xl md:text-3xl lg:text-4xl font-bold'>coming soon</h2>
                            <p className='text-white-50 md:text-xl'>
                                .............
                            </p>
                        </div>
                    </div>
                    <div className='overflow-hidden flex md:flex-row flex-col xl:flex-col gap-10 xl:w-[40%]'>
                        <div className="project" ref={project2Ref}>
                            <div className=' xl:h-[37vh] md:h-52 lg:h-72 h-64 relative rounded-xl xl:px-5 2xl:px-12 py-0'>
                                <img className='w-full h-full object-contain rounded-xl bg-white-50' src="./images/coming.jpg" alt="cooming soon" />

                            </div>
                            <h2 className='text-lg md:text-xl lg:text-2xl font-semibold mt-5'>coming soon</h2>
                        </div>
                        <div className="project" ref={project3Ref}>
                            <div className=' xl:h-[37vh] md:h-52 lg:h-72 h-64 relative rounded-xl xl:px-5 2xl:px-12 py-0'>
                                <img className='w-full h-full object-contain rounded-xl bg-white-50' src="./images/coming.jpg" alt="cooming soon" />

                            </div>
                            <h2 className='text-lg md:text-xl lg:text-2xl font-semibold mt-5'>coming soon</h2>
                        </div>
                    </div>
                </div>

            </div>

        </section>
    )
}

export default ProjectCompleted