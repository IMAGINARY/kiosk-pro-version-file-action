const fs = require('fs')
const path = require('path')
const { expect } = require('@jest/globals')
const { buildVersionXml } = require('../src/lib/build-version-xml')

describe('build-version-xml.js', () => {
  it('matches the official sample xml file', () => {
    const output = buildVersionXml({
      version: '1',
      zip: 'update.zip',
      clearPreviousContent: 'false'
    })
    const fixturePath = path.join(__dirname, 'fixtures', 'official-sample.xml')
    const fixture = fs.readFileSync(fixturePath, 'utf8')
    expect(output).toEqual(fixture)
  })

  it('matches our own sample file', () => {
    const output = buildVersionXml({
      version: '137',
      zip: 'http://example.com/updates/sample-project/latest/my-file.zip',
      clearPreviousContent: 'true'
    })
    const fixturePath = path.join(__dirname, 'fixtures', 'own-sample.xml')
    const fixture = fs.readFileSync(fixturePath, 'utf8')
    expect(output).toEqual(fixture)
  })

  it('throws an error if any of the arguments are not strings', () => {
    expect(() => {
      buildVersionXml({
        version: 1,
        zip: 'http://example.com/updates/sample-project/latest/my-file.zip',
        clearPreviousContent: 'true'
      })
    }).toThrow('version must be a string')

    expect(() => {
      buildVersionXml({
        version: '1',
        zip: 1,
        clearPreviousContent: 'true'
      })
    }).toThrow('zip must be a string')

    expect(() => {
      buildVersionXml({
        version: '1',
        zip: 'http://example.com/updates/sample-project/latest/my-file.zip',
        clearPreviousContent: true
      })
    }).toThrow('clearPreviousContent must be a string')
  })

  it('throws an error if version is not an integer string', () => {
    expect(() => {
      buildVersionXml({
        version: '1.0',
        zip: 'http://example.com/updates/sample-project/latest/my-file.zip',
        clearPreviousContent: 'true'
      })
    }).toThrow('version must be an integer')
  })

  it('throws an error if clear-previous-content is not a boolean string', () => {
    expect(() => {
      buildVersionXml({
        version: '1',
        zip: 'http://example.com/updates/sample-project/latest/my-file.zip',
        clearPreviousContent: 'yes'
      })
    }).toThrow("clear-previous-content must be 'true' or 'false'")
  })
})
