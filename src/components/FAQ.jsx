import Accordion from './Acoordion';


export default function FAQ() {
    return (
            <div className='p-4 bg-gray-200 rounded-lg border-b-4 border-slate-600'>
                <Accordion title={'¿Qué tipo de servicios ofrecemos?'} respuesta={'Respuesta'}/>
                <Accordion title={'¿Cómo puedo obtener un presupuesto para un servicio de protección preventiva?'} respuesta={'respuesta2'} />
                <Accordion title={'¿Ofrecen descuentos o programas especiales?'} respuesta={'respuesta3'} />
            </div>);
}