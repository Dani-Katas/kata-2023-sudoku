import { describe, expect, it } from "vitest"
import { Sudoku } from "./Sudoku.js"
import { InvalidLineError } from "../errors/InvalidLineError.js"
import { Cell } from "./Cell.js"

describe("sudoku", () => {
  describe("equals", () => {
    it("returns true if is exactly the same", () => {
      const matrix = [
        [1, 2, 3, 4, 5, 6, 7, 8, 9],
        [2, 3, 4, 5, 6, 7, 8, 9, 1],
        [3, 4, 5, 6, 7, 8, 9, 1, 2],
        [4, 5, 6, 7, 8, 9, 1, 2, 3],
        [5, 6, 7, 8, 9, 1, 2, 3, 4],
        [6, 7, 8, 9, 1, 2, 3, 4, 5],
        [7, 8, 9, 1, 2, 3, 4, 5, 6],
        [8, 9, 1, 2, 3, 4, 5, 6, 7],
        [9, 1, 2, 3, 4, 5, 6, 7, 8],
      ]
      const sudoku1 = Sudoku.fromMatrix(matrix)
      const sudoku2 = Sudoku.fromMatrix(matrix)

      expect(sudoku1.equals(sudoku2)).toBe(true)
    })

    it("returns false if any number is different", () => {
      const sudoku1 = Sudoku.fromMatrix([
        [1, 2, 3, 4, 5, 6, 7, 8, 9],
        [2, 3, 4, 5, 6, 7, 8, 9, 1],
        [3, 4, 5, 6, 7, 8, 9, 1, 2],
        [4, 5, 6, 7, 8, 9, 1, 2, 3],
        [5, 6, 7, 8, 9, 1, 2, 3, 4],
        [6, 7, 8, 9, 1, 2, 3, 4, 5],
        [7, 8, 9, 1, 2, 3, 4, 5, 6],
        [8, 9, 1, 2, 3, 4, 5, 6, 7],
        [9, 1, 2, 3, 4, 5, 6, 7, 8],
      ])
      const sudoku2 = Sudoku.fromMatrix([
        [5, 3, 8, 4, 6, 2, 7, 1, 9],
        [1, 2, 9, 7, 8, 3, 6, 4, 5],
        [7, 4, 6, 9, 5, 1, 2, 3, 8],
        [8, 5, 2, 3, 7, 9, 1, 6, 4],
        [6, 1, 3, 2, 4, 5, 9, 8, 7],
        [4, 9, 7, 8, 1, 6, 3, 5, 2],
        [9, 8, 4, 6, 3, 7, 5, 2, 1],
        [2, 6, 5, 1, 9, 8, 4, 7, 3],
        [3, 7, 1, 5, 2, 4, 8, 9, 6],
      ])

      expect(sudoku1.equals(sudoku2)).toBe(false)
    })
  })

  describe("sudoku validations", () => {
    it("cannot be created all empty", () => {
      const instantiation = () =>
        Sudoku.fromMatrix([
          [null, null, null, null, null, null, null, null, null],
          [null, null, null, null, null, null, null, null, null],
          [null, null, null, null, null, null, null, null, null],
          [null, null, null, null, null, null, null, null, null],
          [null, null, null, null, null, null, null, null, null],
          [null, null, null, null, null, null, null, null, null],
          [null, null, null, null, null, null, null, null, null],
          [null, null, null, null, null, null, null, null, null],
          [null, null, null, null, null, null, null, null, null],
        ])

      expect(instantiation).not.toThrow()
    })

    it("cannot be created with invalid horizontal lines", () => {
      const instantiation = () =>
        Sudoku.fromMatrix([
          [1, 2, 3, 4, 5, 6, 7, 8, 1],
          [null, null, null, null, null, null, null, null, null],
          [null, null, null, null, null, null, null, null, null],
          [null, null, null, null, null, null, null, null, null],
          [null, null, null, null, null, null, null, null, null],
          [null, null, null, null, null, null, null, null, null],
          [null, null, null, null, null, null, null, null, null],
          [null, null, null, null, null, null, null, null, null],
          [null, null, null, null, null, null, null, null, null],
        ])

      expect(instantiation).toThrowError(new InvalidLineError(new Cell(1)))
    })

    it("cannot be created with invalid vertical lines", () => {
      const instantiation = () =>
        Sudoku.fromMatrix([
          [1, null, null, null, null, null, null, null, null],
          [2, null, null, null, null, null, null, null, null],
          [3, null, null, null, null, null, null, null, null],
          [4, null, null, null, null, null, null, null, null],
          [5, null, null, null, null, null, null, null, null],
          [6, null, null, null, null, null, null, null, null],
          [7, null, null, null, null, null, null, null, null],
          [8, null, null, null, null, null, null, null, null],
          [1, null, null, null, null, null, null, null, null],
        ])

      expect(instantiation).toThrowError(new InvalidLineError(new Cell(1)))
    })
  })
})
