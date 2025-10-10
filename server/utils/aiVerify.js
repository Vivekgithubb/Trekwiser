import { execFile } from "child_process";
import path from "path";

export const verifyCleanupWithAI = async (beforeImagePath, afterImagePath) => {
  return new Promise((resolve, reject) => {
    const scriptPath = path.join(process.cwd(), "server", "utils", "cleanup_verify.py");

    execFile("python", [scriptPath, beforeImagePath, afterImagePath], (error, stdout, stderr) => {
      if (error) {
        console.error("AI verification error:", stderr || error);
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
      } catch (err) {
        console.error("Parse error:", err);
        reject(err);
      }
    });
  });
};
