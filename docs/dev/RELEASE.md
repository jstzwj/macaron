# Steps to release Macaron

- Create a release candidate
  - Create branch `release-v%version%`
  - Set environment variable `MACARON_IS_STABLE` to `1` (default on CI)
  - Ensure [changelog](https://github.com/jstzwj/macaron/blob/master/.github/CHANGELOG.md) is up-to-date
  - Bump version in `package.json` and changelog
  - Update all `README.md` files
  - Bump Flathub version ([macaron.appdata.xml](https://github.com/jstzwj/macaron/blob/master/resources/linux/macaron.appdata.xml))
  - Create commit `release version %version%`
  - Ensure all tests pass
  - A new draft release should be available or create one
- Publish GitHub release
  - Add git tag `v%version%`
  - Add changelog
  - Add SHA256 checksums
- Update website and documentation
- Publish [Flathub package](https://github.com/flathub/com.github.marktext.macaron)
  - Ensure native dependencies
  - Update `runtime` and `SDK` if needed
  - Bump version and update URLs
  - Test the package (`scripts/build-bundle.sh && scripts/test-macaron.sh`)
  - Create commit `Update to v%version%`

## Work after releasing

- Ensure all issues in the changelog are closed
- :relaxed: :tada:
