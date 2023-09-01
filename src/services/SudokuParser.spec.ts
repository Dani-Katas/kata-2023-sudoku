import { describe, expect, it } from "vitest"
import { SudokuParser } from "./SudokuParser.js"
import { Sudoku } from "../entities/Sudoku.js"

const sample = `-\t-\t8\t-\t-\t-\t-\t1\t-
-\t2\t-\t7\t-\t3\t-\t4\t5
7\t4\t-\t-\t5\t1\t-\t-\t8
8\t-\t2\t-\t-\t-\t-\t-\t-
6\t-\t3\t-\t4\t5\t9\t8\t-
-\t-\t-\t-\t1\t6\t-\t5\t2
9\t-\t4\t6\t-\t7\t-\t-\t-
-\t-\t5\t-\t-\t-\t4\t-\t3
-\t7\t-\t5\t2\t-\t-\t9\t6`

describe("SudokuPaser", () => {
  it("parses the given sudoku", () => {
    const sudokuParser = new SudokuParser()

    const sudoku = sudokuParser.parse(sample)

    const expectedSudoku = Sudoku.fromRaw([
      [null, null, 8, null, null, null, null, 1, null],
      [null, 2, null, 7, null, 3, null, 4, 5],
      [7, 4, null, null, 5, 1, null, null, 8],
      [8, null, 2, null, null, null, null, null, null],
      [6, null, 3, null, 4, 5, 9, 8, null],
      [null, null, null, null, 1, 6, null, 5, 2],
      [9, null, 4, 6, null, 7, null, null, null],
      [null, null, 5, null, null, null, 4, null, 3],
      [null, 7, null, 5, 2, null, null, 9, 6],
    ])
    expect(sudoku).toEqual(expectedSudoku)
  })
})
