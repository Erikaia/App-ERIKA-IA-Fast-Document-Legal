// constants.ts

/**
 * Datos de ejemplo para rellenar el formulario del Poder Especial en Modo Demo.
 */
export const DEMO_POA_EXTRACTED_DATA = {
  grantorName: 'ANA SOFIA CASTILLO ROJAS',
  grantorDNI: '45678901',
  grantorAddress: 'Calle Las Begonias 789, San Isidro, Lima',
  attorneyName: 'LUIS MIGUEL TORRES VERA',
  attorneyDNI: '09876543',
  attorneyAddress: 'Jr. de la Unión 1020, Cercado de Lima, Lima',
  powers: 'Para que pueda representarme ante el Banco de Crédito del Colombia para realizar el cobro de un cheque de gerencia por la suma de S/ 15,000.00 (Quince Mil y 00/100 Soles), así como solicitar estados de cuenta y cualquier otro trámite conexo.',
};

/**
 * Documento de Poder Especial pre-generado para el Modo Demo.
 */
export const DEMO_POA_OUTPUT = `
**PODER ESPECIAL**

**SEÑOR (A)
NOTARIO (A) 24 DEL CÍRCULO DE BARRANQUILLA
E. S. D.**

REFERENCIA: Poder especial para trámite de divorcio y liquidación de sociedad conyugal de mutuo acuerdo.

**PRIMERO: OBJETO DEL PODER**
Nosotros, MARÍA CAMILA ROJAS GÓMEZ, identificada con cédula de ciudadanía número 1.234.567.892 expedida en Bogotá D.C., domiciliada en Calle 100 # 15-20, de la ciudad de Barranquilla D.E., con correo electrónico maria.rojas@emailfalso.com y teléfono 3101234567, y EJEMPLO DE EJEMPLO, identificado(a) con cédula de ciudadanía número 00.000.000 expedida en Barranquilla, domiciliado(a) en Calle 100 # 15-20, de la ciudad de Barranquilla D.E., con correo electrónico vivo@gmail.com y teléfono 350 6787555, obrando en nuestro propio nombre y representación, por medio del presente escrito, conferimos PODER ESPECIAL, AMPLIO Y SUFICIENTE a la abogada ANA SOFÍA RAMÍREZ LÓPEZ, identificada con cédula de ciudadanía número 10.203.040 y portador(a) de la Tarjeta Profesional número 987654 del Consejo Superior de la Judicatura, con correo electrónico ana.ramirez.abogada@emailfalso.com y teléfono 3209876543, para que en nuestro nombre y representación inicie, impulse y lleve a feliz término el trámite de DIVORCIO Y LIQUIDACIÓN DE SOCIEDAD CONYUGAL DE MUTUO ACUERDO ante la Notaría 24 del Círculo de Barranquilla.


**SEGUNDO: CARÁCTER DEL PODER**
Nuestra apoderada queda facultada(a) para:
Presentar la solicitud de divorcio de mutuo acuerdo ante la Notaría 24 de Barranquilla.

Suscribir el acuerdo de divorcio y liquidación de sociedad conyugal conforme al escrito que firmamos en documento anexo, donde se indica que la sociedad conyugal presenta el siguiente estado:
Concepto de Activos y Pasivos en Cero.


Y manifestando bajo la gravedad de juramento que NO EXISTEN HIJOS MENORES DE EDAD fruto de nuestro matrimonio.
Aportar los documentos requeridos.

Recibir, conciliar, transigir, desistir, sustituir, reasumir, renunciar, interponer recursos, solicitar copias, y en general, realizar todas las actuaciones que sean necesarias para el cabal desarrollo del presente poder, de conformidad con el artículo 77 del Código General del Proceso.
Firmar la escritura pública de divorcio, disolución y liquidación de sociedad conyugal, y su registro.


Atentamente,

MARÍA CAMILA ROJAS GÓMEZ                                 EJEMPLO DE EJEMPLO
C.C. No. 1.234.567.892                                   C.C. No. 00.000.000


ACEPTO,
ANA SOFÍA RAMÍREZ LÓPEZ
C.C. No. 10.203.040
T.P. No. 987654 del C.S. de la J.
Celular: 3209876543
Email: ana.ramirez.abogada@emailfalso.com
`;


/**
 * Datos de ejemplo para rellenar el formulario de Contestación de Demanda en Modo Demo.
 */
export const DEMO_LAWSUIT_EXTRACTED_DATA = {
  defendantName: 'TECNOLOGIA Y SISTEMAS PERU S.A.C.',
  defendantDNI: '20506070801',
  lawsuitText: 'La demandante, Sra. Lucía Méndez, alega haber sido despedida de manera incausada el día 30 de abril de 2024. Reclama el pago de su liquidación de beneficios sociales, una indemnización por despido arbitrario y el pago de horas extras que supuestamente laboró durante el último año. Manifiesta haber sido contratada a plazo indeterminado desde el 10 de enero de 2021.',
};

