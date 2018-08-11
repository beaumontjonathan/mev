# Unnamed Validator
If you are reading this, then I probably haven't put enough effort
into this module.

That being said, naming things isn't my strong point, so perhaps
it'll stick.

(Either that, or you are stalking my commit history. Please stop, you
likely won't find anything other than distressingly bad code.)

## Motivation
I am _fed up_ of input validation. But even more, I am fed up of bad
input validation. The kind of module which kicks out such horrid
error messages that you need another module just to interpret them.

Too often a project motivation is killed while off attempting the
early steps of checking input and elegantly returning validation
errors. Frequently RESTful services do not provide meaningful errors
and this is not good enough. No more, I say. 

## Aim
The aim of this is to produce an input validator which provides
_meaningful_ error messages which can even be passed back up to the
user.
