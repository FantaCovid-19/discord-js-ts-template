import fs from 'fs';
import path from 'path';

export default function getAllFiles(dirPath: string, arrayOfFiles?: any[]) {
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
