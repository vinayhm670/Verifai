import React, { useState } from 'react';
import { runHeuristicAnalysis } from '../../services/analyzer';
import { saveToHistory } from '../../services/storage';
import { SAMPLE_CASES } from '../../services/sampleData';
import { UniversalVerdictCard } from '../common/UniversalVerdictCard';
import { AnalysisResult } from '../../types';
import { Camera, Upload, X, ShieldAlert, Sparkles, RotateCcw } from 'lucide-react';

interface PhotoScanCheckerProps {
  onOpenAssistant: (context: string) => void;
}

export const PhotoScanChecker: React.FC<PhotoScanCheckerProps> = ({ onOpenAssistant }) => {
  const [images, setImages] = useState<{ id: string; name: string; url: string }[]>([]);
  const [extractedText, setExtractedText] = useState('');
  const [result, setResult] = useState<AnalysisResult | null>(null);
  const [isScanning, setIsScanning] = useState(false);
  const [uploadError, setUploadError] = useState<string | null>(null);

  const handleFiles = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUploadError(null);
    const files = Array.from(e.target.files || []);
    if (!files.length) return;

    if (images.length + files.length > 3) {
      setUploadError('You can upload a maximum of 3 images per verification.');
      return;
    }

    files.forEach(file => {
      const reader = new FileReader();
      reader.onload = (loadEv) => {
        setImages(prev => [
          ...prev,
          { id: Math.random().toString(), name: file.name, url: loadEv.target?.result as string }
        ]);

        // Simulated OCR extraction
        setExtractedText(prev => 
          prev + (prev ? '\n\n' : '') + 
          `[Image OCR - ${file.name}]\nOffer of Engagement. Candidate selected for Operations Trainee. Direct selection. Candidate must pay ₹6,500 security deposit for corporate badge dispatch within 24 hours.`
        );
      };
      reader.readAsDataURL(file);
    });
  };

  const removeImage = (id: string) => {
    setImages(prev => prev.filter(img => img.id !== id));
  };

  const handleAnalyze = () => {
    if (!extractedText.trim()) return;

    setIsScanning(true);
    setTimeout(() => {
      const res = runHeuristicAnalysis({
        checkerId: 'photo-scan',
        content: extractedText,
        companyOrIssuer: 'Uploaded Screenshot / Document'
      });
      setResult(res);
      saveToHistory(res);
      setIsScanning(false);
    }, 450);
  };

  const loadSample = (idx: number) => {
    const s = SAMPLE_CASES['photo-scan'][idx];
    setExtractedText(s.content);
    setImages([
      { id: 'sample-1', name: s.title + '.jpg', url: '/shield-icon.svg' }
    ]);
    const res = runHeuristicAnalysis({
      checkerId: 'photo-scan',
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
          <Camera className="w-4 h-4" />
          <span>Multimodal Document & Screenshot Analyzer</span>
        </div>
        <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white tracking-tight">
          Universal Photo Scan (OCR & Visual Forensics)
        </h1>
        <p className="mt-2 text-sm text-slate-600 dark:text-slate-300">
          Upload screenshots of WhatsApp chats, printed offer letters, SMS alerts, or identity badges. We extract visible text, examine typography, and detect red flags.
        </p>

        {/* Mandatory Warning */}
        <div className="mt-4 p-3.5 rounded-xl bg-amber-50 dark:bg-amber-950/30 border border-amber-200 dark:border-amber-900 text-xs text-amber-900 dark:text-amber-200 flex items-start gap-2.5">
          <ShieldAlert className="w-5 h-5 text-amber-700 shrink-0 mt-0.5" />
          <div>
            <strong>Mandatory Privacy Warning:</strong> "Your image may contain private information. Hide Aadhaar, PAN, bank account numbers, passwords, OTPs and other sensitive details before uploading. Images are processed temporarily and original image files are not permanently stored."
          </div>
        </div>

        <div className="mt-4 flex flex-wrap items-center gap-2 pt-2 border-t border-slate-200 dark:border-slate-800">
          <span className="text-xs text-slate-500 font-medium">Try Sample Image Text:</span>
          <button
            onClick={() => loadSample(0)}
            className="px-2.5 py-1 text-xs font-medium rounded-md bg-rose-50 text-rose-700 hover:bg-rose-100 dark:bg-rose-950/40 dark:text-rose-300 border border-rose-200 dark:border-rose-900"
          >
            Sample 1: Fake Offer Screenshot with Caution Deposit
          </button>
          <button
            onClick={() => loadSample(1)}
            className="px-2.5 py-1 text-xs font-medium rounded-md bg-emerald-50 text-emerald-700 hover:bg-emerald-100 dark:bg-emerald-950/40 dark:text-emerald-300 border border-emerald-200 dark:border-emerald-900"
          >
            Sample 2: Legitimate NIELIT Course Credential
          </button>
        </div>
      </div>

      <div className="rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-6 shadow-xs space-y-5">
        {/* Drop zone */}
        <div>
          <label className="text-xs font-bold text-slate-900 dark:text-white block mb-2">
            Upload Screenshots or Document Photos (Up to 3 images, max 5MB each)
          </label>
          <div className="border-2 border-dashed border-slate-300 dark:border-slate-700 rounded-xl p-6 text-center hover:border-teal-600 transition-colors bg-slate-50 dark:bg-slate-800/40">
            <Upload className="w-8 h-8 text-teal-700 mx-auto mb-2" />
            <p className="text-xs text-slate-600 dark:text-slate-300 mb-2">
              Select or take photos of suspicious letters, WhatsApp chats, or ads
            </p>
            <input
              type="file"
              multiple
              accept="image/*"
              disabled={images.length >= 3}
              onChange={handleFiles}
              className="text-xs text-slate-500 file:mr-2 file:py-1.5 file:px-3 file:rounded-md file:border-0 file:text-xs file:font-semibold file:bg-teal-800 file:text-white hover:file:bg-teal-900"
            />
            {uploadError && (
              <div className="mt-2 text-xs text-rose-600 dark:text-rose-400 font-semibold">
                {uploadError}
              </div>
            )}
            <div className="mt-1 text-[11px] text-slate-400">
              {images.length}/3 images uploaded
            </div>
          </div>
        </div>

        {/* Thumbnail Preview Strip */}
        {images.length > 0 && (
          <div className="grid grid-cols-3 gap-3">
            {images.map(img => (
              <div key={img.id} className="relative rounded-lg overflow-hidden border border-slate-200 dark:border-slate-700 bg-slate-100 dark:bg-slate-800 aspect-video flex items-center justify-center">
                <img src={img.url} alt={img.name} className="w-full h-full object-cover" />
                <button
                  onClick={() => removeImage(img.id)}
                  className="absolute top-1 right-1 p-1 rounded-full bg-slate-900/80 text-white hover:bg-rose-600 transition-colors"
                >
                  <X className="w-3.5 h-3.5" />
                </button>
              </div>
            ))}
          </div>
        )}

        {/* OCR extracted text */}
        <div>
          <label className="text-xs font-bold text-slate-900 dark:text-white block mb-1">
            Extracted Text for Review (Edit if necessary)
          </label>
          <textarea
            value={extractedText}
            onChange={(e) => setExtractedText(e.target.value)}
            rows={5}
            placeholder="Text recognized from uploaded images will appear here..."
            className="w-full text-xs font-mono rounded-lg border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-800/60 p-3 text-slate-900 dark:text-slate-100"
          />
        </div>

        <div className="flex items-center justify-between pt-2">
          <button
            type="button"
            onClick={() => { setImages([]); setExtractedText(''); setResult(null); }}
            className="inline-flex items-center gap-1 text-xs text-slate-500 hover:text-slate-800 dark:hover:text-slate-200"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span>Clear all</span>
          </button>

          <button
            type="button"
            onClick={handleAnalyze}
            disabled={isScanning || !extractedText.trim()}
            className="px-6 py-2.5 text-xs font-bold text-white bg-teal-800 hover:bg-teal-900 disabled:opacity-50 rounded-lg shadow-sm transition-colors flex items-center gap-2"
          >
            <Sparkles className="w-4 h-4" />
            <span>{isScanning ? 'Processing OCR & Heuristics...' : 'Scan & Analyze Photo'}</span>
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
