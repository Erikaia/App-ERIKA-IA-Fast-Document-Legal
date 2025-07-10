
import React, { useState, useCallback, useEffect } from 'react';
import { Type } from "@google/genai";
import { Header } from './components/Header';
import { PowerOfAttorneyForm, LawsuitResponseForm } from './components/CodeInput';
import { FileUploadZone } from './components/FileUploadZone';
import { OutputPanel } from './components/ReviewOutput';
import { ApiKeyManager } from './components/ApiKeyManager';
import { generatePowerOfAttorney, generateLawsuitResponse, extractInfoFromImage } from './services/geminiService';
import { DEMO_POA_EXTRACTED_DATA, DEMO_POA_OUTPUT, DEMO_LAWSUIT_EXTRACTED_DATA, DEMO_LAWSUIT_OUTPUT } from './constants';


const DOCUMENT_TYPES = {
  POA: 'Poder Especial',
  LAWSUIT: 'Contestación de Demanda',
};

// JSON schema for extracting Power of Attorney data from an image.
const poaSchema = {
  type: Type.OBJECT,
  properties: {
    grantorName: { type: Type.STRING, description: "Nombre completo del poderdante" },
    grantorDNI: { type: Type.STRING, description: "DNI del poderdante" },
    grantorAddress: { type: Type.STRING, description: "Dirección del poderdante" },
    attorneyName: { type: Type.STRING, description: "Nombre completo del apoderado" },
    attorneyDNI: { type: Type.STRING, description: "DNI del apoderado" },
    attorneyAddress: { type: Type.STRING, description: "Dirección del apoderado" },
  },
};

// JSON schema for extracting Lawsuit data from an image.
const lawsuitSchema = {
  type: Type.OBJECT,
  properties: {
    defendantName: { type: Type.STRING, description: "Nombre o razón social del demandado" },
    defendantDNI: { type: Type.STRING, description: "DNI o RUC del demandado" },
    lawsuitText: { type: Type.STRING, description: "Un resumen de los principales reclamos y hechos de la demanda." },
  },
};

// Helper to convert a file to a base64 string for the Gemini API.
const fileToBase64 = (file: File): Promise<string> => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => {
      const result = reader.result as string;
      // Remove the "data:mime/type;base64," prefix
      resolve(result.split(',')[1]);
    };
    reader.onerror = error => reject(error);
  });
};

// Helper to simulate network delay for demo mode
const demoDelay = (ms: number) => new Promise(res => setTimeout(res, ms));


