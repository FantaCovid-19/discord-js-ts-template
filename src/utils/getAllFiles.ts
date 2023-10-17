import fs from 'fs';
import path from 'path';

/**
 * Get all files in a directory
 * @example
 * getAllFiles('./src/utils')
 * // => ['./src/utils/getAllFiles.ts', './src/utils/otherFile.ts']
 * @example
 * getAllFiles('./src/utils', [])
 * // => ['./src/utils/getAllFiles.ts', './src/utils/otherFile.ts']
 * @example
 * getAllFiles('./src/utils', ['otherFile.ts'])
 * // => ['./src/utils/getAllFiles.ts', './src/utils/otherFile.ts']
 *
 * @param dirPath - The directory path
 * @param arrayOfFiles - The array of files
 * @returns - The array of files
 */
export default function getAllFiles(
  dirPath: string,
  arrayOfFiles?: string[]
): string[] {
  const files = fs.readdirSync(dirPath);

  if (!arrayOfFiles) arrayOfFiles = [];

  files.forEach((file) => {
    if (fs.statSync(path.join(dirPath, file)).isDirectory()) {
      arrayOfFiles = getAllFiles(path.join(dirPath, file), arrayOfFiles);
    } else if (arrayOfFiles) {
      arrayOfFiles.push(path.join(dirPath, file));
    }
  });

  return arrayOfFiles.filter(
    (file) => file.endsWith('.ts') || file.endsWith('.js')
  );
}
