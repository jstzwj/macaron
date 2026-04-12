# Application Data Directory

The per-user application data directory is located in the following directory:

- `%APPDATA%\macaron` on Windows
- `$XDG_CONFIG_HOME/macaron` or `~/.config/macaron` on Linux
- `~/Library/Application Support/macaron` on macOS

When [portable mode](PORTABLE.md) is enabled, the directory location is either the `--user-data-dir` parameter or `macaron-user-data` directory.
