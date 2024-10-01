import fs from 'fs/promises';
import path from 'path';
import { fileURLToPath } from 'url';

const __filePath = fileURLToPath(import.meta.url);
const __userPath = path.join(__filePath, '../../db/userData.json');

export async function readData() {
  const data = await fs.readFile(__userPath, 'utf-8');
  return JSON.parse(data);
}

export async function writeData(data) {
  await fs.writeFile(__userPath, JSON.stringify(data), 'utf-8');
}
