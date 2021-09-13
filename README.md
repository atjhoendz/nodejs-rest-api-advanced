# NodeJS REST API Advanced

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
