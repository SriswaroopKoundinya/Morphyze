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

  const distance2D = (a: any, b: any) => {
  return Math.hypot(
    b.x - a.x,
    b.y - a.y
  );
};

const calculateLooksmaxScores = (landmarks: any) => {
  // -----------------------------
  // Chin : Philtrum Ratio
  // -----------------------------

  // Approximate MediaPipe landmarks
  const subnasale = landmarks[2];      // Base of nose
  const upperLip = landmarks[13];      // Top lip center
  const lowerLip = landmarks[14];      // Bottom lip center
  const chin = landmarks[152];         // Bottom of chin

  const philtrumLength = distance2D(subnasale, upperLip);
  const chinLength = distance2D(lowerLip, chin);

  const chinPhiltrumRatio = chinLength / philtrumLength;

  let percentile = "";
  let rating = "";

  if (chinPhiltrumRatio < 1.6) {
    percentile = "<15th";
    rating = "Very Low";
  } else if (chinPhiltrumRatio < 1.8) {
    percentile = "30th";
    rating = "Below Average";
  } else if (chinPhiltrumRatio < 1.9) {
    percentile = "40th";
    rating = "Average";
  } else if (chinPhiltrumRatio <= 2.25) {
    percentile = "50th–70th";
    rating = "Ideal";
  } else if (chinPhiltrumRatio <= 2.4) {
    percentile = "85th";
    rating = "Strong";
  } else if (chinPhiltrumRatio <= 2.5) {
    percentile = "90th";
    rating = "Very Strong";
  } else {
    percentile = ">95th";
    rating = "Extreme";
  }

  // Placeholder harmony score
  const harmonyScore = Math.floor(65 + Math.random() * 30);

  return {
    harmonyScore,

    pslRating: (harmonyScore / 12).toFixed(1) + "/8",

    keyMetrics: {
      facialThirds: "Balanced",
      eyeSpacing: "Good",
      jawlineAngle: "Strong",

      chinPhiltrumRatio: chinPhiltrumRatio.toFixed(2),
      chinPhiltrumPercentile: percentile,
      chinPhiltrumRating: rating,
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
              
			  <div className="mt-8 border-t border-zinc-700 pt-6">
  <h4 className="text-2xl font-semibold mb-4">
    Facial Measurements
  </h4>

  <div className="space-y-3 text-lg">

    <div className="flex justify-between">
      <span>Chin : Philtrum Ratio</span>
      <span className="font-semibold">
        {results.keyMetrics.chinPhiltrumRatio}
      </span>
    </div>

    <div className="flex justify-between">
      <span>Percentile</span>
      <span className="font-semibold">
        {results.keyMetrics.chinPhiltrumPercentile}
      </span>
    </div>

    <div className="flex justify-between">
      <span>Assessment</span>
      <span className="font-semibold text-cyan-400">
        {results.keyMetrics.chinPhiltrumRating}
      </span>
    </div>

  </div>
</div>
			  
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