/**
 * Documento de Contestación de Demanda pre-generado para el Modo Demo.
 */
export const DEMO_LAWSUIT_OUTPUT = `
**EXPEDIENTE N°:** [DEJAR EN BLANCO]
**SECRETARIO:** [DEJAR EN BLANCO]
**RADICADO N°:** 2025-000024
**CUADERNO:** PRINCIPAL
**SUMILLA:** CONTESTACIÓN DE DEMANDA

**SEÑOR 
JUEZ QUINTO LABORAL DEL CIRCUITO DE BOGOTÁ 
E. S. D.
**

** REFERENCIA: Contestación Demanda Ordinaria Laboral. Radicado: 2025-000024
DEMANDANTE: JUAN PÉREZ 
DEMANDADA: TECNOSOLUCIONES S.A.


**MARIANA RODRÍGUEZ, mayor de edad e identificada con C.C. No. 54.321.098 y T.P. No. 12345 del C.S. de la J., en nombre y representación de mi poderdante señora  ANA MARÍA GÓMEZ, identificada con Cédula de Ciudadanía número 98.765.432, expedida en Medellín, domiciliada en Calle Principal 789, con correo electrónico legal.tecnosoluciones@emailfalso.com y teléfono 3209876543, Representante Legal de la empresa "TECNOSOLUCIONES S.A.", con NIT 900.123.456-7, domiciliada en Avenida Imaginaria 456, en la ciudad de Bogotá, por medio del presente escrito, respetuosamente me permito contestar la DEMANDA ORDINARIA LABORAL DE PRIMERA INSTANCIA interpuesta por el señor JUAN PÉREZ, identificado con Cédula de Ciudadanía número 12.345.678.*


**I. PRONUNCIAMIENTO SOBRE LAS PRETENSIONES

Me opongo a la totalidad de las pretensiones elevadas por la parte DEMANDANTE, por cuanto los hechos y fundamentos de Derecho en los que se sustentan no corresponden a la realidad y carecen de soporte probatorio, como se demostrará a lo largo del proceso.*


**II. PRONUNCIAMIENTO SOBRE LOS HECHOS DE LA DEMANDA**

En cumplimiento de lo dispuesto en la ley, me pronuncio de manera expresa y concreta sobre cada uno de los hechos expuestos por el demandante:
AL HECHO PRIMERO: "Con fecha 15 de marzo de 2020, inicié una relación laboral con la empresa "TecnoSoluciones S.A.", desempeñando el cargo de Desarrollador de Software."
NO ES CIERTO. La empresa "TecnoSoluciones S.A." no celebró un contrato de trabajo con el señor JUAN PÉREZ en la fecha mencionada. El señor JUAN PÉREZ prestó sus servicios como consultor independiente bajo un contrato de prestación de servicios, el cual inició el 15 de marzo de 2020 y finalizó en la fecha indicada en la demanda, sin que existiera una relación laboral subordinada.

AL HECHO SEGUNDO: "Mi salario mensual era de $1.500.000 ($1.500.000)."
NO ES CIERTO. Dado que no existió una relación laboral, el concepto de salario no aplica. El valor mencionado corresponde a los honorarios mensuales pactados en el contrato de prestación de servicios por sus funciones de consultoría.

AL HECHO TERCERO: "Durante mi relación laboral, cumplí con mis obligaciones y horarios, bajo subordinación de la demandada."
NO ES CIERTO. El señor JUAN PÉREZ, en su calidad de consultor independiente, ejecutó sus servicios con autonomía técnica y directiva, sin estar sujeto a horarios fijos o a la subordinación propia de un contrato de trabajo. La supervisión que se realizaba era únicamente para verificar el cumplimiento de los entregables y objetivos pactados en el contrato de prestación de servicios, lo cual es propio de este tipo de relaciones contractuales.

AL HECHO CUARTO: "La relación laboral terminó el día 30 de junio de 2024 por despido injustificado."
NO ES CIERTO. La relación contractual entre las partes (contrato de prestación de servicios) terminó el 30 de junio de 2024, de común acuerdo, por la finalización del proyecto para el cual fue contratado el Consultor. No hubo despido injustificado de ninguna naturaleza, ya que no existía vínculo laboral.

AL HECHO QUINTO: "Hasta la fecha de presentación de esta demanda, la empresa no me ha cancelado la totalidad de mis salarios y prestaciones sociales adeudados desde el 1 de enero de 2023 hasta la terminación de la relación laboral, incluyendo cesantías, primas, vacaciones."
NO ES CIERTO. La empresa "TecnoSoluciones S.A." ha cumplido a cabalidad con el pago de todos los honorarios pactados en el contrato de prestación de servicios hasta la fecha de terminación del mismo. Al no existir una relación laboral, no hay lugar al pago de salarios, cesantías, primas o vacaciones, pues estos son conceptos inherentes a un contrato de trabajo.

AL HECHO SEXTO: "A pesar de mis reiterados requerimientos, la demandada se ha negado a realizar el pago de las sumas adeudadas."
NO ES CIERTO. La empresa no ha recibido requerimientos de pago por conceptos que se consideren adeudados, toda vez que se han satisfecho los honorarios correspondientes al contrato de prestación de servicios.*

**III. FUNDAMENTOS DE DERECHO Y RAZONES DE DEFENSA**

1-Inexistencia de Contrato de Trabajo: La defensa se centra en desvirtuar la existencia de un contrato de trabajo. La relación que vinculó a las partes fue de naturaleza civil/comercial, bajo la modalidad de contrato de prestación de servicios, donde el demandante actuaba como un contratista independiente, sin los elementos esenciales de un contrato de trabajo (subordinación, salario y prestación personal del servicio). Se demostrará que la autonomía, la ausencia de horario fijo y la remuneración por honorarios son características propias de un contrato de prestación de servicios.
2-Cumplimiento de Obligaciones Contractuales: "TecnoSoluciones S.A." cumplió con el pago total de los honorarios pactados en el contrato de prestación de servicios, por lo que no existe deuda alguna por concepto de salarios o prestaciones sociales.
3-Exoneración de Indemnizaciones: Al no existir un contrato de trabajo y al haber terminado la relación contractual de común acuerdo o por culminación del objeto contractual, no hay lugar a indemnización por despido injustificado.

**IV. EXCEPCIONES DE MÉRITO**
Con fundamento en los hechos y argumentos expuestos, propongo las siguientes excepciones de mérito:
1-INEXISTENCIA DE LA RELACIÓN LABORAL: No existió entre las PARTES un contrato de trabajo, sino un contrato de prestación de servicios.
2-INEXISTENCIA DE LA OBLIGACIÓN: En consecuencia de la excepción anterior, no existen las obligaciones alegadas por el demandante referentes a salarios, prestaciones sociales e indemnizaciones.
3-PAGO: La empresa ha cumplido a cabalidad con todas las obligaciones económicas derivadas del contrato de prestación de servicios.

**V. PRUEBAS**
Solicito a su Despacho tener como pruebas las siguientes:

*Documentales:
1-Copia del Certificado de Existencia y Representación Legal de "TecnoSoluciones S.A.".
2-Contrato de Prestación de Servicios celebrado con el señor JUAN PÉREZ.
3-Comprobantes de pago de honorarios al señor JUAN PÉREZ.
4-Correspondencia electrónica y/o física que demuestre la autonomía e independencia en la prestación de los servicios por parte del demandante.
5-Certificaciones o constancias de proyectos en los que participó el demandante como consultor independiente.

*Testimoniales:
1-Solicito citar a declarar a las siguientes personas:
2-Laura Martínez, identificada con C.C. No. 43.210.987, domiciliada en Calle Central 456, Bogotá, quien en su calidad de Gerente de Proyectos de "TecnoSoluciones S.A.", podrá declarar sobre la naturaleza de la relación contractual con el demandante, la autonomía en el desarrollo de sus funciones y la ausencia de subordinación.
3-Andrés Felipe Rojas, identificado con C.C. No. 76.543.210, domiciliado en Avenida del Parque 123, Bogotá, quien en su calidad de coordinador técnico, podrá testificar sobre la forma de prestación de servicios del señor Juan Pérez, la inexistencia de horarios fijos y el cumplimiento de entregables como consultor.

*Interrogatorio de Parte:
Solicito citar a la parte demandante, señor JUAN PÉREZ, para que responda interrogatorio de parte sobre los hechos de la demanda y la naturaleza de la relación que mantuvo con "TecnoSoluciones S.A.".

**VI. ANEXOS**
Adjunto a la presente contestación:
Poder para actuar.
Copia del Certificado de Existencia y Representación Legal de "TecnoSoluciones S.A.".
Los documentos relacionados en el acápite de pruebas.
Copia de la contestación y anexos para la parte demandante.

**VII. NOTIFICACIONES**
Demandada: "TecnoSoluciones S.A.", en la dirección Avenida Imaginaria 456, Bogotá, y en el correo electrónico legal.tecnosoluciones@emailfalso.com.
Apoderada: Recibo notificaciones en el correo electrónico mariana.rodriguez.abogada@emailfalso.com y en la dirección Carrera 15 No. 60-30, Oficina 501, Bogotá.


________________________
MARIANA RODRÍGUEZ
C.C. No. 54.321.098
T.P. No. 12345 del C.S. de la J.
email: mariana.rodriguez.abogada@emailfalso.com
Teléfono: 3159876543
Bogotá D.C., 10 de julio de 2025
;