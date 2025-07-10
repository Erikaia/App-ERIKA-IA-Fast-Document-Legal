
import { GoogleGenAI, GenerateContentResponse, Part, Type } from "@google/genai";

// We no longer read from process.env.API_KEY here.
// The API key will be passed as an argument to each function.

// Helper to get the AI client instance.
const getAiClient = (apiKey: string) => {
  if (!apiKey) {
    throw new Error("La clave API de Gemini no ha sido proporcionada. Por favor, ingrésela para continuar.");
  }
  return new GoogleGenAI({ apiKey });
};


interface PowerOfAttorneyData {
  grantorName: string;
  grantorDNI: string;
  grantorAddress: string;
  attorneyName: string;
  attorneyDNI: string;
  attorneyAddress: string;
  powers: string;
}

interface LawsuitResponseData {
  defendantName: string;
  defendantDNI: string;
  lawsuitText: string;
}

// Internal function to call the Gemini API for text generation.
const callGemini = async (apiKey: string, prompt: string, config?: any): Promise<string> => {
  try {
    const ai = getAiClient(apiKey);
    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: prompt,
      config: config,
    });
    return response.text;
  } catch (error) {
    console.error("Error calling Gemini API:", error);
    // Provide a more user-friendly error message.
    throw new Error(`Ocurrió un error al comunicarse con la IA. Verifique su clave API o intente de nuevo más tarde.`);
  }
};


export const extractInfoFromImage = async (
  apiKey: string,
  file: { data: string; mimeType: string },
  schema: any,
  documentType: 'Poder' | 'Demanda'
): Promise<any> => {
  const textPart: Part = {
    text: `Eres un asistente experto en extracción de datos legales en documentos peruanos. Analiza la imagen del documento proporcionado y extrae la información solicitada según el esquema JSON. El documento es un/a "${documentType}". Si un campo no se encuentra en el documento, utiliza una cadena vacía "" como valor. Responde únicamente con el objeto JSON.`
  };

  const imagePart: Part = {
    inlineData: {
      mimeType: file.mimeType,
      data: file.data,
    },
  };

  try {
    const ai = getAiClient(apiKey);
    const response: GenerateContentResponse = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: { parts: [textPart, imagePart] },
      config: {
        responseMimeType: "application/json",
        responseSchema: schema,
      },
    });
    
    // The response text is a JSON string because of the config.
    const parsedJson = JSON.parse(response.text);
    return parsedJson;
  } catch (error) {
     console.error("Error calling Gemini Vision API:", error);
     throw new Error(`Error al extraer datos del documento. Verifique su clave API, que el archivo sea claro y corresponda al tipo de documento seleccionado.`);
  }
}


export const generatePowerOfAttorney = async (apiKey: string, data: PowerOfAttorneyData): Promise<string> => {
  const prompt = `
    Eres un asistente legal experto en la redacción de documentos notariales en Perú.
    Tu tarea es redactar un PODER ESPECIAL basado en la siguiente información.
    El documento debe ser formal, preciso y seguir la estructura legal estándar para un poder notarial en Perú.
    Usa los datos proporcionados para completar las secciones correspondientes. No inventes información que no se te proporciona.

    **Información para el Poder Especial:**

    1.  **PODERDANTE (Quien otorga el poder):**
        *   Nombre Completo: ${data.grantorName}
        *   DNI: ${data.grantorDNI}
        *   Domicilio: ${data.grantorAddress}

    2.  **APODERADO (Quien recibe el poder):**
        *   Nombre Completo: ${data.attorneyName}
        *   DNI: ${data.attorneyDNI}
        *   Domicilio: ${data.attorneyAddress}

    3.  **FACULTADES ESPECÍFICAS A OTORGAR:**
        *   ${data.powers}

    **Formato del Documento (sigue esta estructura y complétala):**

    ---

    **PODER ESPECIAL**

    **SEÑOR NOTARIO:**
    Sírvase usted extender en su Registro de Escrituras Públicas una de PODER ESPECIAL que otorga el PODERDANTE, don/doña **${data.grantorName}**, identificado/a con DNI N° **${data.grantorDNI}**, con domicilio en **${data.grantorAddress}**; a favor del APODERADO, don/doña **${data.attorneyName}**, identificado/a con DNI N° **${data.attorneyDNI}**, con domicilio en **${data.attorneyAddress}**; en los términos y condiciones siguientes:

    **PRIMERO: OBJETO DEL PODER**
    Por el presente instrumento, el PODERDANTE otorga PODER ESPECIAL, amplio y suficiente, a favor de su APODERADO para que, en su nombre y representación, pueda realizar los siguientes actos:
    ${data.powers}

    **SEGUNDO: CARÁCTER DEL PODER**
    Las facultades conferidas son de carácter especial y se limitan exclusivamente a lo descrito en la cláusula anterior. El PODERDANTE se da por notificado/a de los alcances y efectos del presente poder, ratificándose en todo su contenido.

    Agregue usted, señor Notario, la introducción y conclusión de ley, y curse los partes respectivos al Registro de Mandatos y Poderes de la Oficina Registral correspondiente para su debida inscripción.

    Firmado en la ciudad de Lima, a los [Día] días del mes de [Mes] de [Año].

    (DEJA ESPACIO PARA FIRMAS)

    _________________________
    **${data.grantorName}**
    DNI N° **${data.grantorDNI}**
  `;
  return callGemini(apiKey, prompt);
};

