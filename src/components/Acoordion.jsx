import { useState } from "react";

const Accordion = ({title, respuesta}) => {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <div className='py-2'>
          <button onClick={() => setIsOpen(!isOpen)}
          className='flex justify-between w-full'>
            <span className="text-2xl">{title}</span> 
            <span className="text-2xl">{isOpen ? '-' : '+'}</span>
          </button>
          <div className={`grid overflow-hidden transition-all duration-300 ease-in-out text-slate-600
            ${isOpen 
            ? 'grid-rows[1fr] opacity-100'
            : 'grid-rows[0fr] opacity-0'}`}>
            <div className="overflow-hidden bg-white text-xl">{respuesta}</div>
          </div>
        </div>
    );
}

export default Accordion;