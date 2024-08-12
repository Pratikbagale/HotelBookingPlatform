
## Register
```
POST/register
```
## Request Headers
```
Content-Type : application/json
```
## Request Body
``` json
{
    "firstname": "John",
    "lastname": "Doe",
    "emailid": "johndoe@example.com",
    "phoneno": "1234567890",
    "password": "password123"
}
```
## Response

200 - Success
400 - Bad Request
500 - Internal Server Error