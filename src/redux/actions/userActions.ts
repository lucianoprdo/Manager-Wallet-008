export const SAVE_USER_EMAIL = 'SAVE_EMAIL';

export const saveUserEmail = (userEmail: string) => ({
  type: SAVE_USER_EMAIL,
  payload: userEmail,
});
