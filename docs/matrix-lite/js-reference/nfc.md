<h2 style="padding-top:0">NFC</h2>

### Device Compatibility
<img class="creator-compatibility-icon" src="../../../img/creator-icon.svg">

## Overview
The following sections will go over how to install and access the NFC chip on your MATRIX Creator. This library currently implements the following:

- **Reading General Information**  (All tags)
- **Reading Pages**     (MIFARE Ultralight & NTAG)
- **Writing to a Page** (MIFARE Ultralight & NTAG)
- **Reading NDEF**      (MIFARE Ultralight & NTAG)
- **Writing NDEF**      (MIFARE Ultralight & NTAG)

Helpful Smartphone Apps For NFC:

- <a href="https://apps.apple.com/us/app/nfc-taginfo-by-nxp/id1246143596" target="_blank">iOS App</a>
- <a href="https://play.google.com/store/apps/details?id=com.nxp.nfc.tagwriter&hl=en_US" target="_blank">Android App</a>

???+ info "Installation"
    <!-- **** -->

    !!! warning "Make sure you've installed [MATRIX HAL NFC](/matrix-hal/getting-started/installation-nfc) before continuing."
    
    ??? danger "Only one process can interact with the NFC Chip!"
        This applies to anything that interfaces with NFC, including the C++ library. Multiple processes using NFC will cause unpredictable errors.

    Inside your Node.js project, run the following.
    ```js
    npm install @matrix-io/matrix-lite-nfc --save
    ```

## Import Statement
```js
const nfc = require("@matrix-io/matrix-lite-nfc");
```

### nfc

??? summary ".status()"
    When a read or write function completes, it will return a status code to indicate the result. `nfc.Status` returns a string of what that number means.
    ```js
    nfc.status(/*number*/);

    // Example output
    // nfc.status(256) will return "Activation Done"
    ```
??? summary ".message()"
    Represents an NDEF message. Each message can contain multiple NDEF Records. Each record can hold text, cellular numbers, emails, links, etc.

    ```js
    // Creates an empty message
    let msg = new nfc.message();

    // Can be initialized from a scanned tag (covered in nfc.read)
    // let msg = new nfc.message(tag.ndef.content);
    ```

    ??? summary ".addUriRecord()"
        ```js
        msg.addUriRecord("https://community.matrix.one");
        msg.addUriRecord("tel:+14085551212");
        msg.addUriRecord("sms:+14085551212");
        msg.addUriRecord("mailto:user@example.com");
        ```

        ```python
        // List of URI protocols //
        http://www.
        https://www.
        http://
        https://
        tel:
        mailto:
        ftp://anonymous:anonymous@
        ftp://ftp.
        ftps://
        sftp://
        smb://
        nfs://
        ftp://
        dav://
        news:
        telnet://
        imap:
        rtsp://
        urn:
        pop:
        sip:
        sips:
        tftp:
        btspp://
        btl2cap://
        btgoep://
        tcpobex://
        irdaobex://
        file://
        urn:epc:id:
        urn:epc:tag:
        urn:epc:pat:
        urn:epc:raw:
        urn:epc:
        urn:nfc:
        ```

    ??? summary ".addTextRecord()"
        ```js
        // Defaults to en
        msg.addTextRecord("Hello World");

        // Or uses a specified Language
        msg.addTextRecord("Hola Mundo", "es");
        ```

    ??? summary ".addMimeMediaRecord()"
        ```
        msg.addMimeMediaRecord("text/json", '{"answer": 42}');
        ```

    ??? summary ".addEmptyRecord()"
        ```
        msg.addEmptyRecord();
        ```

    ??? summary ".getRecords()"
        ```js
        // Returns an array of objects representing NDEF Records
        msg.getRecords();
        
        // Example output
        [
        {
          tnf: 'Well Known',
          type: 'U',
          payload: '.https://community.matrix.one',
          ByteSize: 33,
          typeLength: 1,
          payloadLength: 29,
          IdLength: 0
        },
        {
          tnf: 'Well Known',
          type: 'T',
          payload: '.enHello World',
          ByteSize: 23,
          typeLength: 1,
          payloadLength: 19,
          IdLength: 0
        }
        ]
        ```

    ??? summary ".getRecord()"
        ```js
        // Returns the specified NDEF Record
        msg.getRecord(0);

        // Example output
        {
          tnf: 'Well Known',
          type: 'U',
          payload: '.https://community.matrix.one',
          ByteSize: 33,
          typeLength: 1,
          payloadLength: 29,
          IdLength: 0
        }
        ```

    ??? summary ".getRecordCount()"
        ```js
        // Returns the number of NDEF Records in an NDEF Message
        msg.getRecordCount();
        ```
    ??? summary ".getEncodedSize()"
        ```js
        // Returns the size of the encoded representation of the NDEF message
        msg.getEncodedSize();
        ```

