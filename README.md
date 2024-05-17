


#### Get all items

```bash
  GET /websites
```

#### Get a websites by category using query params, ex:

```bash
  GET /websites?category=images
```

#### Get a website by id:

```bash
  GET /websites/id
```

#### Add/Edit a website:

```bash
  POST /websites
```
```bash
  name: string
  category: string
  url: string
  description: string
  registration_required: boolean
```
#### Delete a website:

```bash
  DELETE /websites/id
```