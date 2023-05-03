token refresh mechanism

1- When the access token is about to expire, the client can send a request to the server to refresh the token.

2- The server can verify the refresh token and issue a new access token with a new expiry time.

3- The new access token can be sent back to the client, which can be used to authenticate the user for the next session.
