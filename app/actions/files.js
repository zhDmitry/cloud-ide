export const SAVE_FILE = 'SAVE_FILE';
export const CREATE_FILE = 'CREATE_FILE';
export const DELETE_FILE = 'DELETE_FILE';
export const OPEN_FILE = 'OPEN_FILE';
export const RENAME_FILE = 'RENAME_FILE';

export function saveFile(path, text) {
  return { type: SAVE_FILE, path, text };
}

export function createFile(path, text = '') {
  return { type: CREATE_FILE, path, text };
}

export function deleteFile(path) {
  return { type: DELETE_FILE, path };
}

export function renameFile(path, newPath) {
  return { type: RENAME_FILE, path, newPath };
}

export function openFile(path, text) {
  return { type: OPEN_FILE, path };
}
