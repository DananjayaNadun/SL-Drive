"use client";

import { useEffect, useState } from "react";
import { getQuestions, Question } from "@/lib/data";
import { Button } from "@/components/ui/Button";
import { ProgressBar } from "@/components/ui/ProgressBar";
import { X, Check, Timer } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import Image from "next/image";
import { db } from "@/lib/firebase";
import { collection, addDoc, serverTimestamp } from "firebase/firestore";

export default function ExamMode() {
  const [questions, setQuestions] = useState<Question[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [score, setScore] = useState(0);
  const [loading, setLoading] = useState(true);
  const [timeLeft, setTimeLeft] = useState(40 * 60); // 40 minutes for 40 questions
  const [isFinished, setIsFinished] = useState(false);

  const basePath = process.env.NEXT_PUBLIC_BASE_PATH || "";

  useEffect(() => {
    getQuestions().then((data) => {
      // Shuffle and pick 40
      const shuffled = [...data].sort(() => 0.5 - Math.random());
      setQuestions(shuffled.slice(0, 40));
      setLoading(false);
    });
  }, []);

  useEffect(() => {
    if (loading || isFinished) return;
    const interval = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          setIsFinished(true);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
    return () => clearInterval(interval);
  }, [loading, isFinished]);

  useEffect(() => {
    if (isFinished && score > 0) {
      // Save score to Firebase
      try {
        addDoc(collection(db, "exam_scores"), {
          score,
          total: questions.length,
          timestamp: serverTimestamp(),
        });
      } catch (err) {
        console.error("Failed to save score:", err);
      }
    }
  }, [isFinished, score, questions.length]);

  if (loading) {
    return (
      <div className="flex flex-1 items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
      </div>
    );
  }

  if (isFinished || currentIndex >= questions.length) {
    const passed = score >= 30; // Assuming 30/40 is pass
    return (
      <div className="flex flex-col flex-1 items-center justify-center py-20 px-4 space-y-8 text-center max-w-lg mx-auto w-full">
        <div className={`p-8 rounded-full ${passed ? 'bg-success/20 text-success' : 'bg-danger/20 text-danger'}`}>
          {passed ? <Check className="w-24 h-24" /> : <X className="w-24 h-24" />}
        </div>
        <h1 className="text-4xl font-extrabold">{passed ? "Congratulations!" : "Keep Practicing"}</h1>
        <p className="text-xl text-secondary-foreground font-semibold">
          You scored {score} out of {questions.length}
        </p>
        <Link href="/" className="w-full mt-8 block">
          <Button size="lg" variant={passed ? "success" : "danger"} className="w-full">
            Return Home
          </Button>
        </Link>
      </div>
    );
  }

  const currentQ = questions[currentIndex];
  const progress = ((currentIndex) / questions.length) * 100;

  const handleSelect = (index: number) => {
    if (selectedAnswer !== null) return;
    setSelectedAnswer(index);
    if (index === currentQ.answerIndex) {
      setScore(s => s + 1);
    }
    
    // Auto advance after 1.5s
    setTimeout(() => {
      setSelectedAnswer(null);
      setCurrentIndex((prev) => prev + 1);
    }, 1500);
  };

  const formatTime = (seconds: number) => {
    const m = Math.floor(seconds / 60);
    const s = seconds % 60;
    return `${m}:${s < 10 ? '0' : ''}${s}`;
  };

  return (
    <div className="flex flex-col flex-1 pb-24">
      {/* Header */}
      <div className="flex items-center justify-between py-4 space-x-4 mb-4">
        <Link href="/" className="text-secondary-foreground hover:text-foreground">
          <X className="w-6 h-6" />
        </Link>
        <ProgressBar value={progress} className="flex-1" />
        <div className="flex items-center space-x-2 text-danger font-bold text-lg">
          <Timer className="w-5 h-5" />
          <span>{formatTime(timeLeft)}</span>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col items-center justify-center max-w-lg mx-auto w-full space-y-8">
        <h2 className="text-2xl sm:text-3xl font-extrabold w-full text-left">
          {currentQ.question}
        </h2>
        
        {currentQ.image && (
          <div className="bg-white p-4 rounded-3xl border-2 border-border inline-block shadow-sm">
            <Image
              src={`${basePath}${currentQ.image}`}
              alt="Road sign"
              width={200}
              height={200}
              className="object-contain"
            />
          </div>
        )}

        <div className="w-full grid grid-cols-1 gap-3">
          {currentQ.options.map((opt, idx) => {
            let variant: any = "ghost";
            let borderClass = "border-2";
            
            if (selectedAnswer !== null) {
              if (idx === currentQ.answerIndex) {
                variant = "success";
              } else if (idx === selectedAnswer) {
                variant = "danger";
              }
            } else {
              borderClass = "border-2 hover:bg-secondary";
            }

            return (
              <Button
                key={idx}
                variant={variant === "ghost" ? "ghost" : variant}
                className={`h-auto min-h-[3.5rem] justify-start px-4 py-3 whitespace-normal text-left ${variant === "ghost" ? borderClass : ""}`}
                onClick={() => handleSelect(idx)}
                disabled={selectedAnswer !== null}
              >
                <span className="text-lg font-bold">{opt}</span>
              </Button>
            );
          })}
        </div>
      </div>
    </div>
  );
}
