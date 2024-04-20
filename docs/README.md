# Route docs

**NOTE:** This api uses [jwt](https://jwt.io/) to implement authentication, when
calling the routes, make sure to provide a valid jwt token

### How to generate api route docs.
You can easily generate your api route docs. First of all, inside this folder, run the command below, make sure you've got
node installed on your machine.

```bash
npx insomnia-documenter --config ./api-doc.json
```

Then, you can run a server with your brand new doc by using:
```bash
npx serve
```

Now it's as simple as opening a new tab on your favourite browser and access the link:
> http://localhost:3000

### Database
This api database is design like so:

![Database model](https://github.com/KPMGE/adonis-api/blob/main/docs/db-model.png)

So basically, the **user** table is used for implementing authentication through
jwt, the **client** table represents a **client**. The **client** may have several
**phones**, but those **phones** must be diffent and no 2 users may have same **phone**
numbers!
Furthermore, the client must have an **address**

The **product** table is quite self-explanatory. But it has a special **active**
field, this field is used to implement a _soft delete_ on this table.

Finally, we got a **sale** table, this table represents a sale of n **products** to
a given **client**. The client may have several sales.

