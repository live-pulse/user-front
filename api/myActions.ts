
export enum RequestUrl {
  BROADCASTS = '/broadcasts',
  USERS = '/users',
  LOGIN = '/users/sign-in',
}

export async function postAction<T>(prefixUrl: RequestUrl, request: any) {
  try {
    const data = await fetch(`/api${prefixUrl}`, {
      method: 'POST',
      body: JSON.stringify(request),
      headers: {
        'Content-Type': 'application/json',
        'auth': 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MywiaWF0IjoxNjgzMTU3MTM1LCJleHAiOjE2ODMxNjA3MzV9.7G4uLK-1UP4ftFSAKBiRBtsQTkKXaQPoMGr2gu3EamY',
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

export async function getRestActions<T>(prefixUrl: RequestUrl, request: any) {
  try {
    const data = await fetch(`/api${prefixUrl}/${request}`);
    const result = await data.json();
    if (result.message !== 'success') throw new Error(result.message);
    return result;
  } catch (e: any) {
    console.error(e);
    alert(e.message);
  }
  return;
}
