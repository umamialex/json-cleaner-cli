'use strict'

const chalk = require('chalk')
const jsdiff = require('diff')
const fs = require('fs')
const path = require('path')

function clean(dirty) {
  var processed = eval('(' + dirty + ')')
  return JSON.stringify(processed, false, 2)
}

function cleanCli(cwd, input, output) {
  function handleInput(error, data) {
    if (error) {
      throw error
    }

    var dirty = data.toString()
    var cleaned = clean(dirty)

    console.log('Cleaning diff:\n')

    var diff = jsdiff.diffChars(dirty, cleaned)
    diff.forEach(function display(part) {
      var color = part.added ? 'green' : part.removed ? 'red' : 'grey'
      process.stderr.write(chalk[color](part.value))
    })

    fs.writeFile(path.join(cwd, output), cleaned, handleOutput)
  }

  function handleOutput(error) {
    if (error) {
      throw error
    }

    console.log(chalk.green('\nSuccessfully cleaned JSON.'))
  }

  fs.readFile(path.join(cwd, input), handleInput)
}

exports.clean = clean
exports.cleanCli = cleanCli
