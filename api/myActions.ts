import { getCookie } from 'cookies-next';

export enum RequestUrl {
  BROADCASTS = '/broadcasts',
  USERS = '/users',
  LOGIN = '/users/sign-in',
}

export async function postAction<T>(prefixUrl: RequestUrl, request: any) {
  const auth: string = String(getCookie('auth'));
  try {
    const data = await fetch(`/api${prefixUrl}`, {
      method: 'POST',
      body: JSON.stringify(request),
      headers: {
        'Content-Type': 'application/json',
        'auth': auth,
      }
    });
    const result = await data.json();
    if (result.message !== 'success') throw new Error(result.message);
    return result;
  } catch (e: any) {
    console.error(e);
    alert(e.message);
  }
  return;
}

export async function getRestActions<T>(prefixUrl: RequestUrl, request: any | null) {
  const auth: string = String(getCookie('auth'));
  const requestUrl = request ? `/api${prefixUrl}/${request}` : `/api${prefixUrl}`;
  try {
    const data = await fetch(requestUrl, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'auth': auth,
      }
    });
    const result = await data.json();
    if (result.message !== 'success') throw new Error(result.message);
    return result;
  } catch (e: any) {
    console.error(e);
    alert(e.message);
  }
  return;
}

export async function broadcastStartActions<T>(streamKey: string) {
  try {
    const data = await fetch(`/broadcasts/${streamKey}/start`, {
      method: 'POST',
    });
    const result = await data.json();
    if (result.message !== 'success') throw new Error(result.message);
    return result;
  } catch (e: any) {
    console.error(e);
    alert(e.message);
  }
  return;
}

export async function broadcastFinishActions<T>(streamKey: string) {
  try {
    const data = await fetch(`/broadcasts/${streamKey}/finish`, {
      method: 'POST',
    });
    const result = await data.json();
    if (result.message !== 'success') throw new Error(result.message);
    return result;
  } catch (e: any) {
    console.error(e);
    alert(e.message);
  }
  return;
}
