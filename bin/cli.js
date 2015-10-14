#!/usr/bin/env node

'use strict'

const pkg = require('../package.json')
const program = require('commander')

const cleaner = require('../cleaner.js')

const cwd = process.cwd()

program
  .version(pkg.version)
  .usage('[options] <input> <output>')

  .arguments('<input> <output>')
  .action(function clean(input, output) {
    cleaner.cleanCli(cwd, input, output)
  })

program.parse(process.argv)

if (!program.args.length) {
  return program.help()
}
