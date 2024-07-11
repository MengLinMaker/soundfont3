"use strict";exports.concatBuffer=(t,e)=>{const r=new Int8Array(t.byteLength+e.byteLength);return r.set(new Int8Array(t),0),r.set(new Int8Array(e),t.byteLength),new Int8Array(r.buffer)},exports.dataViewWriteString=(t,e,r)=>{for(let n=0;n<r.length;n++)t.setUint8(e+n,r.charCodeAt(n))};
//# sourceMappingURL=utils.js.map
