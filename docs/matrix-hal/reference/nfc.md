<h2 style="padding-top:0">NFC</h2>

### Device Compatibility

<img class="creator-compatibility-icon" src="../../img/creator-icon.svg">

## Overview

The NFC abstraction supports:

* Reading Info (All tags)
* Reading Page (MIFARE Ultralight & NTAG)
* Writing Page (MIFARE Ultralight & NTAG)
* Reading NDEF (MIFARE Ultralight & NTAG)
* Writing NDEF (MIFARE Ultralight & NTAG)

## References

Below is the overview of the NFC abstraction. Code examples can be found [here](/matrix-hal/examples/nfc).

These header files are required to use NFC.

```c++
// The main library import
#include "matrix_nfc/nfc.h"
// Holds data for NFC
#include "matrix_nfc/nfc_data.h"
```

> Only one instance of NFC is supported at a time, making multiple instances of the NFC object may lead to undesired behavior.

Most functions that execute NFC sensor commands return status codes, and the `NFCStatus` function can be used to get a string corresponding to the status code, the examples below show usage.

### Classes for NFC tag commands

???+ info "NFC"
    The main `NFC` class has an instance of the `NDEF` class, and an instance of the `MFUL` & `NTAG` classes. These classes are used to perform NDEF operations and page read/write operations on NFC tags.

    ```c++
    // Create NFC object
    matrix_hal::NFC nfc;
    ```

    ??? summary ".Activate"
        The function `Activate` activates an NFC tag. This is required before using any other function.

        ```c++
        // Usage
        int status_code = nfc.Activate();
        // To print a string corresponding to the status code
        std::cout << matrix_hal::NFCStatus(status_code) << std::endl;

        // Function declaration in header file
        int Activate();
        ```

    ??? summary ".Deactivate"
        The function `Deactivate` deactivates an NFC tag. This stops communications between the NFC sensor and NFC tag and should be performed after the desired command has finished.

        ```c++
        // Usage
        int status_code = nfc.Deactivate();
        // To print a string corresponding to the status code
        std::cout << matrix_hal::NFCStatus(status_code) << std::endl;

        // Function declaration in header file
        int Deactivate();
        ```

    ??? summary ".ReadInfo"
        The function `ReadInfo` accepts an `InfoContent` object and populates it with tag information.

        ```c++
        // Usage
        matrix_hal::NFCData data = NFCData();
        // Must first activate card
        nfc.Activate();
        int status_code = nfc.ReadInfo(&data.info);
        // To print a string corresponding to the status code
        std::cout << matrix_hal::NFCStatus(status_code) << std::endl;
        // Deactivate the card after completing desired action
        nfc.Deactivate();

        // Function declaration in header file
        int ReadInfo(InfoContent* nfc_info);
        ```

