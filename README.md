
# tcc-test

Examples to test out author features of CMC Tai Chi Chuan Website

### 1 Check react works inside iframe

The react app has to have it's own server, and the author is a separate server that has to get the contents of the iframe from the react app server. This would be fine if the app had already been deployed, but if the app is being tested, need to start a separate server

The authorindex.html then needs to set the appropriate src for the iframe. This would be a little weird to automate.

One solution is to create the iframe using javascript and bring the src destination in as an env variable

This was tricky to debug, but embarrassingly simple when I realized that there were two servers ....

### 2 Check github can be accessed by server running on heroku

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

