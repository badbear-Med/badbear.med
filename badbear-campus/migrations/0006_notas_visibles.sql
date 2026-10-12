-- Las notas existentes vuelven a estar disponibles solo para su alumno autenticado.
UPDATE campus_resultados SET publicada=1 WHERE publicada=0;
