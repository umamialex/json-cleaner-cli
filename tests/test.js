'use strict'

const fs = require('fs')
const path = require('path')
const tap = require('tap')

const cleaner = require('../cleaner')

const cwd = __dirname

tap.test('should verify cleaning', function cleanTest(t) {
  function handleRead(error, data) {
    if (error) {
      throw error
    }

    var dirty = data.toString()
    var cleaned = cleaner.clean(dirty)

    t.similar(eval('(' + dirty + ')'), JSON.parse(cleaned))

    t.end()
  }

  fs.readFile(path.join(cwd, './fixtures/dirty.json'), handleRead)
})

tap.test('should run CLI cleaner', function cleanCliTest(t) {
  cleaner.cleanCli(cwd, './fixtures/dirty.json', './tmp.json')

  t.end()
})
