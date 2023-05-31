import { getCookie } from 'cookies-next';

export enum RequestUrl {
  BROADCASTS = '/broadcasts',
  USERS = '/users',
  USERS_VALID = '/users/validation',
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
  const auth: string = String(getCookie('auth'));
  try {
    const data = await fetch(`/api/broadcasts/${streamKey}/start`, {
      method: 'POST',
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

export async function broadcastFinishActions<T>(streamKey: string) {
  const auth: string = String(getCookie('auth'));
  try {
    const data = await fetch(`/api/broadcasts/${streamKey}/finish`, {
      method: 'POST',
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

export async function postImage(file) {
  const formData = new FormData();
  formData.append("file", file);
  formData.append("path", "LIVE_PULSE");
  try {
    const data = await fetch('https://cdn.hannah-log.site/v1/api/upload', {
      method: 'POST',
      body: formData,
    })
      .catch((e) => {
        console.error(e);
        throw new Error('이미지 업로드에 실패했습니다. 다시 시도해주세요.');
      });
    return await data.json();
  } catch (e: any) {
    alert(e.message);
  }
  return;
}
