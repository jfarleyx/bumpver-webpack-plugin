const fs = require('fs');
const path = require('path');

var BumpVerPlugin = function(params) {    
    this.context = path.dirname(module.parent.filename);

    //accommodate single file name as string or array of file names
    if (typeof params.files == 'string' || params.files instanceof String) {
        this.files = [params.files];
    } else {
        this.files = params.files || [];
    }

    // set default level of patch or use level provided
    if (params.level == undefined || params.level === '') {
        this.level = 'patch';
    } else if (['major','minor','patch'].includes(params.level.toLowerCase()) === false) {
        this.level = 'patch';
    } else {
        this.level = params.level.toLowerCase();
    }    
}

// hook into webpack
BumpVerPlugin.prototype.apply = function(compiler) {
    var self = this;

    return compiler.plugin('done', function() {
        self.files.forEach(function(file) {
            var file = path.join(self.context, file);
            var json = self.increment(file, self.level);

            fs.writeFile(file, JSON.stringify(json, null, 2), function(err) {        
                if (err) throw err;
            });
        });
    });
}

// increment build number based on level
BumpVerPlugin.prototype.increment = function(file, level) {
    var json = require(file);
    var versions = json.version.split('.');

    switch (level) {
        case 'major':
            versions[0] = parseInt(versions[0]) + 1;
            versions[1] = 0; //reset minor to 0
            versions[2] = 0; //reset patch to 0  
            break;          
        case 'minor': 
            versions[1] = parseInt(versions[1]) + 1;
            versions[2] = 0; //reset patch to 0
            break;
        case 'patch':
            versions[2] = parseInt(versions[2]) + 1;
            break;
    }  
    
    json.version = versions.join('.');

    return json;
}

module.exports = BumpVerPlugin;