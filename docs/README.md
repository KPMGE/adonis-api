### How to generate api route docs.
You can easily generate your api route docs. First of all, inside this folder, run the command below, make sure you've got
npx installed on your machine.

```bash
npx insomnia-documenter --config ./api-doc.json
```

Then, you can run a server with your brand new doc by using:
```bash
npx serve
```

Now it's as simple as opening a new tab on your favourite browser and access the link:
> http://localhost:3000