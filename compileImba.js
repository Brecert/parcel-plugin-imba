const Asset = require("parcel-bundler/src/Asset");


var compiler = require('imba/lib/compiler');
var helpers = require('imba/lib/compiler/helpers');
var path = require('path');


class ImbaAsset extends Asset {
  constructor(name, options) {
    super(name, options);
    this.type = 'js';
	}
	
	imbaLoader(content) {
		var self = this

		const opts = {
			sourceMap: this.options.sourceMaps,
			comments: false,
			sourceMap: this.options.sourceMaps
			sourcePath: this.relativeName
		};

		try {
				let result = compiler.compile(content, opts);
				let js = result.toString();
				if(result.warnings && true){
					result.warnings.forEach(function(warn){
						let msg = helpers.printWarning(result.source,warn);
						let err = new Error(msg);
						console.log(err);
					});
				}
				return {js: js, map: result.sourcemap}
				
			} catch(e) {
				let err = new Error(e.prettyMessage ? e.prettyMessage() : e.message);
				console.log(err);
		}
	}

	async generate() {

		let transpiled = this.imbaLoader(this.contents)

		return [
			{
				type: 'js',
				value: this.options.sourceMaps ? transpiled.js  : transpiled.js, transpiled.sourceMap
			}
		]
	}
}

module.exports = ImbaAsset