### nfc.read
NFC tags are read by using a loop to check if a tag is within range.

??? summary ".start()"
    ```js
    // Configure what you want to read
    let options = {
        rate: 100,   // Read loop speed (Milliseconds)
        // At least 1 read options is required. Less options -> faster reading!
        info: true,  // Generic information for any NFC tag
        pages: true, // All page data
        page: 0,     // A single page(faster than pages)
        ndef: true   // All NDEF data
    }

    // Starts the loop
    nfc.read.start(options, (code, tag) => {
        // code: NFC activation status
        // tag : Object with requested NFC data
    });
    ```

??? summary ".stop()"
    ```js
    // Kills the NFC read loop
    nfc.read.stop();
    ```

??? example "Reading Examples"
    ```js tab="Info"
    const nfc = require("@matrix-io/matrix-lite-nfc");

    nfc.read.start({rate:100, info:true}, (code, tag)=>{
        if (code === 256){
            console.log("Tag Was Scanned");
            console.log(tag);
        }

        else if (code === 1024)
            console.log("Nothing Was Scanned");
    });

    //* Example Output *//
    {
      info: {
        technology: 'A',
        type: '2',
        UID: '043F418AA86481',
        ATQ: '4400',
        SAK: '00',
        card_family: 'Mifare Ultralight | NTAG',
        IC_type: 'NTAG215',
        bit_rate: -1,
        storage_size: 504,
        updated: true,
        read_status: 0
      }
    }

    ```

    ```js tab="NDEF"
    const nfc = require("@matrix-io/matrix-lite-nfc");

    nfc.read.start({rate:100, ndef:true}, (code, tag)=>{
        if (code === 256){
                console.log("Tag Was Scanned");

                // Create an NDEF message from an scanned tag
                let msg = new nfc.message(tag.ndef.content);
                console.log(msg.getRecords());
        }

        else if (code === 1024)
            console.log("Nothing Was Scanned");
    });

    //* Example Output *//
    [
        {
            tnf: 'Well Known',
            type: 'U',
            payload: '.https://community.matrix.one',
            ByteSize: 33,
            typeLength: 1,
            payloadLength: 29,
            IdLength: 0
        },
        {
            tnf: 'Well Known',
            type: 'T',
            payload: '.enHello World',
            ByteSize: 23,
            typeLength: 1,
            payloadLength: 19,
            IdLength: 0
        }
    ]
    ```

    ```js tab="Pages"
    const nfc = require("@matrix-io/matrix-lite-nfc");

    nfc.read.start({rate:100, pages:true}, (code, tag)=>{
        if (code === 256){
                console.log("Tag Was Scanned");
                console.log(tag.pages);
        }

        else if (code === 1024)
            console.log("Nothing Was Scanned");
    });

    //* Example Output *//
    {
    read_complete: true,
    updated: true,
    content: [
        [ 4, 63, 65, 242 ],     [ 138, 168, 100, 129 ], [ 199, 72, 0, 0 ],
        [ 225, 16, 62, 0 ],     [ 3, 94, 145, 1 ],      [ 29, 85, 0, 104 ],
        [ 116, 116, 112, 115 ], [ 58, 47, 47, 99 ],     [ 111, 109, 109, 117 ],
        [ 110, 105, 116, 121 ], [ 46, 109, 97, 116 ],   [ 114, 105, 120, 46 ],
        [ 111, 110, 101, 17 ],  [ 1, 17, 85, 0 ],       [ 116, 101, 108, 58 ],
        [ 43, 49, 52, 48 ],     [ 56, 53, 53, 53 ],     [ 49, 50, 49, 50 ],
        [ 17, 1, 19, 84 ],      [ 2, 101, 110, 72 ],    [ 101, 108, 108, 111 ],
        [ 32, 87, 111, 114 ],   [ 108, 100, 32, 240 ],  [ 159, 153, 130, 81 ],
        [ 1, 13, 84, 2 ],       [ 101, 115, 72, 111 ],  [ 108, 97, 32, 77 ],
        [ 117, 110, 100, 111 ], [ 254, 0, 0, 0 ],       [ 254, 0, 0, 0 ],
        [ 104, 97, 99, 105 ],   [ 110, 46, 99, 111 ],   [ 109, 254, 0, 0 ],
        [ 0, 0, 0, 0 ],         [ 0, 0, 0, 0 ],         [ 0, 0, 0, 0 ],
        [ 0, 0, 0, 0 ],         [ 0, 0, 0, 0 ],         [ 0, 0, 0, 0 ],
        [ 0, 0, 0, 0 ],         [ 0, 0, 0, 0 ],         [ 0, 0, 0, 0 ],
        [ 0, 0, 0, 0 ],         [ 0, 0, 0, 0 ],         [ 0, 0, 0, 0 ],
        [ 0, 0, 0, 0 ],         [ 0, 0, 0, 0 ],         [ 0, 0, 0, 0 ],
        [ 0, 0, 0, 0 ],         [ 0, 0, 0, 0 ],         [ 0, 0, 0, 0 ],
        [ 0, 0, 0, 0 ],         [ 0, 0, 0, 0 ],         [ 0, 0, 0, 0 ],
        [ 0, 0, 0, 0 ],         [ 0, 0, 0, 0 ],         [ 0, 0, 0, 0 ],
        [ 0, 0, 0, 0 ],         [ 0, 0, 0, 0 ],         [ 0, 0, 0, 0 ],
        [ 0, 0, 0, 0 ],         [ 0, 0, 0, 0 ],         [ 0, 0, 0, 0 ],
        [ 0, 0, 0, 0 ],         [ 0, 0, 0, 0 ],         [ 0, 0, 0, 0 ],
        [ 0, 0, 0, 0 ],         [ 0, 0, 0, 0 ],         [ 0, 0, 0, 0 ],
        [ 0, 0, 0, 0 ],         [ 0, 0, 0, 0 ],         [ 0, 0, 0, 0 ],
        [ 0, 0, 0, 0 ],         [ 0, 0, 0, 0 ],         [ 0, 0, 0, 0 ],
        [ 0, 0, 0, 0 ],         [ 0, 0, 0, 0 ],         [ 0, 0, 0, 0 ],
        [ 0, 0, 0, 0 ],         [ 0, 0, 0, 0 ],         [ 0, 0, 0, 0 ],
        [ 0, 0, 0, 0 ],         [ 0, 0, 0, 0 ],         [ 0, 0, 0, 0 ],
        [ 0, 0, 0, 0 ],         [ 0, 0, 0, 0 ],         [ 0, 0, 0, 0 ],
        [ 0, 0, 0, 0 ],         [ 0, 0, 0, 0 ],         [ 0, 0, 0, 0 ],
        [ 0, 0, 0, 0 ],         [ 0, 0, 0, 0 ],         [ 0, 0, 0, 0 ],
        [ 0, 0, 0, 0 ],         [ 0, 0, 0, 0 ],         [ 0, 0, 0, 0 ],
        [ 0, 0, 0, 0 ],         [ 0, 0, 0, 0 ],         [ 0, 0, 0, 0 ],
        [ 0, 0, 0, 0 ],
        ... 35 more items
    ],
    read_status: 17474
    }

    ```

    ```js tab="Page"
    const nfc = require("@matrix-io/matrix-lite-nfc");

    nfc.read.start({rate:100, page:0}, (code, tag)=>{
        if (code === 256){
                console.log("Tag Was Scanned");
                console.log(tag.page);
        }

        else if (code === 1024)
            console.log("Nothing Was Scanned");
    });

    //* Example Output *//
    [ 4, 63, 65, 242 ]
    ```
    
    ```js tab="Everything"
    const nfc = require("@matrix-io/matrix-lite-nfc");

    let options = {
        rate: 50,    // Read loop speed (Milliseconds)
        // All these options enabled will slow reading speeds
        info: true,  // Generic information for any NFC tag
        pages: true, // All page data
        page: 0,     // A single page(faster than pages)
        ndef: true   // All NDEF data
    }

    // Starts the loop
    nfc.read.start(options, (code, tag) => {
        if (code === 256){
            console.log("Tag Was Scanned");
            console.log(tag);
        }

        else if (code === 1024)
            console.log("Nothing Was Scanned");
    });

    //* Example Output *//
    {
    info: {
        technology: 'A',
        type: '2',
        UID: '043F418AA86481',
        ATQ: '4400',
        SAK: '00',
        card_family: 'Mifare Ultralight | NTAG',
        IC_type: 'NTAG215',
        bit_rate: -1,
        storage_size: 504,
        updated: true,
        read_status: 0
    },
    pages: {
        read_complete: true,
        updated: true,
        content: [
        [Array], [Array], [Array], [Array], [Array], [Array], [Array],
        [Array], [Array], [Array], [Array], [Array], [Array], [Array],
        [Array], [Array], [Array], [Array], [Array], [Array], [Array],
        [Array], [Array], [Array], [Array], [Array], [Array], [Array],
        [Array], [Array], [Array], [Array], [Array], [Array], [Array],
        [Array], [Array], [Array], [Array], [Array], [Array], [Array],
        [Array], [Array], [Array], [Array], [Array], [Array], [Array],
        [Array], [Array], [Array], [Array], [Array], [Array], [Array],
        [Array], [Array], [Array], [Array], [Array], [Array], [Array],
        [Array], [Array], [Array], [Array], [Array], [Array], [Array],
        [Array], [Array], [Array], [Array], [Array], [Array], [Array],
        [Array], [Array], [Array], [Array], [Array], [Array], [Array],
        [Array], [Array], [Array], [Array], [Array], [Array], [Array],
        [Array], [Array], [Array], [Array], [Array], [Array], [Array],
        [Array], [Array],
        ... 35 more items
        ],
        read_status: 17474
    },
    page: [ 4, 63, 65, 242 ],
    ndef: {
        valid: true,
        updated: true,
        content: [
        145, 1,                    29,
        85,  0,                    104,
        116, 116,                  112,
        115, 58,                   47,
        47,  99,                   111,
        109, 109,                  117,
        110, 105,                  116,
        121, 46,                   109,
        97,  116,                  114,
        105, 120,                  46,
        111, 110,                  101,
        17,  1,                    17,
        85,  0,                    116,
        101, 108,                  58,
        43,  49,                   52,
        48,  56,                   53,
        53,  53,                   49,
        50,  49,                   50,
        17,  1,                    19,
        84,  2,                    101,
        110, 72,                   101,
        108, 108,                  111,
        32,  87,                   111,
        114, 108,                  100,
        32,  240,                  159,
        153, 130,                  81,
        1,   13,                   84,
        2,   101,                  115,
        72,  111,                  108,
        97,  32,                   77,
        117, 110,                  100,
        111, toString: [Function], toHex: [Function]
        ],
        read_status: 0
    }
    }
    ```

