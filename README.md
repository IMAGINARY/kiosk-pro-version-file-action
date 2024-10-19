# Kiosk Pro version file action

[![GitHub Super-Linter](https://github.com/actions/javascript-action/actions/workflows/linter.yml/badge.svg)](https://github.com/super-linter/super-linter)
![CI](https://github.com/actions/javascript-action/actions/workflows/ci.yml/badge.svg)

An action that creates a
[Version XML file](https://support.kioskgroup.com/article/1084-remote-update-of-local-files#xml)
for remote updating of local files in the
[Kiosk Pro](https://www.kioskgroup.com/pages/kiosk-pro-software) app.

## Inputs

### `version`

**Required** Version number (must be an integer).

See the
[Kiosk Pro](https://support.kioskgroup.com/article/1084-remote-update-of-local-files#xml)
documentation for more details.

### `zip`

**Required** Filename or full URL to the .zip file containing the files
corresponding to the version.

See the
[Kiosk Pro](https://support.kioskgroup.com/article/1084-remote-update-of-local-files#xml)
documentation for more details.

### `filename`

Filename of the version file to create. Defaults to `kiosk-pro-version.xml`

### `clear-previous-content`

Set to `true` to remove existing files from the Kiosk App before installing the
new version. Defaults to `false`.

See the
[Kiosk Pro](https://support.kioskgroup.com/article/1084-remote-update-of-local-files#xml)
documentation for more details.

## Outputs

### `filepath`

The full path to the version file created.

## Example usage

Coming soon.

```yaml

```

## License

Copyright 2024 Imaginary gGmbH. Based on the
[javascript-action template](https://github.com/actions/javascript-action) by
GitHub. Published under the [MIT License](LICENSE).

## Credits

Created by [Eric Londaits](https://github.com/elondaits) for
[Imaginary gGmbH](https://github.com/IMAGINARY/).
