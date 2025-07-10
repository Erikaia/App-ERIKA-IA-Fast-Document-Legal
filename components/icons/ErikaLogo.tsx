
import React from 'react';

// IMPORTANTE: Cambia 'mi_logo_empresa.png' por el nombre EXACTO de tu archivo de imagen.
import miLogo from './mi_logo_empresa.png';

export const ErikaLogo: React.FC<{ className?: string }> = ({ className }) => (
    // Esta línea muestra tu imagen como el logo.
    <img src={miLogo} alt="Logo de mi Empresa" className={className} />
);