# mev

Meaningful Error Validation for everyone.

[![Build Status](https://travis-ci.com/beaumontjonathan/mev.svg?branch=master)](https://travis-ci.com/beaumontjonathan/mev)

```js
import { createValidationSchema } from 'mev';

const userSchema = createValidationSchema()
  .addField('username', f => f
    .string()
    .addRule(r => r.minLength(5))
    .addRule(r => r.maxLength(10))
    .addRule(r => r.lowercase())
  )
  .addField('age', f => f
    .number()
    .addRule(r => r.min(0))
  );

// { success: true }
userSchema.run({ username: 'myusername', age: 5 });
```

### Installation

Install using your favourite JavaScript package manager.
```sh
$ npm install mev
$ yarn add mev
```

## Features

- Object and primitive data validation
- Customisable, user-friendly errors
- Chain based API
- Written in TypeScript
- Reusable by design

# Design

- Schemas are made up of fields
- Fields are made up of rules
- Rules are made up of tests and errors

## `Rule`

A rule is an atomic validation test which when tested either passes or provides a description of the failed test.

This description is the key to the purpose of this library. It is written by you, ready to be passed back up your stack and straight to the user. When unspecified, a test description and title may be generated.

###### Example

```js
import { createValidationRule } from 'mev';

const rule = createValidationRule()
  .title('too long')
  .description('must be no longer than 5')
  .addTestFunction(e => e.length <= 5);

rule.test('short');
// { success: true }

rule.test('not short');
// { title: 'too long', description: 'must be no longer than 5' }
```

Here the `addTestFunction` method is being used to specify the validation test. Each rule may have as many tests as desired, however it is recommended to keep rules atomic for more specific error messages.

Mev has many built in methods for testing data. These are specific to the data type being tested, and as such there is an extension of `Rule` for each primitive data type `string`, `number` & `boolean`.

### `StringRule`

Calling the `string` method first in the chain will give the chain access to each of the test methods provided in `StringRule`. Here `maxLength` is being used to replace the test function written above.

###### Example

```js
import { createValidationRule } from 'mev';

const rule = createValidationRule()
  .string()
  .title('too long')
  .description('must be no longer than 5')
  .maxLength(5);

rule.test('short');
// { success: true }

rule.test('not short');
// { title: 'too long', description: 'must be no longer than 5' }
```

#### Methods

- `maxLength(n)` - fails when the test input has a length greater than `n`
- `minLength(n)` - fails when the test input has a length smaller than `n`
- `blacklist(list)` - fails when the test input contains one or more element in `list` as a substring
- `uppercase()` - fails when the test input contains any lowercase letters
- `lowercase()` - fails when the test input contains any uppercase letters
- `alphanumeric()` - fails when the test input contains any character other than a letter or number
- `regex(r)` - fails when the regular expression `r` fails on the test input

### `NumberRule`

Calling the `number` method first in the chain will give the chain access to each of the test methods provided in `NumerRule`.

###### Example

```js
import { createValidationRule } from 'mev';

const rule = createValidationRule()
  .number()
  .title('too big')
  .description('must not be larger than 5')
  .max(5);

rule.test(3);
// { success: true }

rule.test(6);
// { title: 'too big', description: 'must not be larger than 5' }
```

#### Methods

- `max(n)` - fails when the test input is greater than `n`
- `min(n)` - fails when the test input is less than `n`
- `closedMax(n)` - see `max(n)`
- `closedMin(n)` - see `max(n)`
- `openMax(n)` - fails when the test input is greater than or equal to `n`
- `openMin(n)` - fails when the test input is less than or equal to `n`
- `closedInterval(min, max)` - fails when the test input is outside of the interval [`min`, `max`]
- `openInterval(min, max)` - fails when the test input is outside of the interval (`min`, `max`)

### `BooleanRule`

Calling the `boolean` method first in the chain will give the chain access to each of the test methods provided in `BooleanRule`.

###### Example

```js
import { createValidationRule } from 'mev';

const rule = createValidationRule()
  .boolean()
  .title('truthy')
  .description('must be truthy')
  .true();

rule.test(true);
// { success: true }

rule.test(false);
// { title: 'truthy', description: 'must be truthy' }
```

#### Methods

- `true()` - fails when the test input is false
- `false()` - fails when the test input is true

## `Field`

A field is a collection of rules, typically pertaining to the same data type. Rules are either added as an object, or through a callback function.

When a field is tested, each of the rules are tested with the provided data and either a success flag is returned, or an array of errors from each failing test.

###### Example

```js
import { createValidationRule, createValidationField } from 'mev';

const rule = createValidationRule()
  .title('too long')
  .description('must be no longer than 5')
  .addTestFunction(e => e.length <= 5);

const field = createValidationField()
  .addRule(rule)
  .addRule(r => r
    .title('odd length')
    .description('must have an even length')
    .addTestFunction(e => e.length % 2 === 0)
  );

field.test('pass');
// { success: true }

field.test('failure');
// { errors: [
//   { title: 'too long', description: 'must be no longer than 5' },
//   { title: 'odd length', description: 'must have an even length' }
// ] }
```

### Data types

As with `Rule`, fields may be associated with one of the primitive data types `string`, `number` or `boolean`. Once again this must be placed first in the chain, and once it has been used then all rules will have access to the test methods associated with that type.

###### Example

```js
import { createValidationField } from 'mev';

const field = createValidationField()
  .string()
  .addRule(r => r
    .title('too long')
    .description('must not be longer than 5')
    .maxLength(5)
  )
```

Here the value of `r` being passed into the callback of `addRule` will be an instance of `StringRule`, and therefore has access to the method `maxLength`.

It is important to note that if the value passed into `addRule` is a rule instead of a function, then it will not have access to the methods of field type and the type will have to be stated explicitly in the rule.

## `Schema`

A schema is a collection of fields and other schemas, similar to how a `Field` is a collection of `Rule`s. When a schema is tested against an input object, each field is tested, and the error from each failing test is reduced into a single array. Once again, if no rules have failed, then a success flag will be returned.

The `addField` method is used to add a new field to a schema. The first argument is the name of the field and the second argument takes either a field object or a callback function which is passed a new field object.

###### Example

```js
import { createValidationField, createValidationSchema } from 'mev';

const usernameField = createValidationField()
  .string()
  .addRule(r => r
    .title('invalid character')
    .description('usernames must only contain letters and numbers')
    .alphanumeric()
  )
  .addRule(r => r
    .title('invalid length')
    .description('usernames must be between 2 and 15 characters long')
    .minLength(2)
    .maxLength(15)
  );

const schema = createValidationSchema()
  .addField('age', f => f
    .number()
    .addRule(r => r
      .title('negative age')
      .description('an age must be greater than 0')
      .min(0)
    )
  )
  .addField('username', usernameField);


schema.test({ age: 4, username: 'myusername' });
// { success: true }

schema.test({ age: -4, username: 'invalid username' })
// { errors: [
//   { fieldName: 'age',
//     title: 'negative age',
//     description: 'an age must be greater than 0' },
//   { fieldName: 'username',
//     title: 'invalid character',
//     description: 'usernames must only contain letters and numbers' },
//   { fieldName: 'username',
//     title: 'invalid length',
//     description: 'usernames must be between 2 and 15 characters long' }
// ]}
```

When rules fail in a schema, the `fieldName` is also included in the error object.

### Nested Schemas

`Schema` has the method `addSchemaField` which is similar to `addField` except the second argument takes a schema object or callback passing a schema object. This allows nested schema validation.

###### Example

```js
import { createSchemaValidation } from 'mev';

import userSchema from './user';

const schema = createValidationSchema()
  .addSchemaField('user', userSchema)
  .addSchemaField('testInfo', s => s
    .addField('score', f => f
      .number()
      .addRule(r => r
        .title('out of range')
        .description('out of test score range of 1-100')
        .closedInterval(0, 100)
      )
    )
  );

schema.test({
  user: { username: 'myUsername', age: 32 },
  testInfo: { score: 40 },
});
// { success: true }

schema.test({
  user: { username: 'invalid username', age: 32 },
  testInfo: { score: 1000 },
});
// { errors: [
//   { parent: 'user',
//     fieldName: 'username',
//     title: 'invalid character',
//     description: 'usernames must only contain letters and numbers' },
//   { parent: 'user',
//     fieldName: 'username',
//     title: 'invalid length',
//     description: 'usernames must be between 2 and 15 characters long' },
//   { parent: 'testInfo',
//     fieldName: 'score',
//     title: 'out of range',
//     description: 'out of test score range of 1-100' }
// ]}
```

When rules fail in a nested schema, the `fieldName` and `parent` schema are also included in the error object.

## Utils

Provided are methods for determining the outcome of a validation test.

This allows type knowledge of the result which is essential in TypeScript
and useful for the type knowledge in your IDE.

### `isSuccess` & `isError`

```js
import { isSuccess, isError, createValidationSchema } from 'mev';

const schema = createValidationSchema()
  .addField('age', f => f
    .number()
    .addRule(r => r
      .title('negative age')
      .description('an age must be greater than 0')
      .min(0)
    )
  );

const result = schema.test({ age: 32 });

if (isSuccess(result)) {
  // will have access to result.success
} else {
  // will have access to result.errors
}

if (isError(result)) {
  // will have access to result.errors
} else {
  // will have access to result.success
}
```
