## API Documentation

## PRODUCTS

### Get all Products

Returns all the products.

* Require Authentication: false
* Request
  * Method: GET
  * URL: /api/products
  * Body: none

* Successful Response
  * Status Code: 200
  * Headers:
    * Content-Type: application/json
  * Body:

    ```json
    {
      "Products": [
        {
          "id": 1,
          "name":"Made by Nacho Minced Wet Cat Food",
          "price":65,
          "description":"Good cat food",
          "img":"img.png",
          "seller_id":1,
          "shop_id":1
        }
      ]
    }
    ```

### Get all products owned by the Current User

Returns all the spots owned (created) by the current user.

* Require Authentication: true
* Request
  * Method: GET
  * URL: /api/products/current
  * Body: none

* Successful Response
  * Status Code: 200
  * Headers:
    * Content-Type: application/json
  * Body:

    ```json
    {
      "Products": [
        {
          "id": 1,
          "name":"Made by Nacho Minced Wet Cat Food",
          "price":65,
          "description":"Good cat food",
          "img":"img.png",
          "seller_id":1,
          "shop_id":1
        }
      ]
    }
    ```

### Get details of a product from an id

Returns the details of a spot specified by its id.

* Require Authentication: false
* Request
  * Method: GET
  * URL: /api/products/:productId
  * Body: none

* Successful Response
  * Status Code: 200
  * Headers:
    * Content-Type: application/json
  * Body:

    ```json
    {
       "id": 1,
          "name":"Made by Nacho Minced Wet Cat Food",
          "price":65,
          "description":"Good cat food",
          "img":"img.png",
          "seller_id":1,
          "shop_id":1,
      "Owner": {
        "id": 1,
        "firstName": "John",
        "lastName": "Smith"
      }
    }
    ```

* Error response: Couldn't find a product with the specified id
  * Status Code: 404
  * Headers:
    * Content-Type: application/json
  * Body:

    ```json
    {
      "message": "product couldn't be found",
      "statusCode": 404
    }
    ```

### Create a product

Creates and returns a new product.

* Require Authentication: true
* Request
  * Method: POST
  * URL: /api/products
  * Headers:
    * Content-Type: application/json
  * Body:

    ```json
    {
      {
          "name":"Made by Nacho Minced Wet Cat Food",
          "price":65,
          "description":"Good cat food",
          "img":"img.png",
          "seller_id":1,
          "shop_id":1
        }
    }
    ```

* Successful Response
  * Status Code: 201
  * Headers:
    * Content-Type: application/json
  * Body:

    ```json
    {
      "id": 1,
      "name":"Made by Nacho Minced Wet Cat Food",
      "price":65,
      "description":"Good cat food",
      "img":"img.png",
      "seller_id":1,
      "shop_id":1

    }
    ```

* Error Response: Body validation error
  * Status Code: 400
  * Headers:
    * Content-Type: application/json
  * Body:

    ```json
    {
      "message": "Validation Error",
      "statusCode": 400,
      "errors": {
        "name":"name is required",
        "price":"price is required",
        "description":"description is required",
        "img":"img is required",
      }
    }
    ```


### Edit a Product

Updates and returns an existing product.

* Require Authentication: true
* Require proper authorization: product must belong to the current user
* Request
  * Method: PUT
  * URL: /api/products/:productId
  * Headers:
    * Content-Type: application/json
  * Body:

    ```json
    {
      "name":"Made by Nacho Minced Wet Cat Food",
      "price":65,
      "description":"Good cat food",
      "img":"img.png",
    }
    ```

* Successful Response
  * Status Code: 200
  * Headers:
    * Content-Type: application/json
  * Body:

    ```json
    {
      "id": 1,
      "name":"Made by Nacho Minced Wet Cat Food",
      "price":65,
      "description":"Good cat food",
      "img":"img.png",
      "seller_id":1,
      "shop_id":1
    }
    ```

* Error Response: Body validation error
  * Status Code: 400
  * Headers:
    * Content-Type: application/json
  * Body:

    ```json
    {
      "message": "Validation Error",
      "statusCode": 400,
      "errors": {
        "name":"name is required",
        "price":"price is required",
        "description":"description is required",
        "img":"img is required",
      }
    }
    ```

* Error response: Couldn't find a product with the specified id
  * Status Code: 404
  * Headers:
    * Content-Type: application/json
  * Body:

    ```json
    {
      "message": "Product couldn't be found",
      "statusCode": 404
    }
    ```

### Delete a Product

Deletes an existing product.

* Require Authentication: true
* Require proper authorization: product must belong to the current user
* Request
  * Method: DELETE
  * URL: /api/products/:productId
  * Body: none

* Successful Response
  * Status Code: 200
  * Headers:
    * Content-Type: application/json
  * Body:

    ```json
    {
      "message": "Successfully deleted",
      "statusCode": 200
    }
    ```

* Error response: Couldn't find a product with the specified id
  * Status Code: 404
  * Headers:
    * Content-Type: application/json
  * Body:

    ```json
    {
      "message": "Product couldn't be found",
      "statusCode": 404
    }
    ```
