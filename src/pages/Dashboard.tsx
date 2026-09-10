import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'motion/react';
import { LogOut, FileCheck, User, Building, ShieldCheck } from 'lucide-react';
import { authService, CATEGORIES } from '../services/authService';
import { UserSession, InspectionData } from '../types';
import { Header } from '../components/Header';
import { Button } from '../components/Button';
import { ProductInspectionCard } from '../components/inspection/ProductInspectionCard';
import { CameraView } from '../components/inspection/CameraView';
import { UploadView } from '../components/inspection/UploadView';
import { InspectionResultView } from '../components/inspection/InspectionResultView';

const ROLE_DASHBOARD_DESCRIPTIONS: Record<string, string> = {
  official:
    'Authorized portal for Legal Metrology Packaged Commodities verification and compliance enforcement.',
  manufacturer:
    'Verify pre-market declarations and ensure full packaging compliance under Rule 6.',
  retailer:
    'Verify packaged products before listing and catalog approval across retail channels.',
  consumer:
    'Check packaged products and understand mandatory legal metrology declarations.',
};

export const Dashboard: React.FC = () => {
  const navigate = useNavigate();
  const [session, setSession] = useState<UserSession | null>(null);
  const [activeModal, setActiveModal] = useState<'camera' | 'upload' | null>(null);
  const [inspectionResult, setInspectionResult] = useState<InspectionData | null>(null);

  useEffect(() => {
    const current = authService.getCurrentSession();
    if (!current) {
      navigate('/');
    } else {
      setSession(current);
    }
  }, [navigate]);

  const handleLogout = () => {
    authService.logout();
    navigate('/');
  };

  if (!session) {
    return null;
  }

  const categoryMeta = CATEGORIES[session.category];
  const roleDescription =
    ROLE_DASHBOARD_DESCRIPTIONS[session.category] ||
    'Legal Metrology (Packaged Commodities) Rules, 2011 Compliance Portal.';

  return (
    <div className="min-h-screen bg-[#0B1117] flex flex-col justify-between">
      {/* Header */}
      <Header
        categoryTitle={categoryMeta.title}
        showLogout
        onLogout={handleLogout}
      />

      {/* Main Content Area */}
      <main className="max-w-4xl w-full mx-auto px-4 sm:px-6 py-10 sm:py-14 flex-1 flex flex-col items-center">
        {inspectionResult ? (
          /* Inspection Result Mode */
          <div className="w-full">
            <InspectionResultView
              data={inspectionResult}
              category={session.category}
              onInspectAnother={() => setInspectionResult(null)}
            />
          </div>
        ) : (
          /* Dashboard Default Mode */
          <>
            {/* Top Header Hierarchy */}
            <div className="w-full text-center space-y-3 mb-8 sm:mb-10">
              <motion.div
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.25 }}
                className="space-y-2"
              >
                <h1 className="text-3xl sm:text-4xl font-bold tracking-tight text-[#F4F7FA]">
                  Welcome to Rule6 Shield
                </h1>
                <p className="text-base sm:text-lg text-[#A7B4C3] max-w-xl mx-auto leading-relaxed">
                  {roleDescription}
                </p>
              </motion.div>

              {/* Compact User Info Pill */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.3, delay: 0.1 }}
                className="inline-flex flex-wrap items-center justify-center gap-x-3 gap-y-1 px-4 py-1.5 rounded-full bg-[#151F2B] border border-[#263445] text-xs text-[#A7B4C3] shadow-xs mx-auto"
              >
                <span className="flex items-center gap-1.5 text-[#F4F7FA] font-medium">
                  <span className="w-2 h-2 rounded-full bg-[#3B82F6]" />
                  <User className="w-3.5 h-3.5 text-[#3B82F6]" />
                  <span>{session.name}</span>
                </span>

                <span className="text-[#263445] hidden sm:inline">|</span>

                <span className="flex items-center gap-1 font-mono text-[11px] text-[#A7B4C3]">
                  <Building className="w-3 h-3 text-[#718096]" />
                  <span>{session.organization || session.identifier}</span>
                </span>

                <span className="text-[#263445] hidden sm:inline">|</span>

                <span className="flex items-center gap-1 text-[11px] text-[#60A5FA] font-medium">
                  <ShieldCheck className="w-3.5 h-3.5 text-[#3B82F6]" />
                  <span>{categoryMeta.title}</span>
                </span>
              </motion.div>
            </div>

            {/* Section Label: Main Action */}
            <div className="w-full max-w-xl mb-4 flex items-center justify-between">
              <span className="text-xs font-semibold uppercase tracking-wider text-[#A7B4C3] flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-[#3B82F6]" />
                <span>Inspect a Product</span>
              </span>
              <span className="text-[11px] text-[#718096]">
                Rule 6 (PCR, 2011)
              </span>
            </div>

            {/* Single Medium-Sized Product Input Card */}
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: 0.15 }}
              className="w-full"
            >
              <ProductInspectionCard
                category={session.category}
                onOpenAction={(mode) => setActiveModal(mode)}
              />
            </motion.div>

            {/* Secondary Info Reference Card */}
            <div className="w-full max-w-xl mt-8 bg-[#151F2B] border border-[#263445] rounded-xl p-4 sm:p-5 shadow-xs flex items-center justify-between gap-4">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-lg bg-[#172A44] border border-[#263445] flex items-center justify-center text-[#60A5FA] shrink-0">
                  <FileCheck className="w-4 h-4 text-[#3B82F6]" />
                </div>
                <p className="text-xs text-[#A7B4C3] leading-relaxed">
                  Mandatory Rule 6 declarations verification platform for packaged commodities.
                </p>
              </div>

              <Button
                variant="ghost"
                size="sm"
                onClick={handleLogout}
                icon={<LogOut className="w-3.5 h-3.5" />}
                className="text-xs shrink-0"
              >
                Sign out
              </Button>
            </div>
          </>
        )}
      </main>

      {/* Modal Dialog for Camera Inspection */}
      {activeModal === 'camera' && (
        <div className="fixed inset-0 z-50 bg-[#0B1117]/80 backdrop-blur-xs flex items-center justify-center p-4">
          <CameraView
            onClose={() => setActiveModal(null)}
            onContinue={(data) => {
              setActiveModal(null);
              setInspectionResult(data);
            }}
          />
        </div>
      )}

      {/* Modal Dialog for Upload Inspection */}
      {activeModal === 'upload' && (
        <div className="fixed inset-0 z-50 bg-[#0B1117]/80 backdrop-blur-xs flex items-center justify-center p-4">
          <UploadView
            onClose={() => setActiveModal(null)}
            onContinue={(data) => {
              setActiveModal(null);
              setInspectionResult(data);
            }}
          />
        </div>
      )}

      {/* Footer */}
      <footer className="w-full border-t border-[#263445] bg-[#0F1720] py-5 px-4 text-center text-xs text-[#718096]">
        <div className="max-w-5xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-2">
          <span className="text-[#A7B4C3]">Rule6 Shield · Legal Metrology Verification System</span>
          <span className="text-[11px] text-[#718096]">
            Packaged Commodities Compliance Engine
          </span>
        </div>
      </footer>
    </div>
  );
};
