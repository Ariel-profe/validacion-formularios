import React from 'react';
import { faCheckCircle, faTimesCircle } from '@fortawesome/free-solid-svg-icons';

import { GrupoInput, IconoValidacion, Input, Label, LeyendaError } from '../elements/Formulario';


export const ComponenteInput = ({label, placeholder, type, name, leyendaError, expresionRegular, estado, cambiarEstado, funcion}) => {

    console.log();

    const handleInputChange = ({target}) =>{
        cambiarEstado({...estado, campo: target.value});
    };

    const validacion = () => {
        if(expresionRegular){
            if(expresionRegular.test(estado.campo)){
                cambiarEstado({...estado, valido: 'true'});
            }else{
                cambiarEstado({...estado, valido: 'false'});
            }
        }
        if(funcion){
            funcion();
        };
    };


  return (
        <div>
            <Label htmlFor={name} valido={estado.valido}> {label} </Label>
            <GrupoInput>
            <Input 
                type={type} 
                placeholder={placeholder} 
                id={name} 
                value={estado.campo}
                onChange={handleInputChange}
                onKeyUp={validacion}
                onBlur={validacion}
                valido={estado.valido}
                autoComplete='off'
                />
            <IconoValidacion 
                icon={estado.valido === 'true' ? faCheckCircle : faTimesCircle} 
                valido={estado.valido} />
            </GrupoInput>
            <LeyendaError valido={estado.valido}>{leyendaError}</LeyendaError>
         </div>
  );
};
