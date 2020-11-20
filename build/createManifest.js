'use strict';

const fs = require('fs');
const path = require('path');
const packageJson = require('../package.json');

const pluginSettings = packageJson['obsidian-bibliography'];
const manifestFn = path.resolve(pluginSettings.outputDir, 'manifest.json');

const manifest = {
    "id": `obsidian-${packageJson.name}`,
	"name": `${packageJson.name}`,
	"version": packageJson.version,
	"minAppVersion": pluginSettings.minAppVersion,
	"description": packageJson.description,
	"author": packageJson.author,
	"authorUrl": packageJson.homepage,
	"isDesktopOnly": pluginSettings.isDesktopOnly
};

fs.writeFileSync(manifestFn, JSON.stringify(manifest, null, 4), 'utf8');
