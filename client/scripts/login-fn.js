const login = (email, pass) => {
  const apiUrl = '/graphql';
  const graphqlQuery = `
        query {
          login(email: "${email}", password: "${pass}") {
             accessToken
          }
        }
      `;

  fetchGraphQL(apiUrl, graphqlQuery)
    .then((data) => {
      console.log('Data received:', data);
      localStorage.setItem('access_token', data.login.accessToken);
      window.location.href = '/stats.html';
    })
    .catch((error) => {
      console.error('Error:', error);
    });
};
