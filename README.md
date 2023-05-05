token refresh mechanism

Set up a middleware function that checks if the token is about to expire.

If the token is about to expire (for example, within the next 5 minutes), use the refresh token to obtain a new access token.

Update the maxAge of the new token to ensure it doesn't expire too soon.

Update the session data with the new token, either by saving it to the database or by storing it in the session object.



const refreshTokenMiddleware = (req, res, next) => {
  const { token, refreshToken } = req.session;

  // Check if token is about to expire (for example, within the next 5 minutes)
  const now = Date.now();
  const expiresIn = token.expiresIn - now;
  if (expiresIn < 5 * 60 * 1000) { // less than 5 minutes left
    // Use refresh token to obtain new access token
    const newToken = getNewAccessToken(refreshToken);

    // Update maxAge of new token
    const maxAge = newToken.expiresIn - now;

    // Update session data with new token
    req.session.token = newToken;
    req.session.cookie.maxAge = maxAge;
    // Save session data to the database if using a database store

    console.log('Token refreshed!');
  }

  next();
};



resturant owner                 1.3 goreky
audoka        yamamoto      2.5 white dog      killer

                                                 4.6 audoka
yamamotot                           5.6 audoka
fan                                           6.7 
bad officer                            7.8
                                                 8.8

dog                                         10.10
                                                11.10
giraffe                                    12.11
killer                                      13.13

