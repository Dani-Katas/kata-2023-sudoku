import { describe, expect, it } from "vitest"
import { Sudoku } from "./Sudoku.js"

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

  describe("sudoku is valid", () => {
    it("cannot be created all empty", () => {
      const sudoku = Sudoku.fromMatrix([
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

      const result = sudoku.isValid()

      expect(result).toBe(true)
    })

    it("is invalid with duplicated numbers in horizontal lines", () => {
      const sudoku = Sudoku.fromMatrix([
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

      const result = sudoku.isValid()

      expect(result).toBe(false)
    })

    it("is invalid with duplicated numbers in vertical lines", () => {
      const sudoku = Sudoku.fromMatrix([
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

      const result = sudoku.isValid()

      expect(result).toBe(false)
    })

    describe("blocks", () => {
      it("is invalid with duplicated numbers in first block", () => {
        const sudoku = Sudoku.fromMatrix([
          [1, 2, 3, null, null, null, null, null, null],
          [4, 5, 6, null, null, null, null, null, null],
          [7, 8, 1, null, null, null, null, null, null],
          [null, null, null, null, null, null, null, null, null],
          [null, null, null, null, null, null, null, null, null],
          [null, null, null, null, null, null, null, null, null],
          [null, null, null, null, null, null, null, null, null],
          [null, null, null, null, null, null, null, null, null],
          [null, null, null, null, null, null, null, null, null],
        ])

        const result = sudoku.isValid()

        expect(result).toBe(false)
      })

      it("is invalid with duplicated numbers in the second block", () => {
        const sudoku = Sudoku.fromMatrix([
          [null, null, null, 1, 2, 3, null, null, null],
          [null, null, null, 4, 5, 6, null, null, null],
          [null, null, null, 7, 8, 1, null, null, null],
          [null, null, null, null, null, null, null, null, null],
          [null, null, null, null, null, null, null, null, null],
          [null, null, null, null, null, null, null, null, null],
          [null, null, null, null, null, null, null, null, null],
          [null, null, null, null, null, null, null, null, null],
          [null, null, null, null, null, null, null, null, null],
        ])

        const result = sudoku.isValid()

        expect(result).toBe(false)
      })

      it("is invalid with duplicated numbers in the third block", () => {
        const sudoku = Sudoku.fromMatrix([
          [null, null, null, null, null, null, 1, 2, 3],
          [null, null, null, null, null, null, 4, 5, 6],
          [null, null, null, null, null, null, 7, 8, 1],
          [null, null, null, null, null, null, null, null, null],
          [null, null, null, null, null, null, null, null, null],
          [null, null, null, null, null, null, null, null, null],
          [null, null, null, null, null, null, null, null, null],
          [null, null, null, null, null, null, null, null, null],
          [null, null, null, null, null, null, null, null, null],
        ])

        const result = sudoku.isValid()

        expect(result).toBe(false)
      })

      it("is invalid with duplicated numbers in the fourth block", () => {
        const sudoku = Sudoku.fromMatrix([
          [null, null, null, null, null, null, null, null, null],
          [null, null, null, null, null, null, null, null, null],
          [null, null, null, null, null, null, null, null, null],
          [1, 2, 3, null, null, null, null, null, null],
          [4, 5, 6, null, null, null, null, null, null],
          [7, 8, 1, null, null, null, null, null, null],
          [null, null, null, null, null, null, null, null, null],
          [null, null, null, null, null, null, null, null, null],
          [null, null, null, null, null, null, null, null, null],
        ])

        const result = sudoku.isValid()

        expect(result).toBe(false)
      })

      it("is invalid with duplicated numbers in the fifth block", () => {
        const sudoku = Sudoku.fromMatrix([
          [null, null, null, null, null, null, null, null, null],
          [null, null, null, null, null, null, null, null, null],
          [null, null, null, null, null, null, null, null, null],
          [null, null, null, 1, 2, 3, null, null, null],
          [null, null, null, 4, 5, 6, null, null, null],
          [null, null, null, 7, 8, 1, null, null, null],
          [null, null, null, null, null, null, null, null, null],
          [null, null, null, null, null, null, null, null, null],
          [null, null, null, null, null, null, null, null, null],
        ])

        const result = sudoku.isValid()

        expect(result).toBe(false)
      })

      it("is invalid with duplicated numbers in the sixth block", () => {
        const sudoku = Sudoku.fromMatrix([
          [null, null, null, null, null, null, null, null, null],
          [null, null, null, null, null, null, null, null, null],
          [null, null, null, null, null, null, null, null, null],
          [null, null, null, null, null, null, 1, 2, 3],
          [null, null, null, null, null, null, 4, 5, 6],
          [null, null, null, null, null, null, 7, 8, 1],
          [null, null, null, null, null, null, null, null, null],
          [null, null, null, null, null, null, null, null, null],
          [null, null, null, null, null, null, null, null, null],
        ])

        const result = sudoku.isValid()

        expect(result).toBe(false)
      })

      it("is invalid with duplicated numbers in the seventh block", () => {
        const sudoku = Sudoku.fromMatrix([
          [null, null, null, null, null, null, null, null, null],
          [null, null, null, null, null, null, null, null, null],
          [null, null, null, null, null, null, null, null, null],
          [null, null, null, null, null, null, null, null, null],
          [null, null, null, null, null, null, null, null, null],
          [null, null, null, null, null, null, null, null, null],
          [1, 2, 3, null, null, null, null, null, null],
          [4, 5, 6, null, null, null, null, null, null],
          [7, 8, 1, null, null, null, null, null, null],
        ])

        const result = sudoku.isValid()

        expect(result).toBe(false)
      })

      it("is invalid with duplicated numbers in the eightth block", () => {
        const sudoku = Sudoku.fromMatrix([
          [null, null, null, null, null, null, null, null, null],
          [null, null, null, null, null, null, null, null, null],
          [null, null, null, null, null, null, null, null, null],
          [null, null, null, null, null, null, null, null, null],
          [null, null, null, null, null, null, null, null, null],
          [null, null, null, null, null, null, null, null, null],
          [null, null, null, 1, 2, 3, null, null, null],
          [null, null, null, 4, 5, 6, null, null, null],
          [null, null, null, 7, 8, 1, null, null, null],
        ])

        const result = sudoku.isValid()

        expect(result).toBe(false)
      })

      it("is invalid with duplicated numbers in the last block", () => {
        const sudoku = Sudoku.fromMatrix([
          [null, null, null, null, null, null, null, null, null],
          [null, null, null, null, null, null, null, null, null],
          [null, null, null, null, null, null, null, null, null],
          [null, null, null, null, null, null, null, null, null],
          [null, null, null, null, null, null, null, null, null],
          [null, null, null, null, null, null, null, null, null],
          [null, null, null, null, null, null, 1, 2, 3],
          [null, null, null, null, null, null, 4, 5, 6],
          [null, null, null, null, null, null, 7, 8, 1],
        ])

        const result = sudoku.isValid()

        expect(result).toBe(false)
      })
    })
  })
})
