import superagent from 'superagent';

const apiUrl = 'https://api.example.com'; // Replace with your API base URL

const agent = superagent.agent(); // Create a Superagent agent

// Perform a GET request and store cookies, if any
agent
  .get(`${apiUrl}/login`) // Example login endpoint
  .end((err, res) => {
    if (err) {
      console.error('Login Error:', err);
    } else {
      console.log('Login Response:', res.body);

      // Now that you are logged in, you can make subsequent requests using the same agent.
      agent
        .get(`${apiUrl}/data`) // Replace with the endpoint you want to access after login
        .end((err, res) => {
          if (err) {
            console.error('API Error:', err);
          } else {
            console.log('API Response:', res.body);
          }
        });
    }
  });
