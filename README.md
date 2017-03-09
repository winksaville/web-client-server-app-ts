# web-client-server-app-ts

## Description
A base line project for a web client/server application written in TypeScript.

In the root is a project wide default TypeScript config file, `tsconfig.base.json`,
which should be used to by local `tsconfig.json` files. See src/common/tsconfig.json
for an example. There is also a `tsconfig.spec.json` file that is used for
compiling tests.

The sources are in src/ with the directories under src/ representing different
functionally; src/common src/client src/server. Tests are `*.spec.ts` files and
located with their respective sources. For example `src/common/nop.ts` has a
test specification `src/common/nop.spec.ts`.

## Required preinstalled dependencies to build
- node
- yarn

## Node module dependencies
Install using `yarn install`

## Building and running tests
`yarn test`

## License
Apache 2.0.
