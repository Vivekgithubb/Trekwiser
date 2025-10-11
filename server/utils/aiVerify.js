import { execFile } from "child_process";
import path from "path";

export const verifyCleanupWithAI = (beforeUrl, afterUrl) => {
  return new Promise((resolve, reject) => {
    const script = path.join(process.cwd(), "server", "utils", "cleanup_verify.py");
    execFile("python", [script, beforeUrl, afterUrl], (err, stdout, stderr) => {
      if (err) {
        console.error("AI error:", stderr || err);
        return resolve({
          same_location: false,
          trash_before: 0,
          trash_after: 0,
          cleanup_score: 0,
          verified: false
        });
      }
      try {
        const result = JSON.parse(stdout);
        resolve(result);
      } catch (parseErr) {
        reject(parseErr);
      }
    });
  });
};
