import { SudokuSolver } from "./services/SudokuSolver.js"
import { FileSystemNode } from "./services/FileSystemNode.js"
import { PrinterConsole } from "./services/PrinterConsole.js"

const sudokuSolver = new SudokuSolver(new FileSystemNode(), new PrinterConsole())
const path = process.argv[2]

sudokuSolver.solve(path)
