# Sales Hero
[![FOSSA Status](https://app.fossa.io/api/projects/git%2Bgithub.com%2FDomoApps%2Fsales-hero.svg?type=shield)](https://app.fossa.io/projects/git%2Bgithub.com%2FDomoApps%2Fsales-hero?ref=badge_shield)


## Sample Dev Studio App

This is a simple Domo App built to be used in conjunction with the Domo U training module which can be found in the Domo Appstore. The objective of that course is to build a version of this app from scratch. This source code is provided as a reference to make sure you're staying on track.

### Requirements

* [Domo CLI](https://www.npmjs.com/package/ryuu)
* [Node](https://nodejs.org/en/download/)
* [npm](https://docs.npmjs.com/getting-started/installing-node)
* [Git](https://git-scm.com/downloads)
* [Domo Account](https://developer.domo.com/dev-sandbox-request)

### Technologies

This app has been kept very basic by design. We've included a few libraries for convenience but kept with the basics as much as possible.

* JS / HTML / CSS
* [Vega](https://vega.github.io/vega/)
* [Query](https://www.npmjs.com/package/@domoinc/query)
* [ryuu.js](https://www.npmjs.com/package/ryuu.js): npm equivalent of domo.js
* [numeral.js](http://numeraljs.com/)

#### npm scripts

This app comes with a `package.json` which includes a few npm scripts for convenience. They're mostly just wrappers for `domo` commands such as `domo publish` and `domo dev`, with an added utility to copy node modules into your app.

### Getting Started

1. Clone repo

```
git clone git@github.com:DomoApps/sales-hero.git
```

2. Change directory to the new project and install dependencies

```
npm install
```

3. Upload sample data to your Domo instance.

We've provided a sample dataset that you can use for testing. See [/data](/data) for spreadsheet.

4. Update `manifest.json`

Once you've uploaded your sample dataset you'll have to update our manifest mapping to reference the new dataset Id. The Id can be found in the URL when viewing your dataset detail

```
https://[customer].domo.com/datasources/[dataset-id-here]/details/overview
```

5. Publish design

Publishing your app will generate a design Id, which you'll need to develop locally.

```
npm run publish
```

6. Develop

Once you've published your design, you can start the local dev server to start making changes to the code.

```
npm start
```


## License
[![FOSSA Status](https://app.fossa.io/api/projects/git%2Bgithub.com%2FDomoApps%2Fsales-hero.svg?type=large)](https://app.fossa.io/projects/git%2Bgithub.com%2FDomoApps%2Fsales-hero?ref=badge_large)