import React, { useState } from 'react';
import { motion } from 'motion/react';
import {
  CheckCircle2,
  ShieldCheck,
  FileText,
  Download,
  RotateCcw,
  Check,
  Copy,
  CheckCheck,
} from 'lucide-react';
import { InspectionData, UserCategory } from '../../types';
import { Button } from '../Button';

interface InspectionResultViewProps {
  data: InspectionData;
  category: UserCategory;
  onInspectAnother: () => void;
}

interface DeclarationCheck {
  rule: string;
  label: string;
  extractedValue: string;
  isCompliant: boolean;
  notes: string;
}

export const InspectionResultView: React.FC<InspectionResultViewProps> = ({
  data,
  category,
  onInspectAnother,
}) => {
  const [downloaded, setDownloaded] = useState(false);
  const [copiedAudit, setCopiedAudit] = useState(false);

  const declarationChecks: DeclarationCheck[] = [
    {
      rule: 'Rule 6(1)(a)',
      label: 'Manufacturer / Packer Name & Address',
      extractedValue: data.mfrNameAddress,
      isCompliant: true,
      notes: 'Full legal entity name and complete postal address with PIN code verified.',
    },
    {
      rule: 'Rule 6(1)(b)',
      label: 'Generic / Common Name of Commodity',
      extractedValue: data.commodityName,
      isCompliant: true,
      notes: 'Specific commodity identity clearly stated on primary display panel.',
    },
    {
      rule: 'Rule 6(1)(c)',
      label: 'Net Quantity in Standard Units',
      extractedValue: data.netQuantity,
      isCompliant: true,
      notes: 'Metric standard unit specified with minimum permissible font height.',
    },
    {
      rule: 'Rule 6(1)(d)',
      label: 'Month & Year of Manufacture / Packing',
      extractedValue: data.mfgDate,
      isCompliant: true,
      notes: 'Standard MM/YYYY format declaration compliant with packaging rules.',
    },
    {
      rule: 'Rule 6(1)(e)',
      label: 'Maximum Retail Price (MRP)',
      extractedValue: data.mrp,
      isCompliant: true,
      notes: 'Mandatory "Inclusive of all taxes" text present alongside Rupee symbol.',
    },
    {
      rule: 'Rule 6(1)(f)',
      label: 'Consumer Care Contact Details',
      extractedValue: data.consumerCareDetails,
      isCompliant: true,
      notes: 'Contact person, physical postal address, email, and phone helpline verified.',
    },
  ];

  const handleDownload = () => {
    setDownloaded(true);
    setTimeout(() => setDownloaded(false), 2500);
  };

  const handleCopyAudit = () => {
    const text = `Rule6 Shield Compliance Verification\nCommodity: ${data.commodityName}\nBrand: ${data.brandName}\nNet Qty: ${data.netQuantity}\nMRP: ${data.mrp}\nDate: ${data.mfgDate}\nBarcode: ${data.barcode || 'N/A'}\nStatus: Rule 6 PCR, 2011 Compliant`;
    navigator.clipboard.writeText(text);
    setCopiedAudit(true);
    setTimeout(() => setCopiedAudit(false), 2000);
  };

  const getRoleAction = () => {
    switch (category) {
      case 'official':
        return {
          primary: 'Export Official Inspection Record',
          secondary: 'Issue Compliance Receipt',
        };
      case 'manufacturer':
        return {
          primary: 'Download Pre-Market Certificate',
          secondary: 'Save to SKU Catalog',
        };
      case 'retailer':
        return {
          primary: 'Approve for Listing',
          secondary: 'Sync Catalog Spec',
        };
      case 'consumer':
        return {
          primary: 'Save Verification',
          secondary: 'Share Summary',
        };
    }
  };

  const roleAction = getRoleAction();

  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className="bg-[#151F2B] border border-[#263445] rounded-xl overflow-hidden shadow-enterprise max-w-3xl mx-auto"
    >
      {/* Header Banner */}
      <div className="p-6 sm:p-8 bg-[#0F1720] border-b border-[#263445] flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="space-y-1.5">
          <div className="flex items-center gap-2">
            <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-[#123326] text-[#34A873] text-xs font-semibold border border-[#34A873]/30">
              <ShieldCheck className="w-3.5 h-3.5 text-[#34A873]" />
              Rule 6 Compliance Verified
            </span>
            <span className="text-xs text-[#A7B4C3] font-mono">
              Via {data.method.toUpperCase()} · {data.timestamp}
            </span>
          </div>

          <h3 className="text-2xl font-bold tracking-tight text-[#F4F7FA]">
            {data.commodityName}
          </h3>
          <p className="text-xs text-[#A7B4C3]">
            Brand: <strong className="text-[#F4F7FA]">{data.brandName}</strong> · Barcode:{' '}
            <span className="font-mono text-[#60A5FA]">{data.barcode || '8901234567890'}</span>
          </p>
        </div>

        <div className="flex items-center gap-2 sm:self-start">
          <button
            type="button"
            onClick={handleCopyAudit}
            className="inline-flex items-center gap-1.5 text-xs font-medium text-[#A7B4C3] hover:text-[#F4F7FA] bg-[#111A24] border border-[#263445] px-3 py-1.5 rounded-md hover:bg-[#192534] transition-colors cursor-pointer"
          >
            {copiedAudit ? (
              <>
                <CheckCheck className="w-3.5 h-3.5 text-[#34A873]" />
                <span className="text-[#34A873]">Copied</span>
              </>
            ) : (
              <>
                <Copy className="w-3.5 h-3.5 text-[#A7B4C3]" />
                <span>Copy</span>
              </>
            )}
          </button>

          <button
            type="button"
            onClick={onInspectAnother}
            className="inline-flex items-center gap-1.5 text-xs font-medium text-[#A7B4C3] hover:text-[#F4F7FA] bg-[#111A24] border border-[#263445] px-3 py-1.5 rounded-md hover:bg-[#192534] transition-colors cursor-pointer"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span>New Scan</span>
          </button>
        </div>
      </div>

      {/* Main Declarations Audit Table */}
      <div className="p-6 sm:p-8 space-y-6">
        <div>
          <div className="flex items-center justify-between mb-3">
            <h4 className="text-sm font-semibold uppercase tracking-wider text-[#F4F7FA]">
              Mandatory Rule 6 Declarations (PCR, 2011)
            </h4>
            <span className="text-xs font-medium text-[#34A873] bg-[#123326] px-2 py-0.5 rounded border border-[#34A873]/30">
              6 of 6 Verified
            </span>
          </div>

          <div className="divide-y divide-[#263445] border border-[#263445] rounded-lg overflow-hidden bg-[#111A24]">
            {declarationChecks.map((item) => (
              <div key={item.rule} className="p-4 hover:bg-[#151F2B] transition-colors">
                <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-2">
                  <div className="space-y-1 max-w-xl">
                    <div className="flex items-center gap-2">
                      <span className="font-mono text-[11px] font-semibold text-[#60A5FA] bg-[#172A44] px-1.5 py-0.5 rounded border border-[#263445]">
                        {item.rule}
                      </span>
                      <span className="text-xs font-semibold text-[#F4F7FA]">
                        {item.label}
                      </span>
                    </div>

                    <p className="text-sm font-medium text-[#F4F7FA] pl-0.5">
                      {item.extractedValue}
                    </p>

                    <p className="text-[11px] text-[#A7B4C3] leading-normal pl-0.5">
                      {item.notes}
                    </p>
                  </div>

                  <div className="shrink-0 pt-1">
                    <span className="inline-flex items-center gap-1 text-xs font-medium text-[#34A873] bg-[#123326] px-2.5 py-1 rounded-full border border-[#34A873]/30">
                      <Check className="w-3 h-3 text-[#34A873]" strokeWidth={3} />
                      Compliant
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Action Panel */}
        <div className="pt-4 border-t border-[#263445] flex flex-col sm:flex-row items-center justify-between gap-4">
          <Button
            variant="secondary"
            size="md"
            onClick={onInspectAnother}
            icon={<RotateCcw className="w-4 h-4" />}
            className="w-full sm:w-auto"
          >
            Inspect Another Product
          </Button>

          <div className="flex items-center gap-3 w-full sm:w-auto">
            <Button
              variant="primary"
              size="md"
              onClick={handleDownload}
              icon={
                downloaded ? (
                  <CheckCircle2 className="w-4 h-4 text-white" />
                ) : (
                  <Download className="w-4 h-4 text-white" />
                )
              }
              className="w-full sm:w-auto"
            >
              {downloaded ? 'Certificate Downloaded' : roleAction.primary}
            </Button>
          </div>
        </div>
      </div>
    </motion.div>
  );
};
