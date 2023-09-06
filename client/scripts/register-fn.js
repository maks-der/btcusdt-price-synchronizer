const register = (name, email, pass) => {
  const apiUrl = '/graphql';
  const graphqlQuery = `
        mutation {
          register(fullName: "${name}", email: "${email}", password: "${pass}"){
            accessToken
          }
        }
      `;

  fetchGraphQL(apiUrl, graphqlQuery)
    .then((data) => {
      console.log('Data received:', data);
      localStorage.setItem('access_token', data.register.accessToken);
      window.location.href = '/stats.html';
    })
    .catch((error) => {
      console.error('Error:', error);
    });
};
