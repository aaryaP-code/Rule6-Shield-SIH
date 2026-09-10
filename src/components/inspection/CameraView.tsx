import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  Camera,
  X,
  RotateCcw,
  CheckCircle2,
  ArrowRight,
  ShieldCheck,
  SwitchCamera,
  Layers,
} from 'lucide-react';
import { Button } from '../Button';
import { InspectionData } from '../../types';

interface CameraViewProps {
  onClose: () => void;
  onContinue: (data: InspectionData) => void;
}

interface SamplePackage {
  id: string;
  name: string;
  brand: string;
  netQty: string;
  mrp: string;
  mfgDate: string;
  mfr: string;
  consumerCare: string;
  barcode: string;
  imageUrl: string;
}

const SAMPLE_PACKAGES: SamplePackage[] = [
  {
    id: 'tea-250',
    name: 'Assam Whole Leaf Orthodox Black Tea',
    brand: 'Hilltop Plantations',
    netQty: '250 g',
    mrp: '₹ 340.00 (Incl. of all taxes)',
    mfgDate: '08/2026',
    mfr: 'Hilltop Plantations Pvt. Ltd., Estate No. 4, Dibrugarh, Assam - 786001',
    consumerCare: 'care@hilltopplantations.in | Helpline: 1800-209-4040',
    barcode: '8901234567890',
    imageUrl: 'https://images.unsplash.com/photo-1576092768241-dec231879fc3?auto=format&fit=crop&w=800&q=80',
  },
  {
    id: 'almonds-200',
    name: 'Premium California Almonds (Roasted & Salted)',
    brand: 'NutriHarvest',
    netQty: '200 g',
    mrp: '₹ 295.00 (Incl. of all taxes)',
    mfgDate: '07/2026',
    mfr: 'NutriHarvest Foods LLP, Plot 18, MIDC Phase II, Pune, Maharashtra - 411019',
    consumerCare: 'feedback@nutriharvest.com | Helpline: 020-2748-9100',
    barcode: '8909876543210',
    imageUrl: 'https://images.unsplash.com/photo-1508061253366-f7da158b6d46?auto=format&fit=crop&w=800&q=80',
  },
  {
    id: 'oil-1000',
    name: 'Cold Pressed Virgin Mustard Oil',
    brand: 'Shuddh Prakriti',
    netQty: '1 L (910 g)',
    mrp: '₹ 215.00 (Incl. of all taxes)',
    mfgDate: '08/2026',
    mfr: 'Shuddh Agro Mills, Industrial Area, Alwar, Rajasthan - 301001',
    consumerCare: 'support@shuddhprakriti.org | Helpline: 1800-180-2211',
    barcode: '8906012345678',
    imageUrl: 'https://images.unsplash.com/photo-1474979266404-7eaacbcd87c5?auto=format&fit=crop&w=800&q=80',
  },
];

