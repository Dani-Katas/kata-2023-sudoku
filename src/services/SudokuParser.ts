import { Sudoku } from "../entities/Sudoku.js"

export class SudokuParser {
  parse(sudokuRaw: string): Sudoku {
    const matrix = sudokuRaw
      .trim()
      .split("\n")
      .map((el) => el.split("\t").map((el) => (el === "-" ? null : parseInt(el))))

    return Sudoku.fromMatrix(matrix)
  }
}
