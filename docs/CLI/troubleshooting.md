## Troubleshooting

### Login
```
Authentication error (auth/custom-token-mismatch):  The custom token corresponds to a different audience.
Error initializing Firebase:  undefined
```
Known issue on token expiration. Reset the environment.
```
matrix set env rc
```
