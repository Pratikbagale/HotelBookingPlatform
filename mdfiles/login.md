
## Login
'''
POST /login
'''
## Request Headers
'''
Content-Type : application/json
'''
## Request Body
''' json 
{
    "Email": "user@example.com",
    "Password": "user_password"
}
'''
## Response

200 - Success
400 - Bad Request - Incorrect Email/Password
500 - Internal Server Error
