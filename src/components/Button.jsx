

const Button = ({ text, className, id }) => {
  return (
    <a
      onClick={(e) => {e.preventDefault();
        const target = document.getElementById("my-work");
        if (target) {
          const offset = window.innerHeight*0.15;
          const top= target.getBoundingClientRect().top + window.scrollY - offset;
          window.scrollTo({ top, behavior: "smooth" });
         }
      }}
      className={`${className ?? ""} 'relative z-20 cursor-pointer`}
    >
      <div className="px-4 py-4 rounded-lg bg-black-200 flex justify-center items-center relative cursor-pointer overflow-hidden group">
        <div className="absolute -right-10 origin-center top-1/2 -translate-y-1/2 
        w-[120%] h-[120%] group-hover:size-10 group-hover:right-10
        rounded-full bg-white-50 transition-all duration-500" />
        <p className="uppercase md:text-lg text-black transition-all duration-500
        group-hover:text-white-50 group-hover:-translate-x-5 xl:translate-x-0 -translate-x-5">{text}</p>
        <div className="group-hover:bg-white-50 size-10 rounded-full absolute right-10 top-1/2 
        -translate-y-1/2 flex justify-center items-center overflow-hidden">
          <img className="size-5 xl:-translate-y-32 translate-y-0 animate-bounce group-hover:translate-y-0 transition-all duration-500" src="./images/arrow-down.svg" alt="arrow" />
        </div>
      </div>
    </a>
  );
};

export default Button;