# Changelog

## 1.0.0 (2023-04-08)


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
