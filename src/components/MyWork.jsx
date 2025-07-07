import CountUp from 'react-countup';


function MyWork() {
  const myWorkItems = [
    { title: 0, suffix: "+", description: "Years of Experience" },
    { title: 2, suffix: "+", description: "Projects Completed" },
    { title: 3, suffix: "+", description: "Technologies Used" },
    { title: 0, suffix: "+", description: "Job Done" },
  ];
  return (
    <div id='work' className="px-5 md:px-20 xl:mt-0 mt-32 scroll-mt-20">
      <div className='mx-auto grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-7 '>
        {myWorkItems.map((item, index) => (
          <div key={index} className='bg-zinc-900 rounded-lg p-10 flex flex-col justify-center'>
            <div  className="text-white text-5xl font-bold mb-2 my-work-number">
              <CountUp suffix={item.suffix} end={item.title} duration={2}  />
            </div>
            <div className='text-white-50 text-lg'>{item.description}</div>
          </div>
        ))}

      </div>

    </div>
  )
}

export default MyWork