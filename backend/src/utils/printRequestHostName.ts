import chalk from "chalk";
import { Request } from "express";

export default function printRequestHostName(req: Request, message: string) {
  console.log(chalk.yellow(req.hostname), message);
}
