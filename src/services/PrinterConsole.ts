import { Printer } from "./Printer.js"

export class PrinterConsole implements Printer {
  log(...args: any[]): void {
    console.log(...args)
  }
}
