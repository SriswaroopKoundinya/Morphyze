'use client';

import { useState, useRef, useCallback } from 'react';
import { FaceMesh } from '@mediapipe/face_mesh';
import { Camera } from '@mediapipe/camera_utils';

export default function AnalysisPage() {
  const [results, setResults] = useState<any>(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const calculateFacialScores = (landmarks: any) => {
    if (!landmarks) return null;

    // Basic example calculations (expand this)
    const leftEye = landmarks[33];
    const rightEye = landmarks[263];
    const nose = landmarks[1];
    const chin = landmarks[152];
    const leftJaw = landmarks[234];
    const rightJaw = landmarks[454];

    const eyeDistance = Math.hypot(rightEye.x - leftEye.x, rightEye.y - leftEye.y);
    const faceWidth = Math.hypot(rightJaw.x - leftJaw.x, rightJaw.y - leftJaw.y);
    const faceHeight = Math.hypot(chin.x - nose.x, chin.y - nose.y);

    const harmonyScore = Math.round(60 + Math.random() * 35); // Placeholder

    return {
      harmonyScore,
      pslRating: (harmonyScore / 12).toFixed(1) + "/8",
      keyMetrics: {
        eyeSpacingRatio: (eyeDistance / faceWidth * 100).toFixed(1) + "%",
        faceRatio: (faceHeight / faceWidth).toFixed(2),
      },
      strengths: ["Symmetrical eyes"],
      improvements: ["Consider jaw training"]
    };
  };

  const processImage = async (imageElement: HTMLImageElement) => {
    setIsAnalyzing(true);
    
    const faceMesh = new FaceMesh({
      locateFile: (file) => `https://cdn.jsdelivr.net/npm/@mediapipe/face_mesh/${file}`,
    });

    faceMesh.setOptions({
      maxNumFaces: 1,
      refineLandmarks: true,
      minDetectionConfidence: 0.7,
      minTrackingConfidence: 0.7,
    });

    faceMesh.onResults((results) => {
      if (results.multiFaceLandmarks && results.multiFaceLandmarks.length > 0) {
        const scores = calculateFacialScores(results.multiFaceLandmarks[0]);
        setResults(scores);
      } else {
        setResults({ error: "Could not detect face clearly. Try a better photo." });
      }
      setIsAnalyzing(false);
    });

    // Send image to MediaPipe
    faceMesh.send({ image: imageElement });
  };

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    const img = new Image();
    img.onload = () => processImage(img);
    img.src = URL.createObjectURL(file);
  };

  return (
    <div className="min-h-screen bg-zinc-950 text-white py-12">
      <div className="max-w-4xl mx-auto px-6">
        <h1 className="text-5xl font-bold text-center mb-4">Face Analysis</h1>
        <p className="text-center text-zinc-400 mb-12">Upload a clear front-facing photo for detailed analysis</p>

        <div className="bg-zinc-900 border border-zinc-800 rounded-3xl p-8 text-center">
          <input
            ref={fileInputRef}
            type="file"
            accept="image/*"
            onChange={handleFileUpload}
            className="hidden"
          />
          
          <button
            onClick={() => fileInputRef.current?.click()}
            className="bg-white text-black px-10 py-4 rounded-2xl font-semibold text-lg hover:bg-white/90 transition"
          >
            Upload Photo
          </button>

          {isAnalyzing && <p className="mt-6">Analyzing face...</p>}

          {results && (
            <div className="mt-10 text-left max-w-md mx-auto">
              <h3 className="text-3xl font-bold mb-2">Your Analysis</h3>
              <p className="text-5xl font-bold text-cyan-400 mb-6">{results.harmonyScore}/100</p>
              <p className="text-xl mb-8">PSL Rating: <span className="font-bold">{results.pslRating}</span></p>
              
              {/* Add more detailed breakdown here */}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}