???+ info "NDEF"
    The `NDEF` class is used for NDEF operations on tags. This class is nested within the `NFC` class above, and should not be manually instantiated.

    ```c++
    // Create NFC object
    matrix_hal::NFC nfc;
    ```

    ??? summary ".Read"
        The function `Read` reads the NDEF content from an NFC tag and populates a `NDEFContent` object with the read NDEF information. For more info see the `NDEFContent` class.

        ```c++
        // Usage
        matrix_hal::NFCData data = NFCData();
        // Must first activate card
        nfc.Activate();
        int status_code = nfc.ndef.Read(&data.ndef);
        // To print a string corresponding to the status code
        std::cout << matrix_hal::NFCStatus(status_code) << std::endl;
        // Deactivate the card after completing desired action
        nfc.Deactivate();

        // Function declaration in header file 
        int Read(NDEFContent* ndef_content);
        ```

    ??? summary ".Write"
        The function `Write` writes provided NDEF content to a NFC tag. It is an overloaded function, accepting either a pointer to a `NDEFContent` object or a pointer to a `NDEFParser` object. For more info see the `NDEFContent` and `NDEFParser` classes.

        ```c++
        // Usage
        matrix_hal::NFCData data = NFCData();
        // Must first activate card
        nfc.Activate();
        int status_code = nfc.ndef.Write(&data.ndef)
        // To print a string corresponding to the status code
        std::cout << matrix_hal::NFCStatus(status_code) << std::endl;
        // Deactivate the card after completing desired action
        nfc.Deactivate();

        // Function declaration in header file
        int Write(NDEFContent* ndef_content);
        ```

        ```c++
        // Usage
        matrix_hal::NDEFParser ndef_parser = NDEFParser();
        // Must first activate card
        nfc.Activate();
        int status_code = nfc.ndef.Write(&ndef_parser)
        // To print a string corresponding to the status code
        std::cout << matrix_hal::NFCStatus(status_code) << std::endl;
        // Deactivate the card after completing desired action
        nfc.Deactivate();

        // Function declaration in header file
        int Write(NDEFParser* ndef_parser);
        ```

    ??? summary ".Erase"
        The function `Erase` erases the NDEF content on a NFC tag.

        ```c++
        // Usage
        // Must first activate card
        nfc.Activate();
        int status_code = nfc.ndef.Erase();
        // To print a string corresponding to the status code
        std::cout << matrix_hal::NFCStatus(status_code) << std::endl;
        // Deactivate the card after completing desired action
        nfc.Deactivate();

        // Function declaration in header file
        int Erase();
        ```

???+ info "MFUL & NTAG"
    The `MFUL` and `NTAG` classes are used for page read and write operations on MIFARE Ultralight(MFUL) and NTAG type NFC tags respectively.
    This class is nested within the `NFC` class above, and should not be manually instantiated.

    For all usage examples `nfc.mful` will be used, but substituting that out for `nfc.ntag` will use the functions from the NTAG class instead. Both classes have the same function names and declarations.

    ```c++
    // Create NFC object
    matrix_hal::NFC nfc;
    ```

    ??? summary ".ReadPage"
        The function `ReadPage` accepts a page number and reads the specified page from the tag. The page is returned as a vector. If the specified page does not exist or the read fails then an empty vector will be returned.

        ```c++
        // Usage
        // Must first activate card
        nfc.Activate();
        // Read page 10 from the card
        int page_number = 10;
        std::vector<uint8_t> read_page = nfc.mful.ReadPage(page_number);
        // To print the vector's contents as a hex string
        std::cout << matrix_hal::PagesContent::BytesToString(read_page) << std::endl;
        // Deactivate the card after completing desired action
        nfc.Deactivate();
        
        // Function declaration in header file
        std::vector<uint8_t> ReadPage(uint8_t page_number);
        ```

    ??? summary ".ReadPages"
        The function `ReadPages` accepts a pointer to a `PagesContent` object and populates it with all read pages. For more info see the `PagesContent` class.
        
        ```c++
        // Usage
        matrix_hal::NFCData data = NFCData();
        // Must first activate card
        nfc.Activate();
        int status_code = nfc.mful.ReadPages(&data.pages);
        // To print a string corresponding to the status code
        std::cout << matrix_hal::NFCStatus(status_code) << std::endl;
        // To print the contents of pages as hex
        std::cout << "Hex:\n" << data.pages.ToHex() << std::endl;
        // To print the contents of pages as a char string
        std::cout << "String:\n" << data.pages.ToString() << std::endl;
        // Deactivate the card after completing desired action
        nfc.Deactivate();

        // Function declaration in header file
        int ReadPages(PagesContent* pages_content);
        ```

    ??? summary ".WritePage"

        > ⚠️Caution: Writing to specific pages may lock or password protect tag, please view specific NFC tag IC datasheet for more information⚠️.

        NFC tag IC can be found by using the `ReadInfo` function (in `NFC` class) and then accessing the `IC_type` field in `InfoContent` object.

        The function `WritePage` accepts a page number and a byte vector and writes the byte vector to the desired page.
        For MFUL and NTAG type cards the page length is always 4.
        Passing a vector with a length above 4 will result in truncation.
        Passing a vector with a length below 4 will result in undefined behavior.
        
        ```c++
        // Usage
        // Must first activate card
        nfc.Activate();
        // Write "taco" to page 10
        int page_number = 10;
        std::string write_str = "taco";
        std::vector<uint8_t> write_data = std::vector<uint8_t>(write_str.begin(), write_str.end());
        int status_code = nfc.mful.WritePage(page_number, write_data);
        // To print a string corresponding to the status code
        std::cout << matrix_hal::NFCStatus(status_code) << std::endl;
        // Deactivate the card after completing desired action
        nfc.Deactivate();

        // Function declaration in header file
        int WritePage(uint8_t page_number, std::vector<uint8_t>& write_data);
        ```

