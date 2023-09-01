import { SudokuSolver } from "./services/SudokuSolver.js"
import { FileSystemFake } from "./services/FileSystemFake.js"
import { PrinterConsole } from "./services/PrinterConsole.js"

const sudokuSolver = new SudokuSolver(new FileSystemFake(), new PrinterConsole())
const path = process.argv[2]

sudokuSolver.solve(path)
