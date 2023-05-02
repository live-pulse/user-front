interface CreateBroadcastRequest {
  title: string;
  description: string;
  thumbnailImageUrl: string;
  startDate: Date;
  tags: string[];
}

export async function createBroadcast(request) {
  const data = await fetch('/api/broadcasts', {
    method: 'POST',
    body: JSON.stringify(request),
    headers: {
      'Content-Type': 'application/json',
      'auth': 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MywiaWF0IjoxNjgzMDE0OTM0LCJleHAiOjE2ODMwMTg1MzR9.bmUOtYXu4PEe3sU3QaZAlt9sJDqYvTsJt1aPWjWR8kc',
    }
  });
  return data.json();
}

export async function getOneBroadcast(id: number) {
  const data = await fetch(`/api/broadcasts/${id}`);
  return data.json();
}
