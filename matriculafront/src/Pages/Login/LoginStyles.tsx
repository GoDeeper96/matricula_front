import backgroundlogin from '../../assets/backgroundlogin.png';

import {
ITextFieldStyles,
  mergeStyles,
  IStackTokens
} from '@fluentui/react';
// Estilos para la sección de imagen
  export const stackTokens: IStackTokens = { childrenGap: 20 };
  export const fieldStackTokens: IStackTokens = { childrenGap: 15 };
 export const imageContainerClass = mergeStyles({
    backgroundImage: `url(${backgroundlogin})`,
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    backgroundRepeat: 'no-repeat',
    position: 'relative',
    width: '100%',
    height: '100%'
  });
  export const textFieldStyles: Partial<ITextFieldStyles> = {
    root: { width: '100%' },
    fieldGroup: { height: 40 }
  };

  // Overlay para la imagen
  export const imageOverlayClass = mergeStyles({
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.3)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    padding: '2rem'
  });

  // Estilos para la sección del formulario
  //#273354
 export const formContainerClass = mergeStyles({
    backgroundColor: '#f8f9f9',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    padding: '1.5rem',
    width: '100%',
    height: '100%'
  });

  // Contenedor del formulario
  export const formCardClass = mergeStyles({
    width: '100%',
    maxWidth: '400px',
    padding: '2rem',
    backgroundColor: '#ffffff',
    borderRadius: 4,
    boxShadow: '0 8px 32px rgba(0, 0, 0, 0.1)',
    border: '1px solid #f3f2f1'
  });
