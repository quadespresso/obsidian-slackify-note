import slackifyMarkdown from 'slackify-markdown';
import { Editor, MarkdownView, Plugin, Notice } from 'obsidian';

export default class SlackifyNote extends Plugin {
	private convertMdToSlack(md: string) {
		const slackMarkdown = slackifyMarkdown(md)

		// Replace Slack links with Markdown links. Obsidian already had this right, but slackify-markdown breaks it.
		let result = slackMarkdown.replace(/<(.*?)\|(.*?)>/g, '[$2]($1)')

		// Replace callouts with quotes
		result = result.replace(/\[\!\w+\][-+]?\s+/, '')

		// Un-escape ampersands. slackify-markdown HTML-escapes & to &amp; for
		// Slack's API mrkdwn, but this plugin copies to the clipboard for pasting
		// into the Slack composer, which does NOT decode entities -- so &amp;
		// shows up literally. Decode it back. (< and > escaping is left intact:
		// Slack needs those for link/mention syntax.)
		result = result.replace(/&amp;/g, '&')

		// Strip the zero-width spaces (U+200B) that slackify-markdown wraps around
		// *bold* / _italic_ / ~strike~ markers. The library adds them for Slack's
		// API in-word formatting (e.g. hel*l*o), but this plugin pastes into the
		// Slack composer, where a ZWSP sitting against the marker stops Slack
		// closing it -- so bold/italic render literally as * and _. Remove them.
		result = result.replace(/​/g, '')

		return result;
	}

	async onload() {
		this.addCommand({
			id: 'slackify-note',
			name: 'Copy note as Slack Markdown',
			editorCallback: async (editor: Editor, view: MarkdownView) => {
				// Convert the note to Slack markdown
				const noteMarkdown = editor.getValue()
				const slackMarkdown = this.convertMdToSlack(noteMarkdown)

				// Copy the slackMarkdown to the clipboard
				await navigator.clipboard.writeText(slackMarkdown)

				new Notice('Copied note as Slack Markdown')
			}
		});

		this.addCommand({
			id: 'slackify-selection',
			name: 'Copy selection as Slack Markdown',
			editorCallback: async (editor: Editor, view: MarkdownView) => {
				// Convert the note to Slack markdown
				const noteMarkdown = editor.getSelection()
				const slackMarkdown = this.convertMdToSlack(noteMarkdown)

				// Copy the slackMarkdown to the clipboard
				await navigator.clipboard.writeText(slackMarkdown)

				new Notice('Copied selection as Slack Markdown')
			}
		});
	}

	onunload() {

	}
}
