import { Printer } from "./Printer.js"
import { expect } from "vitest"

export class PrinterFake implements Printer {
  private lines: Array<Array<any>> = []

  log(...args: any[]): void {
    this.lines.push(args)
  }

  expectCalledWith(value: string) {
    const valueCleaned = value
      .split("\n")
      .map((el) => el.trim())
      .join("\n")
      .trim()

    const linesCleaned = this.lines.map((el) => el.join(" ")).join("\n")

    expect(linesCleaned).toEqual(valueCleaned)
  }
}
