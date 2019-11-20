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

    Inside your Python project, run the following.
    ```py
    sudo python3 -m pip install pybind11
    sudo python3 -m pip install matrix-lite-nfc
    ```

## Import Statement
```py
import matrix_lite_nfc as nfc
```

### nfc

??? summary ".status()"
    When a read or write function completes, it will return a status code to indicate the result. `nfc.Status` returns a string of what that number means.
    ```py
    nfc.status(/*number*/);

    # Example output
    # nfc.status(256) will return "Activation Done"
    ```
??? summary ".Message()"
    Represents an NDEF message. Each message can contain multiple NDEF Records. Each record can hold text, cellular numbers, emails, links, etc.

    ```py
    # Creates an empty message
    msg = nfc.Message()

    # Can be initialized from a scanned tag (covered in nfc.read)
    # msg = nfc.Message(tag.ndef.content)
    ```

    ??? summary ".addUriRecord()"
        ```py
        msg.addUriRecord("https://community.matrix.one")
        msg.addUriRecord("tel:+14085551212")
        msg.addUriRecord("sms:+14085551212")
        msg.addUriRecord("mailto:user@example.com")
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
        ```py
        # Defaults to en
        msg.addTextRecord("Hello World")

        # Or uses a specified Language
        msg.addTextRecord("Hola Mundo", "es")
        ```

    ??? summary ".addMimeMediaRecord()"
        ```
        msg.addMimeMediaRecord("text/json", '{"answer": 42}')
        ```

    ??? summary ".getRecords()"
        ```py
        # Returns an array of objects representing NDEF Records
        msg.getRecords()
        
        # Example output
        [
        {
          tnf: 'Well Known',
          type: 'U',
          payload: '.https://community.matrix.one',
          byteSize: 33,
          typeLength: 1,
          payloadLength: 29,
          IdLength: 0
        },
        {
          tnf: 'Well Known',
          type: 'T',
          payload: '.enHello World',
          byteSize: 23,
          typeLength: 1,
          payloadLength: 19,
          IdLength: 0
        }
        ]
        ```

    ??? summary ".getRecord()"
        ```py
        # Returns the specified NDEF Record
        msg.getRecord(0)

        # Example output
        {
          tnf: 'Well Known',
          type: 'U',
          payload: '.https://community.matrix.one',
          byteSize: 33,
          typeLength: 1,
          payloadLength: 29,
          IdLength: 0
        }
        ```

    ??? summary ".getRecordCount()"
        ```py
        # Returns the number of NDEF Records in an NDEF Message
        msg.getRecordCount()
        ```
    ??? summary ".getEncodedSize()"
        ```py
        # Returns the size of the encoded representation of the NDEF message
        msg.getEncodedSize()
        ```

### nfc.read
NFC tags can be read from a loop in a spawned thread or a synchronous function call.

??? summary ".start()"
    ```py
    # Configure what you want to read
    options = {
        "rate": 1,   # Read loop speed (Seconds)
        # At least 1 read options is required. Less options -> faster reading
        "info": True,  # Generic information for any NFC tag
        "pages": True, # All page data
        "page": 0,     # A single page(faster than pages)
        "ndef": True   # All NDEF data
    }

    def read_callback(tag):
        print(tag.status) # NFC activation status
        print(tag) # Object with requested NFC data

    # Starts the loop
    nfc.read.start(options, read_callback)
    ```

??? summary ".stop()"
    ```py
    # Kills the NFC read loop
    nfc.read.stop()
    ```

??? summary ".scan()"
    ```py
    # Synchronous tag reading
    tag = nfc.read.scan({
        # At least 1 read options is required. Less options -> faster reading!
        "info": True,  # Generic information for any NFC tag
        "pages": True, # All page data
        "ndef": True,  # A single page(faster than pages)
        "page": 0,     # All NDEF data
    })
    ```

??? example "Reading Examples"
    ```py tab="Info"
    import matrix_lite_nfc as nfc

    def read_callback(tag):
        if (tag.status == 256):
            print("Tag Was Scanned")
            print(tag.info)

        elif (tag.status == 1024):
            print("Nothing Was Scanned")

    nfc.read.start({"rate": 1, "info":True}, read_callback)

    ##* Example Output *##
    """
    info {
        technology: A
        type: 2
        UID: 041F79528E6080
        ATQ: 4400
        SAK: 00
        card_family: Mifare Ultralight | NTAG
        IC_type: NTAG215
        bit_rate: -1
        storage_size: 504
        read_status: 0
    }
    """
    ```

    ```py tab="NDEF"
    import matrix_lite_nfc as nfc

    def read_callback(tag):
        if (tag.status == 256):
            print("Tag Was Scanned")
            msg = nfc.Message(tag.ndef.content)
            print(msg.getRecords())

        elif (tag.status == 1024):
            print("Nothing Was Scanned")

    nfc.read.start({"rate": 1, "ndef":True}, read_callback)

    ##* Example Output *##
    """
    [tnf: Well Known
    type: U
    payload: .https://community.matrix.one
    byteSize: 33
    typeLength: 1
    payloadLength: 29
    IdLength: 0
    , tnf: Well Known
    type: T
    payload: .enHello World
    byteSize: 18
    typeLength: 1
    payloadLength: 14
    IdLength: 0
    ]
    """
    ```

    ```py tab="Pages"
    import matrix_lite_nfc as nfc

    def read_callback(tag):
        if (tag.status == 256):
            print("Tag Was Scanned")
            print(tag.pages)

        elif (tag.status == 1024):
            print("Nothing Was Scanned")

    nfc.read.start({"rate": 1, "pages":True}, read_callback)

    ##* Example Output *##
    """
    pages {
        read_complete: 1
        content: [
    [ 4, 31, 121, 234, ], [ 82, 142, 96, 128, ], [ 60, 72, 0, 0, ], [ 225, 16, 62, 0, ], [ 3, 33, 209, 1, ], [ 29, 85, 0, 104, ], [ 116, 116, 112, 115, ], [ 58, 47, 47, 99, ], [ 111, 109, 109, 117, ], [ 110, 105, 116, 121, ], [ 46, 109, 97, 116, ], [ 114, 105, 120, 46, ], [ 111, 110, 101, 254, ], [ 1, 17, 85, 0, ], [ 116, 101, 108, 58, ], [ 43, 49, 52, 48, ], [ 56, 53, 53, 53, ], [ 49, 50, 49, 50, ], [ 17, 1, 14, 84, ], [ 2, 101, 110, 72, ], [ 101, 108, 108, 111, ], [ 32, 87, 111, 114, ], [ 108, 100, 81, 1, ], [ 13, 84, 2, 101, ], [ 115, 72, 111, 108, ], [ 48, 45, 59, 21, ], [ 110, 100, 111, 254, ], [ 0, 0, 0, 0, ], [ 0, 0, 0, 0, ], [ 0, 0, 0, 0, ], [ 0, 0, 0, 0, ], [ 0, 0, 0, 0, ], [ 0, 0, 0, 0, ], [ 0, 0, 0, 0, ], [ 0, 0, 0, 0, ], [ 0, 0, 0, 0, ], [ 0, 0, 0, 0, ], [ 0, 0, 0, 0, ], [ 0, 0, 0, 0, ], [ 0, 0, 0, 0, ], [ 0, 0, 0, 0, ], [ 0, 0, 0, 0, ], [ 0, 0, 0, 0, ], [ 0, 0, 0, 0, ], [ 0, 0, 0, 0, ], [ 0, 0, 0, 0, ], [ 0, 0, 0, 0, ], [ 0, 0, 0, 0, ], [ 0, 0, 0, 0, ], [ 0, 0, 0, 0, ], [ 0, 0, 0, 0, ], [ 0, 0, 0, 0, ], [ 0, 0, 0, 0, ], [ 0, 0, 0, 0, ], [ 0, 0, 0, 0, ], [ 0, 0, 0, 0, ], [ 0, 0, 0, 0, ], [ 0, 0, 0, 0, ], [ 0, 0, 0, 0, ], [ 0, 0, 0, 0, ], [ 0, 0, 0, 0, ], [ 0, 0, 0, 0, ], [ 0, 0, 0, 0, ], [ 0, 0, 0, 0, ], [ 0, 0, 0, 0, ], [ 0, 0, 0, 0, ], [ 0, 0, 0, 0, ], [ 0, 0, 0, 0, ], [ 0, 0, 0, 0, ], [ 0, 0, 0, 0, ], [ 0, 0, 0, 0, ], [ 0, 0, 0, 0, ], [ 0, 0, 0, 0, ], [ 0, 0, 0, 0, ], [ 0, 0, 0, 0, ], [ 0, 0, 0, 0, ], [ 0, 0, 0, 0, ], [ 0, 0, 0, 0, ], [ 0, 0, 0, 0, ], [ 0, 0, 0, 0, ], [ 0, 0, 0, 0, ], [ 0, 0, 0, 0, ], [ 0, 0, 0, 0, ], [ 0, 0, 0, 0, ], [ 0, 0, 0, 0, ], [ 0, 0, 0, 0, ], [ 0, 0, 0, 0, ], [ 0, 0, 0, 0, ], [ 0, 0, 0, 0, ], [ 0, 0, 0, 0, ], [ 0, 0, 0, 0, ], [ 0, 0, 0, 0, ], [ 0, 0, 0, 0, ], [ 0, 0, 0, 0, ], [ 0, 0, 0, 0, ], [ 0, 0, 0, 0, ], [ 0, 0, 0, 0, ], [ 0, 0, 0, 0, ], [ 0, 0, 0, 0, ], [ 0, 0, 0, 0, ], [ 0, 0, 0, 0, ], [ 0, 0, 0, 0, ], [ 0, 0, 0, 0, ], [ 0, 0, 0, 0, ], [ 0, 0, 0, 0, ], [ 0, 0, 0, 0, ], [ 0, 0, 0, 0, ], [ 0, 0, 0, 0, ], [ 0, 0, 0, 0, ], [ 0, 0, 0, 0, ], [ 0, 0, 0, 0, ], [ 0, 0, 0, 0, ], [ 0, 0, 0, 0, ], [ 0, 0, 0, 0, ], [ 0, 0, 0, 0, ], [ 0, 0, 0, 0, ], [ 0, 0, 0, 0, ], [ 0, 0, 0, 0, ], [ 0, 0, 0, 0, ], [ 0, 0, 0, 0, ], [ 0, 0, 0, 0, ], [ 0, 0, 0, 0, ], [ 0, 0, 0, 0, ], [ 0, 0, 0, 0, ], [ 0, 0, 0, 0, ], [ 0, 0, 0, 0, ], [ 0, 0, 0, 0, ], [ 0, 0, 0, 0, ], [ 0, 0, 0, 0, ], [ 0, 0, 0, 0, ], [ 0, 0, 0, 189, ], [ 4, 0, 0, 255, ], [ 0, 5, 0, 0, ], [ 0, 0, 0, 0, ], [ 0, 0, 0, 0, ], ]
        read_status: 17474
    }
    """

    ```

    ```py tab="Page"
    import matrix_lite_nfc as nfc

    def read_callback(tag):
        if (tag.status == 256):
            print("Tag Was Scanned")
            print(tag.page)

        elif (tag.status == 1024):
            print("Nothing Was Scanned")

    nfc.read.start({"rate": 1, "page": 0}, read_callback)

    #* Example Output *#
    # [ 4, 63, 65, 242 ]
    ```
    
    ```py tab="Everything"
    import matrix_lite_nfc as nfc

    def read_callback(tag):
        if (tag.status == 256):
            print("Tag Was Scanned")
            print(tag)

        elif (tag.status == 1024):
            print("Nothing Was Scanned")

    nfc.read.start({
        "rate": 1,
        "info": True,
        "pages": True,
        "page": 0,
        "ndef": True
    }, read_callback)

    ##* Example Output *##
    """
    {
    info {
        technology: A
        type: 2
        UID: 046B3F8AA86481
        ATQ: 4400
        SAK: 00
        card_family: Mifare Ultralight | NTAG
        IC_type: NTAG215
        bit_rate: -1
        storage_size: 504
        read_status: 0
    }
    pages {
        read_complete: 1
        content: [
    [ 4, 107, 63, 216, ], [ 138, 168, 100, 129, ], [ 199, 72, 0, 0, ], [ 225, 16, 62, 0, ], [ 3, 51, 145, 1, ], [ 29, 85, 0, 104, ], [ 116, 116, 112, 115, ], [ 58, 47, 47, 99, ], [ 111, 109, 109, 117, ], [ 110, 105, 116, 121, ], [ 46, 109, 97, 116, ], [ 114, 105, 120, 46, ], [ 111, 110, 101, 81, ], [ 1, 14, 84, 2, ], [ 101, 110, 72, 101, ], [ 108, 108, 111, 32, ], [ 87, 111, 114, 108, ], [ 100, 254, 0, 0, ], [ 0, 0, 0, 0, ], [ 0, 0, 0, 0, ], [ 0, 0, 0, 0, ], [ 0, 0, 0, 0, ], [ 0, 0, 0, 0, ], [ 0, 0, 0, 0, ], [ 0, 0, 0, 0, ], [ 0, 0, 0, 0, ], [ 0, 0, 0, 0, ], [ 0, 0, 0, 0, ], [ 0, 0, 0, 0, ], [ 0, 0, 0, 0, ], [ 0, 0, 0, 0, ], [ 0, 0, 0, 0, ], [ 0, 0, 0, 0, ], [ 0, 0, 0, 0, ], [ 0, 0, 0, 0, ], [ 0, 0, 0, 0, ], [ 0, 0, 0, 0, ], [ 0, 0, 0, 0, ], [ 0, 0, 0, 0, ], [ 0, 0, 0, 0, ], [ 0, 0, 0, 0, ], [ 0, 0, 0, 0, ], [ 0, 0, 0, 0, ], [ 0, 0, 0, 0, ], [ 0, 0, 0, 0, ], [ 0, 0, 0, 0, ], [ 0, 0, 0, 0, ], [ 0, 0, 0, 0, ], [ 0, 0, 0, 0, ], [ 0, 0, 0, 0, ], [ 0, 0, 0, 0, ], [ 0, 0, 0, 0, ], [ 0, 0, 0, 0, ], [ 0, 0, 0, 0, ], [ 0, 0, 0, 0, ], [ 0, 0, 0, 0, ], [ 0, 0, 0, 0, ], [ 0, 0, 0, 0, ], [ 0, 0, 0, 0, ], [ 0, 0, 0, 0, ], [ 0, 0, 0, 0, ], [ 0, 0, 0, 0, ], [ 0, 0, 0, 0, ], [ 0, 0, 0, 0, ], [ 0, 0, 0, 0, ], [ 0, 0, 0, 0, ], [ 0, 0, 0, 0, ], [ 0, 0, 0, 0, ], [ 0, 0, 0, 0, ], [ 0, 0, 0, 0, ], [ 0, 0, 0, 0, ], [ 0, 0, 0, 0, ], [ 0, 0, 0, 0, ], [ 0, 0, 0, 0, ], [ 0, 0, 0, 0, ], [ 0, 0, 0, 0, ], [ 0, 0, 0, 0, ], [ 0, 0, 0, 0, ], [ 0, 0, 0, 0, ], [ 0, 0, 0, 0, ], [ 0, 0, 0, 0, ], [ 0, 0, 0, 0, ], [ 0, 0, 0, 0, ], [ 0, 0, 0, 0, ], [ 0, 0, 0, 0, ], [ 0, 0, 0, 0, ], [ 0, 0, 0, 0, ], [ 0, 0, 0, 0, ], [ 0, 0, 0, 0, ], [ 0, 0, 0, 0, ], [ 0, 0, 0, 0, ], [ 0, 0, 0, 0, ], [ 0, 0, 0, 0, ], [ 0, 0, 0, 0, ], [ 0, 0, 0, 0, ], [ 0, 0, 0, 0, ], [ 0, 0, 0, 0, ], [ 0, 0, 0, 0, ], [ 0, 0, 0, 0, ], [ 0, 0, 0, 0, ], [ 0, 0, 0, 0, ], [ 0, 0, 0, 0, ], [ 0, 0, 0, 0, ], [ 0, 0, 0, 0, ], [ 0, 0, 0, 0, ], [ 0, 0, 0, 0, ], [ 0, 0, 0, 0, ], [ 0, 0, 0, 0, ], [ 0, 0, 0, 0, ], [ 0, 0, 0, 0, ], [ 0, 0, 0, 0, ], [ 0, 0, 0, 0, ], [ 0, 0, 0, 0, ], [ 0, 0, 0, 0, ], [ 0, 0, 0, 0, ], [ 0, 0, 0, 0, ], [ 0, 0, 0, 0, ], [ 0, 0, 0, 0, ], [ 0, 0, 0, 0, ], [ 0, 0, 0, 0, ], [ 0, 0, 0, 0, ], [ 0, 0, 0, 0, ], [ 0, 0, 0, 0, ], [ 0, 0, 0, 0, ], [ 0, 0, 0, 0, ], [ 0, 0, 0, 0, ], [ 0, 0, 0, 0, ], [ 0, 0, 0, 0, ], [ 0, 0, 0, 0, ], [ 0, 0, 0, 0, ], [ 0, 0, 0, 189, ], [ 4, 0, 0, 255, ], [ 0, 5, 0, 0, ], [ 0, 0, 0, 0, ], [ 0, 0, 0, 0, ], ]
        read_status: 17474
    }
    page [ 4, 107, 63, 216, ]
    ndef {
        valid: 1
        content: [ 145, 1, 29, 85, 0, 104, 116, 116, 112, 115, 58, 47, 47, 99, 111, 109, 109, 117, 110, 105, 116, 121, 46, 109, 97, 116, 114, 105, 120, 46, 111, 110, 101, 81, 1, 14, 84, 2, 101, 110, 72, 101, 108, 108, 111, 32, 87, 111, 114, 108, 100,  ]
        read_status: 0
    }
    status: 256
    }
    """
    ```

### nfc.write
Writing allows NDEF messages to be written & erased. There is also an option to directly write to a tag's page. Writing is normally done within an NFC read loop.

??? summary ".message()"
    ```py
    # Create an NDEF message with a record
    msg = nfc.Message()
    msg.addUriRecord("https://community.matrix.one")
    
    # Write the message into the NFC tag
    result = nfc.write.message(msg)
    # result.activation : NFC activation status
    # result.write      : NFC write status
    ```

??? summary ".erase()"
    ```py
    # Erase the NDEF message on an NFC tag
    result = nfc.write.erase()
    # result.activation : NFC activation status
    # result.write      : NFC write status
    ```

??? summary ".page()"
    !!! danger "Writing to a random page may lock your NFC tag"
        ```py
        page_index = 25           # page you want to overwrite
        page_byte = [48,45,59,21] # Array of numbers that represents a page

        result = nfc.write.page(page_index, page_byte)
        # result.activation : NFC activation status
        # result.write      : NFC write status
        ```

??? example "Writing Examples"
    ```py tab="NDEF"
    import matrix_lite_nfc as nfc

    msg = nfc.Message()
    msg.addUriRecord("https://community.matrix.one");

    def read_callback(tag):
        if (tag.status == 256):
            print("Tag Was Scanned")

            status = nfc.write.message(msg).write
            # Exit if write was successful
            if (status == 0):
                print("Write was successful! Stopping loop.")
                nfc.read.stop()
            # Or print status code message
            else:
                print(nfc.status(status))

        elif (tag.status == 1024):
            print("Nothing Was Scanned")

    nfc.read.start({"rate": 1, "info": True}, read_callback)
    ```
    
    ```py tab="Erase NDEF"
    import matrix_lite_nfc as nfc

    def read_callback(tag):
        if (tag.status == 256):
            print("Tag Was Scanned")

            status = nfc.write.erase().write
            # Exit if erase was successful
            if (status == 0):
                print("Erase was successful! Stopping loop.")
                nfc.read.stop()
            # Or print status code message
            else:
                print(nfc.status(status))

        elif (tag.status == 1024):
            print("Nothing Was Scanned")

    nfc.read.start({"rate": 1, "info": True}, read_callback)
    ```

    ```py tab="Page"
    #* DO NOT WRITE TO A PAGE IF YOU DON'T KNOW WHAT IT DOES. *#
    import matrix_lite_nfc as nfc

    page_index = #*insert page number*#
    page_bytes = [48,45,59,21]

    def read_callback(tag):
        if (tag.status == 256):
            print("Tag Was Scanned")

            status = nfc.write.page(page_index, page_bytes).write
            # Exit if write was successful
            if (status == 0):
                print("Write was successful! Stopping loop.")
                nfc.read.stop()
            # Or print status code message
            else:
                print(nfc.status(status))

        elif (tag.status == 1024):
            print("Nothing Was Scanned")

    nfc.read.start({"rate": 1, "info": True}, read_callback)
    ```