const App: React.FC = () => {
  const [activeTab, setActiveTab] = useState<string>(DOCUMENT_TYPES.POA);
  const [generatedDocument, setGeneratedDocument] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [file, setFile] = useState<File | null>(null);
  const [isExtracting, setIsExtracting] = useState<boolean>(false);
  const [isExtractorVisible, setIsExtractorVisible] = useState(true);
  const [isDemoMode, setIsDemoMode] = useState(true);
  const [apiKey, setApiKey] = useState('');

  useEffect(() => {
    // On load, try to get the API key from local storage
    const storedKey = localStorage.getItem('gemini-api-key');
    if (storedKey) {
        setApiKey(storedKey);
    }
  }, []);

  // Default data for the Power of Attorney form.
  const [poaData, setPoaData] = useState({
    grantorName: 'JUAN PEREZ GOMEZ',
    grantorDNI: '12345678',
    grantorAddress: 'Av. Siempre Viva 123, Springfield',
    attorneyName: 'MARIA LOPEZ DIAZ',
    attorneyDNI: '87654321',
    attorneyAddress: 'Calle Falsa 456, Shelbyville',
    powers: 'Para que pueda representarme ante el Banco de la Nación para solicitar y cobrar un cheque de gerencia por la suma de S/ 5,000.00 (Cinco Mil y 00/100 Soles).',
  });

  // Default data for the Lawsuit Response form.
  const [lawsuitData, setLawsuitData] = useState({
    defendantName: 'EMPRESA CONSTRUCTORA S.A.C.',
    defendantDNI: '20123456789',
    lawsuitText: 'El demandante, Sr. Carlos Rodriguez, alega un despido arbitrario con fecha 15 de marzo de 2024. Solicita el pago de beneficios sociales truncos, indemnización por despido y una compensación por daños y perjuicios. Afirma haber trabajado de forma ininterrumpida desde el 01 de enero de 2022.',
  });
  
  const resetAppStatus = () => {
    setError(null);
    setGeneratedDocument(null);
  }

  const handleTabChange = (tab: string) => {
    setActiveTab(tab);
    resetAppStatus();
    setFile(null);
    setIsExtractorVisible(true); // Re-open extractor on tab change
  }
  
  const handleToggleDemoMode = () => {
      setIsDemoMode(prev => !prev);
      resetAppStatus(); // Reset state when changing modes
  }

  const handleFileExtract = useCallback(async () => {
    if (!file) return;

    setIsExtracting(true);
    resetAppStatus();

    try {
      if (isDemoMode) {
        await demoDelay(800); // Simulate processing time
        if (activeTab === DOCUMENT_TYPES.POA) {
            setPoaData(DEMO_POA_EXTRACTED_DATA);
        } else {
            setLawsuitData(DEMO_LAWSUIT_EXTRACTED_DATA);
        }
      } else {
        const base64Data = await fileToBase64(file);
        const fileDetails = { data: base64Data, mimeType: file.type };
        
        let extractedData;
        if (activeTab === DOCUMENT_TYPES.POA) {
          extractedData = await extractInfoFromImage(apiKey, fileDetails, poaSchema, 'Poder');
          // Keep existing 'powers' field as it's not extracted from DNI
          setPoaData(prev => ({ ...prev, ...extractedData, powers: prev.powers }));
        } else {
          extractedData = await extractInfoFromImage(apiKey, fileDetails, lawsuitSchema, 'Demanda');
          setLawsuitData(prev => ({ ...prev, ...extractedData }));
        }
      }
      setIsExtractorVisible(false); // Auto-collapse on success
    } catch (e) {
      const errorMessage = e instanceof Error ? e.message : 'Ocurrió un error desconocido al extraer datos.';
      setError(errorMessage);
    } finally {
      setIsExtracting(false);
    }
  }, [file, activeTab, isDemoMode, apiKey]);

  const handleGenerate = useCallback(async () => {
    setIsLoading(true);
    resetAppStatus();

    try {
      let result;
      if (isDemoMode) {
        await demoDelay(1200); // Simulate generation time
        if (activeTab === DOCUMENT_TYPES.POA) {
          result = DEMO_POA_OUTPUT;
        } else {
          result = DEMO_LAWSUIT_OUTPUT;
        }
      } else {
        if (activeTab === DOCUMENT_TYPES.POA) {
          result = await generatePowerOfAttorney(apiKey, poaData);
        } else {
          result = await generateLawsuitResponse(apiKey, lawsuitData);
        }
      }
      setGeneratedDocument(result);
    } catch (e) {
      const errorMessage = e instanceof Error ? e.message : 'Ocurrió un error desconocido al generar el documento.';
      setError(errorMessage);
    } finally {
      setIsLoading(false);
    }
  }, [activeTab, poaData, lawsuitData, isDemoMode, apiKey]);

  const renderForm = () => {
    if (activeTab === DOCUMENT_TYPES.POA) {
      return <PowerOfAttorneyForm data={poaData} setData={setPoaData} />;
    }
    if (activeTab === DOCUMENT_TYPES.LAWSUIT) {
      return <LawsuitResponseForm data={lawsuitData} setData={setLawsuitData} />;
    }
    return null;
  };
  
  const isGenerateDisabled = () => {
    if (isLoading || isExtracting) return true;
    if (!isDemoMode && !apiKey) return true; // Disable if in live mode and no API key

    if(activeTab === DOCUMENT_TYPES.POA) {
        return Object.values(poaData).some(val => !val.trim());
    }
     if(activeTab === DOCUMENT_TYPES.LAWSUIT) {
        return Object.values(lawsuitData).some(val => !val.trim());
    }
    return true;
  }

  return (
    <div className="min-h-screen bg-gray-900 text-white flex flex-col p-4 sm:p-6 lg:p-8 font-sans">
      <Header />
      
      <main className="mt-6 flex-grow grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="flex flex-col bg-gray-800/50 ring-1 ring-white/10 p-6 rounded-lg shadow-2xl h-full">
            <div className="flex-shrink-0 mb-4 space-y-4">
                <div className="flex items-center justify-between">
                    <h2 className="text-xl font-bold text-white">Configuración</h2>
                     <div className="flex items-center">
                        <span className={`mr-3 font-medium text-sm ${isDemoMode ? 'text-green-400' : 'text-gray-400'}`}>Modo Demo</span>
                        <label htmlFor="demo-toggle" className="inline-flex relative items-center cursor-pointer">
                            <input type="checkbox" id="demo-toggle" className="sr-only peer" checked={!isDemoMode} onChange={handleToggleDemoMode} />
                            <div className="w-11 h-6 bg-gray-600 rounded-full peer peer-focus:ring-4 peer-focus:ring-indigo-800 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-indigo-600"></div>
                        </label>
                        <span className={`ml-3 font-medium text-sm ${!isDemoMode ? 'text-indigo-400' : 'text-gray-400'}`}>Modo Real (API)</span>
                    </div>
                </div>
                 {!isDemoMode && (
                    <ApiKeyManager apiKey={apiKey} setApiKey={setApiKey} />
                 )}
                <div className="flex border-b border-gray-700">
                    <TabButton title={DOCUMENT_TYPES.POA} isActive={activeTab === DOCUMENT_TYPES.POA} onClick={() => handleTabChange(DOCUMENT_TYPES.POA)} />
                    <TabButton title={DOCUMENT_TYPES.LAWSUIT} isActive={activeTab === DOCUMENT_TYPES.LAWSUIT} onClick={() => handleTabChange(DOCUMENT_TYPES.LAWSUIT)} />
                </div>
            </div>
            
            <div className="flex-grow overflow-y-auto pr-2 -mr-2 space-y-6" style={{ scrollbarWidth: 'thin' }}>
              <div className="border border-gray-700 rounded-lg bg-gray-900/30">
                  <button onClick={() => setIsExtractorVisible(!isExtractorVisible)} className="w-full p-3 text-left flex justify-between items-center transition-colors hover:bg-gray-800/50" aria-expanded={isExtractorVisible}>
                      <h3 className="text-lg font-semibold text-white">1. Extraer Datos de Archivo (Opcional)</h3>
                      <svg className={`w-5 h-5 transform transition-transform ${isExtractorVisible ? '' : '-rotate-90'}`} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true"><path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" /></svg>
                  </button>
                  {isExtractorVisible && (
                      <div className="p-4 border-t border-gray-700">
                          <FileUploadZone 
                            file={file}
                            setFile={setFile}
                            onExtract={handleFileExtract}
                            isExtracting={isExtracting}
                            disabled={isLoading}
                          />
                      </div>
                  )}
              </div>

              <div className="relative pt-4">
                <div className="absolute inset-0 flex items-center" aria-hidden="true">
                  <div className="w-full border-t border-gray-700/50"></div>
                </div>
                <div className="relative flex justify-center">
                  <span className="bg-gray-800/50 px-3 text-lg font-medium text-white">2. Completar y Revisar Datos</span>
                </div>
              </div>
              
              {renderForm()}
            </div>

            <div className="flex-shrink-0 mt-6 pt-6 border-t border-gray-700">
              <button
                  onClick={handleGenerate}
                  disabled={isGenerateDisabled()}
                  className="w-full flex items-center justify-center px-6 py-3 border border-transparent text-base font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-900 focus:ring-indigo-500 disabled:bg-gray-500 disabled:text-gray-400 disabled:cursor-not-allowed transition-all duration-200"
              >
                  {isLoading ? (
                    <>
                      <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                      Generando...
                    </>
                  ) : 'Generar Documento'}
              </button>
          </div>
        </div>

        <div className="bg-gray-800/50 ring-1 ring-white/10 rounded-lg shadow-2xl flex flex-col h-full min-h-[75vh] lg:min-h-0">
          <OutputPanel
            documentText={generatedDocument}
            isLoading={isLoading}
            error={error}
            activeTab={activeTab}
          />
        </div>
      </main>
    </div>
  );
};

interface TabButtonProps {
    title: string;
    isActive: boolean;
    onClick: () => void;
}

const TabButton: React.FC<TabButtonProps> = ({ title, isActive, onClick }) => (
    <button
        onClick={onClick}
        className={`w-1/2 py-3 px-1 text-sm font-medium text-center border-b-2 -mb-px
            ${isActive
                ? 'border-indigo-500 text-indigo-400'
                : 'border-transparent text-gray-400 hover:text-gray-200 hover:border-gray-500'
            }
            focus:outline-none transition-colors duration-200 whitespace-nowrap`}
        aria-current={isActive ? 'page' : undefined}
    >
        {title}
    </button>
);

export default App;
