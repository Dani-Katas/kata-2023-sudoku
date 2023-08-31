/**
 * Represents an index inside the Sudoku (1..9)
 * This can be used for Horizontal Lines, Vertical Lines and Blocks
 */
export class SudokuIndex {
  constructor(private readonly value: number) {}

  getValue(): number {
    return this.value
  }

  notEquals(other: SudokuIndex) {
    return this.value !== other.getValue()
  }
}
