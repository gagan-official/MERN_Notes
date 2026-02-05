# Semantic Versioning (SemVer)

Set of rules that dictate how version numbers are assigned and incremented.

Why it's needed - To keep track of change history and overview that at what extent (whether it's a small or a big change) code/project has been updated.

### Syntax:

                   Minor Version
                         |
    Major Version <--- X.Y.Z ---> Patch

### Versioning Rules:

- **X**: **Fixed a bug**, code stays backward compatible, increment the **Patch Version**. E.g. `1.1.1` to `1.1.2`
- **Y**: **Add new functionality**, code stays backward compatible, increment the **Minor Version** and reset the Patch Version. E.g. `1.1.1` to `1.2.0`
- **Z**: **Make changes to code**, code is no more backward compatible, increment the **Major Version** and reset the both Patch and Minor Versions. E.g. `1.1.1` to `2.0.0`.

### Few more points:

- Semantic Versioning always starts with 0.1.0
- 0.Y.Z (a major version of zero) is used for initial development
- When the code is production-ready, we increment to version 1.0.0
- Even the simplest of changes has to be done with an increase in the version number
