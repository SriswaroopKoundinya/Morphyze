'use client';

import { useState, useRef } from 'react';
import { FaceLandmarker, FilesetResolver, DrawingUtils } from '@mediapipe/tasks-vision';

export default function AnalysisPage() {
  const [results, setResults] = useState<any>(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [imageUrl, setImageUrl] = useState<string | null>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const processImage = async (imageElement: HTMLImageElement) => {
    setIsAnalyzing(true);

    try {
      const vision = await FilesetResolver.forVisionTasks(
        "https://cdn.jsdelivr.net/npm/@mediapipe/tasks-vision@latest/wasm"
      );

      const faceLandmarker = await FaceLandmarker.createFromOptions(vision, {
        baseOptions: {
          modelAssetPath: `https://storage.googleapis.com/mediapipe-models/face_landmarker/face_landmarker/float16/1/face_landmarker.task`,
          delegate: "GPU"
        },
        outputFaceBlendshapes: true,
        outputFacialTransformationMatrixes: true,
        numFaces: 1,
      });

      const landmarks = faceLandmarker.detect(imageElement);

      if (landmarks.faceLandmarks && landmarks.faceLandmarks.length > 0) {
        const scores = calculateLooksmaxScores(landmarks.faceLandmarks[0]);
        setResults(scores);
      } else {
        setResults({ error: "Could not detect a clear face. Try a well-lit front-facing photo." });
      }
    } catch (error) {
      console.error(error);
      setResults({ error: "Analysis failed. Please try again." });
    } finally {
      setIsAnalyzing(false);
    }
  };

  const calculateLooksmaxScores = (landmarks: any) => {
    // Basic example - expand this heavily
    const harmonyScore = Math.floor(65 + Math.random() * 30);

    return {
      harmonyScore,
      pslRating: (harmonyScore / 12).toFixed(1) + "/8",
      keyMetrics: {
        facialThirds: "Balanced",
        eyeSpacing: "Good",
        jawlineAngle: "Strong"
      },
      strengths: ["Symmetrical features", "Decent jaw projection"],
      improvements: ["Mewing for better chin", "Consider skincare routine"]
    };
  };

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    const url = URL.createObjectURL(file);
    setImageUrl(url);

    const img = new Image();
    img.onload = () => processImage(img);
    img.src = url;
  };

  return (
    <div className="min-h-screen bg-zinc-950 text-white py-12">
      <div className="max-w-4xl mx-auto px-6">
        <h1 className="text-5xl font-bold text-center mb-4">AI Face Analysis</h1>
        <p className="text-center text-zinc-400 mb-12">Upload a clear front-facing photo for detailed looksmaxxing analysis</p>

        <div className="bg-zinc-900 border border-zinc-800 rounded-3xl p-12 text-center">
          <input
            ref={fileInputRef}
            type="file"
            accept="image/*"
            onChange={handleFileUpload}
            className="hidden"
          />

          <button
            onClick={() => fileInputRef.current?.click()}
            className="bg-white text-black px-12 py-5 rounded-2xl font-semibold text-xl hover:bg-white/90 transition"
          >
            Upload Photo
          </button>

          {imageUrl && <img src={imageUrl} alt="Uploaded" className="mx-auto mt-8 max-h-96 rounded-xl" />}

          {isAnalyzing && <p className="mt-8 text-lg">Analyzing face with AI...</p>}

          {results && !results.error && (
            <div className="mt-12 p-8 bg-zinc-800 rounded-2xl text-left max-w-2xl mx-auto">
              <h3 className="text-4xl font-bold mb-6">Your Face Analysis</h3>
              <div className="text-7xl font-bold text-cyan-400 mb-4">{results.harmonyScore}/100</div>
              <div className="text-3xl mb-8">PSL Rating: <span className="font-bold">{results.pslRating}</span></div>
              
              <div className="grid grid-cols-2 gap-8 mt-10">
                <div>
                  <h4 className="font-semibold mb-3">Strengths</h4>
                  <ul className="space-y-2 text-emerald-400">
                    {results.strengths.map((s: string, i: number) => <li key={i}>• {s}</li>)}
                  </ul>
                </div>
                <div>
                  <h4 className="font-semibold mb-3">Areas to Improve</h4>
                  <ul className="space-y-2 text-amber-400">
                    {results.improvements.map((s: string, i: number) => <li key={i}>• {s}</li>)}
                  </ul>
                </div>
              </div>
            </div>
          )}

          {results?.error && <p className="text-red-400 mt-8">{results.error}</p>}
        </div>
      </div>
    </div>
  );
}