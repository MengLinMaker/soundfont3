const t=(t,e,n)=>{for(let r=0;r<n.length;r++)t.setUint8(e+r,n.charCodeAt(r))},e=(t,e)=>{const n=new Int8Array(t.byteLength+e.byteLength);return n.set(new Int8Array(t),0),n.set(new Int8Array(e),t.byteLength),new Int8Array(n.buffer)};export{e as concatBuffer,t as dataViewWriteString};
//# sourceMappingURL=utils.js.map
