import { createHash } from 'crypto'

[
  'adminpassword',
  'trainerpassword',
  'hagridpassword',
  'dorothypassword',
  'emmetpassword'
].map((value) => console.log(`${value} => ${createHash('md5').update(value).digest('hex')}`))
