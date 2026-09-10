# Slackify Note (fork)

> **Fork note.** This is a personal fork of [jeremyoverman/obsidian-slackify-note](https://github.com/jeremyoverman/obsidian-slackify-note).
> The only change: `slackify-markdown` HTML-escapes `&` to `&amp;` (correct for Slack's *API* mrkdwn), but this plugin copies to the
> clipboard for pasting into the Slack *composer*, which does not decode entities, so `&amp;` showed up literally. The fork decodes
> `&amp;` back to `&` as a post-process (see `convertMdToSlack` in `main.ts`). `<`/`>` escaping is left intact for Slack link/mention syntax.
> Installed under a distinct plugin id (`slackify-note-fork`) so Obsidian's community updater never overwrites it.

This plugin adds the following commands:
* `Slackify Note: Copy note as Slack Markdown` - Convert the note to Slack compliant markdown.
* `Slackify Note: Copy selection as Slack Markdown` - Convert the current selection to Slack compliant markdown.

[Install this plugin](https://obsidian.md/plugins?id=slackify-note)

## Examples

**Obsidian Selection**:

![Example 1](./example_1.png)

**Slack Message**:

![Example 2](./example_2.png)
