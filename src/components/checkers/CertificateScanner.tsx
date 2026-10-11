import React, { useState } from 'react';
import { runHeuristicAnalysis } from '../../services/analyzer';
import { saveToHistory } from '../../services/storage';
import { SAMPLE_CASES } from '../../services/sampleData';
import { UniversalVerdictCard } from '../common/UniversalVerdictCard';
import { AnalysisResult } from '../../types';
import { Award, Upload, ShieldAlert, FileText, CheckCircle2, AlertTriangle, Eye, RotateCcw } from 'lucide-react';

interface CertificateScannerProps {
  onOpenAssistant: (context: string) => void;
}

export const CertificateScanner: React.FC<CertificateScannerProps> = ({ onOpenAssistant }) => {
  const [filePreview, setFilePreview] = useState<string | null>(null);
  const [fileName, setFileName] = useState<string | null>(null);
  const [ocrText, setOcrText] = useState('');
  const [institution, setInstitution] = useState('');
  const [result, setResult] = useState<AnalysisResult | null>(null);
  const [isScanning, setIsScanning] = useState(false);
  const [selectedAnnotation, setSelectedAnnotation] = useState<string | null>(null);

  // Simulated visual anomalies for certificates
  const [annotations, setAnnotations] = useState<{ id: string; label: string; desc: string; top: string; left: string }[]>([]);

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (file.size > 5 * 1024 * 1024) {
      alert('File exceeds 5MB limit. Please upload a smaller JPG/PNG.');
      return;
    }

    setFileName(file.name);
    const reader = new FileReader();
    reader.onload = (uploadEvent) => {
      setFilePreview(uploadEvent.target?.result as string);
      // Simulated OCR extraction from uploaded image
      setOcrText(`[OCR Extracted Text from ${file.name}]\nCertificate of Technical Competency\nAwarded to: Candidate\nOrganization: ${institution || 'Autonomous Technical Board'}\nDate: 2026\nSerial No: REG-89410-IN\nDigital Seal detected with potential compression artifacts.`);
      setAnnotations([
        { id: 'an-1', label: 'Font Inconsistency', desc: 'Candidate name uses different kerning/weight than surrounding template text.', top: '42%', left: '38%' },
        { id: 'an-2', label: 'Digital Seal Overlay', desc: 'Resolution mismatch detected between rubber stamp texture and vector page canvas.', top: '75%', left: '72%' }
      ]);
    };
    reader.readAsDataURL(file);
  };

  const handleAnalyze = () => {
    if (!ocrText.trim()) return;

    setIsScanning(true);
    setTimeout(() => {
      const res = runHeuristicAnalysis({
        checkerId: 'certificate',
        content: ocrText,
        companyOrIssuer: institution || 'Certificate Issuing Entity'
      });
      setResult(res);
      saveToHistory(res);
      setIsScanning(false);
    }, 450);
  };

  const loadSample = (idx: number) => {
    const s = SAMPLE_CASES.certificate[idx];
    setInstitution(s.companyOrIssuer);
    setOcrText(s.content);
    setFileName(s.title + '.png');
    setFilePreview(null);
    if (idx === 0) {
      setAnnotations([
        { id: 'an-1', label: 'Typo: "Inteligence"', desc: 'Spelling error in primary qualification name ("Artificial Inteligence").', top: '35%', left: '40%' },
        { id: 'an-2', label: 'No NAD / DigiLocker ID', desc: 'Missing National Academic Depository verifiable serial bar.', top: '80%', left: '60%' }
      ]);
    } else {
      setAnnotations([]);
    }

    const res = runHeuristicAnalysis({
      checkerId: 'certificate',
      content: s.content,
      companyOrIssuer: s.companyOrIssuer
    });
    res.isDemoSample = true;
    setResult(res);
    saveToHistory(res);
  };

  return (
    <div className="max-w-4xl mx-auto py-8 px-4 sm:px-6">
      <div className="mb-8">
        <div className="flex items-center gap-2 text-teal-800 dark:text-teal-400 text-xs font-semibold uppercase tracking-wider mb-2">
          <Award className="w-4 h-4" />
          <span>Credential & Document Verification</span>
        </div>
        <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white tracking-tight">
          Certificate Scanner & Issuer Verification
        </h1>
        <p className="mt-2 text-sm text-slate-600 dark:text-slate-300">
          Analyze document layout consistency, typography mismatches, spelling errors, and learn how to verify directly with DigiLocker and issuing universities.
        </p>

        {/* Mandatory Disclaimer */}
        <div className="mt-4 p-3.5 rounded-xl bg-amber-50 dark:bg-amber-950/30 border border-amber-200 dark:border-amber-900 text-xs text-amber-900 dark:text-amber-200 flex items-start gap-2.5">
          <ShieldAlert className="w-5 h-5 text-amber-700 shrink-0 mt-0.5" />
          <div>
            <strong>Mandatory Verification Notice:</strong> "Verifai can identify possible warning signs, but it cannot authenticate a certificate. Only the issuing institution or authorized registry can confirm authenticity."
          </div>
        </div>

        {/* Sample Loaders */}
        <div className="mt-4 flex flex-wrap items-center gap-2 pt-2 border-t border-slate-200 dark:border-slate-800">
          <span className="text-xs text-slate-500 font-medium">Try Sample Credential:</span>
          <button
            onClick={() => loadSample(0)}
            className="px-2.5 py-1 text-xs font-medium rounded-md bg-rose-50 text-rose-700 hover:bg-rose-100 dark:bg-rose-950/40 dark:text-rose-300 border border-rose-200 dark:border-rose-900"
          >
            Sample 1: Unaccredited Fake Certificate with Typo
          </button>
          <button
            onClick={() => loadSample(1)}
            className="px-2.5 py-1 text-xs font-medium rounded-md bg-emerald-50 text-emerald-700 hover:bg-emerald-100 dark:bg-emerald-950/40 dark:text-emerald-300 border border-emerald-200 dark:border-emerald-900"
          >
            Sample 2: NSDC / Skill India Digital Credential
          </button>
        </div>
      </div>

      {/* Upload & Redaction Box */}
      <div className="rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-6 shadow-xs space-y-5">
        {/* Redaction Warning */}
        <div className="p-3 rounded-lg bg-slate-50 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700 text-xs text-slate-600 dark:text-slate-300 flex items-center gap-2">
          <AlertTriangle className="w-4 h-4 text-amber-600 shrink-0" />
          <span>
            <strong>Privacy Protection:</strong> Please redact or black out Aadhaar numbers, PAN, date of birth, and home addresses before uploading. Verifai processes files temporarily and does not retain original documents.
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {/* File Upload Zone */}
          <div>
            <label className="text-xs font-bold text-slate-900 dark:text-white block mb-2">
              Upload Certificate Image (JPG / PNG, max 5MB)
            </label>
            <div className="border-2 border-dashed border-slate-300 dark:border-slate-700 rounded-xl p-6 text-center hover:border-teal-600 transition-colors bg-slate-50 dark:bg-slate-800/40">
              <Upload className="w-8 h-8 text-teal-700 mx-auto mb-2" />
              <p className="text-xs text-slate-600 dark:text-slate-300 mb-2">
                Drag and drop your file here, or click to browse
              </p>
              <input
                type="file"
                accept="image/png, image/jpeg, image/jpg"
                onChange={handleFileUpload}
                className="text-xs text-slate-500 file:mr-2 file:py-1.5 file:px-3 file:rounded-md file:border-0 file:text-xs file:font-semibold file:bg-teal-800 file:text-white hover:file:bg-teal-900"
              />
              {fileName && (
                <div className="mt-3 text-xs text-emerald-700 dark:text-emerald-400 font-semibold flex items-center justify-center gap-1">
                  <CheckCircle2 className="w-3.5 h-3.5" />
                  <span>Loaded: {fileName}</span>
                </div>
              )}
            </div>
          </div>

          {/* Institution input & Preview */}
          <div className="space-y-3">
            <div>
              <label className="text-xs font-bold text-slate-900 dark:text-white block mb-1">
                Claimed Issuing University or Organization
              </label>
              <input
                type="text"
                value={institution}
                onChange={(e) => setInstitution(e.target.value)}
                placeholder="e.g. Delhi University, NSDC, NIELIT, UGC"
                className="w-full text-xs rounded-lg border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-800/60 p-2.5 text-slate-900 dark:text-slate-100"
              />
            </div>

            <div>
              <label className="text-xs font-bold text-slate-900 dark:text-white block mb-1">
                Extracted Document Text (OCR)
              </label>
              <textarea
                value={ocrText}
                onChange={(e) => setOcrText(e.target.value)}
                rows={4}
                placeholder="Document text extracted from image will appear here, or you can paste directly..."
                className="w-full text-xs rounded-lg border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-800/60 p-2.5 text-slate-900 dark:text-slate-100 font-mono"
              />
            </div>
          </div>
        </div>

        {/* Visual Preview with Interactive Annotations if available */}
        {filePreview && (
          <div className="mt-4 pt-4 border-t border-slate-200 dark:border-slate-800">
            <div className="text-xs font-bold text-slate-900 dark:text-white mb-2 flex items-center justify-between">
              <span>Interactive Visual Inspection</span>
              <span className="text-[11px] text-slate-500 font-normal">Click highlighted dots to inspect visual anomalies</span>
            </div>
            <div className="relative rounded-lg overflow-hidden border border-slate-300 dark:border-slate-700 max-h-72 flex items-center justify-center bg-slate-950">
              <img src={filePreview} alt="Certificate Preview" className="max-h-72 object-contain" />
              {annotations.map((an) => (
                <button
                  key={an.id}
                  type="button"
                  onClick={() => setSelectedAnnotation(selectedAnnotation === an.id ? null : an.id)}
                  style={{ top: an.top, left: an.left }}
                  className="absolute -translate-x-1/2 -translate-y-1/2 w-5 h-5 rounded-full bg-rose-600 text-white flex items-center justify-center text-[10px] font-bold shadow-lg ring-2 ring-white hover:scale-125 transition-transform"
                  title={an.label}
                >
                  !
                </button>
              ))}
            </div>

            {selectedAnnotation && (
              <div className="mt-2 p-3 rounded-lg bg-rose-50 dark:bg-rose-950/40 border border-rose-200 dark:border-rose-900 text-xs">
                <span className="font-bold text-rose-800 dark:text-rose-300">
                  {annotations.find(a => a.id === selectedAnnotation)?.label}:
                </span>
                <p className="text-slate-700 dark:text-slate-300 mt-0.5">
                  {annotations.find(a => a.id === selectedAnnotation)?.desc}
                </p>
              </div>
            )}
          </div>
        )}

        <div className="flex items-center justify-between pt-2">
          <button
            type="button"
            onClick={() => { setFilePreview(null); setFileName(null); setOcrText(''); setInstitution(''); setResult(null); setAnnotations([]); }}
            className="inline-flex items-center gap-1 text-xs text-slate-500 hover:text-slate-800 dark:hover:text-slate-200"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span>Reset Scanner</span>
          </button>

          <button
            type="button"
            onClick={handleAnalyze}
            disabled={isScanning || !ocrText.trim()}
            className="px-6 py-2.5 text-xs font-bold text-white bg-teal-800 hover:bg-teal-900 disabled:opacity-50 rounded-lg shadow-sm transition-colors flex items-center gap-2"
          >
            <Award className="w-4 h-4" />
            <span>{isScanning ? 'Scanning Document...' : 'Run Certificate Analysis'}</span>
          </button>
        </div>
      </div>

      {result && (
        <UniversalVerdictCard
          result={result}
          onOpenAssistantWithContext={onOpenAssistant}
        />
      )}
    </div>
  );
};
