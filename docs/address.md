# Adress API spec

## Create Address API

End Point : POST /api/contacts/:contactId/adress

Headers:

- Authorizaton : token

Request Body:

```json
{
  "street": "jalan",
  "city": "kota",
  "province": "Provinsi",
  "country": "negara",
  "postal_code": "kode Pos"
}
```

Response Body Success:

```json
{
  "data": {
    "id": 1,
    "street": "jalan",
    "city": "kota",
    "province": "Provinsi",
    "country": "negara",
    "postal_code": "kode Pos"
  }
}
```

Response Body Error:

```json
{
  "error": "country is required"
}
```

## Update Address API

End Point : PUT /api/contacts/:contactId/adressses/:addressId

Headers:

- Authorizaton : token

Request Body:

```json
{
  "street": "jalan",
  "city": "kota",
  "province": "Provinsi",
  "country": "negara",
  "postal_code": "kode Pos"
}
```

Response Body Success:

```json
{
  "data": {
    "id": 1,
    "street": "jalan",
    "city": "kota",
    "province": "Provinsi",
    "country": "negara",
    "postal_code": "kode Pos"
  }
}
```

Response Body Error:

```json
{
  "error": "country is required"
}
```

## Get Address API

End Point : GET /api/contacts/:contactId/addresses/:adressId

Headers:

- Authorizaton : token

Response Body Success:

```json
{
  "data": {
    "id": 1,
    "street": "jalan",
    "city": "kota",
    "province": "Provinsi",
    "country": "negara",
    "postal_code": "kode Pos"
  }
}
```

Response Body Error:

```json
{
  "error": "Contact Not Found"
}
```

## List Address API

End Point : GET /api/contact/:cotactId/adressess

Headers:

- Authorizaton : token

Response Body Success:

```json
{
  "data": [
    {
      "id": 1,
      "street": "jalan",
      "city": "kota",
      "province": "Provinsi",
      "country": "negara",
      "postal_code": "kode Pos"
    }
    {
      "id": 2,
      "street": "jalan",
      "city": "kota",
      "province": "Provinsi",
      "country": "negara",
      "postal_code": "kode Pos"
    }
  ]
}
```

Response Body Error:

```json
{
  "error": "Contact Not Found"
}
```

## Remove Address API

End Point : POST /api/contact/:id/adress

Headers:

- Authorizaton : token

Response Body Success:

```json
{
  "data": "Ok"
}
```

Response Body Error:

```json
{
  "error": "Address Not Found"
}
```
