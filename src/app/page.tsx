import Link from "next/link";
import { Button } from "@/components/ui/Button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/Card";
import { BookOpen, HelpCircle, Trophy } from "lucide-react";

export default function Home() {
  return (
    <main className="flex flex-col items-center justify-center flex-1 py-10 space-y-8 max-w-lg mx-auto w-full">
      <div className="text-center space-y-4">
        <h1 className="text-4xl sm:text-5xl font-extrabold text-foreground tracking-tight">
          Sri Lankan Driving <span className="text-primary">Exam</span>
        </h1>
        <p className="text-secondary-foreground text-lg sm:text-xl font-medium">
          Learn road signs and pass your written exam with ease.
        </p>
      </div>

      <div className="w-full space-y-4 pt-4">
        <Link href="/learning" className="block outline-none">
          <Card hoverable className="border-b-4 border-success-shadow active:border-b-2 bg-success text-success-foreground border-t-0 border-l-0 border-r-0">
            <CardContent className="p-6 flex items-center justify-between">
              <div className="flex flex-col space-y-1">
                <h3 className="text-2xl font-bold">Learn Signs</h3>
                <p className="text-success-foreground/80 font-semibold">Master the road signs</p>
              </div>
              <BookOpen className="w-12 h-12 text-white opacity-80" />
            </CardContent>
          </Card>
        </Link>

        <Link href="/quiz" className="block outline-none">
          <Card hoverable className="border-b-4 border-primary-shadow active:border-b-2 bg-primary text-primary-foreground border-t-0 border-l-0 border-r-0">
            <CardContent className="p-6 flex items-center justify-between">
              <div className="flex flex-col space-y-1">
                <h3 className="text-2xl font-bold">Quiz Mode</h3>
                <p className="text-primary-foreground/80 font-semibold">Test your knowledge</p>
              </div>
              <HelpCircle className="w-12 h-12 text-white opacity-80" />
            </CardContent>
          </Card>
        </Link>

        <Link href="/exam" className="block outline-none">
          <Card hoverable className="border-b-4 border-danger-shadow active:border-b-2 bg-danger text-danger-foreground border-t-0 border-l-0 border-r-0">
            <CardContent className="p-6 flex items-center justify-between">
              <div className="flex flex-col space-y-1">
                <h3 className="text-2xl font-bold">Mock Exam</h3>
                <p className="text-danger-foreground/80 font-semibold">40 questions, timed</p>
              </div>
              <Trophy className="w-12 h-12 text-white opacity-80" />
            </CardContent>
          </Card>
        </Link>
      </div>
    </main>
  );
}
