
# tcc-test

Examples to test out author features of CMC Tai Chi Chuan Website

### 1 Check react works inside iframe

The react app has to have it's own server, and the author is a separate server that has to get the contents of the iframe from the react app server. This would be fine if the app had already been deployed, but if the app is being tested, need to start a separate server

The authorindex.html then needs to set the appropriate src for the iframe. This would be a little weird to automate.

One solution is to create the iframe using javascript and bring the src destination in as an env variable

This was tricky to debug, but embarrassingly simple when I realized that there were two servers ....

### 2 Check github can be accessed by server running on heroku

### Using REACT_APP_VAR

`REACT_APP_MY_VARIABLE_NAME`

For `create-react-app build` the environment variable must be set to something in every build, otherwise the code gets passed into the client js where there is a type 
violation because `process.env.REACT_APP_VAR` doesn't exist. 

Also, create-react-app doesn't optimize inside JSX, so can't use
``` jsx
{
  (window.process.env.REACT_APP_BUILD === "author") ? 
    (<h2>Author build</h2>) : (<h2>Client build</h2>)
}
```
in the jsx part of a component definition, has to be done as a function

My motivation was to supply two different builds, with more code in the "author" mode

If you don't know this, it's hard to debug what's happening. This is not an issue
if set in `.env` file for every build version, but if you forget the `.env` for some
reason, then you will have issues

### Testing
It was hard to migrate from built in Jest to mocha/chai

The problem was module creation and use. Had to go to commonJS output with custom tsconfig file.
Main setup compiles to es5 for better browser compatibility.
Next time use Jest

Run
```
mocha  --require ts-node/register database.test.ts
```
The `--require` runs ts-node/register script so that mocha and everything else will run with node using typescript compiler

tsconfig.json

```json
{                                                                                                                         "compilerOptions": {
  "compilerOptions": {
    "target": "ES2015",
    "allowJs": true,
    "skipLibCheck": true,
    "esModuleInterop": true,
    "allowSyntheticDefaultImports": true,
    "strict": true,
    "forceConsistentCasingInFileNames": true,
    "module": "CommonJS",
    "moduleResolution": "node",
    "resolveJsonModule": true,
    "isolatedModules": true,
    "noEmit": true,
    "jsx": "react"
  },
  "include": [
    "src"
  ]
}  
```

### Notes

initialize cra
```
npx create-react-app my-app --template typescript
```

