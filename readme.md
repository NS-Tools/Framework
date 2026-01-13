# NS Tools/Framework

Framework is a unopinionated, batteries-included framework for writing
Netsuite SuiteScripts 2.x code. Framework is a fork of
`exploreconsulting/netsuite-fasttrack-toolkit-ss2` which has now been
made private due to independence considerations at [RSM][rsm].

[rsm]: https://www.rsm.global/

Framework includes the following features:

- nsdal: A lite ActiveRecord Data Access Layer (DAL) for working with
  `N/record`. Say goodbye to record.getValue/Text, and say hello to
  salesOrder.entity and salesOrder.entityText! If you haven't been using
  it, you owe it to yourself to learn how it works.
- Logger: A helpful addition to the `N/log` module that allows you to
  log the entry/exit functions of a namespace automatically.
- Search/Query: A collection of helpful functions for working with
  `N/search` and `N/query`.
- Governance management: Helps you easily reschedule tasks, and check
  the remaining usage with some shortcut tools built on top of
  `N/runtime`.
- Hand selected libraries that are bundled and ready to use in NetSuite!

## Basic Overview

The framework offers a TypeScript supercharged Netsuite SuiteScript 2.x
experience. The core of the framework enhances working with `N/record`,
`N/search`, and `N/query`.

### Data Access Layer

The data access layer makes working with SuiteScript 2.x `N/record` a
breeze by allowing a record to be represented by a standard TypeScript
class.

```typescript
class SalesOrder extends SalesOrderBase {
  // Custom field not part of the standard Netsuite record
  @FieldType.freeformtext
  custbody_notes: string;
}

const order = new SalesOrder(1234);
log.debug("Notes", order.custbody_notes);

for (const line of order.item) {
  log.debug("Line:", `${line.item} ${line.rate} ${line.quantity}`);
}
```

## Breaking changes (users coming from NFT)

- The distribution method has changed from a zip file installed in your
  project to a git submodule approach. If/when Netsuite supports
  `node_modules` we will revisit this approach. You will need to update
  your build command to copy `framework/thirdparty` to your dist folder.
- All base records have been moved under `DataAccess/BaseRecords`
- All record/sublist field decorators have been moved under
  `DataAccess/FieldDescriptors`. For now we export this from
  `Record.ts`/`Sublist.ts`. We may mark these as deprecated in the
  future.
- ThirdParty libraries are now moved under `thirdparty`.
  `thirdparty/core` has libraries required for Framework functionality.
  All other tools have been moved to `thirdparty/optional`.

## Installation

NS-Tools/Framework plans to offer two ways to use this project. The
first method is cloning it as a submodule into your current project.
This method is currently available to use.

The second way is using the starter template to quickly get your project
off the ground! This is a work in progress, and is not quite ready for
prime time, but watch this space for details.

### Existing Projects

#### Install the Submodule

To install, navigate to your source directory, and run the command `git 
submodule add -b production --depth 1 
git@github.com:ns-tools/framework.git` from the directory you want
framework to clone the subfolder into. You'll need to update your build
process to copy `framework/thirdparty` to your dist folder since tsc
does not copy js files.

For example, if you project lives under src you would run `cd src` and
then the git submodule command.

To update, run the command `git submodule update --remote --merge` to
pull in the latest changes to Framework.

#### Build

1. Build the project by running `npm build` (or `yarn build` or `bun 
build`... etc.).
2. Upload the `dist/js` folder to your file cabinet.
3. Copy the `dist/declarations` files to your project mirroring the same
   access path in your file cabinet.

### New Projects (using NS-Tools/Framework-Integration base)

1. Fork the NS-Tools/Framework-Integration repository.
2. Clone the project.
3. Follow the instructions on the readme for the account setup, and building the environment.

#### Pinning Framework version

You can pin a specific version of Framework by using commands similar to these. Note replace {version} with the version number. You can find a list of releases by running `git tag --list`.

1. cd src/Framework
2. git checkout v{version}
3. cd ..
4. git add Framework
5. cd ..
6. git submodule update --remote --merge
7. git commit -m "Updated Framework version to v{version}"
8. git push

## ThirdParty Libraries

### Core Libraries

NS Tools Framework includes the following third party frameworks for core functionality.

- Node-SQL-Parser: We only package the transactsql part of the package.
- Aurelia-Logging: We include this package for `Logger` functionality.
- Aurelia-Logging-Console: We include this package for `Logger` functionality.

### Optional Libraries

We offer the following optional packages.

- Immutable
- Lodash
- BigNumber
- Moment
- PapaParse

## License

Framework is licensed under [the MIT license][mit]. You are free to use
it in your projects free of charge, but without any warranties, express
or implied. If you have questions, read the license. If you have more
questions, talk to your attorney.

The original project license is/was MIT based on the project.json
license grant, speaking with [Shawn Talbert][shawn], and [issue #4 under the
original repository][issue4]. There are several forks of the original
repository available on GitHub that also show that the project was
released under the MIT License.

<!-- prettier-ignore -->
[mit]: https://opensource.org/license/mit

<!-- prettier-ignore -->
[shawn]: https://www.linkedin.com/in/shawntalbert/

<!-- prettier-ignore -->
[issue4]: https://web.archive.org/web/20201019155508/https://github.com/ExploreConsulting/netsuite-fasttrack-toolkit-ss2/issues/4
