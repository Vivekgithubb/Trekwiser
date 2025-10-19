// CleanUp.jsx
import React, { useState } from "react";
import axios from "axios";

const CleanUp = () => {
  const [beforeImage, setBeforeImage] = useState(null);
  const [afterImage, setAfterImage] = useState(null);
  const [beforePreview, setBeforePreview] = useState(null);
  const [afterPreview, setAfterPreview] = useState(null);
  const [status, setStatus] = useState("");
  const [loading, setLoading] = useState(false);
  const [analyzing, setAnalyzing] = useState(false);
  const [analysisResult, setAnalysisResult] = useState(null);

  const handleBeforeChange = (e) => {
    const file = e.target.files[0];
    setBeforeImage(file);
    setBeforePreview(URL.createObjectURL(file));
  };

  const handleAfterChange = (e) => {
    const file = e.target.files[0];
    setAfterImage(file);
    setAfterPreview(URL.createObjectURL(file));
  };

  const handleUpload = async (type) => {
    try {
      setLoading(true);
      const formData = new FormData();
      if (type === "before") formData.append("before", beforeImage);
      if (type === "after") formData.append("after", afterImage);

      await axios.post("/api/cleanup/upload", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      setStatus(
        `${type.charAt(0).toUpperCase() + type.slice(1)} image uploaded!`
      );
    } catch (err) {
      console.error(err);
      setStatus("Upload failed. Try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleAnalyze = async () => {
    try {
      setAnalyzing(true);
      setAnalysisResult(null);

      // Call your AI verification function here
      // Example:
      const res = await axios.post("/api/cleanup/analyze", {
        before: beforeImage ? beforeImage.name : null,
        after: afterImage ? afterImage.name : null,
      });

      setAnalysisResult(res.data);
      setStatus("Analysis complete!");
    } catch (err) {
      console.error(err);
      setStatus("Analysis failed.");
    } finally {
      setAnalyzing(false);
    }
  };

  return (
    <div className="min-h-screen w-full bg-gradient-to-br from-sky-200 via-blue-100 to-white flex flex-col items-center justify-start p-4 relative overflow-hidden">
      {/* Background pattern */}
      <div className="absolute top-0 left-0 w-full h-full bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-10 pointer-events-none"></div>

      <div className="relative z-10 w-full max-w-xl bg-white/30 backdrop-blur-md shadow-xl rounded-3xl p-6 flex flex-col space-y-8 mt-12">
        <h1 className="text-3xl font-bold text-blue-700 text-center">
          🌿 TrekWiser Clean-Up Challenge
        </h1>

        {/* Before Image */}
        <div className="flex flex-col space-y-4">
          <h2 className="text-xl font-semibold text-blue-800">
            1️⃣ Upload Before Cleaning Image
          </h2>
          {beforePreview && (
            <img
              src={beforePreview}
              alt="Before Preview"
              className="w-full max-h-64 object-cover rounded-xl border border-white/50"
            />
          )}
          <input
            type="file"
            accept="image/*"
            onChange={handleBeforeChange}
            className="border border-blue-300 rounded-lg px-4 py-2 w-full bg-white/70 backdrop-blur-sm text-blue-800"
          />
          <button
            onClick={() => handleUpload("before")}
            disabled={!beforeImage || loading}
            className="bg-blue-500 text-white px-6 py-2 rounded-xl hover:bg-blue-600 transition disabled:opacity-50"
          >
            {loading ? "Uploading..." : "Upload Before Image"}
          </button>
        </div>

        {/* After Image */}
        <div className="flex flex-col space-y-4">
          <h2 className="text-xl font-semibold text-blue-800">
            2️⃣ Upload After Cleaning Image
          </h2>
          {afterPreview && (
            <img
              src={afterPreview}
              alt="After Preview"
              className="w-full max-h-64 object-cover rounded-xl border border-white/50"
            />
          )}
          <input
            type="file"
            accept="image/*"
            onChange={handleAfterChange}
            className="border border-blue-300 rounded-lg px-4 py-2 w-full bg-white/70 backdrop-blur-sm text-blue-800"
          />
          <button
            onClick={() => handleUpload("after")}
            disabled={!afterImage || loading}
            className="bg-blue-500 text-white px-6 py-2 rounded-xl hover:bg-blue-600 transition disabled:opacity-50"
          >
            {loading ? "Uploading..." : "Upload After Image"}
          </button>
        </div>

        {/* Analyze Button */}
        <div className="flex flex-col items-center space-y-4 mt-4">
          <button
            onClick={handleAnalyze}
            disabled={!beforeImage || !afterImage || analyzing}
            className="bg-green-500 text-white px-8 py-3 rounded-2xl hover:bg-green-600 transition disabled:opacity-50"
          >
            {analyzing ? "Analyzing..." : "Analyze Cleanup"}
          </button>

          {analysisResult && (
            <div className="mt-4 p-4 w-full bg-white/60 backdrop-blur-sm rounded-xl text-center text-blue-700 font-semibold">
              {/* Replace this with real AI results */}
              Cleanup Score: {analysisResult.cleanup_score || "N/A"} <br />
              Verified: {analysisResult.verified ? "✅ Yes" : "❌ No"}
            </div>
          )}
        </div>

        {/* Status Message */}
        {status && (
          <p className="text-center text-blue-700 font-medium bg-white/50 rounded-lg px-4 py-2">
            {status}
          </p>
        )}
      </div>
    </div>
  );
};

export default CleanUp;
