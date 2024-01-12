
// function submitBoard(myShips) {
//     let URL = "http://127.0.0.1:5000/auth/signup";
//     const payload = { username: username, password: password };
//     // A promise. Perform a POST request to the login endpoint using the Fetch API, access token will be returned later
//     const message = fetch(URL, {
//       method: "Post",
//       headers: {
//         "Content-Type": "application/json",
//       },
//       body: JSON.stringify(payload),
//     })
//       // Handle the response from the server
//       .then((apiRes) => apiRes.json())
//       // Process the JSON response
//       .then((resJson) => resJson.message)
//       .catch((err) => console.log(err));
//     // Return Promise which will result in an access token
//     return message;
//   }
  
//   export default submitBoard;
  