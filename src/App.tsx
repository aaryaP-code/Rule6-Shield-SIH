import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { CategorySelection } from './pages/CategorySelection';
import { OfficialLogin } from './pages/OfficialLogin';
import { OfficialRegister } from './pages/OfficialRegister';
import { ManufacturerLogin } from './pages/ManufacturerLogin';
import { ManufacturerRegister } from './pages/ManufacturerRegister';
import { RetailerLogin } from './pages/RetailerLogin';
import { RetailerRegister } from './pages/RetailerRegister';
import { ConsumerLogin } from './pages/ConsumerLogin';
import { ConsumerRegister } from './pages/ConsumerRegister';
import { Dashboard } from './pages/Dashboard';

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Initial Category Selection Page */}
        <Route path="/" element={<CategorySelection />} />

        {/* Inspection Official */}
        <Route path="/auth/official" element={<OfficialLogin />} />
        <Route path="/register/official" element={<OfficialRegister />} />

        {/* Manufacturer */}
        <Route path="/auth/manufacturer" element={<ManufacturerLogin />} />
        <Route path="/register/manufacturer" element={<ManufacturerRegister />} />

        {/* E-Commerce Retailer */}
        <Route path="/auth/retailer" element={<RetailerLogin />} />
        <Route path="/register/retailer" element={<RetailerRegister />} />

        {/* Consumer */}
        <Route path="/auth/consumer" element={<ConsumerLogin />} />
        <Route path="/register/consumer" element={<ConsumerRegister />} />

        {/* Temporary Dashboard */}
        <Route path="/dashboard" element={<Dashboard />} />

        {/* Fallback to root */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  );
}
