"use server";

import fs from "fs";

const fetchFile = async (filePath: string) => {
  if (!fs.existsSync(filePath)) {
    console.error("Not Found: File does not exist");
    return null;
  }

  return await fs.promises.readFile(filePath, "utf-8");
};

export default fetchFile;
