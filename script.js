var binData;
var parsedData = {}

// Function that deals with the data within HTML
async function ingest() {

    // set 'uploadedFile' to the File object of the file selected
    var uploadedFile = document.getElementById('fileUpload').files[0];

    // set 'fileContents' to the contents of the file
    var fileContents = await uploadedFile.text();

    binData = new Uint8Array(str2ab(fileContents));
    console.log(binData);
    parseData(binData);
}

function parseData(data) {
    for(var n = 0; n < data.length; n++) {
        if(data[n] == 0x0A) {
            parsedData['TAG_COMPOUND']
        }
    }
}

class tag {
    constructor(type, defLen, payloadLen, label){
        this.type = type;
        this.definedLength = defLen;
        this.payloadLength = payloadLen
        this.builtHeader = new Uint8Array();
        this.builtPayload = new Uint8Array();
        this.label = label;
    }

    get builtHeader() {
        return this.builtHeader;
    }

    get type() {
        return this.type;
    }

    get payload() {
        return this.payload;
    }

    verify() {

    }

}

class tagByte extends tag {
    constructor(label) {
        super(0x01, true, 1, label);
    }
}

function str2ab(str){
    var buf = new ArrayBuffer(str.length*2);
    var bufView = new Uint8Array(buf);
    for (var i = 0, strLen = str.length; i < strLen; i++) {
        bufView[i] = str.charCodeAt(i);
    }
    return buf;
}

// debugger tool for hex output
console.hex = (d) => console.log((Object(d).buffer instanceof ArrayBuffer ? new Uint8Array(d.buffer) : 
typeof d === 'string' ? (new TextEncoder('utf-8')).encode(d) : 
new Uint8ClampedArray(d)).reduce((p, c, i, a) => p + (i % 16 === 0 ? i.toString(16).padStart(6, 0) + '  ' : ' ') + 
c.toString(16).padStart(2, 0) + (i === a.length - 1 || i % 16 === 15 ? 
' '.repeat((15 - i % 16) * 3) + Array.from(a).splice(i - i % 16, 16).reduce((r, v) => 
r + (v > 31 && v < 127 || v > 159 ? String.fromCharCode(v) : '.'), '  ') + '\n' : ''), ''));