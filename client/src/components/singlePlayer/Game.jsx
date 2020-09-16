import React from "react";
import Board from "./Board";
import { answer, answer2, answer3 } from "../../helper/puzzles";

export default function Game(difficulty) {
  let mode = difficulty.route.params.difficulty;

  return (
    <>
      {mode === "easy" ? <Board difficulty={answer} mode={mode} /> : null}
      {mode === "medium" ? <Board difficulty={answer2} mode={mode} /> : null}
      {mode === "hard" ? <Board difficulty={answer3} mode={mode} /> : null}
    </>
  );
}
