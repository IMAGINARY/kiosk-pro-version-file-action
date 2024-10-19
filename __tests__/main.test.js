/**
 * Unit tests for the action's main functionality, src/main.js
 */
const fs = require('fs').promises
const path = require('path')
const core = require('@actions/core')
const main = require('../src/main')

// Mock the GitHub Actions core library
const debugMock = jest.spyOn(core, 'debug').mockImplementation()
const getInputMock = jest.spyOn(core, 'getInput').mockImplementation()
const setFailedMock = jest.spyOn(core, 'setFailed').mockImplementation()
const setOutputMock = jest.spyOn(core, 'setOutput').mockImplementation()
const promisesWriteFileMock = jest.spyOn(fs, 'writeFile').mockImplementation()

// Mock the action's main function
const runMock = jest.spyOn(main, 'run')

// Other utilities
const timeRegex = /^\d{2}:\d{2}:\d{2}/

describe('action', () => {
  beforeEach(() => {
    jest.clearAllMocks()
  })

  it('creates the version file', async () => {
    getInputMock.mockImplementation(name => {
      switch (name) {
        case 'filename':
          return 'version.xml'
        case 'version':
          return '137'
        case 'zip':
          return 'http://example.com/updates/sample-project/latest/my-file.zip'
        case 'clear-previous-content':
          return 'true'
        default:
          return ''
      }
    })
    const fixturePath = path.join(__dirname, 'fixtures', 'own-sample.xml')
    const fixture = await fs.readFile(fixturePath, 'utf8')
    const outPath = path.resolve(process.cwd(), 'version.xml')

    await main.run()
    expect(runMock).toHaveReturned()

    expect(debugMock).toHaveBeenNthCalledWith(1, `Writing to file: ${outPath}`)
    expect(promisesWriteFileMock).toHaveBeenNthCalledWith(1, outPath, fixture)
    expect(debugMock).toHaveBeenNthCalledWith(2, 'File written successfully')

    expect(setOutputMock).toHaveBeenNthCalledWith(1, 'filepath', outPath)
  })

  it('sets a failed status', async () => {
    // Set the action's inputs as return values from core.getInput()
    getInputMock.mockImplementation(name => {
      switch (name) {
        case 'filename':
          return 'version.xml'
        case 'version':
          return 'not-a-number'
        case 'zip':
          return 'http://example.com/updates/sample-project/latest/my-file.zip'
        case 'clear-previous-content':
          return 'true'
        default:
          return ''
      }
    })

    await main.run()
    expect(runMock).toHaveReturned()

    // Verify that all of the core library functions were called correctly
    expect(setFailedMock).toHaveBeenNthCalledWith(
      1,
      'version must be an integer'
    )
  })

  it('fails if no input is provided', async () => {
    // Set the action's inputs as return values from core.getInput()
    getInputMock.mockImplementation(name => {
      switch (name) {
        case 'filename':
          return 'version.xml'
        case 'version':
          throw new Error('Input required and not supplied: version')
        case 'zip':
          return 'http://example.com/updates/sample-project/latest/my-file.zip'
        case 'clear-previous-content':
          return 'true'
        default:
          return ''
      }
    })

    await main.run()
    expect(runMock).toHaveReturned()

    // Verify that all of the core library functions were called correctly
    expect(setFailedMock).toHaveBeenNthCalledWith(
      1,
      'Input required and not supplied: version'
    )
  })
})
