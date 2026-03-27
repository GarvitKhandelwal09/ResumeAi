import React, { useState } from 'react';
import { Upload, Search, FileText, Loader2, ArrowLeft } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";

const Analyzer = () => {
  const [file, setFile] = useState(null);
  const [jd, setJd] = useState("");
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState("");
  
  // State for our popup
  const [showAlert, setShowAlert] = useState(false);
  const [alertConfig, setAlertConfig] = useState({ title: "", desc: "" });

  const navigate = useNavigate();

  const handleAnalyze = async () => {
    // Check for empty fields
    if (!file || !jd) {
      setAlertConfig({
        title: "Wait a second!",
        desc: "Please upload a resume and paste the job description before we start analyzing."
      });
      setShowAlert(true);
      return;
    }

    setLoading(true);
    const formData = new FormData();
    formData.append("pdf_file", file);
    formData.append("jd", jd);

    try {
      const response = await fetch("http://localhost:8000/analyze", {
        method: "POST",
        body: formData,
      });
      const data = await response.json();
      setResult(data.result);
    } catch (error) {
      console.error("Error:", error);
      // Using our pretty dialog instead of the ugly browser alert!
      setAlertConfig({
        title: "Connection Error",
        desc: "Backend is not running. Make sure to start your Python server first!"
      });
      setShowAlert(true);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-950 text-white p-4 md:p-8">
      
      {/* Back Button */}
      <button 
        onClick={() => navigate('/')}
        className="flex items-center gap-2 text-gray-400 hover:text-white mb-8 transition"
      >
        <ArrowLeft size={20} /> Back to Home
      </button>

      <div className="max-w-3xl mx-auto space-y-10">
        <div className="text-center space-y-2">
          <h1 className="text-4xl font-extrabold">
            AI Resume <span className="text-indigo-500">Analyzer</span>
          </h1>
        </div>

        <div className="bg-gray-900 p-8 rounded-3xl border border-gray-800 shadow-2xl space-y-6">
          {/* Input 1: JD */}
          <div>
            <label className="block text-sm font-semibold text-indigo-400 mb-3 uppercase tracking-wider">1. Job Description</label>
            <textarea 
              className="w-full h-48 bg-gray-800/50 text-white p-5 rounded-2xl border border-gray-700 focus:ring-2 focus:ring-indigo-500 outline-none transition"
              value={jd}
              onChange={(e) => setJd(e.target.value)}
            />
          </div>

          {/* Input 2: File */}
          <div>
            <label className="block text-sm font-semibold text-indigo-400 mb-3 uppercase tracking-wider">2. Upload Resume</label>
            <div className="relative group">
              <input 
                type="file" 
                accept=".pdf"
                onChange={(e) => setFile(e.target.files[0])}
                className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10"
              />
              <div className="border-2 border-dashed border-gray-700 group-hover:border-indigo-500 rounded-2xl p-10 text-center transition bg-gray-800/30">
                <Upload className="mx-auto text-gray-500 group-hover:text-indigo-500 mb-3" size={32} />
                <span className="text-gray-300 font-medium">{file ? file.name : "Click to upload PDF"}</span>
              </div>
            </div>
          </div>

          {/* THE DIALOG (Names now match showAlert) */}
          <AlertDialog open={showAlert} onOpenChange={setShowAlert}>
            <AlertDialogContent className="bg-gray-600 border-gray-800 text-white">
              <AlertDialogHeader>
                <AlertDialogTitle className="text-indigo-400">{alertConfig.title}</AlertDialogTitle>
                <AlertDialogDescription className="text-indigo-400">{alertConfig.desc}</AlertDialogDescription>
              </AlertDialogHeader>
              <AlertDialogFooter>
                <AlertDialogAction className="bg-indigo-600 hover:bg-indigo-500">Okay</AlertDialogAction>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>

          <button 
            onClick={handleAnalyze}
            disabled={loading}
            className="w-full bg-indigo-600 hover:bg-indigo-500 text-white font-bold py-5 rounded-2xl flex items-center justify-center gap-3 transition"
          >
            {loading ? <Loader2 className="animate-spin" /> : <Search size={22} />}
            {loading ? "Scanning..." : "Generate Analysis Report"}
          </button>
        </div>

        {/* Results */}
        {(result || loading) && (
          <div className="bg-gray-900 p-8 rounded-3xl border border-gray-800 shadow-2xl">
            <h2 className="text-2xl font-bold text-white mb-6 flex items-center gap-3">
              <FileText className="text-indigo-500" /> The Verdict
            </h2>
            {loading ? (
              <div className="py-12 text-center text-gray-400"><Loader2 className="animate-spin mx-auto mb-2" /> Thinking...</div>
            ) : (
              <div className="text-gray-300 whitespace-pre-wrap bg-gray-800/50 p-6 rounded-2xl border border-gray-700">{result}</div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default Analyzer;