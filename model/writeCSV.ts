import { dbPath } from './interfaceData';

import * as fs from 'fs/promises';
import * as path from 'path';


export async function ensureFileExists(filePath: string): Promise<void> {
  const absolutePath = path.resolve(filePath);
  try {
    await fs.access(absolutePath);
    return;
  } catch {
    throw new Error(`Arquivo não existe: ${absolutePath}`);
  }
}

export async function writeCSV(userRow: string[]): Promise<void> {
  ensureFileExists(dbPath)
  const formattedRow = userRow.join(',') + '\n'

  try {
    await fs.appendFile(dbPath, formattedRow, 'utf-8');
    console.log('Linha adicionada ao CSV');
  } catch (err) {
    console.error('Erro ao adicionar a linha:', err);
  }
}

export async function removeRow(lineIndex: number): Promise<void> {
  try {
    ensureFileExists(dbPath)

    const content = await fs.readFile(dbPath, 'utf-8');
    const lines = content.split('\n');
    
    const header = lines[0];
    const dataLines = lines.slice(1);

    if (lineIndex < 0 || lineIndex >= dataLines.length) {
      throw new Error(`Linha inválida: ${lineIndex}`);
    }

    dataLines.splice(lineIndex, 1);

    const updatedContent = [header, ...dataLines].join('\n');
    await fs.writeFile(dbPath, updatedContent, 'utf-8');
    console.log('Produto excluído')
  } catch (err) {
    console.error('Erro ao remover a linha:', err);
  }
}
