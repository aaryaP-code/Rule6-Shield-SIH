import React, { useState, useRef } from 'react';
import { motion } from 'motion/react';
import {
  Upload,
  Image as ImageIcon,
  X,
  FileCheck,
  ArrowRight,
  RotateCcw,
  Sparkles,
} from 'lucide-react';
import { Button } from '../Button';
import { InspectionData } from '../../types';

interface UploadViewProps {
  onClose: () => void;
  onContinue: (data: InspectionData) => void;
}

interface PreloadedSample {
  name: string;
  fileName: string;
  brand: string;
  netQty: string;
  mrp: string;
  mfgDate: string;
  mfr: string;
  consumerCare: string;
  barcode: string;
  url: string;
}

const PRELOADED_SAMPLES: PreloadedSample[] = [
  {
    name: 'Assam Whole Leaf Orthodox Black Tea',
    fileName: 'tea_package_label_front.jpg',
    brand: 'Hilltop Plantations',
    netQty: '250 g',
    mrp: '₹ 340.00 (Incl. of all taxes)',
    mfgDate: '08/2026',
    mfr: 'Hilltop Plantations Pvt. Ltd., Estate No. 4, Dibrugarh, Assam - 786001',
    consumerCare: 'care@hilltopplantations.in | Helpline: 1800-209-4040',
    barcode: '8901234567890',
    url: 'https://images.unsplash.com/photo-1576092768241-dec231879fc3?auto=format&fit=crop&w=800&q=80',
  },
  {
    name: 'Roasted California Almonds',
    fileName: 'almonds_retail_pack_200g.png',
    brand: 'NutriHarvest',
    netQty: '200 g',
    mrp: '₹ 295.00 (Incl. of all taxes)',
    mfgDate: '07/2026',
    mfr: 'NutriHarvest Foods LLP, Plot 18, MIDC Phase II, Pune - 411019',
    consumerCare: 'feedback@nutriharvest.com | Helpline: 020-2748-9100',
    barcode: '8909876543210',
    url: 'https://images.unsplash.com/photo-1508061253366-f7da158b6d46?auto=format&fit=crop&w=800&q=80',
  },
  {
    name: 'Organic Rolled Oats',
    fileName: 'oats_500g_declaration_label.jpg',
    brand: 'Naturals Kitchen',
    netQty: '500 g',
    mrp: '₹ 175.00 (Incl. of all taxes)',
    mfgDate: '08/2026',
    mfr: 'Naturals Grain Foods, NH-8, Gurugram, Haryana - 122001',
    consumerCare: 'contact@naturalsgrain.in | 1800-419-8080',
    barcode: '8904012345678',
    url: 'https://images.unsplash.com/photo-1586444248902-2f64eddc13df?auto=format&fit=crop&w=800&q=80',
  },
];

