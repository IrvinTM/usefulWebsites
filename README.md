
## API Reference

#### Get all items

```http
  GET /websites

```

#### Get a websites by category using query params, ex:

```http
  GET /websites?category=images

```

#### Get a website by id:

```http
  GET /websites/id
```

#### Add/Edit a website:

```http
  POST /websites
```
```http
  name: string
  category: string
  url: string
  description: string
  registration_required: boolean
```
#### Delete a website:

```http
  DELETE /websites/id
```


  



