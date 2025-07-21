import { Route, Routes } from 'react-router-dom';

import { PropsWithChildren } from 'react';
import GuardBasic from '../../Guards/GuardAuth';


const RoutesWithNotFound: React.FC<PropsWithChildren> = ({ children }) => {
  return (
    <Routes>
      {/* Renderiza los children pasados al componente */}
      {children}
      {/* Define la ruta por defecto para no encontrados */}
      <Route path="*" element={<GuardBasic />} />
    </Routes>
  );
};

export default RoutesWithNotFound;