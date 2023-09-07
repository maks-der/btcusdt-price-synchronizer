async function getData (curr) {
  const apiUrl = '/graphql';
  const graphqlQuery = `query {
	  current(currency: "${curr}"){
      price
      currency
      createdAt
    }
  
    history(currency: "${curr}"){
      price
      currency
      createdAt
    }
  }`;

  const headers = {
    Authorization: `Bearer ${localStorage.getItem('access_token')}`,
  };

  try {
    return await fetchGraphQL(apiUrl, graphqlQuery, {}, headers);
  } catch (err) {
    console.error('Error:', err);
    return null;
  }
}
