export const SET_PREFERENCE = 'SET_PREFRENCE';

export function setPreference(key, value) {
  return { type: SET_PREFERENCE, key, value };
}
