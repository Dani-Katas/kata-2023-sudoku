import { Cell } from "../entities/Cell.js"

export class InvalidLineError extends Error {
  constructor(private readonly cell: Cell) {
    super(`This line has duplicated number: ${cell}`)
  }
}
