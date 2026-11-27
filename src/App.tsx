import { lazy, Suspense } from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import { Navbar } from "@/components/layout/Navbar";
import { Hero } from "@/components/sections/Hero";
import { ProblemSplit } from "@/components/sections/ProblemSplit";
import { AppShowcase } from "@/components/sections/AppShowcase";
import { Capabilities } from "@/components/sections/Capabilities";
import { GpuiArchitecture } from "@/components/sections/GpuiArchitecture";
import { OpenSourceHub } from "@/components/sections/OpenSourceHub";
import { Footer } from "@/components/layout/Footer";
import { ROUTE_DOCS, ROUTE_HOME } from "@/docs/constants";

// A documentação (MDX, busca, motor do canvas) fica fora do bundle da landing.
const DocsApp = lazy(() => import("@/docs/DocsApp"));

function Landing() {
  return (
    <div className="min-h-screen flex flex-col bg-background text-foreground transition-colors duration-150">
      <Navbar />
      <main className="flex-1 w-full max-w-6xl mx-auto border-x border-border bg-background">
        <Hero />
        <ProblemSplit />
        <AppShowcase />
        <Capabilities />
        <GpuiArchitecture />
        <OpenSourceHub />
      </main>
      <Footer />
    </div>
  );
}

export default function App() {
  return (
    <Routes>
      <Route path={ROUTE_HOME} element={<Landing />} />
      <Route
        path={`${ROUTE_DOCS}/*`}
        element={
          <Suspense fallback={<div className="min-h-screen bg-background" aria-busy="true" />}>
            <DocsApp />
          </Suspense>
        }
      />
      <Route path="*" element={<Navigate replace to={ROUTE_HOME} />} />
    </Routes>
  );
}
