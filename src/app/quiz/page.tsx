"use client";

import { useEffect, useState } from "react";
import { getQuestions, Question } from "@/lib/data";
import { Button } from "@/components/ui/Button";
import { ProgressBar } from "@/components/ui/ProgressBar";
import { X, Check, Heart } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import Image from "next/image";
import { db } from "@/lib/firebase";
import { collection, addDoc, serverTimestamp } from "firebase/firestore";

export default function QuizMode() {
  const [questions, setQuestions] = useState<Question[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [isCorrect, setIsCorrect] = useState<boolean | null>(null);
  const [loading, setLoading] = useState(true);
  const [score, setScore] = useState(0);

  useEffect(() => {
    getQuestions().then((data) => {
      // Shuffle all
      const shuffled = [...data].sort(() => 0.5 - Math.random());
      setQuestions(shuffled);
      setLoading(false);
    });
  }, []);

  if (loading) {
    return (
      <div className="flex flex-1 items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
      </div>
    );
  }

  if (currentIndex >= questions.length) {
    // Save score when completed
    if (currentIndex > 0) {
      addDoc(collection(db, "quiz_scores"), {
        completed: true,
        score: score,
        total: questions.length,
        timestamp: serverTimestamp(),
      }).catch(console.error);
    }

    return (
      <div className="flex flex-col flex-1 items-center justify-center py-20 px-4 space-y-8 text-center max-w-lg mx-auto w-full">
        <div className="p-8 rounded-full bg-success/20 text-success">
          <Check className="w-24 h-24" />
        </div>
        <h1 className="text-4xl font-extrabold">Quiz Completed!</h1>
        <p className="text-xl text-secondary-foreground font-semibold">
          You scored {score} out of {questions.length}
        </p>
        <Link href="/" className="w-full mt-8 block">
          <Button size="lg" variant="success" className="w-full">
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
    const correct = index === currentQ.answerIndex;
    setIsCorrect(correct);
    if (correct) {
      setScore(s => s + 1);
    }
  };

  const handleNext = () => {
    setSelectedAnswer(null);
    setIsCorrect(null);
    setCurrentIndex((prev) => prev + 1);
  };

  return (
    <div className="flex flex-col flex-1 pb-24">
      {/* Header */}
      <div className="flex items-center justify-between py-4 space-x-4 mb-4">
        <Link href="/" className="text-secondary-foreground hover:text-foreground">
          <X className="w-6 h-6" />
        </Link>
        <ProgressBar value={progress} className="flex-1" />
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col items-center justify-center max-w-lg mx-auto w-full space-y-8">
        <h2 className="text-2xl sm:text-3xl font-extrabold w-full text-left">
          {currentQ.question}
        </h2>
        
        {currentQ.image && (
          <div className="bg-white p-4 rounded-3xl border-2 border-border inline-block shadow-sm">
            <Image
              src={currentQ.image}
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

      {/* Bottom Action Bar */}
      <AnimatePresence>
        {selectedAnswer !== null && (
          <motion.div
            initial={{ y: "100%" }}
            animate={{ y: 0 }}
            exit={{ y: "100%" }}
            className={`fixed bottom-0 left-0 right-0 p-4 border-t-2 sm:p-6 flex flex-col sm:flex-row items-center justify-between z-50
              ${isCorrect ? "bg-[#d7ffb8] border-[#bbf38f]" : "bg-[#ffdfe0] border-[#ffc1c1]"}
            `}
          >
            <div className="w-full max-w-screen-md mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
              <div className="flex items-center space-x-4 w-full sm:w-auto">
                <div className={`p-2 rounded-full ${isCorrect ? "bg-success text-white" : "bg-danger text-white"}`}>
                  {isCorrect ? <Check className="w-6 h-6" /> : <X className="w-6 h-6" />}
                </div>
                <div className="flex flex-col">
                  <h3 className={`text-xl font-extrabold ${isCorrect ? "text-[#58a700]" : "text-[#ea2b2b]"}`}>
                    {isCorrect ? "Excellent!" : "Correct solution:"}
                  </h3>
                  {!isCorrect && (
                    <p className={`text-lg font-bold ${isCorrect ? "text-[#58a700]" : "text-[#ea2b2b]"}`}>
                      {currentQ.options[currentQ.answerIndex]}
                    </p>
                  )}
                </div>
              </div>
              <Button
                size="lg"
                variant={isCorrect ? "success" : "danger"}
                className="w-full sm:w-40 uppercase tracking-widest text-lg"
                onClick={handleNext}
              >
                Continue
              </Button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
