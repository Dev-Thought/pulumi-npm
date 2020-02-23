# pulumi-npm

_An NPM executable package for Pulumi._

[![code style: prettier](https://img.shields.io/badge/code_style-prettier-ff69b4.svg)](https://github.com/prettier/prettier) [![pulumi: v1.11.0](https://img.shields.io/badge/pulumi-v1.11.0-371a47.svg)](https://www.pulumi.com) [![npm downloads](https://img.shields.io/npm/dm/@dev-thought/pulumi-npm.svg?maxAge=3600)](https://www.npmjs.com/package/@dev-thought/pulumi-npm)

### Preamble

I assembled [Pulumi](https://pulumi.com) into an NPM package in order for me to include it in other projects that depended on the executable. I wanted to be able to publish NPM modules with scripts like this:

```json
{
  "scripts": {
    "plan": "pulumi up"
  }
}
```

But without having to worry about asking users to download Pulumi externally.

---

### Installation

To use _Pulumi_ as an NPM package, include it in your `package.json` dependencies:

```bash
# If you're using Yarn (recommended):
yarn add pulumi-npm

# If you're using NPM:
npm i pulumi-npm
```

Or, if you want a one-time installation that you can run arbitrarily, install it globally:

```bash
# If you're using Yarn (recommended):
yarn global add pulumi-npm

# If you're using NPM:
npm i -g pulumi-npm
```

## Usage

#### As a project dependency:

This package cannot currently be used as a typical Node module, as it does not export any entry points; it only symlinks a binary. So, the recommended use case is to use it in your `package.json` scripts:

```json
{
  "scripts": {
    "plan": "pulumi up",
    "destroy": "pulumi destroy"
  }
}
```

#### As a globally installed binary:

If you installed this package globally (with `npm i -g` or `yarn global add`), you can simply start using it like a regular command-line program:

```bash
pulumi version        # show version info
Pulumi                # show usage info
```

## Stay in touch

- Twitter Author - [Mitko Tschimev](https://twitter.com/MTschimev)

## License

This Module is [MIT licensed](LICENSE).