export const generateLawsuitResponse = async (apiKey: string, data: LawsuitResponseData): Promise<string> => {
  const prompt = `
    Eres un abogado experto en derecho laboral peruano.
    Tu tarea es redactar una contestación de demanda laboral sólida y bien fundamentada en base al resumen proporcionado.
    Niega las afirmaciones del demandante de manera fundamentada y profesional.
    
    **Datos del Demandado:**
    *   Nombre o Razón Social: ${data.defendantName}
    *   DNI / RUC: ${data.defendantDNI}

    **Resumen de la Demanda a Contestar:**
    ${data.lawsuitText}

    **Instrucciones para la Contestación:**
    1.  Utiliza un tono formal y legal.
    2.  Estructura la contestación con una introducción, una sección de "Contradicción y Fundamentos de Hecho", donde niegues cada punto de la demanda, y una conclusión ("Por lo tanto:").
    3.  Ofrece una defensa plausible. Por ejemplo, si se alega despido arbitrario, argumenta que la relación laboral terminó por mutuo acuerdo, renuncia voluntaria, o una causa justa prevista en la ley.
    4.  Finaliza solicitando que la demanda sea declarada infundada en todos sus extremos.

    **Formato del Documento (sigue esta estructura y complétala):**

    ---

    **EXPEDIENTE N°:** [DEJAR EN BLANCO]
    **SECRETARIO:** [DEJAR EN BLANCO]
    **ESCRITO N°:** 01-2024
    **CUADERNO:** PRINCIPAL
    **SUMILLA:** CONTESTACIÓN DE DEMANDA

    **SEÑOR JUEZ DEL [NÚMERO] JUZGADO ESPECIALIZADO DE TRABAJO DE LIMA**

    **${data.defendantName}**, identificada con RUC N° **${data.defendantDNI}**, con domicilio real en [AÑADIR DIRECCIÓN], y domicilio procesal en la casilla electrónica N° [AÑADIR NÚMERO]; en los autos seguidos por [NOMBRE DEL DEMANDANTE] sobre pago de beneficios sociales y otros; a usted, respetuosamente digo:

    **I. APERSONAMIENTO Y CONTRADICCIÓN:**
    Que, dentro del plazo de ley, me apersono al proceso y formulo CONTRADICCIÓN a la demanda interpuesta en mi contra, solicitando que sea declarada INFUNDADA en todos sus extremos, con expresa condena de costas y costos.

    **II. FUNDAMENTOS DE HECHO DE LA CONTRADICCIÓN:**
    Niego y contradigo todos y cada uno de los hechos expuestos por el demandante en su escrito de demanda, por no ser ciertos y carecer de sustento fáctico y legal. Específicamente, procedo a contradecir los puntos principales de la siguiente manera:
    (El modelo de IA debe desarrollar aquí la argumentación en base al resumen de la demanda, negando los hechos o dándoles una interpretación favorable al demandado, siguiendo las instrucciones).

    **III. FUNDAMENTOS DE DERECHO:**
    Amparo la presente contestación en lo dispuesto por el Texto Único Ordenado del Decreto Legislativo N° 728, Ley de Productividad y Competitividad Laboral, aprobado por Decreto Supremo N° 003-97-TR, y demás normas aplicables del Código Procesal Civil.

    **IV. MEDIOS PROBATORIOS:**
    (El modelo de IA puede sugerir medios probatorios genéricos si corresponde, como "Contrato de Trabajo", "Boletas de Pago", "Liquidación de Beneficios Sociales", "Carta de Renuncia", etc.)

    **POR LO EXPUESTO:**
    A usted, Señor Juez, solicito tener por contestada la demanda en tiempo y forma, y en su oportunidad, declararla INFUNDADA en todos sus extremos, con la correspondiente condena en costas y costos.

    **PRIMER OTROSÍ DIGO:** Que, de conformidad con el artículo 80° del Código Procesal Civil, otorgo al abogado que autoriza el presente las facultades generales de representación a que se refiere el artículo 74° del mismo cuerpo legal.

    Lima, [Día] de [Mes] de [Año].


    (DEJA ESPACIO PARA FIRMAS)

    _________________________
    **${data.defendantName}**
    RUC N° **${data.defendantDNI}**
  `;
  return callGemini(apiKey, prompt);
};