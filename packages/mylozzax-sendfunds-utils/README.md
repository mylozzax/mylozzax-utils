<p align="center">
  <img alt="MyLozzax" src="https://user-images.githubusercontent.com/1645428/120083066-8a394a00-c0c6-11eb-9bc5-1ce02784dab3.png">
</p>

<p align="center">
  Lozzax mixin and send steps, used in the MyLozzax packages
</p>

<p align="center">
  <a href="https://github.com/mylozzax/mylozzax-utils/actions?query=branch%3Amaster+workflow%3Aci"><img alt="CI Status" src="https://github.com/mylozzax/mylozzax-utils/workflows/ci/badge.svg?branch=master"></a>
  <a href="https://snyk.io/test/github/mylozzax/mylozzax-utils"><img src="https://snyk.io/test/github/mylozzax/mylozzax-utils/badge.svg"></a>
  <a href="https://opensource.org/licenses/BSD-3-Clause"><img src="https://img.shields.io/badge/License-BSD%203--Clause-blue.svg"></a>
  <a href="https://npmjs.com/package/@mylozzax/mylozzax-sendfunds-utils"><img src="https://img.shields.io/npm/dt/@mylozzax/mylozzax-sendfunds-utils.svg"></a>
</p>

> :warning: This project is under heavy development. Expect bugs & breaking changes.

## Installation

```bash
npm i @mylozzax/mylozzax-sendfunds-utils
```

## Usage

```js
const utils = require('@mylozzax/mylozzax-sendfunds-utils');
const mixins = utils.fixedMixin();
const result = utils.SendFunds_ProcessStep_MessageSuffix[1];
```

-----

## License

See `LICENSE.txt` for license.

All source code copyright © 2021 by MyMonero. All rights reserved.