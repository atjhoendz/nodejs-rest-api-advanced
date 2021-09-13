# NodeJS REST API Advanced

## Table Of Content
- [NodeJS REST API Advanced](#nodejs-rest-api-advanced)
  - [Table Of Content](#table-of-content)
  - [API SPECS](#api-specs)
    - [User Endpoint](#user-endpoint)
      - [Get All User Data](#get-all-user-data)
  - [TODO:](#todo)

## API SPECS

### User Endpoint
#### Get All User Data
* **URL** <br>
  `/user`
* **Method** <br>
  `GET`
* **URL Params** <br>
  None
* **Data Params** <br>
  None
* **Success Response** <br>
  * Code: 200 <br>
    Content:
    ```
    [{
      "id": number,
      "first_name": string,
      "last_name": string,
      "email": string,
      "createdAt": number,
    }]
    ```
* **Error Response** <br>
  None

## TODO:
- [x] Docker
- [x] Setup PostgreSQL
- [ ] CRUD
- [ ] Unit Test
- [ ] Redis
- [ ] Sync PostgreSQL with Elasticsearch
- [ ] Elasticsearch
