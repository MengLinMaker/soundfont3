"use strict";var r=require("./writeRiffChunk.js");exports.writeSampleDataChunk=t=>{const e=r.writeRiffSubChunk("smpl",t);return r.writeRiffTopChunk("LIST","sdta",e)};
//# sourceMappingURL=writeSampleDataChunk.js.map
