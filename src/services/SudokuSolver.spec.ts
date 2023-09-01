import { describe, it } from "vitest"
import { SudokuSolver } from "./SudokuSolver.js"
import { FileSystemFake } from "./FileSystemFake.js"
import { PrinterFake } from "./PrinterFake.js"

describe("Sudoku solver", () => {
  it("loads the sudoku of the given path", () => {
    const fileSystem = new FileSystemFake()
    const printer = new PrinterFake()
    const sudokuSolver = new SudokuSolver(fileSystem, printer)

    sudokuSolver.solve("test/fixtures/1.sudoku")

    printer.expectCalledWith(`
      5 3 8 | 4 6 2 | 7 1 9
      1 2 9 | 7 8 3 | 6 4 5
      7 4 6 | 9 5 1 | 2 3 8
      ---------------------
      8 5 2 | 3 7 9 | 1 6 4
      6 1 3 | 2 4 5 | 9 8 7
      4 9 7 | 8 1 6 | 3 5 2
      ---------------------
      9 8 4 | 6 3 7 | 5 2 1
      2 6 5 | 1 9 8 | 4 7 3
      3 7 1 | 5 2 4 | 8 9 6
    `)
  })
})
