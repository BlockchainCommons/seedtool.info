# Blockchain Commons seedtool.info

### By Jonas Wagner

[seedtool.info](https://seedtool.info) is a version of
[`seedtool`](https://github.com/BlockchainCommons/seedtool-cli) that is
accessible to anyone with a web browser -- no technical skills needed. It aims
to be a simple, easy to use, and secure way for everyone to generate seeds and
Shamir shares of seeds.

## Additional Information

All documentation is integrated in the online version, accessible through https://seedtool.info.

## Usage Instructions

Browse to https://seedtool.info and follow the hints. You can type `--help` into the "seedtool arguments..." field for more detailed instructions.

## Status - Alpha

seedtool.info is currently under active development and in the alpha testing phase. It should not be used for production tasks until it has had further testing and auditing.

### Roadmap

- Write documentation and integrate directly into seedtool
- Update development workflow such that the output is truly a standalone, single HTML file.
- Improve the recovery features in seedtool.info, so that they are as easy to use as the seed generation features
- Make it easier for the user to use the tool correctly and securely:
  - Warn if not in aeroplane mode
  - Maybe: warn if not in an incognito window
  - Use color coding to indicate whether something is public or private
  - Add guards to prevent a weak or reused entropy

## Gordian Principles

seedtool.info is a reference implementation meant to display the [Gordian Principles](https://github.com/BlockchainCommons/Gordian#gordian-principles), which are philosophical and technical underpinnings to Blockchain Commons' Gordian technology. This includes:

* **Independence.** seedtool.info enables *anyone* to generate their own cryptographic seeds. There are no dependencies and conditions, except having a device that can run a recent web browser (for example, a post-2017 Android phone).
* **Privacy.** seedtool.info can run locally, in aeroplane mode, and does not log or store any user interaction.
* **Resilience.** One of the main use cases for seedtool.info is to generate Shamir shares of seeds. It thus provides a way to store seeds that is resiliant to loss and theft of individual shares, if used correctly.
* **Openness.** seedtool.info is open-source software and based on open standards like [SSKR](https://github.com/BlockchainCommons/bc-sskr) and [ByteWords](https://github.com/blockchaincommons/bc-bytewords).

## Origin, Authors, Copyright & Licenses

Unless otherwise noted (either in this [README.md](./README.md) or in the file's header comments), the contents of this repository are Copyright © 2022 by Blockchain Commons, LLC, and are [licensed](./LICENSE) under the [spdx:BSD-2-Clause Plus Patent License](https://spdx.org/licenses/BSD-2-Clause-Patent.html).

In most cases, the authors, copyright, and license for each file reside in header comments in the source code.

seedtool.info relies on other open-source software, see [`.gitmodules`](./.gitmodules).

### Derived from ...

This seedtool.info project is either derived from or was inspired by:

- [BlockchainCommons/seedtool-cli](https://github.com/BlockchainCommons/seedtool-cli) — The original seedtool implementation in C, by Christopher Allen and Wolf McNally.
- [iancoleman/bip39](https://github.com/iancoleman/bip39) — another all-you-need-is-a-web-browser tool with similar goals.

## Financial Support

seedtool.info is a project of [Blockchain Commons](https://www.blockchaincommons.com/). We are proudly a "not-for-profit" social benefit corporation committed to open source & open development. Our work is funded entirely by donations and collaborative partnerships with people like you. Every contribution will be spent on building open tools, technologies, and techniques that sustain and advance blockchain and internet security infrastructure and promote an open web.

To financially support further development of seedtool.info and other projects, please consider becoming a Patron of Blockchain Commons through ongoing monthly patronage as a [GitHub Sponsor](https://github.com/sponsors/BlockchainCommons). You can also support Blockchain Commons with bitcoins at our [BTCPay Server](https://btcpay.blockchaincommons.com/).

## Contributing

We encourage public contributions through issues and pull requests! Please review [CONTRIBUTING.md](./CONTRIBUTING.md) for details on our development process. All contributions to this repository require a GPG signed [Contributor License Agreement](./CLA.md).

### Discussions

The best place to talk about Blockchain Commons and its projects is in our GitHub Discussions areas.

[**Gordian Developer Community**](https://github.com/BlockchainCommons/Gordian-Developer-Community/discussions). For standards and open-source developers who want to talk about interoperable wallet specifications, please use the Discussions area of the [Gordian Developer Community repo](https://github.com/BlockchainCommons/Gordian-Developer-Community/discussions). This is where you talk about Gordian specifications such as [Gordian Envelope](https://github.com/BlockchainCommons/BCSwiftSecureComponents/blob/master/Docs/00-INTRODUCTION.md), [bc-shamir](https://github.com/BlockchainCommons/bc-shamir), [Sharded Secret Key Reconstruction](https://github.com/BlockchainCommons/bc-sskr), and [bc-ur](https://github.com/BlockchainCommons/bc-ur) as well as the larger [Gordian Architecture](https://github.com/BlockchainCommons/Gordian/blob/master/Docs/Overview-Architecture.md), its [Principles](https://github.com/BlockchainCommons/Gordian#gordian-principles) of independence, privacy, resilience, and openness, and its macro-architectural ideas such as functional partition (including airgapping, the original name of this community).

[**Gordian User Community**](https://github.com/BlockchainCommons/Gordian/discussions). For users of the Gordian reference apps, including [Gordian Coordinator](https://github.com/BlockchainCommons/iOS-GordianCoordinator), [Gordian Seed Tool](https://github.com/BlockchainCommons/GordianSeedTool-iOS), [Gordian Server](https://github.com/BlockchainCommons/GordianServer-macOS), [Gordian Wallet](https://github.com/BlockchainCommons/GordianWallet-iOS), and [SpotBit](https://github.com/BlockchainCommons/spotbit) as well as our whole series of [CLI apps](https://github.com/BlockchainCommons/Gordian/blob/master/Docs/Overview-Apps.md#cli-apps). This is a place to talk about bug reports and feature requests as well as to explore how our reference apps embody the [Gordian Principles](https://github.com/BlockchainCommons/Gordian#gordian-principles).

[**Blockchain Commons Discussions**](https://github.com/BlockchainCommons/Community/discussions). For developers, interns, and patrons of Blockchain Commons, please use the discussions area of the [Community repo](https://github.com/BlockchainCommons/Community) to talk about general Blockchain Commons issues, the intern program, or topics other than those covered by the [Gordian Developer Community](https://github.com/BlockchainCommons/Gordian-Developer-Community/discussions) or the 
[Gordian User Community](https://github.com/BlockchainCommons/Gordian/discussions).

### Other Questions & Problems

As an open-source, open-development community, Blockchain Commons does not have the resources to provide direct support of our projects. Please consider the discussions area as a place where you might get answers to questions. Alternatively, please use this repository's [issues](./issues) feature. Unfortunately, we can not make any promises on response time.

If your company requires support to use our projects, please feel free to contact us directly about options. We may be able to offer you a contract for support from one of our contributors, or we might be able to point you to another entity who can offer the contractual support that you need.

### Credits

The following people directly contributed to this repository. You can add your name here by getting involved. The first step is learning how to contribute from our [CONTRIBUTING.md](./CONTRIBUTING.md) documentation.

| Name         | Role              | Github                               | Email                   | GPG Fingerprint                                    |
| ------------ | ----------------- | ------------------------------------ | ----------------------- | -------------------------------------------------- |
| Jonas Wagner | Software Engineer | [@Sjlver](https://github.com/Sjlver) | \<ltlygwayh@gmail.com\> | B61A 9761 C9D2 789C 0896  6C63 209C 9222 DB5F BD15 |

Page background photo by [Markus Spiske](https://unsplash.com/@markusspiske) on [Unsplash](https://unsplash.com/s/photos/numbers-screen).

## Responsible Disclosure

We want to keep all of our software safe for everyone. If you have discovered a security vulnerability, we appreciate your help in disclosing it to us in a responsible manner. We are unfortunately not able to offer bug bounties at this time.

We do ask that you offer us good faith and use best efforts not to leak information or harm any user, their data, or our developer community. Please give us a reasonable amount of time to fix the issue before you publish it. Do not defraud our users or us in the process of discovery. We promise not to bring legal action against researchers who point out a problem provided they do their best to follow the these guidelines.

### Reporting a Vulnerability

Please report suspected security vulnerabilities in private via email to ChristopherA@BlockchainCommons.com (do not use this email for support). Please do NOT create publicly viewable issues for suspected security vulnerabilities.

The following keys may be used to communicate sensitive information to developers:

| Name              | Fingerprint                                        |
| ----------------- | -------------------------------------------------- |
| Christopher Allen | FDFE 14A5 4ECB 30FC 5D22  74EF F8D3 6C91 3574 05ED |

You can import a key by running the following command with that individual’s fingerprint: `gpg --recv-keys "<fingerprint>"` Ensure that you put quotes around fingerprints that contain spaces.
