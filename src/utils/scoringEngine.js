/**
 * MindCare Cognitive Game Scoring & Adaptive Suggestion Engine
 * 
 * Score Formula (0-100 Normalized):
 * Score = 40% Accuracy + 20% Time Performance + 20% Correct Actions + 20% Mistake Performance
 */

export function calculateGameScore({ accuracy, activeSeconds, expectedSeconds = 30, hits, totalTargets, mistakes }) {
  // 1. Accuracy (0 - 100)
  const A = Math.min(100, Math.max(0, accuracy));

  // 2. Time Performance (0 - 100)
  let T = 100;
  if (activeSeconds > expectedSeconds) {
    T = Math.max(20, 100 - Math.round((activeSeconds - expectedSeconds) * 2));
  }

  // 3. Correct Actions / Hits (0 - 100)
  const H = totalTargets > 0 ? Math.round((hits / totalTargets) * 100) : 100;

  // 4. Mistake Performance (0 - 100: 0 mistakes = 100 pts, -15 per mistake)
  const M = Math.max(0, 100 - (mistakes * 15));

  // Composite Score
  const rawScore = (0.40 * A) + (0.20 * T) + (0.20 * H) + (0.20 * M);
  const finalScore = Math.round(Math.min(100, Math.max(0, rawScore)));

  return {
    finalScore,
    components: { A: Math.round(A), T, H, M }
  };
}

export function getAdaptiveDifficultySuggestion(score, currentLevel, gameId) {
  let suggestedLevel = currentLevel;
  let recommendation = "stay"; // 'upgrade' | 'stay' | 'easier'
  let message = "";

  if (score >= 80) {
    recommendation = "upgrade";
    suggestedLevel = Math.min(5, currentLevel + 1);
    message = `Outstanding performance (${score}%)! Would you like to try Level ${suggestedLevel}?`;
  } else if (score < 30) {
    recommendation = "easier";
    suggestedLevel = Math.max(1, currentLevel - 1);
    message = `Take your time! We suggest trying Level ${suggestedLevel} for a more comfortable pace.`;
  } else {
    recommendation = "stay";
    suggestedLevel = currentLevel;
    message = `Nice work (${score}%)! We recommend practicing more on Level ${currentLevel}.`;
  }

  return {
    suggestedLevel,
    recommendation,
    message,
    canChange: suggestedLevel !== currentLevel
  };
}
