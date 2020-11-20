import { App, ButtonComponent, Modal, TextComponent, Vault } from 'obsidian';
import SearchService from './searchService';

export default class SearchModal extends Modal {
    private searchService: SearchService;
    private searchResult: any;

    constructor(app: App, searchService: SearchService) {
        super(app);
        this.searchService = searchService;
    }

    async onOpen() {
        let { contentEl } = this;

        contentEl.createEl('h2', { text: 'Get bibliography' });

        let textComponent = new TextComponent(contentEl)
            .setPlaceholder('isbn');
        
        let searchButton = new ButtonComponent(contentEl)
            .setButtonText('Search')
            .onClick(async () => {
                this.searchResult = await this.searchService.search(textComponent.getValue());
                searchResultEl.textContent = this.searchResult.description;
            });

        let searchResultEl = contentEl.createEl('p', { text: '...' });

        let createButton = new ButtonComponent(contentEl)
            .setButtonText('Create')
            .onClick(() => this.createBiblio());
    }

    onClose() {
        let { contentEl } = this;
        contentEl.empty();
    }

    async createBiblio() {
        const vault: Vault = this.app.vault;
        const {key, description} = this.searchResult;
        
        try {
            const file = await vault.create(`${key}.md`, this.getContent(key, description))
            await this.app.workspace.activeLeaf.openFile(file);
        } catch (ex) {
            console.log('Got an error');
            console.error(ex);
        } finally {
            this.close();
        }
    }

    getContent(key: string, description: string): string {
        return `${description}

---
        
Key: ${key}`;
    }
}