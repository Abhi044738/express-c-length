import { spawn } from "child_process";

const runProgram = (inputs) =>
  new Promise((resolve, reject) => {
    let result = "";
    let errorMessage = "";

    const child = spawn("./compiler/a.out");
    child.on("error", (err) =>
      reject(new Error(`error while running \n${err.tostring()}`)),
    );
    child.stdin.write(inputs);
    child.stdin.end();

    child.stdout.on("data", (data) => (result += data.toString()));
    child.stderr.on("data", (data) => (errorMessage += data.toString()));

    child.on("close", (code) => {
      if (code === 0) {
        console.log("done\n" + result);
        resolve(result);
      } else {
        console.error(errorMessage);
        reject(new Error(`error while running \n${errorMessage}\n${code}`));
      }
    });
  });

const compileSource = () =>
  new Promise((resolve, reject) => {
    const compile = spawn("gcc", ["./compiler/1.c", "-o", "./compiler/a.out"]);

    let errorMessage = "";

    compile.on("error", (err) =>
      reject(new Error(`error while compiling \n${err.toString()}`)),
    );
    compile.stderr.on("data", (data) => (errorMessage += data.toString()));

    compile.on("close", (code) => {
      if (code === 0) {
        console.log("Compiled");
        resolve(code);
      } else {
        reject(new Error(`error while compiling \n${errorMessage} \n${code}`));
      }
    });
  });

export { compileSource, runProgram };
