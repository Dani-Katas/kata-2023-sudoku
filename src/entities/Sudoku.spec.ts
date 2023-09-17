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
      const sudoku1 = Sudoku.fromRaw(matrix)
      const sudoku2 = Sudoku.fromRaw(matrix)

      expect(sudoku1.equals(sudoku2)).toBe(true)
    })

    it("returns false if any number is different", () => {
      const sudoku1 = Sudoku.fromRaw([
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
      const sudoku2 = Sudoku.fromRaw([
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
      const sudoku = Sudoku.fromRaw([
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
      const sudoku = Sudoku.fromRaw([
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
      const sudoku = Sudoku.fromRaw([
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
        const sudoku = Sudoku.fromRaw([
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
        const sudoku = Sudoku.fromRaw([
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
        const sudoku = Sudoku.fromRaw([
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
        const sudoku = Sudoku.fromRaw([
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
        const sudoku = Sudoku.fromRaw([
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
        const sudoku = Sudoku.fromRaw([
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
        const sudoku = Sudoku.fromRaw([
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
        const sudoku = Sudoku.fromRaw([
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
        const sudoku = Sudoku.fromRaw([
          [null, null, null, null, null, null, null, null, null],
          [null, null, null, null, null, null, null, null, null],
          [null, null, null, null, null, null, null, null, null],
          [null, null, null, null, null, null, null, null, null],
          [null, null, null, /**/ null, null, null, null, null, null],
          [null, null, null, null, null, null, null, null, null],
          [null, null, null, null, null, null, 1, 2, 3],
          [null, null, null, null, null, null, 4, 5, 6],
          [null, null, null, null, null, null, 7, 8, 1],
        ])

        const result = sudoku.isValid()

        expect(result).toBe(false)
      })

      it("debug", () => {
        const sudoku = Sudoku.fromRaw([
          [4, 8, 9, 2, 6, 1, 3, 7, 5],
          [3, 1, 6, 7, 9, 5, 2, 8, 4],
          [5, 2, 7, 8, 4, 3, 9, 1, 6],
          [5, 2, 7, 8, 4, 3, 9, 1, 6],
          [1, 5, 8, 4, 7, 2, 6, 9, 3],
          [6, 7, 4, 3, 5, 9, 1, 2, 8],
          [9, 3, 2, 1, 8, 6, 5, 4, 7],
          [2, 4, 5, 9, 3, 7, 8, 6, 1],
          [7, 9, 3, 6, 1, 8, 4, 5, 2],
        ])

        const result = sudoku.isValid()

        expect(result).toBe(false)
      })
    })
  })

  describe("solves it", () => {
    it("does nothing if its solved", () => {
      const sudoku = Sudoku.fromRaw([
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

      const solved = sudoku.solve()

      expect(solved).toEqual(
        Sudoku.fromRaw([
          [5, 3, 8, 4, 6, 2, 7, 1, 9],
          [1, 2, 9, 7, 8, 3, 6, 4, 5],
          [7, 4, 6, 9, 5, 1, 2, 3, 8],
          [8, 5, 2, 3, 7, 9, 1, 6, 4],
          [6, 1, 3, 2, 4, 5, 9, 8, 7],
          [4, 9, 7, 8, 1, 6, 3, 5, 2],
          [9, 8, 4, 6, 3, 7, 5, 2, 1],
          [2, 6, 5, 1, 9, 8, 4, 7, 3],
          [3, 7, 1, 5, 2, 4, 8, 9, 6],
        ]),
      )
    })

    it("solves an version 1", () => {
      const sudoku = Sudoku.fromRaw([
        [null, 3, 8, 4, 6, 2, 7, 1, 9],
        [1, 2, 9, 7, 8, 3, 6, 4, 5],
        [7, 4, 6, 9, 5, 1, 2, 3, 8],
        [8, 5, 2, 3, 7, 9, 1, 6, 4],
        [6, 1, 3, 2, 4, 5, 9, 8, 7],
        [4, 9, 7, 8, 1, 6, 3, 5, 2],
        [9, 8, 4, 6, 3, 7, 5, 2, 1],
        [2, 6, 5, 1, 9, 8, 4, 7, 3],
        [3, 7, 1, 5, 2, 4, 8, 9, 6],
      ])

      const solved = sudoku.solve()

      expect(solved.toString()).toEqual(
        Sudoku.fromRaw([
          [5, 3, 8, 4, 6, 2, 7, 1, 9],
          [1, 2, 9, 7, 8, 3, 6, 4, 5],
          [7, 4, 6, 9, 5, 1, 2, 3, 8],
          [8, 5, 2, 3, 7, 9, 1, 6, 4],
          [6, 1, 3, 2, 4, 5, 9, 8, 7],
          [4, 9, 7, 8, 1, 6, 3, 5, 2],
          [9, 8, 4, 6, 3, 7, 5, 2, 1],
          [2, 6, 5, 1, 9, 8, 4, 7, 3],
          [3, 7, 1, 5, 2, 4, 8, 9, 6],
        ]).toString(),
      )
    })

    it("solves an version 2", () => {
      const sudoku = Sudoku.fromRaw([
        [null, null, 8, 4, 6, 2, 7, 1, 9],
        [1, 2, 9, 7, 8, 3, 6, 4, 5],
        [7, 4, 6, 9, 5, 1, 2, 3, 8],
        [8, 5, 2, 3, 7, 9, 1, 6, 4],
        [6, 1, 3, 2, 4, 5, 9, 8, 7],
        [4, 9, 7, 8, 1, 6, 3, 5, 2],
        [9, 8, 4, 6, 3, 7, 5, 2, 1],
        [2, 6, 5, 1, 9, 8, 4, 7, 3],
        [3, 7, 1, 5, 2, 4, 8, 9, 6],
      ])

      const solved = sudoku.solve()

      expect(solved.toString()).toEqual(
        Sudoku.fromRaw([
          [5, 3, 8, 4, 6, 2, 7, 1, 9],
          [1, 2, 9, 7, 8, 3, 6, 4, 5],
          [7, 4, 6, 9, 5, 1, 2, 3, 8],
          [8, 5, 2, 3, 7, 9, 1, 6, 4],
          [6, 1, 3, 2, 4, 5, 9, 8, 7],
          [4, 9, 7, 8, 1, 6, 3, 5, 2],
          [9, 8, 4, 6, 3, 7, 5, 2, 1],
          [2, 6, 5, 1, 9, 8, 4, 7, 3],
          [3, 7, 1, 5, 2, 4, 8, 9, 6],
        ]).toString(),
      )
    })

    it("solves an version 3", () => {
      const sudoku = Sudoku.fromRaw([
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

      const solved = sudoku.solve()

      expect(solved.toString()).toEqual(
        Sudoku.fromRaw([
          [5, 3, 8, 4, 6, 2, 7, 1, 9],
          [1, 2, 9, 7, 8, 3, 6, 4, 5],
          [7, 4, 6, 9, 5, 1, 2, 3, 8],
          [8, 5, 2, 3, 7, 9, 1, 6, 4],
          [6, 1, 3, 2, 4, 5, 9, 8, 7],
          [4, 9, 7, 8, 1, 6, 3, 5, 2],
          [9, 8, 4, 6, 3, 7, 5, 2, 1],
          [2, 6, 5, 1, 9, 8, 4, 7, 3],
          [3, 7, 1, 5, 2, 4, 8, 9, 6],
        ]).toString(),
      )
    })

    it.skip("solves a complicated one", () => {
      const sudoku = Sudoku.fromRaw([
        [null, null, null, null, null, null, 3, null, null],
        [null, null, null, null, 9, 5, null, null, null],
        [null, null, 7, 8, 4, 3, 9, 1, null],
        [null, null, 8, null, null, null, null, 9, null],
        [6, 7, null, null, null, null, 1, null, null],
        [null, null, null, 1, 8, 6, null, 4, null],
        [null, 4, null, 9, 3, null, 8, null, null],
        [null, null, null, null, null, 8, null, null, 2],
        [null, 6, 1, 5, null, null, null, null, null],
      ])

      const solved = sudoku.solve()

      expect(solved.toString()).toEqual(`4 8 9 | 2 6 1 | 3 7 5
3 1 6 | 7 9 5 | 2 8 4
5 2 7 | 8 4 3 | 9 1 6
---------------------
1 5 8 | 4 7 2 | 6 9 3
6 7 4 | 3 5 9 | 1 2 8
9 3 2 | 1 8 6 | 5 4 7
---------------------
2 4 5 | 9 3 7 | 8 6 1
7 9 3 | 6 1 8 | 4 5 2
8 6 1 | 5 2 4 | 7 3 9`)
    })
  })

  describe("toString", () => {
    it("converts the sudoku to formatted string", () => {
      const sudoku = Sudoku.fromRaw([
        [4, 8, 9, 2, 6, 1, 3, 7, 5],
        [3, 1, 6, 7, 9, 5, 2, 8, 4],
        [5, 2, 7, 8, 4, 3, 9, 1, 6],
        [1, 5, 8, 4, 7, 2, 6, 9, 3],
        [6, 7, 4, 3, 5, 9, 1, 2, 8],
        [9, 3, 2, 1, 8, 6, 5, 4, 7],
        [2, 4, 5, 9, 3, 7, 8, 6, 1],
        [7, 9, 3, 6, 1, 8, 4, 5, 2],
        [8, 6, 1, 5, 2, 4, 7, 3, 9],
      ])

      const string = sudoku.toString()

      expect(string).toEqual(`4 8 9 | 2 6 1 | 3 7 5
3 1 6 | 7 9 5 | 2 8 4
5 2 7 | 8 4 3 | 9 1 6
---------------------
1 5 8 | 4 7 2 | 6 9 3
6 7 4 | 3 5 9 | 1 2 8
9 3 2 | 1 8 6 | 5 4 7
---------------------
2 4 5 | 9 3 7 | 8 6 1
7 9 3 | 6 1 8 | 4 5 2
8 6 1 | 5 2 4 | 7 3 9`)
    })

    it("displays empty cells as dashes", () => {
      const sudoku = Sudoku.fromRaw([
        [null, 8, 9, 2, 6, 1, 3, 7, 5],
        [3, 1, 6, 7, 9, 5, 2, 8, 4],
        [5, 2, 7, 8, 4, 3, 9, 1, 6],
        [1, 5, 8, 4, 7, 2, 6, 9, 3],
        [6, 7, 4, 3, 5, 9, 1, 2, 8],
        [9, 3, 2, 1, 8, 6, 5, 4, 7],
        [2, 4, 5, 9, 3, 7, 8, 6, 1],
        [7, 9, 3, 6, 1, 8, 4, 5, 2],
        [8, 6, 1, 5, 2, 4, 7, 3, 9],
      ])

      const string = sudoku.toString()

      expect(string).toEqual(`- 8 9 | 2 6 1 | 3 7 5
3 1 6 | 7 9 5 | 2 8 4
5 2 7 | 8 4 3 | 9 1 6
---------------------
1 5 8 | 4 7 2 | 6 9 3
6 7 4 | 3 5 9 | 1 2 8
9 3 2 | 1 8 6 | 5 4 7
---------------------
2 4 5 | 9 3 7 | 8 6 1
7 9 3 | 6 1 8 | 4 5 2
8 6 1 | 5 2 4 | 7 3 9`)
    })
  })
})
