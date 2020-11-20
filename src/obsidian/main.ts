import { Plugin } from 'obsidian';
import { name } from '../../package.json';
import SearchModal from './searchModal';
import SearchService from './searchService';

export default class MyPlugin extends Plugin {
    onload() {
        this.addCommand({
            id: name,
            name: 'Get bibliography',
            checkCallback: (checking: boolean) => {
                let leaf = this.app.workspace.activeLeaf;
				if (leaf) {
					if (!checking) {
                        const searchService = new SearchService();
						new SearchModal(this.app, searchService).open();
					}
					return true;
				}
				return false;
            }
        });
    }

    onunload() {
        console.log(`Unloading ${name} plugin`);
    }
}