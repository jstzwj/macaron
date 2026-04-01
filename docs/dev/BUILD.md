# Build Instructions

Clone the repository:

```
git clone https://github.com/marktext/marktext.git
```

### Prerequisites

Before you can get started developing, you need set up your build environment:

- Node.js `24.x` LTS and Yarn Classic `1.22.x`
- Python `>=v3.10` for node-gyp
- On Windows, `node-gyp` may need Visual Studio C++ build tools and a recent Windows SDK
- C++ compiler and development tools
- Build is supported on Linux, macOS and Windows

**Additional development dependencies on Linux:**

- libX11 (with headers)
- libxkbfile (with headers)
- libsecret (with headers)
- libfontconfig (with headers)

On Debian-based Linux: `sudo apt-get install libx11-dev libxkbfile-dev libsecret-1-dev libfontconfig-dev`

On Red Hat-based Linux: `sudo dnf install libX11-devel libxkbfile-devel libsecret-devel fontconfig-devel`

**Additional development dependencies on Windows:**

- Windows 11 SDK (or newer Windows 10 SDK)
- Visual Studio 2022 Build Tools (preferred)

### Let's build

1. Go to the `macaron` folder
2. Install dependencies: `yarn install` or `yarn install --frozen-lockfile`
3. Build Macaron binaries and packages: `yarn run build`
4. Macaron binaries are located under the `build` folder

Copy the build app to applications folder, or if on Windows run the executable installer.

### Important scripts

```
$ yarn run <script> # or npm run <script>
```

| Script          | Description                                      |
| --------------- | ------------------------------------------------ |
| `build`         | Build Macaron binaries and packages for your OS |
| `build:bin`     | Build Macaron binary for your OS                |
| `dev`           | Build and run Macaron in developer mode         |
| `lint`          | Lint code style                                  |
| `test` / `unit` | Run unit tests                                   |

For more scripts please see `package.json`.
