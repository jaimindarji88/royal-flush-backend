import shell from 'shelljs';

export function execAsync(cmd: string, opts = {}): Promise<string> {
  return new Promise((res, rej) => {
    shell.exec(cmd, opts, (code, stdout, stderr) => {
      if (code !== 0) {
        return rej(stderr);
      }
      return res(stdout);
    });
  });
}
