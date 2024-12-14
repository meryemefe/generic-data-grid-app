import { AllEnterpriseModule, LicenseManager, ModuleRegistry } from "ag-grid-enterprise";
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'


ModuleRegistry.registerModules([AllEnterpriseModule]);

LicenseManager.setLicenseKey("test");


createRoot(document.getElementById('root')!).render(
    <StrictMode>
        <App/>
    </StrictMode>,
)