### nfc.write
Writing allows NDEF messages to be written & erased. There is also an option to directly write to a tag's page. Writing is normally done within an NFC read loop.

??? summary ".message()"
    ```js
    // Create an NDEF message with a record
    var msg = new nfc.message();
    msg.addUriRecord("https://community.matrix.one");
    
    // Write the message into the NFC tag
    nfc.write.message(msg).then((code)=>{
        // codes.activation : NFC activation status
        // codes.write      : NFC write status
    });
    ```

??? summary ".erase()"
    ```js
    // Erase the NDEF message on an NFC tag
    nfc.write.erase().then((code)=>{
        // codes.activation : NFC activation status
        // codes.write      : NFC write status
    });
    ```

??? summary ".page()"
    !!! danger "Writing to a random page may lock your NFC tag"
        ```js
        var page_index = 25;            // page you want to overwrite
        var page_byte = [48,45,59,21];  // Array of numbers that represents a page

        nfc.write.page(page_index, page_byte).then((code)=>{
            // codes.activation : NFC activation status
            // codes.write      : NFC write status
        });
        ```

??? example "Writing Examples"
    ```js tab="NDEF"
    const nfc = require("@matrix-io/matrix-lite-nfc");

    // Create an NDEF message with a link
    var msg = new nfc.message();
    msg.addUriRecord("https://community.matrix.one");

    nfc.read.start({rate: 100, info:true}, (code, tag)=>{
            if (code === 256){
                nfc.write.message(msg).then((code)=>{
                    console.log("Activation Status:" + code.activation + " == " + nfc.status(code.activation));
                    console.log("Write Status:" + code.write + " == " + nfc.status(code.write));

                    // Exit after successful writing
                    if(code.write === 0)
                        nfc.read.stop();
                });
            }

            else if (code === 1024)
                console.log("Nothing Was Scanned");
    });
    ```
    
    ```js tab="Erase NDEF"
    const nfc = require("@matrix-io/matrix-lite-nfc");

    nfc.read.start({rate: 100, info:true}, (code, tag)=>{
        if (code === 256){
            nfc.write.erase().then((code)=>{
                console.log("Activation Status:" + code.activation + " == " + nfc.status(code.activation));
                console.log("Write Status:" + code.write + " == " + nfc.status(code.write));

                // Exit after successful writing
                if(code.write === 0)
                    nfc.read.stop();
            });
        }

        else if (code === 1024)
            console.log("Nothing Was Scanned");
    });
    ```

    ```js tab="Page"
    /* DO NOT WRITE TO A PAGE IF YOU DON'T KNOW WHAT IT DOES. */
    const nfc = require("@matrix-io/matrix-lite-nfc");

    let page_index = /*insert page number*/;
    let page_byte = [48,45,59,21];

    nfc.read.start({rate: 100, info:true}, (code, tag)=>{
            if (code === 256){
                nfc.write.page(page_index, page_byte).then((code)=>{
                    console.log("Activation Status:" + code.activation + " == " + nfc.status(code.activation));
                    console.log("Write Status:" + code.write + " == " + nfc.status(code.write));

                    // Exit after successful writing
                    if(code.write === 0)
                        nfc.read.stop();
                });
            }

            else if (code === 1024)
                console.log("Nothing Was Scanned");
    });
    ```