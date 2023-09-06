const getData = (curr, callback) => {
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

  fetchGraphQL(apiUrl, graphqlQuery, {}, headers)
    .then((data) => {
      console.log('Data received:', data);
      callback(data);
      // localStorage.setItem('access_token', data.login.accessToken);
      // window.location.href = '/stats.html';
    })
    .catch((error) => {
      console.error('Error:', error);
    });
};
