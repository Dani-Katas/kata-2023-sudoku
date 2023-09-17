/**
 * Represents an index inside the Sudoku (1..9)
 * This can be used for Horizontal Lines, Vertical Lines and Blocks
 */
export class SudokuIndex {
  static *each(): Generator<SudokuIndex, void> {
    for (let i = 0; i < 9; i++) {
      yield new SudokuIndex(i)
    }
  }

  private constructor(private readonly value: number) {}

  getFrom<T>(array: Array<T>) {
    return array[this.value]
  }

  writeIn<T>(array: Array<T>, value: T) {
    array[this.value] = value
  }

  notEquals(other: SudokuIndex) {
    return this.value !== other.value
  }

  toModDiv() {
    const blockSize = 3
    const mod1 = this.value % blockSize
    const div1 = Math.floor(this.value / blockSize)

    return [new SudokuIndex(mod1), new SudokuIndex(div1)] as const
  }

  add(other: SudokuIndex) {
    return new SudokuIndex(this.value + other.value)
  }

  times(other: number) {
    return new SudokuIndex(this.value * other)
  }

  equals(other: SudokuIndex) {
    return !this.notEquals(other)
  }
}
