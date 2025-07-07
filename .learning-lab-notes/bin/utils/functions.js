export const capitalize = (text) => {
  return text.charAt(0).toUpperCase() + text.slice(1);
}

export const getCurrentDateString = () => {
  const year = new Date().getFullYear();
  const date = new Date().getDate().toString().padStart(2, '0');
  const month = (new Date().getMonth() + 1).toString().padStart(2, '0');

  return `${year}-${month}-${date}`
}