### Classes for NFC data storage

???+ info "NFCData"
    The `NFCData` class has an instance of the `InfoContent` class, `PagesContent` class and `NDEFContent` class.

    ```c++
    // Create NFCData object
    matrix_hal::NFCData data = NFCData();
    ```

    ```c++
    // All class data members
    InfoContent info = InfoContent();
    PagesContent pages = PagesContent();
    NDEFContent ndef = NDEFContent();
    ```

???+ info "InfoContent"
    The `InfoContent` class holds tag identification information.

    ```c++
    // Create NFCData object
    matrix_hal::NFCData data = NFCData();
    ```

    ```c++
    // All class data members
    bool recently_updated = false; // Updated to true upon successful read, else set to false
    std::vector<uint8_t> UID; // Unique tag id
    std::vector<uint8_t> ATQ;
    int SAK = -1;
    int bit_rate = -1; // In bits/second (baud)
    std::string technology = "null";
    std::string type = "null";
    std::string card_family = "null";
    std::string IC_type = "null";
    int storage_size = -1; // In bytes
    ```

    All examples below assume that an NFCData object was created and that the `info` member has already been populated by use of `ReadInfo` (from `NFC` class).

    ??? summary ".UIDToHex"
        The function `UIDToHex` will return the UID as a hex string.

        ```c++
        // Usage
        std::string UID = data.info.UIDToHex();

        // Function declaration in header file
        std::string UIDToHex();
        ```

    ??? summary ".ATQToHex"
        The function `ATQToHex` will return the ATQ as a hex string.

        ```c++
        // Usage
        std::string ATQ = data.info.ATQToHex();

        // Function declaration in header file
        std::string ATQToHex();
        ```

    ??? summary ".SAKToHex"
        The function `SAKToHex` will return the SAK as a hex string.

        ```c++
        // Usage
        std::string SAK = data.info.SAKToHex();

        // Function declaration in header file
        std::string SAKToHex();
        ```

    ??? summary ".ToString"
        The function `ToString` will return a string with all class parameters.

        ```c++
        // Usage
        std::string info_string = data.info.ToString();

        // Function declaration in header file
        std::string ToString();
        ```


???+ info "NDEFContent"
    The `NDEFContent` class holds the NDEF data that was read.

    ```c++
    // Create NFCData object
    matrix_hal::NFCData data = NFCData();
    ```

    ```c++
    // All class data members
    bool recently_updated = false; // Updated to true upon successful read, to false if read did not succeed or if card was not activated
    bool valid = false; // Updated to true if NDEF is valid, updated to false if NDEF is not detected
    std::vector<uint8_t> content; // Raw NDEF message read from the NFC Tag
    ```

    All examples below assume that an NFCData object was created and that the `ndef` member has already been populated by use of `Read` (from `NDEF` class).

    ??? summary ".ToHex"
        The function `ToHex` will return the NDEF data as a hex string.

        ```c++
        // Usage
        std::string hex_ndef = data.ndef.ToHex();

        // Function declaration in header file
        std::string ToHex();
        ```

    ??? summary ".ToString"
        The function `ToString` will return the NDEF data as a string, treating each byte as a character.
        If the character is not printable it will be replaced with '.'.
        If NDEF is not detected then "NDEF is Not Detected" will be returned.
        If NDEF is null then "NDEF is NULL" will be returned.

        ```c++
        // Usage
        std::string string_ndef = data.ndef.ToString();

        // Function declaration in header file
        std::string ToString();
        ```

