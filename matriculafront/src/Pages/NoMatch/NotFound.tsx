import { Route, Routes } from 'react-router-dom';

import { PropsWithChildren } from 'react';
import GuardBasic from '../../Guards/GuardAuth';
import GuardRoutes from '../../Guards/GuardRoutes';


const RoutesWithNotFound: React.FC<PropsWithChildren> = ({ children }) => {
  return (
    <Routes>
      {/* Renderiza los children pasados al componente */}
      {children}
      {/* Define la ruta por defecto para no encontrados */}
      <Route path="*" element={<GuardRoutes/>} />
    </Routes>
  );
};

export default RoutesWithNotFound;