export const UploadView: React.FC<UploadViewProps> = ({ onClose, onContinue }) => {
  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const [dragActive, setDragActive] = useState(false);
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [fileName, setFileName] = useState<string>('');
  const [fileSize, setFileSize] = useState<string>('');
  const [matchedSample, setMatchedSample] = useState<PreloadedSample>(PRELOADED_SAMPLES[0]);

  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === 'dragenter' || e.type === 'dragover') {
      setDragActive(true);
    } else if (e.type === 'dragleave') {
      setDragActive(false);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);

    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      processFile(e.dataTransfer.files[0]);
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      processFile(e.target.files[0]);
    }
  };

  const processFile = (file: File) => {
    const reader = new FileReader();
    reader.onload = (loadEvent) => {
      setSelectedImage(loadEvent.target?.result as string);
      setFileName(file.name);
      const kb = Math.round(file.size / 1024);
      setFileSize(`${kb} KB`);
    };
    reader.readAsDataURL(file);
  };

  const handleSelectSample = (sample: PreloadedSample) => {
    setSelectedImage(sample.url);
    setFileName(sample.fileName);
    setFileSize('1.4 MB');
    setMatchedSample(sample);
  };

  const handleRemove = () => {
    setSelectedImage(null);
    setFileName('');
    setFileSize('');
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  const handleProceed = () => {
    onContinue({
      method: 'upload',
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      imagePreview: selectedImage || matchedSample.url,
      fileName: fileName || matchedSample.fileName,
      barcode: matchedSample.barcode,
      commodityName: matchedSample.name,
      brandName: matchedSample.brand,
      netQuantity: matchedSample.netQty,
      mrp: matchedSample.mrp,
      mfgDate: matchedSample.mfgDate,
      mfrNameAddress: matchedSample.mfr,
      consumerCareDetails: matchedSample.consumerCare,
      countryOfOrigin: 'India',
      complianceScore: 100,
    });
  };

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.98 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.98 }}
      transition={{ duration: 0.25 }}
      className="bg-[#151F2B] border border-[#263445] rounded-xl overflow-hidden shadow-enterprise max-w-2xl mx-auto"
    >
      {/* Header */}
      <div className="px-5 py-3.5 border-b border-[#263445] bg-[#0F1720] flex items-center justify-between">
        <div className="flex items-center gap-2.5">
          <div className="w-7 h-7 rounded-md bg-[#3B82F6] flex items-center justify-center text-white">
            <Upload className="w-3.5 h-3.5" />
          </div>
          <div>
            <h3 className="text-sm font-semibold text-[#F4F7FA]">Upload Package Image</h3>
            <p className="text-[11px] text-[#A7B4C3]">Direct Image File Verification</p>
          </div>
        </div>

        <button
          type="button"
          onClick={onClose}
          className="w-7 h-7 rounded-md bg-[#111A24] border border-[#263445] hover:bg-[#192534] text-[#A7B4C3] hover:text-[#F4F7FA] flex items-center justify-center transition-colors cursor-pointer"
          aria-label="Close upload dialog"
        >
          <X className="w-4 h-4" />
        </button>
      </div>

      <div className="p-6 sm:p-8 space-y-6">
        <input
          ref={fileInputRef}
          type="file"
          accept="image/*"
          className="hidden"
          onChange={handleFileChange}
        />

        {selectedImage ? (
          /* Image Selected / Preview State */
          <div className="space-y-5">
            <div className="border border-[#263445] rounded-lg p-4 bg-[#111A24] flex flex-col sm:flex-row items-center gap-5">
              <div className="relative w-36 h-36 rounded-md overflow-hidden bg-black shrink-0 border border-[#263445] shadow-xs">
                <img
                  src={selectedImage}
                  alt="Product package preview"
                  className="w-full h-full object-cover"
                  referrerPolicy="no-referrer"
                />
              </div>

              <div className="space-y-2 flex-1 w-full text-left">
                <div className="flex items-center gap-2">
                  <span className="inline-flex items-center gap-1 text-[11px] font-semibold px-2 py-0.5 rounded-full bg-[#123326] text-[#34A873] border border-[#34A873]/30">
                    <FileCheck className="w-3 h-3 text-[#34A873]" />
                    Ready for inspection
                  </span>
                  {fileSize && (
                    <span className="text-xs text-[#A7B4C3] font-mono">{fileSize}</span>
                  )}
                </div>

                <h4 className="text-sm font-semibold text-[#F4F7FA] break-all">
                  {fileName}
                </h4>

                <p className="text-xs text-[#A7B4C3] leading-relaxed">
                  Image resolution meets Legal Metrology Rule 6 font and clarity guidelines.
                </p>

                <div className="pt-2 flex items-center gap-2">
                  <button
                    type="button"
                    onClick={() => fileInputRef.current?.click()}
                    className="text-xs font-medium text-[#60A5FA] hover:text-[#93C5FD] underline underline-offset-4 cursor-pointer"
                  >
                    Change image
                  </button>
                  <span className="text-[#263445]">|</span>
                  <button
                    type="button"
                    onClick={handleRemove}
                    className="text-xs font-medium text-[#E05A5A] hover:text-[#EF4444] underline underline-offset-4 cursor-pointer"
                  >
                    Remove
                  </button>
                </div>
              </div>
            </div>
          </div>
        ) : (
          /* Dropzone Upload State */
          <div className="space-y-4">
            <div
              onDragEnter={handleDrag}
              onDragLeave={handleDrag}
              onDragOver={handleDrag}
              onDrop={handleDrop}
              onClick={() => fileInputRef.current?.click()}
              className={`border-2 border-dashed rounded-xl p-8 sm:p-12 text-center transition-all cursor-pointer ${
                dragActive
                  ? 'border-[#3B82F6] bg-[#172A44]'
                  : 'border-[#263445] hover:border-[#3B82F6] bg-[#111A24]/60 hover:bg-[#111A24]'
              }`}
            >
              <div className="mx-auto w-12 h-12 rounded-full bg-[#172A44] border border-[#263445] flex items-center justify-center text-[#60A5FA] mb-3 shadow-2xs">
                <Upload className="w-5 h-5 text-[#3B82F6]" strokeWidth={2.2} />
              </div>

              <h4 className="text-base font-semibold text-[#F4F7FA]">
                Drop your product image here
              </h4>
              <p className="text-xs sm:text-sm text-[#A7B4C3] mt-1">
                or <span className="font-semibold text-[#60A5FA] underline">Choose an image</span> from your computer
              </p>

              <p className="text-[11px] text-[#718096] mt-4">
                Supports JPG, PNG, WEBP up to 20MB
              </p>
            </div>

            {/* Quick-test sample package cards for convenience */}
            <div className="space-y-2 pt-2">
              <div className="flex items-center gap-1.5 text-xs text-[#A7B4C3]">
                <Sparkles className="w-3 h-3 text-[#3B82F6]" />
                <span>Or select a sample package label to test immediately:</span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5">
                {PRELOADED_SAMPLES.map((sample) => (
                  <button
                    key={sample.name}
                    type="button"
                    onClick={() => handleSelectSample(sample)}
                    className="text-left p-2.5 rounded-lg border border-[#263445] hover:border-[#3B82F6] bg-[#111A24] hover:bg-[#192534] transition-all flex items-center gap-2.5 group cursor-pointer shadow-xs"
                  >
                    <img
                      src={sample.url}
                      alt={sample.name}
                      className="w-9 h-9 rounded object-cover border border-[#263445] shrink-0"
                      referrerPolicy="no-referrer"
                    />
                    <div className="min-w-0">
                      <p className="text-xs font-semibold text-[#F4F7FA] truncate group-hover:text-[#60A5FA]">
                        {sample.brand}
                      </p>
                      <p className="text-[10px] text-[#718096] truncate">
                        {sample.netQty} · {sample.mrp.split(' ')[1]}
                      </p>
                    </div>
                  </button>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Footer controls */}
      <div className="px-6 py-4 bg-[#0F1720] border-t border-[#263445] flex items-center justify-between">
        <button
          type="button"
          onClick={onClose}
          className="text-xs font-medium text-[#A7B4C3] hover:text-[#F4F7FA] px-3 py-2 rounded-md hover:bg-[#192534] transition-colors cursor-pointer"
        >
          Cancel
        </button>

        <Button
          size="md"
          disabled={!selectedImage}
          onClick={handleProceed}
          icon={<ArrowRight className="w-4 h-4" />}
        >
          Continue Inspection
        </Button>
      </div>
    </motion.div>
  );
};
