+++
date = 2023-11-10T03:00:00Z
title = "Key Transition Statement"
disableSummary = false
+++

鍵を更新しました。

<!--more-->

Date: 2023-11-10

I have recently set up a new OpenPGP key, and will be transitioning away from my old one.

The old key will continue to be valid for some time, but I prefer all future correspondence to come to the new one. I would also like this new key to be re-integrated into the web of trust.  This message is signed by both keys to certify the transition.

The old key was:

```
pub   rsa4096/9130CD952A289F91 2023-02-09
      Key fingerprint = 91663840771CB0ADF9E3B6489130CD952A289F91
```

And the new key is:

```
pub   ed25519/BC30D9572FE96AAD 2023-11-10
      Key fingerprint = A51A5C63D0DA50B2B64B44EBBC30D9572FE96AAD
```

To fetch the full key from a public key server, you can simply do:

```bash
gpg --keyserver keys.openpgp.org --recv-key 'A51A5C63D0DA50B2B64B44EBBC30D9572FE96AAD'
```

If you already know my old key, you can now verify that the new key is
signed by the old one:

```bash
gpg --check-sigs 'A51A5C63D0DA50B2B64B44EBBC30D9572FE96AAD'
```

If you don't already know my old key, or you just want to be double extra paranoid, you can check the fingerprint against the one above:

```bash
gpg --fingerprint 'A51A5C63D0DA50B2B64B44EBBC30D9572FE96AAD'
```

If you are satisfied that you've got the right key, and the UIDs match what you expect, I'd appreciate it if you would sign my key. You can do that by issuing the following command:

> **NOTE: if you have previously signed my key but did a local-only signature (lsign), you will not want to issue the following, instead you will want to use --lsign-key, and not send the signatures to the keyserver**

```bash
gpg --sign-key 'A51A5C63D0DA50B2B64B44EBBC30D9572FE96AAD'
```

I'd like to receive your signatures on my key. You can either send me an e-mail with the new signatures (if you have a functional MTA on your system):

```bash
gpg --export 'A51A5C63D0DA50B2B64B44EBBC30D9572FE96AAD' | gpg --encrypt -r 'A51A5C63D0DA50B2B64B44EBBC30D9572FE96AAD' --armor | mail -s 'OpenPGP Signatures' <ts@nectarition.jp>
```

Additionally, I highly recommend that you implement a mechanism to keep your key material up-to-date so that you obtain the latest revocations, and other updates in a timely manner. You can do regular key updates by using parcimonie[1] to refresh your keyring. Parcimonie is a daemon that slowly refreshes your keyring from a keyserver over Tor. It uses a randomized sleep, and fresh tor circuits for each key. The purpose is to make it hard for an attacker to correlate the key updates with your keyring.

I also highly recommend checking out:

https://riseup.net/openpgp/best-practices

Please let me know if you have any questions, or problems, and sorry for the inconvenience.

SAIGUSA Tomotada

> This document is based on [this](https://help.riseup.net/en/security/message-security/openpgp/key-transition)

## Raw files

- [post.md](/raw/20231110-change-key/post.md)
- [NewKey.asc](/raw/20231110-change-key/NewKey.asc)
- [SignNewKey.asc](/raw/20231110-change-key/SignNewKey.asc)
- [SignOldKey.asc](/raw/20231110-change-key/SignOldKey.asc)
