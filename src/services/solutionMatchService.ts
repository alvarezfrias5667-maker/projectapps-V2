import { SOLUTIONS, Solution } from "../data/solutionsData";

export interface MatchRequest {
  industry: string;
  businessSize: string;
  mainProblem: string;
  goal: string;
  budget: string;
}

export interface MatchResult {
  solution: Solution;
  matchScore: number;
  matchLevel: "Óptimo (100%)" | "Muy Alto" | "Alto" | "Moderado";
}

export function findBestMatch(req: MatchRequest): MatchResult {
  let bestSolution: Solution = SOLUTIONS[0];
  let maxScore = -1;

  for (const sol of SOLUTIONS) {
    let score = 0;

    // 1. Industry Match (up to 25 points)
    if (sol.industries.includes(req.industry)) {
      score += 25;
    }

    // 2. Business Size Match (up to 25 points)
    if (sol.sizes.includes(req.businessSize)) {
      score += 25;
    }

    // 3. Main Problem Match (up to 20 points)
    if (sol.problems.includes(req.mainProblem)) {
      score += 20;
    }

    // 4. Goal/Objective Match (up to 20 points)
    if (sol.objectives.includes(req.goal)) {
      score += 20;
    }

    // 5. Budget Match (up to 10 points)
    if (sol.budgets.includes(req.budget)) {
      score += 10;
    }

    // Add slight tiebreak based on catalog ordering but strictly deterministic
    if (score > maxScore) {
      maxScore = score;
      bestSolution = sol;
    }
  }

  // Determine label based on final calculated score
  let matchLevel: MatchResult["matchLevel"] = "Moderado";
  if (maxScore >= 90) {
    matchLevel = "Óptimo (100%)";
  } else if (maxScore >= 70) {
    matchLevel = "Muy Alto";
  } else if (maxScore >= 45) {
    matchLevel = "Alto";
  }

  return {
    solution: bestSolution,
    matchScore: maxScore,
    matchLevel,
  };
}
