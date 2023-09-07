async function fetchGraphQL(url, query, variables = {}, headers = {}) {
  const response = await fetch(url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      ...headers,
    },
    body: JSON.stringify({query, variables}),
  });

  const data = await response.json();

  if (data.errors) {
    if (data.errors[0]?.extensions?.originalError?.statusCode === 401) {
      localStorage.removeItem('access_token');
      window.location.href = '/'
    }
    throw new Error(JSON.stringify(data.errors));
  }

  return data.data;
}