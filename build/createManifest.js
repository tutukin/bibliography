'use strict';

import fs from 'fs';
import path from 'path';

import rollupConfig from './rollup.config.js';

const packageJson = getPackageJson();

const manifestFn = path.resolve(rollupConfig.output.dir, 'manifest.json');

const manifest = {
    "id": `obsidian-${packageJson.name}`,
	"name": `${packageJson.name}`,
	"version": packageJson.version,
	"minAppVersion": packageJson.manifest.minAppVersion,
	"description": packageJson.description,
	"author": packageJson.author,
	"authorUrl": packageJson.homepage,
	"isDesktopOnly": packageJson.manifest.isDesktopOnly
};

fs.writeFileSync(manifestFn, JSON.stringify(manifest, null, 4), 'utf8');

function getPackageJson() {
    const content = fs.readFileSync('package.json', 'utf8');
    return JSON.parse(content);
}