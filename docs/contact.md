# Contact API Spec

## Create Contact API

EndPoint : POST /api/contacts

Headers :

- Authorization : token

Request Body:

```Json
{
    "fristname" : "kurni",
    "lastname" : "bakur",
    "Email" : "kurni@gmail.com",
    "phone" : "07245221132",
}
```

Response Body Sucess:

```Json
{
    "data" : {
    "id" : 1,
    "fristname" : "kurni",
    "lastname" : "bakur",
    "Email" : "kurni@gmail.com",
    "phone" : "07245221132",
    }
}
```

Response Body Error

```Json
{
    "error" : "Email is not valid format"
}
```

## Update Contact API

EndPoint : PUT /api/contact/:id
Headers :

- Authorization : token

Request Body:

```Json
{
    "fristname" : "kurni",
    "lastname" : "bakur",
    "Email" : "kurni@gmail.com",
    "phone" : "07245221132",
}
```

Response Body Sucess:

```Json
{
    "data" : {
    "id" : 1,
    "fristname" : "kurni",
    "lastname" : "bakur",
    "Email" : "kurni@gmail.com",
    "phone" : "07245221132",
    }
}
```

Response Body Error

```Json
{
    "error" : "Email is not valid foramt"
}
```

## Get Contact API

EndPoint : GET /api/contacts

Headers :

- Authorization : token

Response Body Sucess:

```Json
{
    "data" : {
    "id" : 1,
    "fristname" : "kurni",
    "lastname" : "bakur",
    "Email" : "kurni@gmail.com",
    "phone" : "07245221132",
    }
}
```

Response Body Error

```Json
{
    "error" : "Contact is not font"
}
```

## Search Contact API

EndPoint GET /api/contacts

Headers :

- Authorization : token

Query params :

- name : Search by frist_name or last_name using like, optional
- email : Search by email using like, optional
- phone : Search by Phone using like, optional
- page : number of page, default 1
- size : number of size, default 10

Response Body Sucess:

```Json
{
    "data" : [
        {
        "id" : 1,
        "fristname" : "kurni",
        "lastname" : "bakur",
        "Email" : "kurni@gmail.com",
        "phone" : "07245221132",
        }
        {
        "id" : 2,
        "fristname" : "arip",
        "lastname" : "ipin",
        "Email" : "arip@gmail.com",
        "phone" : "03230320432",
        }
        {
        "id" : 3,
        "fristname" : "test 1",
        "lastname" : "test",
        "Email" : "test1@gmail.com",
        "phone" : "03120938120",
        }
        {
        "id" : 1,
        "fristname" : "test 2",
        "lastname" : "test",
        "Email" : "kurni@gmail.com",
        "phone" : "31232912",
        }

    ],
    "paging" : {
        "page" : 1,
        "total_page" : 3,
        "total_item" : 30
    }


}
```

Response Body Error:

```Json
{
    "error" : "Contact is not font"
}
```

## Remove Contact API

End Point: DELETE /api/contacts/:id

Headers :

- Authorization : token

Response Body Sucess:

```Json
{
    "data" : "ok"
}
```

Response Body Error

```Json
{
    "error" : "Contact is Not found"
}
```
