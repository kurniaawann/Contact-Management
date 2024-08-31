# User API Spec

## Register User API

Endpoint : POST /api/users

Request Body:

```Json
{
"UserName" : "awan",
"password" : "Test",
"name" : "awankurni"
}
```

Response Body Success:

```Json
{
    "data": {
        "username" : "awan",
        "name" : "awankurni"
    }
}
```

Response Error :

```Json
{
    }
```

    "error" : "UserName alredy registered"

## Login User API

End Point : POST /api/users/login

Request Body :

```Json
{
    "username" : "awan",
    "password"  : "test"

}
```

Response Body Success

```Json
{
    "data": {
        "token" : "unique-token"
    }
}
```

Response Body Error

```Json
{
    "error" : "Username Or Password wrong"
}
```

## Update User Api

EndPoint : PATCH /api/users/current

Headers :

- Authorization : token

```Json
Headers :

- Authorization : token
{
    "Name" : "awankurni", //optional
    "Password" : "new password", //optional
}
```

Response Body Success :

```Json
{
    "data":{
    "username" : "awan",
    "name" : "awankurni"
    }
}
```

Response Body Error :

```Json
{
    "error":"name lenght max 100"
}
```

## Get User API

End Point : GET /api/users/current

Headers :

- Authorization : token

Response Body Success:

```Json
{
    "data":{
        "username" : "awan",
        "name" : "awankurni"
    }
}
```

Response Body Error:

```Json
{
    "error" : "unauthorized"
}
```

## Logout User API

EndPoint : DELETE /api/users/logout


Headers :

- Authorization : token

Response Body Success:

```Json
{
    "data" : "OK"
}
```

Response Body Error:

```Json
{
    "error" : "Unauthorized"
}
```
