# Changelog

## [3.3.1](https://github.com/LuanRT/Jinter/compare/jintr-v3.3.0...jintr-v3.3.1) (2025-04-23)


### Bug Fixes

* **CallExpression:** Properly parse computed properties in call expressions ([4d6c8d1](https://github.com/LuanRT/Jinter/commit/4d6c8d14923ba633cb83b552579dd8eabe631af1))

## [3.3.0](https://github.com/LuanRT/Jinter/compare/jintr-v3.2.1...jintr-v3.3.0) (2025-03-24)


### Features

* Allow custom options in `parseScript` method ([16bf448](https://github.com/LuanRT/Jinter/commit/16bf448c92555de66317c42d511969eab3b3da33))

## [3.2.1](https://github.com/LuanRT/Jinter/compare/jintr-v3.2.0...jintr-v3.2.1) (2025-02-21)


### Bug Fixes

* **statements:** Use prefixed strings to avoid internal conflicts ([#29](https://github.com/LuanRT/Jinter/issues/29)) ([dfeed9b](https://github.com/LuanRT/Jinter/commit/dfeed9b7776bc8ddacc919c8f3c6cee80cd99392))

## [3.2.0](https://github.com/LuanRT/Jinter/compare/jintr-v3.1.0...jintr-v3.2.0) (2024-12-12)


### Features

* better error messages ([eda0044](https://github.com/LuanRT/Jinter/commit/eda0044df4e246b31574671314a91fb5d35f18e4))

## [3.1.0](https://github.com/LuanRT/Jinter/compare/jintr-v3.0.2...jintr-v3.1.0) (2024-12-05)


### Features

* **nodes:** Add `EmptyStatement` ([c5d3f9d](https://github.com/LuanRT/Jinter/commit/c5d3f9d661d2486a96aa345cca85dc23104d73b3))

## [3.0.2](https://github.com/LuanRT/Jinter/compare/jintr-v3.0.1...jintr-v3.0.2) (2024-10-28)


### ⚠ BREAKING CHANGES

* Drop `CJS` support
* convert to ESModule ([#4](https://github.com/LuanRT/Jinter/issues/4))
* overhaul interpreter ([#3](https://github.com/LuanRT/Jinter/issues/3))

### Features

* add `!=` op ([97e17f9](https://github.com/LuanRT/Jinter/commit/97e17f94185e8209da76e522c510c885758b4085))
* add `!==` op ([475fc89](https://github.com/LuanRT/Jinter/commit/475fc897269e70be900073c302e2f31e4e18b9fb))
* add `&gt;>>` op ([7cfdfdf](https://github.com/LuanRT/Jinter/commit/7cfdfdffe8e720918b9433373fe0ce1a07c079ca))
* add `^` op ([faa1904](https://github.com/LuanRT/Jinter/commit/faa19047be2548013f17bbe80a8625bc87595479))
* add `ForOfStatement` node ([203d3ae](https://github.com/LuanRT/Jinter/commit/203d3ae09dbdf9e86a3d5870485645c261465384))
* add `in` op ([3f2d00d](https://github.com/LuanRT/Jinter/commit/3f2d00df441dbbbc97ba6b7293a381d572240959))
* add `instanceof` op ([c11f440](https://github.com/LuanRT/Jinter/commit/c11f44021014d158946b9163ead47efde4f98e5a))
* Add `parseScript` ([654d06d](https://github.com/LuanRT/Jinter/commit/654d06d5d9a7c9f4d2c462c09372e37e65ade092))
* add `typeof` op ([5836fec](https://github.com/LuanRT/Jinter/commit/5836fecfa4a00f98021ec35bf832ec4fd0365102))
* add support for `IfStatement` & `WhileStatement` ([5179eee](https://github.com/LuanRT/Jinter/commit/5179eeeec5b8eae745c5ebad17a74e7cdfc09f62))
* Add support for template literals ([#15](https://github.com/LuanRT/Jinter/issues/15)) ([6daec99](https://github.com/LuanRT/Jinter/commit/6daec990fbe17792865cd1fdb0309a30dfeeb094))
* **BinaryExp:** add support for bitwise AND ([af01ce4](https://github.com/LuanRT/Jinter/commit/af01ce485b2ee48ecaaae02171a0362975526e7f))
* **package:** Publish to JSR ([c0aa00c](https://github.com/LuanRT/Jinter/commit/c0aa00ce5e2c45f67bcbc22f0140c2231ca8d5a8))


### Bug Fixes

* **for-stmts:** do not return if body type is `ExpressionStatement` ([7e43562](https://github.com/LuanRT/Jinter/commit/7e435624cb7d6ea086507a7743b169c6f08fc024))
* **package:** add extra file configuration to release-please-config.json ([f2d08b7](https://github.com/LuanRT/Jinter/commit/f2d08b7c93faf123900e59e5913986354cf2fd8b))
* short-circuiting not working correctly ([8b610d1](https://github.com/LuanRT/Jinter/commit/8b610d1ca282065ef9822e949d3e24fb1d43152b))
* Stop using global augmentation and add `LICENSE` file ([94b6bb0](https://github.com/LuanRT/Jinter/commit/94b6bb0a67a183a994bb5b9134f90e4eb18e6d35))


### Miscellaneous Chores

* release 1.0.0 ([7c292f7](https://github.com/LuanRT/Jinter/commit/7c292f7c1e187a5a2d59e4f85871d61375f6b0f2))
* release 2.1.0 ([3f81b80](https://github.com/LuanRT/Jinter/commit/3f81b80da2761b42be8f48c8517b4a1694d19837))
* release 2.1.1 ([ef984b5](https://github.com/LuanRT/Jinter/commit/ef984b530c25320562f9bb37fde680b290558e44))
* release 3.0.2 ([5cffafe](https://github.com/LuanRT/Jinter/commit/5cffafefa3ba152119087554d76c55a2276272aa))


### Code Refactoring

* convert to ESModule ([#4](https://github.com/LuanRT/Jinter/issues/4)) ([50e40db](https://github.com/LuanRT/Jinter/commit/50e40dbf91bf98e9b13c5404d82de908b5412117))
* Drop `CJS` support ([e3d5346](https://github.com/LuanRT/Jinter/commit/e3d53466c5021e3ca0b934317aa9fdad338cafee))
* overhaul interpreter ([#3](https://github.com/LuanRT/Jinter/issues/3)) ([3b5e56e](https://github.com/LuanRT/Jinter/commit/3b5e56ed24ba55aee1ef936c6b14bd8be0b0cde5))

## [3.0.1](https://github.com/LuanRT/Jinter/compare/v3.0.0...v3.0.1) (2024-10-28)


### Bug Fixes

* Stop using global augmentation and add `LICENSE` file ([94b6bb0](https://github.com/LuanRT/Jinter/commit/94b6bb0a67a183a994bb5b9134f90e4eb18e6d35))

## [3.0.0](https://github.com/LuanRT/Jinter/compare/v2.1.1...v3.0.0) (2024-10-28)


### ⚠ BREAKING CHANGES

* Drop `CJS` support

### Code Refactoring

* Drop `CJS` support ([e3d5346](https://github.com/LuanRT/Jinter/commit/e3d53466c5021e3ca0b934317aa9fdad338cafee))

## [2.1.1](https://github.com/LuanRT/Jinter/compare/v2.1.0...v2.1.1) (2024-07-31)


### Miscellaneous Chores

* release 2.1.1 ([ef984b5](https://github.com/LuanRT/Jinter/commit/ef984b530c25320562f9bb37fde680b290558e44))

## [2.1.0](https://github.com/LuanRT/Jinter/compare/v1.2.0...v2.1.0) (2024-07-31)


### Miscellaneous Chores

* release 2.1.0 ([3f81b80](https://github.com/LuanRT/Jinter/commit/3f81b80da2761b42be8f48c8517b4a1694d19837))

## [1.2.0](https://github.com/LuanRT/Jinter/compare/v1.1.0...v1.2.0) (2024-07-31)


### Features

* Add `parseScript` ([654d06d](https://github.com/LuanRT/Jinter/commit/654d06d5d9a7c9f4d2c462c09372e37e65ade092))
* Add support for template literals ([#15](https://github.com/LuanRT/Jinter/issues/15)) ([6daec99](https://github.com/LuanRT/Jinter/commit/6daec990fbe17792865cd1fdb0309a30dfeeb094))

## [1.1.0](https://github.com/LuanRT/Jinter/compare/v1.0.0...v1.1.0) (2023-07-09)


### Features

* add `ForOfStatement` node ([203d3ae](https://github.com/LuanRT/Jinter/commit/203d3ae09dbdf9e86a3d5870485645c261465384))

## [1.0.0](https://github.com/LuanRT/Jinter/compare/v1.0.0...v1.0.0) (2023-04-08)


### ⚠ BREAKING CHANGES

* convert to ESModule ([#4](https://github.com/LuanRT/Jinter/issues/4))
* overhaul interpreter ([#3](https://github.com/LuanRT/Jinter/issues/3))

### Features

* add `!=` op ([97e17f9](https://github.com/LuanRT/Jinter/commit/97e17f94185e8209da76e522c510c885758b4085))
* add `!==` op ([475fc89](https://github.com/LuanRT/Jinter/commit/475fc897269e70be900073c302e2f31e4e18b9fb))
* add `&gt;>>` op ([7cfdfdf](https://github.com/LuanRT/Jinter/commit/7cfdfdffe8e720918b9433373fe0ce1a07c079ca))
* add `^` op ([faa1904](https://github.com/LuanRT/Jinter/commit/faa19047be2548013f17bbe80a8625bc87595479))
* add `in` op ([3f2d00d](https://github.com/LuanRT/Jinter/commit/3f2d00df441dbbbc97ba6b7293a381d572240959))
* add `instanceof` op ([c11f440](https://github.com/LuanRT/Jinter/commit/c11f44021014d158946b9163ead47efde4f98e5a))
* add `typeof` op ([5836fec](https://github.com/LuanRT/Jinter/commit/5836fecfa4a00f98021ec35bf832ec4fd0365102))
* add support for `IfStatement` & `WhileStatement` ([5179eee](https://github.com/LuanRT/Jinter/commit/5179eeeec5b8eae745c5ebad17a74e7cdfc09f62))
* **BinaryExp:** add support for bitwise AND ([af01ce4](https://github.com/LuanRT/Jinter/commit/af01ce485b2ee48ecaaae02171a0362975526e7f))


### Bug Fixes

* **for-stmts:** do not return if body type is `ExpressionStatement` ([7e43562](https://github.com/LuanRT/Jinter/commit/7e435624cb7d6ea086507a7743b169c6f08fc024))
* short-circuiting not working correctly ([8b610d1](https://github.com/LuanRT/Jinter/commit/8b610d1ca282065ef9822e949d3e24fb1d43152b))


### Code Refactoring

* convert to ESModule ([#4](https://github.com/LuanRT/Jinter/issues/4)) ([50e40db](https://github.com/LuanRT/Jinter/commit/50e40dbf91bf98e9b13c5404d82de908b5412117))
* overhaul interpreter ([#3](https://github.com/LuanRT/Jinter/issues/3)) ([3b5e56e](https://github.com/LuanRT/Jinter/commit/3b5e56ed24ba55aee1ef936c6b14bd8be0b0cde5))