???+ info "PagesContent"
    The `PagesContent` class holds the pages that were read.

    ```c++
    // Create NFCData object
    matrix_hal::NFCData data = NFCData();
    ```

    ```c++
    // All class data members
    bool recently_updated = false; // True if new tag was read, false if no tag found
    bool read_complete = false; // True if all pages were read, false if read was interrupted
    std::vector<std::vector<uint8_t>> content; // All data read from the NFC Tag, by page
    ```

    All examples below assume that an NFCData object was created and that the `pages` member has already been populated by use of the `ReadPages` function (from `MFUL` and `NTAG` classes).

    ??? summary ".ToHex"
        The function `ToHex` will return all pages as a string. Every page will be on a new line and will be prefixed with "Page HEX: " where HEX is a hex number. Each byte will be outputted as hex.

        ```c++
        // Usage
        std::string hex_pages = data.pages.ToHex();

        // Function declaration in header file
        std::string ToHex();
        ```

    ??? summary ".ToString"
        The function `ToString` will return all pages as a string, treating each byte as a character.
        If the character is not printable it will be replaced with '.'.

        ```c++
        // Usage
        std::string string_pages = data.pages.ToString();

        // Function declaration in header file
        std::string ToString();
        ```

    The following functions are static and can be used to convert a byte (uint8_t) vector to a string.

    ??? summary ".BytesToHex"
        The function `BytesToHex` will convert a uint8_t vector to a hex string and return the string. Each byte will be outputted as hex.

        ```c++
        // Usage
        std::vector<uint8_t> page = nfc.mful.ReadPage(42);
        std::string page_hex_string = matrix_hal::PagesContent::BytesToHex(read_page);

        // Function declaration in header file
        static std::string BytesToHex(const std::vector<uint8_t> &vec);
        ```
    
    ??? summary ".BytesToString"
        The function `BytesToString` will convert a uint8_t vector to a string and return the string. Each byte will be treated as a character.
        If the character is not printable it will be replaced with '.'.

        ```c++
        // Usage
        std::vector<uint8_t> page = nfc.mful.ReadPage(42);
        std::string page_char_string = matrix_hal::PagesContent::BytesToString(read_page);

        // Function declaration in header file
        static std::string BytesToString(const std::vector<uint8_t> &vec);
        ```


### Classes for NDEF Parsing

