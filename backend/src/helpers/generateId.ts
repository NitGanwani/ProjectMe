export const generateId = () => {
  const randomId = Math.random().toString(36).substring(2);
  const date = Date.now().toString(36);
  return `${randomId}${date}`;
};