export const CameraView: React.FC<CameraViewProps> = ({ onClose, onContinue }) => {
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const [streamActive, setStreamActive] = useState(false);
  const [isCaptured, setIsCaptured] = useState(false);
  const [selectedSampleIndex, setSelectedSampleIndex] = useState(0);
  const [capturedImage, setCapturedImage] = useState<string | null>(null);

  const currentSample = SAMPLE_PACKAGES[selectedSampleIndex];

  // Attempt real camera stream, fallback to simulated stream
  useEffect(() => {
    let localStream: MediaStream | null = null;
    let isMounted = true;

    async function startCamera() {
      try {
        if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
          const stream = await navigator.mediaDevices.getUserMedia({
            video: { facingMode: 'environment', width: { ideal: 1280 }, height: { ideal: 720 } },
          });
          if (isMounted && videoRef.current) {
            videoRef.current.srcObject = stream;
            videoRef.current.play();
            localStream = stream;
            setStreamActive(true);
          }
        }
      } catch {
        // Fallback to high-fidelity simulated camera feed
        setStreamActive(false);
      }
    }

    startCamera();

    return () => {
      isMounted = false;
      if (localStream) {
        localStream.getTracks().forEach((track) => track.stop());
      }
    };
  }, []);

  const handleCapture = () => {
    if (streamActive && videoRef.current) {
      // Capture from video element
      try {
        const canvas = document.createElement('canvas');
        canvas.width = videoRef.current.videoWidth || 640;
        canvas.height = videoRef.current.videoHeight || 480;
        const ctx = canvas.getContext('2d');
        if (ctx) {
          ctx.drawImage(videoRef.current, 0, 0, canvas.width, canvas.height);
          const dataUrl = canvas.toDataURL('image/jpeg');
          setCapturedImage(dataUrl);
        } else {
          setCapturedImage(currentSample.imageUrl);
        }
      } catch {
        setCapturedImage(currentSample.imageUrl);
      }
    } else {
      // Simulated capture
      setCapturedImage(currentSample.imageUrl);
    }
    setIsCaptured(true);
  };

  const handleRetake = () => {
    setCapturedImage(null);
    setIsCaptured(false);
  };

  const handleProceed = () => {
    onContinue({
      method: 'camera',
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      imagePreview: capturedImage || currentSample.imageUrl,
      barcode: currentSample.barcode,
      commodityName: currentSample.name,
      brandName: currentSample.brand,
      netQuantity: currentSample.netQty,
      mrp: currentSample.mrp,
      mfgDate: currentSample.mfgDate,
      mfrNameAddress: currentSample.mfr,
      consumerCareDetails: currentSample.consumerCare,
      countryOfOrigin: 'India',
      complianceScore: 100,
    });
  };

  const handleCycleSample = () => {
    setSelectedSampleIndex((prev) => (prev + 1) % SAMPLE_PACKAGES.length);
  };

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.98 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.98 }}
      transition={{ duration: 0.25 }}
      className="bg-[#151F2B] border border-[#263445] rounded-xl overflow-hidden shadow-enterprise max-w-2xl mx-auto"
    >
      {/* Top Header Bar */}
      <div className="px-5 py-3.5 border-b border-[#263445] bg-[#0F1720] flex items-center justify-between">
        <div className="flex items-center gap-2.5">
          <div className="w-7 h-7 rounded-md bg-[#3B82F6] flex items-center justify-center text-white">
            <Camera className="w-3.5 h-3.5" />
          </div>
          <div>
            <h3 className="text-sm font-semibold text-[#F4F7FA]">Product Camera Inspection</h3>
            <p className="text-[11px] text-[#A7B4C3]">Legal Metrology Package Verification</p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          {!isCaptured && (
            <button
              type="button"
              onClick={handleCycleSample}
              className="inline-flex items-center gap-1.5 text-xs text-[#A7B4C3] hover:text-[#F4F7FA] bg-[#111A24] border border-[#263445] hover:border-[#3B82F6] px-2.5 py-1 rounded-md transition-colors cursor-pointer"
              title="Switch demo packaged sample"
            >
              <Layers className="w-3 h-3 text-[#3B82F6]" />
              <span className="hidden sm:inline">Sample:</span>
              <span className="font-semibold text-[#F4F7FA]">{currentSample.brand}</span>
            </button>
          )}

          <button
            type="button"
            onClick={onClose}
            className="w-7 h-7 rounded-md bg-[#111A24] border border-[#263445] hover:bg-[#192534] text-[#A7B4C3] hover:text-[#F4F7FA] flex items-center justify-center transition-colors cursor-pointer"
            aria-label="Close camera"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Main Camera Viewfinder Stage */}
      <div className="relative aspect-4/3 sm:aspect-16/10 bg-[#0B1117] flex items-center justify-center overflow-hidden">
        {isCaptured ? (
          // Captured Image Preview
          <div className="relative w-full h-full">
            <img
              src={capturedImage || currentSample.imageUrl}
              alt="Captured Product"
              className="w-full h-full object-cover"
              referrerPolicy="no-referrer"
            />
            <div className="absolute inset-0 bg-black/40 backdrop-blur-[1px]" />
            <div className="absolute top-4 left-4 right-4 flex items-center justify-between">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#123326] text-[#34A873] text-xs font-semibold border border-[#34A873]/30 shadow-sm">
                <CheckCircle2 className="w-3.5 h-3.5 text-[#34A873]" />
                <span>Product image captured</span>
              </span>
              <span className="text-xs text-white/90 font-mono bg-black/60 px-2 py-0.5 rounded border border-[#263445]">
                High Resolution · Rule 6 Scan
              </span>
            </div>

            {/* Detected label metadata badge */}
            <div className="absolute bottom-4 left-4 right-4 bg-[#0F1720]/90 backdrop-blur-md rounded-lg p-3 border border-[#263445] text-[#F4F7FA]">
              <p className="text-xs font-semibold truncate">{currentSample.name}</p>
              <div className="flex items-center gap-3 text-[11px] text-[#A7B4C3] mt-1">
                <span>Net Qty: {currentSample.netQty}</span>
                <span>•</span>
                <span>MRP: {currentSample.mrp}</span>
                <span>•</span>
                <span className="font-mono text-[#60A5FA]">{currentSample.barcode}</span>
              </div>
            </div>
          </div>
        ) : (
          // Active Viewfinder
          <div className="relative w-full h-full flex items-center justify-center">
            {streamActive ? (
              <video
                ref={videoRef}
                autoPlay
                playsInline
                muted
                className="w-full h-full object-cover"
              />
            ) : (
              // Realistic simulated packaged product feed
              <div className="relative w-full h-full flex items-center justify-center bg-radial from-[#151F2B] to-[#0B1117]">
                <img
                  src={currentSample.imageUrl}
                  alt="Simulated Product Label"
                  className="w-full h-full object-cover opacity-50"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0B1117]/90 via-transparent to-[#0B1117]/70" />
              </div>
            )}

            {/* Centered Scanning & Capture Frame */}
            <div className="absolute inset-8 sm:inset-12 pointer-events-none flex flex-col items-center justify-between">
              {/* Corner brackets */}
              <div className="w-full flex justify-between">
                <div className="w-8 h-8 border-t-2 border-l-2 border-[#3B82F6]" />
                <div className="w-8 h-8 border-t-2 border-r-2 border-[#3B82F6]" />
              </div>

              {/* Animated scanning line */}
              <motion.div
                animate={{
                  y: [-100, 100, -100],
                  opacity: [0.3, 0.9, 0.3],
                }}
                transition={{
                  duration: 2.8,
                  repeat: Infinity,
                  ease: 'easeInOut',
                }}
                className="w-full h-0.5 bg-gradient-to-r from-transparent via-[#3B82F6] to-transparent shadow-[0_0_8px_#3B82F6]"
              />

              <div className="w-full flex justify-between">
                <div className="w-8 h-8 border-b-2 border-l-2 border-[#3B82F6]" />
                <div className="w-8 h-8 border-b-2 border-r-2 border-[#3B82F6]" />
              </div>
            </div>

            {/* Framing Instruction */}
            <div className="absolute top-4 left-1/2 -translate-x-1/2 pointer-events-none">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#0F1720]/80 text-[#F4F7FA] text-xs font-medium backdrop-blur-md border border-[#263445] shadow-sm">
                <ShieldCheck className="w-3.5 h-3.5 text-[#3B82F6]" />
                Position the product label inside the frame
              </span>
            </div>

            {/* Bottom sample indicator if simulated */}
            {!streamActive && (
              <div className="absolute bottom-3 left-4 text-[11px] text-[#A7B4C3] bg-[#0F1720]/80 px-2 py-0.5 rounded border border-[#263445] backdrop-blur-sm">
                Simulated Camera Feed · {currentSample.brand}
              </div>
            )}
          </div>
        )}
      </div>

      {/* Camera Control Footer */}
      <div className="p-4 sm:p-5 bg-[#0F1720] border-t border-[#263445] flex items-center justify-between gap-4">
        {isCaptured ? (
          <>
            <Button
              variant="secondary"
              size="md"
              onClick={handleRetake}
              icon={<RotateCcw className="w-4 h-4" />}
            >
              Retake Photo
            </Button>

            <Button
              variant="primary"
              size="md"
              onClick={handleProceed}
              icon={<ArrowRight className="w-4 h-4" />}
            >
              Continue Inspection
            </Button>
          </>
        ) : (
          <>
            <button
              type="button"
              onClick={onClose}
              className="text-xs font-medium text-[#A7B4C3] hover:text-[#F4F7FA] px-3 py-2 rounded-md hover:bg-[#192534] transition-colors cursor-pointer"
            >
              Cancel
            </button>

            {/* Large Shutter Button */}
            <div className="flex flex-col items-center gap-1">
              <button
                type="button"
                onClick={handleCapture}
                className="w-14 h-14 rounded-full border-4 border-[#263445] bg-[#111A24] hover:border-[#3B82F6] flex items-center justify-center shadow-md hover:shadow-lg transition-all active:scale-95 cursor-pointer group"
                aria-label="Capture Photo"
              >
                <div className="w-10 h-10 rounded-full bg-[#3B82F6] group-hover:bg-[#2563EB] transition-colors" />
              </button>
              <span className="text-[10px] font-medium text-[#A7B4C3]">Capture</span>
            </div>

            <div className="text-right">
              <span className="text-xs text-[#718096] hidden sm:block">
                Auto-focus enabled
              </span>
            </div>
          </>
        )}
      </div>
    </motion.div>
  );
};
