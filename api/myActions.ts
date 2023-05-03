
export enum RequestUrl {
  BROADCASTS = '/broadcasts',
  USERS = '/users',
  LOGIN = '/users/sign-in',
}

export async function postAction<T>(prefixUrl: RequestUrl, request: any): Promise<T> {
  try {
    const data = await fetch(`/api${prefixUrl}`, {
      method: 'POST',
      body: JSON.stringify(request),
      headers: {
        'Content-Type': 'application/json',
        'auth': 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MywiaWF0IjoxNjgzMDk2NTU3LCJleHAiOjE2ODMxMDAxNTd9.CKGXOh4wUt9qJQ9GtCbNrgDeV5dLuqVll4RBcKHSdCg',
      }
    });
    const result = await data.json();
    if (result.message !== 'success') throw new Error(result.message);
    return result;
  } catch (e) {
    console.error(e);
    alert(e.message);
  }
}

export async function getRestActions<T>(prefixUrl: RequestUrl, request: any): Promise<T> {
  try {
    const data = await fetch(`/api${prefixUrl}/${request}`);
    const result = await data.json();
    if (result.message !== 'success') throw new Error(result.message);
    return result;
  } catch (e) {
    console.error(e);
    alert(e.message);
  }
}
