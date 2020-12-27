### :heavy_check_mark: Installation 
1- Just you need to clone the repository
```
git clone https://github.com/nimahkh/getir
```

2- Rename .env.example to .env and fill the variables

3- Then install dependencies and run the project

```
npm i && npm run start:dev
```

or if you need a production mode:

```
npm run build && npm run start
```

### :heavy_check_mark: BUILD

Creating a production mode 

```
npm run build
```

### :heavy_check_mark: Test

you can run both injection test and Unit test with the command in below. 

```
npm run test
```

### :heavy_check_mark: Run on Heroku

after pushing the code on heroku master, you have to set envs on it as below

```
 heroku config:set DATABASE_URL="MongoDB URI or SRV URI" 
 heroku config:set DATABASE="DATABASE NAME" 
 heroku config:set PORT=3000 
```

after that you can open your heroku environment like my demo:
`https://hidden-coast-51109.herokuapp.com/`

### :heavy_check_mark: Sending Parameters

-`/filter` router  - POST 

| name      | value      | description                               |
|-----------|------------|-------------------------------------------|
| endDate   | 2016-02-02 | endDate can not be bigger than start Date |
| startDate | 2016-01-29 | -                                         |
| minCount  | 2000       | minCount can not be bigger than maxCount  |
| maxCount  | 4000       | -                                         |

### :heavy_check_mark: POSTMAN

You can download Environments and collection in `collections_document` folder.
