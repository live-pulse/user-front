
export async function postAction<T>(url: string, request: any): Promise<T> {
  try {
    const data = await fetch(`/api${url}`, {
      method: 'POST',
      body: JSON.stringify(request),
      headers: {
        'Content-Type': 'application/json',
        'auth': 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MywiaWF0IjoxNjgzMDk2NTU3LCJleHAiOjE2ODMxMDAxNTd9.CKGXOh4wUt9qJQ9GtCbNrgDeV5dLuqVll4RBcKHSdCg',
      }
    });
    checkData(data);
    return await data.json();
  } catch (e) {
    console.error(e);
    alert(e.message);
  }
}

export async function getRestActions<T>(url: string, request: any): Promise<T> {
  try {
    const data = await fetch(`/api${url}/${request}`);
    checkData(data);
    return await data.json();
  } catch (e) {
    console.error(e);
    alert(e.message);
  }
}

const checkData = (data: any) => {
  if (!data.ok) {
    if (data.status === 401) {
      throw new Error('권한 에러입니다. 로그인을 다시 해주세요.');
    } else if (data.status === 404) {
      throw new Error('Not found');
    } else if (data.status === 500) {
      throw new Error('서버에서 에러가 발생했습니다. 잠시후 다시 시도해주세요.');
    } else {
      throw new Error('Network response was not ok');
    }
  }
}
