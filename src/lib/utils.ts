export { cn } from 'cnfast';

export function capitalizeFirstLetter(value: string) {
  return `${value.charAt(0).toLocaleUpperCase()}${value.slice(1)}`;
}

export function getCookie(name: string) {
  const cookies = document.cookie.split(';');

  for (let cookie of cookies) {
    cookie = cookie.trim();

    if (cookie.startsWith(name + '=')) {
      return cookie.substring(name.length + 1);
    }
  }

  return null;
}

export async function wait(ms = 0) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}
