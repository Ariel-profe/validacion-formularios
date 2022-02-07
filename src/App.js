import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {faExclamationTriangle } from '@fortawesome/free-solid-svg-icons';

import {ComponenteInput} from './components/Input';

import { Formulario, Label, ContenedorTerminos, ContenedorBotonCentrado, Boton, MensajeExito, MensajeError } from './elements/Formulario';

const App = () => {

  const [usuario, setUsuario] = useState({
    campo:'',
    valido: null
  });

  const [nombre, setNombre] = useState({
    campo:'',
    valido: null
  });

  const [password, setPassword] = useState({
    campo:'',
    valido: null
  });

  const [password2, setPassword2] = useState({
    campo:'',
    valido: null
  });

  const [correo, setCorreo] = useState({
    campo:'',
    valido: null
  });

  const [telefono, setTelefono] = useState({
    campo:'',
    valido: null
  });

  const [terminos, setTerminos] = useState(false);

  const [formValido, setFormValido] = useState(null);

  const expresiones = {
    usuario: /^[a-zA-Z0-9_-]{4,16}$/, // Letras, numeros, guion y guion_bajo
    nombre: /^[a-zA-ZÀ-ÿ\s]{1,40}$/, // Letras y espacios, pueden llevar acentos.
    password: /^.{4,12}$/, // 4 a 12 digitos.
    correo: /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/,
    telefono: /^\d{7,14}$/ // 7 a 14 numeros.
  };

  const validarPassword2 = () => {
      if(password.campo.length >0){
        if(password.campo !== password2.campo){
          setPassword2((estado) => ({
            ...estado,
            valido: 'false'
          }) )
        }else{
          setPassword2((estado) => ({
            ...estado,
            valido: 'true'
          }) )
        }
      }
  };

  const handleSubmit = (e) => {

    e.preventDefault();

    if(usuario.valido === 'true' && 
        nombre.valido === 'true' &&
        password.valido === 'true' &&
        password2.valido === 'true' &&
        correo.valido === 'true' &&
        telefono.valido === 'true' &&
        terminos
      ){
        setFormValido(true);
        setUsuario({campo: '', valido: null});
        setNombre({campo: '', valido: null});
        setPassword({campo: '', valido: null});
        setPassword2({campo: '', valido: null});
        setCorreo({campo: '', valido: null});
        setTelefono({campo: '', valido: null});
        setTerminos(false)
      }else{
        setFormValido(false);
      }
  };

  return <main>
          <Formulario onSubmit={handleSubmit}>
            <ComponenteInput 
              label="Usuario"
              placeholder="Ariel123"
              type="text"
              name="usuario"
              leyendaError="El nombre debe ser de 4 a 6 dígitos y sólo puede contener números, letras y guión bajo."
              expresionRegular={expresiones.usuario}
              estado={usuario}
              cambiarEstado={setUsuario}
            />
            <ComponenteInput 
              label="Nombre"
              placeholder="Ariel123"
              type="text"
              name="nombre"
              leyendaError="El nombre debe contener letras y espacios"
              expresionRegular={expresiones.nombre}
              estado={nombre}
              cambiarEstado={setNombre}
            />
              <ComponenteInput 
                label="Contraseña"
                placeholder="Contraseña"
                type="password"
                name="password1"
                leyendaError="Debe tener de 4 a 12 dígitos"
                expresionRegular={expresiones.password}
                estado={password}
                cambiarEstado={setPassword}
              />
              <ComponenteInput 
                label="Repetir contraseña"
                placeholder="Repetir contraseña"
                type="password"
                name="password2"
                leyendaError="Ambas contraseñas deben ser iguales"
                funcion={validarPassword2}
                estado={password2}
                cambiarEstado={setPassword2}
              />
            <ComponenteInput 
              label="Correo"
              placeholder="Escribe tu email"
              type="email"
              name="correo"
              leyendaError="Debe ser un email"
              expresionRegular={expresiones.correo}
              estado={correo}
              cambiarEstado={setCorreo}
            />
            <ComponenteInput 
              label="Telefono"
              placeholder="2616344556"
              type="tel"
              name="telefono"
              leyendaError="Debe ser de 7 a 14 números"
              expresionRegular={expresiones.telefono}
              estado={telefono}
              cambiarEstado={setTelefono}
            />
         
            
              
            <ContenedorTerminos>
              <Label>
                <input 
                  type="checkbox" 
                  name='terminos' 
                  id='terminos' 
                  checked={terminos}
                  onChange={()=> setTerminos(!terminos)}
                  /> Acepto los Términos y Condiciones
              </Label>
            </ContenedorTerminos>
           { formValido === false && <MensajeError>
              <p>
                <FontAwesomeIcon icon={faExclamationTriangle}/>
                <b>Error:</b> Por favor rellena el formulario correctamente
                </p>
            </MensajeError>}
            <ContenedorBotonCentrado>
              <Boton type='submit'>Enviar</Boton>
              { formValido === true && <MensajeExito>Formulario enviado exitosamente</MensajeExito>}
            </ContenedorBotonCentrado>
          </Formulario>
        </main>
};

export default App;