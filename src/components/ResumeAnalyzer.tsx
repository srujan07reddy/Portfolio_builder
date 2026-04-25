"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Upload, FileText, CheckCircle, Loader2, Sparkles, Eye, Send, AlertCircle, X, Key } from "lucide-react";
import { analyzeResume } from "@/lib/gemini-service";

interface ResumeAnalyzerProps {
  onAnalysisComplete: (data: any) => void;
}

export default function ResumeAnalyzer({ onAnalysisComplete }: ResumeAnalyzerProps) {
  const [isUploading, setIsUploading] = useState(false);
  const [progress, setProgress] = useState(0);
  const [analysisStep, setAnalysisStep] = useState("");
  const [showPreview, setShowPreview] = useState(false);
  const [extractedData, setExtractedData] = useState<any>(null);
  const [fileName, setFileName] = useState<string | null>(null);
  const [apiKey, setApiKey] = useState("");
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const savedKey = localStorage.getItem("gemini_api_key");
    if (savedKey) setApiKey(savedKey);
  }, []);

  const steps = [
    "Reading document content...",
    "Initializing Gemini AI Engine...",
    "Analyzing resume structure...",
    "Extracting professional identity...",
    "Mapping skills and experience...",
    "Generating custom portfolio sections..."
  ];

  const handleApiKeyChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newKey = e.target.value;
    setApiKey(newKey);
    localStorage.setItem("gemini_api_key", newKey);
  };

  const extractTextFromFile = async (file: File): Promise<string> => {
    if (file.type === "application/pdf") {
      const pdfjsLib = await import('pdfjs-dist');
      const version = pdfjsLib.version;
      pdfjsLib.GlobalWorkerOptions.workerSrc = `https://unpkg.com/pdfjs-dist@${version}/build/pdf.worker.min.mjs`;

      const arrayBuffer = await file.arrayBuffer();
      const pdf = await pdfjsLib.getDocument({ data: arrayBuffer }).promise;
      let text = "";
      for (let i = 1; i <= pdf.numPages; i++) {
        const page = await pdf.getPage(i);
        const content = await page.getTextContent();
        text += content.items.map((item: any) => (item as any).str).join(" ") + "\n";
      }
      return text;
    } else {
      return await file.text();
    }
  };

  const runAnalysis = async (file: File) => {
    if (!apiKey) {
      setError("Please provide a Gemini API Key first.");
      return;
    }

    setError(null);
    setFileName(file.name);
    setIsUploading(true);
    setProgress(10);
    setAnalysisStep(steps[0]);

    try {
      // Step 1: Extract Text
      const text = await extractTextFromFile(file);
      setProgress(30);
      setAnalysisStep(steps[1]);

      // Step 2: Call Gemini
      setAnalysisStep(steps[2]);
      const data = await analyzeResume(text, apiKey);
      
      setProgress(100);
      setAnalysisStep("Analysis complete!");
      setExtractedData(data);
      setIsUploading(false);
      setShowPreview(true);
    } catch (err: any) {
      console.error(err);
      setError(err.message || "Failed to analyze resume. Please check your API key and file format.");
      setIsUploading(false);
    }
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) runAnalysis(file);
  };

  return (
    <div className="space-y-8">
      {error && (
        <motion.div 
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: "auto" }}
          className="p-4 bg-red-50 border border-red-200 rounded-xl flex items-center gap-3 text-red-700 text-sm"
        >
          <AlertCircle size={18} />
          {error}
        </motion.div>
      )}

      <div className="p-6 bg-blue-50/50 border border-blue-100 rounded-2xl space-y-4">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center text-white">
            <Key size={16} />
          </div>
          <div>
            <h4 className="text-xs font-black text-blue-900 uppercase tracking-widest">Gemini API Configuration</h4>
            <p className="text-[10px] text-blue-600 font-medium">Your key is stored locally and never sent to our servers.</p>
          </div>
        </div>
        <input
          type="password"
          value={apiKey}
          onChange={handleApiKeyChange}
          placeholder="Enter Gemini API Key..."
          className="w-full px-4 py-3 bg-white border border-blue-200 rounded-xl text-sm focus:ring-2 focus:ring-blue-500 outline-none transition-all"
        />
      </div>

      {!isUploading && !showPreview && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="relative group"
        >
          <input
            type="file"
            onChange={handleFileUpload}
            className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10"
            accept=".pdf,.txt"
          />
          <div className="border-2 border-dashed border-slate-200 rounded-[2.5rem] p-12 text-center transition-all group-hover:border-blue-400 group-hover:bg-blue-50/30 bg-white shadow-sm">
            <div className="w-16 h-16 bg-blue-100 rounded-2xl flex items-center justify-center mx-auto mb-6 text-blue-600 shadow-lg shadow-blue-500/10">
              <Upload size={32} />
            </div>
            <h3 className="text-xl font-black text-slate-900 uppercase tracking-tight mb-2">AI Resume Import</h3>
            <p className="text-sm text-slate-500 max-w-xs mx-auto mb-6">
              Upload your PDF or Text resume. Our AI will build your entire portfolio for you.
            </p>
            <div className="flex items-center justify-center gap-2 text-[10px] font-black text-blue-600 uppercase tracking-widest">
              <Sparkles size={14} /> Supported Formats: PDF, TXT
            </div>
          </div>
        </motion.div>
      )}

      {isUploading && (
        <div className="p-12 border border-blue-100 bg-white rounded-[2.5rem] text-center space-y-8 shadow-xl">
          <div className="relative w-24 h-24 mx-auto">
            <svg className="w-full h-full" viewBox="0 0 100 100">
              <circle
                className="text-slate-100 stroke-current"
                strokeWidth="8"
                fill="transparent"
                r="40"
                cx="50"
                cy="50"
              />
              <circle
                className="text-blue-600 stroke-current transition-all duration-500"
                strokeWidth="8"
                strokeDasharray={251.2}
                strokeDashoffset={251.2 - (251.2 * progress) / 100}
                strokeLinecap="round"
                fill="transparent"
                r="40"
                cx="50"
                cy="50"
              />
            </svg>
            <div className="absolute inset-0 flex items-center justify-center">
              <Loader2 className="w-8 h-8 text-blue-600 animate-spin" />
            </div>
          </div>
          <div className="space-y-2">
            <h4 className="text-sm font-black text-slate-900 uppercase tracking-widest">{analysisStep}</h4>
            <div className="flex justify-center gap-1">
              {[0, 1, 2].map((i) => (
                <motion.div
                  key={i}
                  animate={{ opacity: [0.3, 1, 0.3] }}
                  transition={{ repeat: Infinity, duration: 1.5, delay: i * 0.2 }}
                  className="w-1.5 h-1.5 bg-blue-600 rounded-full"
                />
              ))}
            </div>
          </div>
          <div className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em]">
            Analyzing: {fileName}
          </div>
        </div>
      )}

      {showPreview && extractedData && (
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="bg-white border border-slate-200 rounded-[2.5rem] overflow-hidden shadow-2xl"
        >
          <div className="bg-slate-900 p-6 flex justify-between items-center">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-blue-600 rounded-xl flex items-center justify-center text-white">
                <Sparkles size={20} />
              </div>
              <div>
                <h4 className="text-white font-black text-sm uppercase tracking-tight">AI Analysis Preview</h4>
                <p className="text-slate-400 text-[10px] uppercase tracking-widest">Extracted from {fileName}</p>
              </div>
            </div>
            <button onClick={() => setShowPreview(false)} className="text-slate-400 hover:text-white transition-colors">
              <X size={20} />
            </button>
          </div>

          <div className="p-8 space-y-8 max-h-[60vh] overflow-y-auto">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="space-y-4">
                <div className="flex items-center gap-2">
                  <FileText className="w-4 h-4 text-blue-600" />
                  <h5 className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em]">Profile_Identity</h5>
                </div>
                <div className="p-4 bg-slate-50 rounded-xl space-y-2">
                  <p className="text-sm font-bold text-slate-900">{extractedData.profile?.full_name}</p>
                  <p className="text-xs text-slate-600 leading-relaxed">{extractedData.profile?.bio}</p>
                  <div className="flex flex-wrap gap-2 pt-2">
                    {extractedData.profile?.professions?.map((p: string) => (
                      <span key={p} className="px-2 py-0.5 bg-blue-100 text-blue-700 text-[9px] font-black uppercase rounded">
                        {p}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              <div className="space-y-4">
                <div className="flex items-center gap-2">
                  <Send className="w-4 h-4 text-blue-600" />
                  <h5 className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em]">Social_Connections</h5>
                </div>
                <div className="grid grid-cols-1 gap-2">
                  {extractedData.social && Object.entries(extractedData.social).map(([key, value]: [string, any]) => value && (
                    <div key={key} className="flex justify-between items-center p-3 bg-slate-50 rounded-xl border border-slate-100">
                      <span className="text-[9px] font-black text-slate-400 uppercase">{key}</span>
                      <span className="text-[10px] font-bold text-slate-900 truncate max-w-[150px]">{value}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {extractedData.custom_sections && extractedData.custom_sections.length > 0 && (
              <div className="space-y-4">
                <div className="flex items-center gap-2">
                  <Sparkles className="w-4 h-4 text-blue-600" />
                  <h5 className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em]">AI_Generated_Sections</h5>
                </div>
                <div className="space-y-4">
                  {extractedData.custom_sections.map((section: any, idx: number) => (
                    <div key={idx} className="p-4 border border-blue-50 bg-blue-50/20 rounded-2xl">
                      <h6 className="text-xs font-black text-blue-900 uppercase tracking-tight mb-1">{section.title}</h6>
                      <p className="text-[10px] text-slate-600 leading-relaxed">{section.content}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}

            <div className="pt-8 border-t border-slate-100 flex items-center justify-between">
              <div className="flex items-center gap-4">
                <div className="flex items-center gap-2 text-emerald-600 font-bold text-xs">
                  <CheckCircle size={16} /> Data Verified
                </div>
                <button 
                  onClick={() => setShowPreview(false)}
                  className="text-xs font-black text-slate-400 uppercase tracking-widest hover:text-slate-600 transition-colors"
                >
                  Discard
                </button>
              </div>
              <button
                onClick={() => onAnalysisComplete(extractedData)}
                className="px-8 py-3 bg-blue-600 hover:bg-blue-700 text-white font-black text-xs uppercase tracking-widest rounded-xl shadow-lg shadow-blue-500/20 transition-all flex items-center gap-3"
              >
                <CheckCircle size={16} /> Apply_to_Portfolio
              </button>
            </div>
          </div>
        </motion.div>
      )}
    </div>
  );
}
