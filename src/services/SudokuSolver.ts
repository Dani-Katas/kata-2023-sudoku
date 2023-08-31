import { Printer } from "./Printer.js"
import { FileSystem } from "./FileSystem.js"
import { Sudoku } from "../entities/Sudoku.js"
import { SudokuParser } from "./SudokuParser.js"

export class SudokuSolver {
  private readonly sudokuParser = new SudokuParser()
  constructor(private readonly fileSystem: FileSystem, private readonly printer: Printer) {}

  solve(path: string) {
    const sudokuRaw = this.fileSystem.readFileSync(path)
    const sudoku: Sudoku = this.sudokuParser.parse(sudokuRaw)
    const solved = sudoku.solve()
    this.printer.log(solved.toString())
  }
}
