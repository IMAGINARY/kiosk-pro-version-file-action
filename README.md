# Kiosk Pro version file action

[![GitHub Super-Linter](https://github.com/actions/javascript-action/actions/workflows/linter.yml/badge.svg)](https://github.com/super-linter/super-linter)
![CI](https://github.com/actions/javascript-action/actions/workflows/ci.yml/badge.svg)

An action that creates a
[Version XML file](https://support.kioskgroup.com/article/1084-remote-update-of-local-files#xml)
for remote updating of local files in the
[Kiosk Pro](https://www.kioskgroup.com/pages/kiosk-pro-software) app.

The authors of this action are not affiliated with Kiosk Pro or Kiosk Group in
any way.

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

```yaml
- name: 'Generate build number'
  id: generate_build_number
  uses: onyxmueller/build-tag-number@4a0c81c9af350d967032d49204c83c38e6b0c8e4
  with:
    token: ${{secrets.github_token}}

- name: 'Create Kiosk Pro version file'
  id: create_kiosk_pro_version_file
  uses: IMAGINARY/kiosk-pro-version-file-action@1f8f5671ccc7617998e5468aff5e89854bf10e3e
  with:
    version: ${{ steps.generate_build_number.outputs.build_number }}
    zip: ${{ env.RELEASE_ZIP_FILENAME }}
    clear-previous-content: 'true'

- name: Create the release
  uses: softprops/action-gh-release@4634c16e79c963813287e889244c50009e7f0981
  with:
    files: |
      ${{ env.RELEASE_ZIP_FILENAME }}
      ${{ steps.create_kiosk_pro_version_file.outputs.filepath }}
```

## License

Copyright 2024 Imaginary gGmbH. Based on the
[javascript-action template](https://github.com/actions/javascript-action) by
GitHub. Published under the [MIT License](LICENSE).

## Credits

Created by [Eric Londaits](https://github.com/elondaits) for
[Imaginary gGmbH](https://github.com/IMAGINARY/).
