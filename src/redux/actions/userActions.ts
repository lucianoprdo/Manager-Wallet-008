export const SAVE_USER_EMAIL = 'SAVE_USER_EMAIL';

export const userActions = (userEmail: string) => ({
  type: SAVE_USER_EMAIL,
  payload: { email: userEmail },
});
