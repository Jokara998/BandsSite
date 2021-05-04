
const convertBase64ToBinary = (image) => {
    let decompressedImg = image.split('').map((c,i,a)=>i%2?undefined:new Array(2+parseInt(a[i+1],36)).join(c)).join('');
    const string64 = decompressedImg.split(',')
    const bytes = Buffer.from(string64[1], 'base64');
    return bytes;
}


module.exports = {
    convertBase64ToBinary,
}