???+ info "NDEFParser"
    The `NDEFParser` class is used to parse and modify NDEF messages. An instance of this object can be written to an NFC tag with the `Write` function (from `NDEF` class).

    This class has multiple constructors.

    ```c++
    // Create an empty NDEFParser object
    matrix_hal::NDEFParser ndef_parser = NDEFParser();
    ```

    ```c++
    // Code to populate data.ndef with an NDEF message read from tag
    matrix_hal::NFCData data = NFCData();
    // Must first activate card
    nfc.Activate();
    int status_code = nfc.ndef.Read(&data.ndef);
    // To print a string corresponding to the status code
    std::cout << matrix_hal::NFCStatus(status_code) << std::endl;
    // Deactivate the card after completing desired action
    nfc.Deactivate();

    // Create a NDEFParser object using the data from a NDEFContent object
    matrix_hal::NDEFParser ndef_parser = NDEFParser(&data.ndef);
    ```
    
    ??? summary ".AddUriRecord"
        The function `AddUriRecord` will add a uri record to the `NDEFParser`. When a tag containing this NDEF record is scanned by an android phone it will open the uri in a browser.

        ```c++
        // Usage
        matrix_hal::NDEFParser ndef_parser = NDEFParser();
        // Add uri record
        ndef_parser.AddUriRecord("http://docs.matrix.one");

        // Function declaration in header file
        void AddUriRecord(std::string uri);
        ```

    ??? summary ".AddTextRecord"
        The function `AddTextRecord` will add a text record to the `NDEFParser`. This function is overloaded, optionally accepting an encoding. If no encoding if provided then "en" is used.

        ```c++
        // Usage
        matrix_hal::NDEFParser ndef_parser = NDEFParser();
        // Add text record
        ndef_parser.AddTextRecord("hello world!");

        // Function declaration in header file
        void AddTextRecord(std::string text);
        ```

        ```c++
        // Usage
        matrix_hal::NDEFParser ndef_parser = NDEFParser();
        // Add text record
        ndef_parser.AddTextRecord("hola mundo!", "es");

        // Function declaration in header file
        void AddTextRecord(std::string text, std::string encoding);
        ```

    ??? summary ".AddEmptyRecord"
        The function `AddEmptyRecord` will add a empty NDEF record to the `NDEFParser`.

        ```c++
        // Usage
        matrix_hal::NDEFParser ndef_parser = NDEFParser();
        // Add empty record
        ndef_parser.AddEmptyRecord();

        // Function declaration in header file
        void AddEmptyRecord();
        ```

    ??? summary ".AddMimeMediaRecord"
        The function `AddMimeMediaRecord` will add a MIME media NDEF record to the `NDEFParser`. For more information on MIME media types see [Mozilla's MIME type documentation](https://developer.mozilla.org/en-US/docs/Web/HTTP/Basics_of_HTTP/MIME_types#Structure_of_a_MIME_type). This function is overloaded and can either accept a uint8_t payload or a string payload.

        ```c++
        // Usage
        matrix_hal::NDEFParser ndef_parser = NDEFParser();
        // Add MIME media record
        ndef_parser.AddMimeMediaRecord("text/plain", "hello world!");

        // Function declaration in header file
        void AddMimeMediaRecord(std::string mimeType, std::string payload);
        ```

        ```c++
        // Usage
        matrix_hal::NDEFParser ndef_parser = NDEFParser();
        // Add MIME media record
        std::vector<uint8_t> payload = {'h', 'e', 'l', 'l', 'o', ' ', 'w', 'o', 'r', 'l', 'd', '!'};
        ndef_parser.AddMimeMediaRecord("text/plain", payload.data(), payload.size());

        // Function declaration in header file
        void AddMimeMediaRecord(std::string mimeType, uint8_t* payload, int payloadLength);
        ```

    ??? summary ".AddRecord"
        The function `AddRecord` will add a `NDEFRecord` to the `NDEFParser`. This can be used to add custom NDEF records to a NDEF message. For more info see the `NDEFRecord` class.

        ```c++
        // Usage
        matrix_hal::NDEFParser ndef_parser = NDEFParser();
        matrix_hal::NDEFRecord ndef_record = NDEFRecord();
        // Modify ndef_record as needed
        // Add record to ndef_parser
        ndef_parser.AddRecord(ndef_record);

        // Function declaration in header file
        bool AddRecord(NDEFRecord& record);
        ```

    ??? summary ".ToString"
        The function `ToString` will return a string with information about the NDEF message.

        ```c++
        // Usage
        matrix_hal::NDEFParser ndef_parser = NDEFParser();
        // Adding some records to NDEFParser
        ndef_parser.AddUriRecord("http://docs.matrix.one");
        ndef_parser.AddTextRecord("hello world!");

        std::string ndef_parser_string = ndef_parser.ToString();

        // Function declaration in header file
        std::string ToString();
        ```

    ??? summary ".GetEncodedSize" & ".Encode"
        The function `GetEncodedSize` will return the size of the encoded representation of the NDEF message. It is used to create a `uint8_t` array large enough to store the encoded message.

        The function `Encode` will encode the NDEF message into the proper format for writing to an NFC tag.

        ```c++
        // Usage
        matrix_hal::NDEFParser ndef_parser = NDEFParser();
        // Adding some records to NDEFParser
        ndef_parser.AddUriRecord("http://docs.matrix.one");
        ndef_parser.AddTextRecord("hello world!");

        int size = ndef_parser.GetEncodedSize();
        uint8_t encoded_ndef_message[size];
        // Populate encoded_ndef_message
        ndef_parser.Encode(encoded_ndef_message);

        // Function declarations in header file
        int GetEncodedSize();

        void Encode(uint8_t* data);
        ```

    ??? summary ".GetRecordCount" & ".GetRecord"
        The function `GetRecordCount` will return the number of NDEF records inside the NDEF message.

        The function `GetRecord` will return the NDEF record at a specified index.

        The NDEFParser class also overloads the bracket operator to return the NDEF record at a specified index.

        ```c++
        // Usage
        matrix_hal::NDEFParser ndef_parser = NDEFParser();
        // Adding some records to NDEFParser
        ndef_parser.AddUriRecord("http://docs.matrix.one");
        ndef_parser.AddTextRecord("hello world!");

        int size = ndef_parser.GetRecordCount();
        // Get the last NDEF record
        matrix_hal::NDEFRecord last_record = ndef_parser.GetRecord(size - 1);
        // Alternatively Using operator[] overload instead of .GetRecord function
        matrix_hal::NDEFRecord last_record = ndef_parser[size - 1];

        // Function/operator declarations in header file
        unsigned int GetRecordCount();

        NDEFRecord GetRecord(int index);

        NDEFRecord operator[](int index);
        ```
    
???+ info "NDEFRecord"
    The `NDEFRecord` class is used to create custom NDEF records, for use with `NDEFParser`.

    ```c++
    // Create an empty NDEFRecord object
    matrix_hal::NDEFRecord ndef_record = NDEFRecord();
    ```

    ??? summary ".GetPayloadLength" & ".GetPayload"
        The function `GetPayloadLength` will return the length of the NDEF record's payload parameter.

        The function `GetPayload` will populate a uint8_t array with the NDEF record's payload parameter.

        ```c++
        // Usage
        matrix_hal::NDEFParser ndef_parser = NDEFParser();
        // Adding some records to NDEFParser
        ndef_parser.AddUriRecord("http://docs.matrix.one");
        ndef_parser.AddTextRecord("hello world!");

        // Get the first record
        matrix_hal::NDEFRecord first_record = ndef_parser[0];

        // Get first record's payload
        int payload_size = first_record.GetPayloadLength();
        uint8_t* payload = new uint8_t[payload_size];

        // Function declarations in header file
        int GetPayloadLength();

        void GetPayload(uint8_t *payload);
        ```

    ??? summary ".GetTypeLength" & ".GetType"
        The function `GetTypeLength` will return the length of the NDEF record's type parameter

        The function `GetType` will populate a uint8_t array with the NDEF record's type parameter

        The `GetType` function is also overloaded, returning a string of the type parameter instead if called with no argument.

        ```c++
        // Usage
        matrix_hal::NDEFParser ndef_parser = NDEFParser();
        // Adding some records to NDEFParser
        ndef_parser.AddUriRecord("http://docs.matrix.one");
        ndef_parser.AddTextRecord("hello world!");

        // Get the first record
        matrix_hal::NDEFRecord first_record = ndef_parser[0];

        // Get first record's type
        int type_size = first_record.GetTypeLength();
        uint8_t* type = new uint8_t[type_size];

        // Alternatively get type string
        std::string type_string = first_record.GetType();

        // Function declarations in header file
        unsigned int GetTypeLength();

        void GetType(uint8_t *type);

        std::string GetType();
        ```

    ??? summary ".GetIdLength" & ".GetId"
        The function `GetIdLength` will return the length of the NDEF record's ID parameter.

        The function `GetId` will populate a uint8_t array with the NDEF record's ID parameter.

        The `GetId` function is also overloaded, returning a string of the ID parameter instead if called with no argument.

        ```c++
        // Usage
        matrix_hal::NDEFParser ndef_parser = NDEFParser();
        // Adding some records to NDEFParser
        ndef_parser.AddUriRecord("http://docs.matrix.one");
        ndef_parser.AddTextRecord("hello world!");

        // Get the first record
        matrix_hal::NDEFRecord first_record = ndef_parser[0];

        // Get first record's ID
        int id_size = first_record.GetTypeLength();
        uint8_t* type = new uint8_t[id_size];

        // Alternatively get ID string
        std::string id_string = first_record.GetId();

        // Function declarations in header file
        unsigned int GetIdLength();

        void GetId(uint8_t *id);

        std::string GetId();
        ```

    ??? summary ".GetTnf"
        The function `GetTnf` will return a uint8_t of the NDEF record's TNF parameter.

        ```c++
        // Usage
        matrix_hal::NDEFParser ndef_parser = NDEFParser();
        // Adding some records to NDEFParser
        ndef_parser.AddUriRecord("http://docs.matrix.one");
        ndef_parser.AddTextRecord("hello world!");

        // Get the first record
        matrix_hal::NDEFRecord first_record = ndef_parser[0];

        // Get first record's TNF
        uint8_t tnf = first_record.GetTnf();

        // Function declaration in header file
        uint8_t GetTnf();
        ```

    ??? summary ".SetTnf"
        The function `SetTnf` will set the NDEF record's TNF parameter to the value passed in.

        ```c++
        // Usage
        matrix_hal::NDEFParser ndef_parser = NDEFParser();
        // Adding some records to NDEFParser
        ndef_parser.AddUriRecord("http://docs.matrix.one");
        ndef_parser.AddTextRecord("hello world!");

        // Get the first record
        matrix_hal::NDEFRecord first_record = ndef_parser[0];

        // Set first record's TNF
        uint8_t tnf_to_set = 0;
        first_record.SetTnf(tnf_to_set);

        // Function declaration in header file
        void SetTnf(uint8_t tnf);
        ```

    ??? summary ".SetType"
        The function `SetType` will set the NDEF record's type parameter to the value passed in.

        ```c++
        // Usage
        matrix_hal::NDEFParser ndef_parser = NDEFParser();
        // Adding some records to NDEFParser
        ndef_parser.AddUriRecord("http://docs.matrix.one");
        ndef_parser.AddTextRecord("hello world!");

        // Get the first record
        matrix_hal::NDEFRecord first_record = ndef_parser[0];

        // Set first record's type
        int size = 20;
        uint8_t type_to_set[size] = {};
        first_record.SetType(type_to_set, size);

        // Function declaration in header file
        void SetType(const uint8_t *type, const unsigned int numBytes);
        ```

    ??? summary ".SetPayload"
        The function `SetPayload` will set the NDEF record's payload parameter to the value passed in.

        ```c++
        // Usage
        matrix_hal::NDEFParser ndef_parser = NDEFParser();
        // Adding some records to NDEFParser
        ndef_parser.AddUriRecord("http://docs.matrix.one");
        ndef_parser.AddTextRecord("hello world!");

        // Get the first record
        matrix_hal::NDEFRecord first_record = ndef_parser[0];

        // Set first record's payload
        int size = 20;
        uint8_t payload_to_set[size] = {};
        first_record.SetType(payload_to_set, size);

        // Function declaration in header file
        void SetPayload(const uint8_t *payload, const int numBytes);
        ```

    ??? summary ".SetId"
        The function `SetId` will set the NDEF record's ID parameter to the value passed in.

        ```c++
        // Usage
        matrix_hal::NDEFParser ndef_parser = NDEFParser();
        // Adding some records to NDEFParser
        ndef_parser.AddUriRecord("http://docs.matrix.one");
        ndef_parser.AddTextRecord("hello world!");

        // Get the first record
        matrix_hal::NDEFRecord first_record = ndef_parser[0];

        // Set first record's ID
        int size = 20;
        uint8_t id_to_set[size] = {};
        first_record.SetId(id_to_set, size);

        // Function declaration in header file
        void SetId(const uint8_t *id, const unsigned int numBytes);
        ```