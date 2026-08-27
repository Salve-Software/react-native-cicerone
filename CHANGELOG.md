# Changelog

## [0.1.1](https://github.com/Salve-Software/react-native-cicerone/compare/v0.1.0...v0.1.1) (2026-08-27)

### Bug Fixes

- **build:** emit relative imports instead of absolute paths ([998d8b0](https://github.com/Salve-Software/react-native-cicerone/commit/998d8b05cb652b3d06cd3ce87d641f7672c76b8c))

# 0.1.0 (2026-08-27)

### Bug Fixes

- **card:** measure the card against the overlay box too ([7ea3166](https://github.com/Salve-Software/react-native-cicerone/commit/7ea3166246bbfda49299995728ad9020f90844f0))
- **card:** slide the card to its new position between steps ([63d01eb](https://github.com/Salve-Software/react-native-cicerone/commit/63d01ebd263a4bac885a5be24e6f0d2c41b4f2fa))
- **card:** stop fading the card out on every step ([6d69bf0](https://github.com/Salve-Software/react-native-cicerone/commit/6d69bf00eb2f20b5a12fedaff9d295d565473baf))
- **card:** stop restarting the slide when the card re-measures ([b274fb9](https://github.com/Salve-Software/react-native-cicerone/commit/b274fb94629d8a40a71afd223b9c2512c35b423d))
- **card:** stop stretching the card when it sits above the target ([7402d6c](https://github.com/Salve-Software/react-native-cicerone/commit/7402d6c302425a021addf0f17392f4b0b43c2d47))
- **ci:** track the generated storybook file ([9e5771a](https://github.com/Salve-Software/react-native-cicerone/commit/9e5771a2a34f3c6190b350eae583575b54ec0b79))
- **deps:** pin reanimated and worklets to the SDK versions ([0bf8332](https://github.com/Salve-Software/react-native-cicerone/commit/0bf833238cc15ad053d18e72e83a0b0ef611e612))
- **example:** keep the demo inside its provider ([033bb4d](https://github.com/Salve-Software/react-native-cicerone/commit/033bb4dcf97f1ee45bd5d47d164af476faefce81))
- **example:** make the story stage usable ([4fa6628](https://github.com/Salve-Software/react-native-cicerone/commit/4fa662810661ff0056158643862e38c4e4dd4244))
- **example:** resolve the aliases through Metro instead of babel ([eebc79b](https://github.com/Salve-Software/react-native-cicerone/commit/eebc79bdde4ea06214b2f3f7a1a3a0eb1bff1d35))
- **example:** respect the top safe area ([62f39de](https://github.com/Salve-Software/react-native-cicerone/commit/62f39de510e6a479a511f1488c38d2ec43823833))
- **jest:** render the unresolved source-condition template ([abedb1a](https://github.com/Salve-Software/react-native-cicerone/commit/abedb1afd0a32d7939f26a57177e200ec2260916))
- **overlay:** stop assuming the provider sits at the window origin ([df52351](https://github.com/Salve-Software/react-native-cicerone/commit/df523511ff165c23b0ae096069a4ea88d91cc38d))
- **spotlight:** cover the screen corners, not just the edges ([bebdbfa](https://github.com/Salve-Software/react-native-cicerone/commit/bebdbfa2dd8c7022709123178fd31465cf4d4ab7))
- stop restarting animations on every render ([fc914a9](https://github.com/Salve-Software/react-native-cicerone/commit/fc914a98158204cde5fd39ec3bdfae2e0f43715e))
- **test:** drop the unused React import ([51b25f0](https://github.com/Salve-Software/react-native-cicerone/commit/51b25f062ff58fb541796d5381c426312ea928f3))
- **types:** let a theme override carry a partial palette ([4646032](https://github.com/Salve-Software/react-native-cicerone/commit/4646032d9877b27c736408941a24eec0f85aca10))

### Features

- **card:** render the default tour card ([e0ee0e5](https://github.com/Salve-Software/react-native-cicerone/commit/e0ee0e54142af8319fd8250b3b8b67f95c826f61))
- **constants:** port the palette and geometry from the prototype ([188c491](https://github.com/Salve-Software/react-native-cicerone/commit/188c4914cdce5601957f5ec384ea5fb926552514))
- **example:** browse the tour through Storybook ([2ee7128](https://github.com/Salve-Software/react-native-cicerone/commit/2ee712818c639b9a64e9f8d4fdef8341b57c7fbd))
- **example:** demo static, scrolled and highlight steps ([55e66d9](https://github.com/Salve-Software/react-native-cicerone/commit/55e66d9bf7b29f94dc19c77e5117e7318fa69bd3))
- expose the Cicerone namespace as the public entry point ([559187f](https://github.com/Salve-Software/react-native-cicerone/commit/559187fc9f8f87f9319890f6ff0b0585971877c8))
- fade the overlay out when the tour ends ([f006ca8](https://github.com/Salve-Software/react-native-cicerone/commit/f006ca8172fbc9b80a8134fc8ab3d51157e8256b))
- **provider:** drive tour state and step measurement ([fed2685](https://github.com/Salve-Software/react-native-cicerone/commit/fed268561d37a8268ae47dd5c8ad6edf26e9add6))
- **spotlight:** dim the screen and cut the hole over the target ([0f8958e](https://github.com/Salve-Software/react-native-cicerone/commit/0f8958ed629c9e5d170700fe15ea8552a05bb23f))
- **storage:** persist which tours were already seen ([d8fcf3e](https://github.com/Salve-Software/react-native-cicerone/commit/d8fcf3ed13868d0bce9734735c2b3028f8622ff7))
- **target:** register targets and reach the ones below the fold ([5e4c92d](https://github.com/Salve-Software/react-native-cicerone/commit/5e4c92d06a9f8e12c70899949ff71762c01cacd8))
- **types:** declare the public tour API ([17b5580](https://github.com/Salve-Software/react-native-cicerone/commit/17b55800ee8173281f11f8562b85d19589dc49fb))
- **utils:** resolve tour geometry, placement and scrolling ([ad44390](https://github.com/Salve-Software/react-native-cicerone/commit/ad44390471bc7d12fbb9768b1b38caeb38d1ad01))
- **utils:** translate geometry into the overlay's own box ([00648c7](https://github.com/Salve-Software/react-native-cicerone/commit/00648c787224d253590f833c9e62a7ae2dd2902e))
- **website:** add the demo video section ([ddd8a05](https://github.com/Salve-Software/react-native-cicerone/commit/ddd8a050b9b25715a6bd77ea78a0001b56d40a21))
- **website:** use the real logo and icons ([0c32c6a](https://github.com/Salve-Software/react-native-cicerone/commit/0c32c6a7316470b04846ff5b2a10418ee775eebc))
- **website:** wire up i18n with a locale switch ([e5bbef3](https://github.com/Salve-Software/react-native-cicerone/commit/e5bbef3c954ee4ecdc7db5f370f809c11de677f0))

### Performance Improvements

- **spotlight:** cut the per-frame work of a step transition ([9484472](https://github.com/Salve-Software/react-native-cicerone/commit/948447214d60d2ef959dd1e769c85cb076097504))
- **spotlight:** draw the scrim as an even-odd SVG path ([63ea22c](https://github.com/Salve-Software/react-native-cicerone/commit/63ea22c2c41c3ea2b56e07f0d9805eee51974b7b))
