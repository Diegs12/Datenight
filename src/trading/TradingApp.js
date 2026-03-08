import { Routes, Route } from "react-router-dom";
import TradingLanding from "./TradingLanding";
import RiskQuiz from "./RiskQuiz";
import TradingSignup from "./TradingSignup";
import TradingDashboard from "./TradingDashboard";

export default function TradingApp() {
  return (
    <Routes>
      <Route index element={<TradingLanding />} />
      <Route path="quiz" element={<RiskQuiz />} />
      <Route path="signup" element={<TradingSignup />} />
      <Route path="dashboard" element={<TradingDashboard />} />
    </Routes>
  );
}
