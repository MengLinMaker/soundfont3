/**
 * Inserts a string into buffer at offset.
 * @param view {DataView} -DataView of a buffer.
 * @param offset {number} - offset in DataView.
 * @param string {string} - string to insert into DataView.
 */
export const dataViewWriteString = (view: DataView, offset: number, string: string) => {
  for (let i = 0; i < string.length; i++) {
    view.setUint8(offset + i, string.charCodeAt(i))
  }
}
