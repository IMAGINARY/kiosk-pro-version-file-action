const builder = require("xmlbuilder");

/**
 * Builds the version.xml file content.
 *
 * @param {object} props
 *   The properties to use to build the version.xml content.
 *   @param {string} props.version
 *     The version number to include in the version.xml file.
 *   @param {string} props.zip
 *     The URL to the zip file to download.
 *   @param {string} props.clearPreviousContent
 *     The flag ('true' or 'false') to indicate if previous content should be cleared.
 * @return {string}
 */
function buildVersionXml(props) {
  const {
    version,
    zip,
    clearPreviousContent
  } = props

  // Validate that all arguments are strings
  const stringProps = ['version', 'zip', 'clearPreviousContent']
  for (const prop of stringProps) {
    if (typeof props[prop] !== 'string') {
      throw new Error(`${prop} must be a string`)
    }
  }

  // Validate that version is an integer string
  if (!/^\d+$/.test(version)) {
    throw new Error('version must be an integer')
  }
  // Validate that keepPreviousContent is a boolean string
  if (!/^(true|false)$/.test(clearPreviousContent)) {
    throw new Error("clear-previous-content must be 'true' or 'false'")
  }

  return builder
    .create(
      'plist',
      { encoding: 'UTF-8' },
      {
        pubID: '-//Apple//DTD PLIST 1.0//EN',
        sysID: 'http://www.apple.com/DTDs/PropertyList-1.0.dtd'
      }
    )
    .att({ version: '1.0' })
    .ele('dict')
    .ele('key')
    .text('version')
    .up()
    .ele('integer')
    .text(version)
    .up()
    .ele('key')
    .text('zip')
    .up()
    .ele('string')
    .text(zip)
    .up()
    .ele('key')
    .text('clear-previous-content')
    .up()
    .ele(clearPreviousContent === 'true' ? 'true' : 'false')
    .up()
    .end({ pretty: true, indent: '' })
}

module.exports = {
  buildVersionXml
}

