import React, { useState } from 'react';
import { Upload, Search, FileText, Loader2, ArrowLeft } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const Analyzer = () => {
  const [file, setFile] = useState(null);
  const [jd, setJd] = useState("");
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState("");
  const navigate = useNavigate();

  const handleAnalyze = async () => {
    if (!file || !jd) return alert("Please upload a resume and paste the JD!");

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
      alert("Backend is not running. Start main.py first!");
    } finally {
      setLoading(false);
    }
  };

  return (
    // min-h-screen ensures it takes the whole page height
    <div className="min-h-screen bg-slate-950 text-white p-4 md:p-8">
      
      {/* Back Button for better UX */}
      <button 
        onClick={() => navigate('/')}
        className="flex items-center gap-2 text-gray-400 hover:text-white mb-8 transition"
      >
        <ArrowLeft size={20} /> Back to Home
      </button>

      <div className="max-w-3xl mx-auto space-y-10">
        
        {/* Header Section */}
        <div className="text-center space-y-2">
          <h1 className="text-4xl font-extrabold">
            AI Resume <span className="text-indigo-500">Analyzer</span>
          </h1>
          <p className="text-gray-400 text-lg">
            Upload your details below to get instant AI feedback.
          </p>
        </div>

        {/* Vertical Stack: Input Section */}
        <div className="bg-gray-900 p-8 rounded-3xl border border-gray-800 shadow-2xl space-y-6">
          <div>
            <label className="block text-sm font-semibold text-indigo-400 mb-3 uppercase tracking-wider">
              1. Job Description
            </label>
            <textarea 
              className="w-full h-48 bg-gray-800/50 text-white p-5 rounded-2xl border border-gray-700 focus:ring-2 focus:ring-indigo-500 focus:border-transparent outline-none transition resize-none"
              placeholder="Paste the job requirements here..."
              value={jd}
              onChange={(e) => setJd(e.target.value)}
            />
          </div>

          <div>
            <label className="block text-sm font-semibold text-indigo-400 mb-3 uppercase tracking-wider">
              2. Upload Resume (PDF)
            </label>
            <div className="relative group">
              <input 
                type="file" 
                accept=".pdf"
                onChange={(e) => setFile(e.target.files[0])}
                className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10"
              />
              <div className="border-2 border-dashed border-gray-700 group-hover:border-indigo-500 rounded-2xl p-10 text-center transition bg-gray-800/30">
                <Upload className="mx-auto text-gray-500 group-hover:text-indigo-500 mb-3" size={32} />
                <span className="text-gray-300 font-medium">
                  {file ? file.name : "Drop your PDF here or click to browse"}
                </span>
              </div>
            </div>
          </div>

          <button 
            onClick={handleAnalyze}
            disabled={loading}
            className="w-full bg-indigo-600 hover:bg-indigo-500 text-white font-bold py-5 rounded-2xl flex items-center justify-center gap-3 transition-all transform hover:scale-[1.01] active:scale-[0.99] disabled:opacity-50 shadow-xl shadow-indigo-900/20"
          >
            {loading ? <Loader2 className="animate-spin" /> : <Search size={22} />}
            {loading ? "AI is scanning your profile..." : "Generate Analysis Report"}
          </button>
        </div>

        {/* Result Section (Only shows when result exists or loading) */}
        {(result || loading) && (
          <div className="bg-gray-900 p-8 rounded-3xl border border-gray-800 shadow-2xl animate-in fade-in slide-in-from-bottom-4 duration-700">
            <h2 className="text-2xl font-bold text-white mb-6 flex items-center gap-3">
              <FileText className="text-indigo-500" /> 
              The Verdict
            </h2>
            
            {loading ? (
              <div className="flex flex-col items-center justify-center py-12 space-y-4">
                <Loader2 className="animate-spin text-indigo-500" size={40} />
                <p className="text-gray-400 animate-pulse">Gemini is thinking...</p>
              </div>
            ) : (
              <div className="text-gray-300 whitespace-pre-wrap text-base leading-relaxed bg-gray-800/50 p-6 rounded-2xl border border-gray-700">
                {result}
              </div>
            )}
          </div>
        )}

      </div>
    </div>
  );
};

export default Analyzer;