// noinspection ExceptionCaughtLocallyJS

const fs = require('fs').promises
const path = require('path')
const core = require('@actions/core')
const { buildVersionXml } = require('./lib/build-version-xml')

/**
 * The main function for the action.
 * @returns {Promise<void>} Resolves when the action is complete.
 */
async function run() {
  try {
    const filename = core.getInput('filename', { required: false })
    const version = core.getInput('version', { required: true })
    const zip = core.getInput('zip', { required: true })
    const clearPreviousContent = core.getInput('clear-previous-content', {
      required: false
    })

    const xml = buildVersionXml({
      version,
      zip,
      clearPreviousContent
    })

    const outFilePath = path.resolve(process.cwd(), filename)
    core.debug(`Writing to file: ${outFilePath}`)
    await fs.writeFile(outFilePath, xml)
    core.debug('File written successfully')

    core.setOutput('filepath', outFilePath)
  } catch (error) {
    // Fail the workflow run if an error occurs
    core.setFailed(error.message)
  }
}

module.exports = {
  run
}
