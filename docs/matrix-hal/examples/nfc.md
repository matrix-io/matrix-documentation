<h2 style="padding-top:0">NFC</h2>
<h4 style="padding-top:0">HAL Example</h4>

### Device Compatibility

<img class="creator-compatibility-icon" src="../../img/creator-icon.svg">

## Overview

The NFC abstraction supports:

* Reading Info (All tags)
* Reading Page (MIFARE Ultralight & NTAG)
* Writing Page (MIFARE Ultralight & NTAG)
* Reading NDEF (MIFARE Ultralight & NTAG)
* Writing NDEF (MIFARE Ultralight & NTAG)

## Code Examples

Below are examples of how to use NFC in MATRIX HAL.

NFC function references can be found [here](/matrix-hal/reference/nfc).

The command below will compile each example. Be sure to pass in your C++ file and desired output file.

```bash
g++ -o YOUR_OUTPUT_FILE YOUR_CPP_FILE -std=c++11 -DNXPBUILD__PH_RASPBERRY_PI -I/usr/local/include/matrix_nfc/nxp_nfc/NxpNfcRdLib/types -I/usr/local/include/matrix_nfc/nxp_nfc/NxpNfcRdLib/intfs -lmatrix_hal_nfc -lmatrix_creator_hal
```
 
??? example "NFC Detect & ReadInfo"
    The following example shows how to perform basic NFC tag detection and read information such as the UID from an NFC tag. You can download this example <a href="https://github.com/matrix-io/matrix-hal-nfc/blob/master/examples/nfc_detect.cpp" target="_blank">here</a>.

    ```c++
    /////////////////////////
    // INCLUDE STATEMENTS //
    ///////////////////////

    // For console output
    #include <iostream>
    // For sleep
    #include <chrono>
    #include <thread>

    // For using the Everloop
    #include "matrix_hal/everloop.h"
    #include "matrix_hal/everloop_image.h"
    #include "matrix_hal/matrixio_bus.h"

    // For using NFC
    #include "matrix_nfc/nfc.h"
    #include "matrix_nfc/nfc_data.h"

    int main() {
        ////////////////////
        // INITIAL SETUP //
        //////////////////

        // Setting up HAL bus
        matrix_hal::MatrixIOBus bus;
        if (!bus.Init()) return false;

        // Setting up Everloop
        matrix_hal::EverloopImage everloop_image(bus.MatrixLeds());
        matrix_hal::Everloop everloop;
        everloop.Setup(&bus);

        // Setting up NFC
        matrix_hal::NFC nfc;
        matrix_hal::NFCData nfc_data;

        /////////////////
        // MAIN CODE //
        ///////////////

        std::cout << "Scan a tag, any tag!" << std::endl;

        do {
            // Scan NFC tag and read info into nfc_data.info
            nfc.Activate();
            nfc.ReadInfo(&nfc_data.info);
            nfc.Deactivate();

            // Output tag info and set everloop to green only if tag was detected,
            // else set everloop to off.
            if (nfc_data.info.recently_updated) {
                std::cout << nfc_data.info.ToString() << std::endl << std::endl;
                for (matrix_hal::LedValue &led : everloop_image.leds) {
                    led.red = 0;
                    led.green = 20;
                    led.blue = 0;
                    led.white = 0;
                }
            } else {
                for (matrix_hal::LedValue &led : everloop_image.leds) {
                    led.red = 0;
                    led.green = 0;
                    led.blue = 0;
                    led.white = 0;
                }
            }

            // Update the Everloop
            everloop.Write(&everloop_image);

            // Sleep for a reasonable amount of time
            std::this_thread::sleep_for(std::chrono::microseconds(10000));
        } while (true);

        return 0;
    }
    ```

??? example "NFC Rainbow Toggle"
    The following example shows how to use an NFC tag to toggle the movement of the rainbow on Everloop. You can download this example <a href="https://github.com/matrix-io/matrix-hal-nfc/blob/master/examples/nfc_rainbow_toggle.cpp" target="_blank">here</a>.

    ```c++
    /////////////////////////
    // INCLUDE STATEMENTS //
    ///////////////////////

    // For console output
    #include <iostream>
    // For sleep
    #include <chrono>
    #include <thread>
    // For sine
    #include <cmath>
    // For string
    #include <string>

    // For using the Everloop
    #include "matrix_hal/everloop.h"
    #include "matrix_hal/everloop_image.h"
    #include "matrix_hal/matrixio_bus.h"

    // For using NFC
    #include "matrix_nfc/nfc.h"
    #include "matrix_nfc/nfc_data.h"

    int main() {
        ////////////////////
        // INITIAL SETUP //
        //////////////////

        // Setting up HAL bus
        matrix_hal::MatrixIOBus bus;
        if (!bus.Init()) return false;

        // Setting up Everloop
        matrix_hal::EverloopImage everloop_image(bus.MatrixLeds());
        matrix_hal::Everloop everloop;
        everloop.Setup(&bus);

        // Setting up NFC
        matrix_hal::NFC nfc;
        matrix_hal::NFCData nfc_data;

        /////////////////
        // MAIN CODE //
        ///////////////

        std::cout << "Scan ON/OFF Tag" << std::endl;

        // Loop until a tag is detected and the info from it is read
        while (true) {
            if (nfc_data.info.recently_updated) break;
            nfc.Activate();
            nfc.ReadInfo(&nfc_data.info);
            nfc.Deactivate();
        }

        // Get the UID from the tag
        std::string switchUID = nfc_data.info.UIDToHex();

        std::cout << "ON/OFF Tag Scanned!" << std::endl;

        float counter = 0;
        const float freq = 0.375;

        std::cout << "Scan the same tag to update rainbow." << std::endl;

        do {
            // Scan NFC tag and read info into nfc_data.info
            nfc.Activate();
            nfc.ReadInfo(&nfc_data.info);
            nfc.Deactivate();

            // Update the rainbow on everloop only if a a tag was detected and the
            // UID of the detected tag matches the initial scanned tag.
            if (nfc_data.info.recently_updated) {
                std::string currUID = nfc_data.info.UIDToHex();
                if (switchUID == currUID) {
                    for (matrix_hal::LedValue &led : everloop_image.leds) {
                        // Sine waves 120 degrees out of phase for rainbow
                        led.red =
                            (std::sin(freq * counter + (M_PI / 180 * 240)) * 155 +
                            100) /
                            10;
                        led.green =
                            (std::sin(freq * counter + (M_PI / 180 * 120)) * 155 +
                            100) /
                            10;
                        led.blue = (std::sin(freq * counter + 0) * 155 + 100) / 10;
                        counter += 0.51;
                    }
                }
            }

            // Update the Everloop
            everloop.Write(&everloop_image);

            // Sleep for a reasonable amount of time
            std::this_thread::sleep_for(std::chrono::microseconds(5000));
        } while (true);

        return 0;
    }
    ```

??? example "NFC Unique Color Toggle"
    The following example shows how to use the UID of NFC tags to conditionally perform action depending on which tag is scanned. You can download this example <a href="https://github.com/matrix-io/matrix-hal-nfc/blob/master/examples/nfc_unique_color_toggle.cpp" target="_blank">here</a>.

    ```c++
    /////////////////////////
    // INCLUDE STATEMENTS //
    ///////////////////////

    // For console output
    #include <iostream>
    // For sleep
    #include <chrono>
    #include <thread>
    // For string
    #include <string>
    // For set
    #include <set>

    // For using the Everloop
    #include "matrix_hal/everloop.h"
    #include "matrix_hal/everloop_image.h"
    #include "matrix_hal/matrixio_bus.h"

    // For using NFC
    #include "matrix_nfc/nfc.h"
    #include "matrix_nfc/nfc_data.h"

    int main() {
        ////////////////////
        // INITIAL SETUP //
        //////////////////

        // Setting up HAL bus
        matrix_hal::MatrixIOBus bus;
        if (!bus.Init()) return false;

        // Setting up Everloop
        matrix_hal::EverloopImage everloop_image(bus.MatrixLeds());
        matrix_hal::Everloop everloop;
        everloop.Setup(&bus);

        // Setting up NFC
        matrix_hal::NFC nfc;
        matrix_hal::NFCData nfc_data;

        /////////////////
        // MAIN CODE //
        ///////////////

        // Set used to check for uniqueness
        std::set<std::string> UID_set;

        // Strings to store the unique UID for three tags.
        std::string green_UID = "";
        std::string blue_UID = "";
        std::string red_UID = "";

        // Scan red tag, using a set to ensure that the UID has not been scanned
        // before. Loop until a unique UID has been scanned.
        std::cout << "Scan Red Tag" << std::endl;
        while (true) {
            nfc.Activate();
            nfc.ReadInfo(&nfc_data.info);
            nfc.Deactivate();
            red_UID = nfc_data.info.UIDToHex();
            // If the find function returns UID_set.end() then the UID was not
            // previously read.
            if (nfc_data.info.recently_updated &&
                UID_set.find(red_UID) == UID_set.end())
                break;
        }
        UID_set.insert(red_UID);

        // Scan green tag, using a set to ensure that the UID has not been scanned
        // before. Loop until a unique UID has been scanned.
        std::cout << "Scan Green Tag" << std::endl;
        while (true) {
            nfc.Activate();
            nfc.ReadInfo(&nfc_data.info);
            nfc.Deactivate();
            green_UID = nfc_data.info.UIDToHex();
            // If the find function returns UID_set.end() then the UID was not
            // previously read.
            if (nfc_data.info.recently_updated &&
                UID_set.find(green_UID) == UID_set.end())
                break;
        }
        UID_set.insert(green_UID);

        // Scan blue tag, using a set to ensure that the UID has not been scanned
        // before. Loop until a unique UID has been scanned.
        std::cout << "Scan Blue Tag" << std::endl;
        while (true) {
            nfc.Activate();
            nfc.ReadInfo(&nfc_data.info);
            nfc.Deactivate();
            blue_UID = nfc_data.info.UIDToHex();
            // If the find function returns UID_set.end() then the UID was not
            // previously read.
            if (nfc_data.info.recently_updated &&
                UID_set.find(blue_UID) == UID_set.end())
                break;
        }
        UID_set.insert(blue_UID);

        std::cout << "\nScan specified tags to activate Everloop" << std::endl;

        do {
            // Scan NFC tag and read info into nfc_data.info
            nfc.Activate();
            nfc.ReadInfo(&nfc_data.info);
            nfc.Deactivate();

            // If tag was detected set everloop to the color that matches the
            // scanned tag's UID, else set everloop to off.
            if (nfc_data.info.recently_updated) {
                std::string curr_UID = nfc_data.info.UIDToHex();
                if (curr_UID == red_UID) {
                    for (matrix_hal::LedValue &led : everloop_image.leds) {
                        led.red = 50;
                        led.green = 0;
                        led.blue = 0;
                        led.white = 0;
                    }
                } else if (curr_UID == green_UID) {
                    for (matrix_hal::LedValue &led : everloop_image.leds) {
                        led.red = 0;
                        led.green = 50;
                        led.blue = 0;
                        led.white = 0;
                    }
                } else if (curr_UID == blue_UID) {
                    for (matrix_hal::LedValue &led : everloop_image.leds) {
                        led.red = 0;
                        led.green = 0;
                        led.blue = 50;
                        led.white = 0;
                    }
                } else {
                    for (matrix_hal::LedValue &led : everloop_image.leds) {
                        led.red = 0;
                        led.green = 0;
                        led.blue = 0;
                        led.white = 0;
                    }
                }
            }

            // Update the Everloop
            everloop.Write(&everloop_image);

            // Sleep for a reasonable amount of time
            std::this_thread::sleep_for(std::chrono::microseconds(10000));
        } while (true);

        return 0;
    }
    ```

??? example "NFC Read Pages"
    The following example shows how to read all pages from an NFC tag. The tag must be either a NTAG or a MIFARE Ultralight. You can download this example <a href="https://github.com/matrix-io/matrix-hal-nfc/blob/master/examples/nfc_read_pages.cpp" target="_blank">here</a>.

    ```c++  
    /////////////////////////
    // INCLUDE STATEMENTS //
    ///////////////////////

    // For console output
    #include <iostream>
    // For sleep
    #include <chrono>
    #include <thread>

    // For using the Everloop
    #include "matrix_hal/everloop.h"
    #include "matrix_hal/everloop_image.h"
    #include "matrix_hal/matrixio_bus.h"

    // For using NFC
    #include "matrix_nfc/nfc.h"
    #include "matrix_nfc/nfc_data.h"

    int main() {
        ////////////////////
        // INITIAL SETUP //
        //////////////////

        // Setting up HAL bus
        matrix_hal::MatrixIOBus bus;
        if (!bus.Init()) return false;

        // Setting up Everloop
        matrix_hal::EverloopImage everloop_image(bus.MatrixLeds());
        matrix_hal::Everloop everloop;
        everloop.Setup(&bus);

        // Setting up NFC
        matrix_hal::NFC nfc;
        matrix_hal::NFCData nfc_data;

        /////////////////
        // MAIN CODE //
        ///////////////

        std::cout << "Scan a Mifare Ultralight or NTAG." << std::endl;

        do {
            // Scan NFC tag and read pages into nfc_data.pages
            nfc.Activate();
            nfc.mful.ReadPages(&nfc_data.pages);
            nfc.Deactivate();

            // Output pages from tag and set everloop to green only if tag was
            // detected and all pages were read, else set everloop to off.
            if (nfc_data.pages.recently_updated && nfc_data.pages.read_complete) {
                std::cout << std::endl;
                std::cout << "String:\n" << nfc_data.pages.ToString() << std::endl;
                std::cout << "Hex:\n" << nfc_data.pages.ToHex() << std::endl;
                for (matrix_hal::LedValue &led : everloop_image.leds) {
                    led.red = 0;
                    led.green = 20;
                    led.blue = 0;
                    led.white = 0;
                }
            } else {
                for (matrix_hal::LedValue &led : everloop_image.leds) {
                    led.red = 0;
                    led.green = 0;
                    led.blue = 0;
                    led.white = 0;
                }
            }

            // Update the Everloop
            everloop.Write(&everloop_image);

            // Sleep for a reasonable amount of time
            std::this_thread::sleep_for(std::chrono::microseconds(10000));
        } while (true);

        return 0;
    }
    ```

??? example "NFC Write Page"
    The following example shows how to write a page to an NFC tag. The tag must be either a NTAG or a MIFARE Ultralight. You can download this example <a href="https://github.com/matrix-io/matrix-hal-nfc/blob/master/examples/nfc_write_page.cpp" target="_blank">here</a>.

    ```c++  
    /////////////////////////
    // INCLUDE STATEMENTS //
    ///////////////////////

    // For console output
    #include <iostream>
    // For sleep
    #include <chrono>
    #include <thread>
    // For string
    #include <string>
    // For vector
    #include <vector>

    // For using the Everloop
    #include "matrix_hal/everloop.h"
    #include "matrix_hal/everloop_image.h"
    #include "matrix_hal/matrixio_bus.h"

    // For using NFC
    #include "matrix_nfc/nfc.h"
    #include "matrix_nfc/nfc_data.h"

    int main() {
        ////////////////////
        // INITIAL SETUP //
        //////////////////

        // Setting up HAL bus
        matrix_hal::MatrixIOBus bus;
        if (!bus.Init()) return false;

        // Setting up Everloop
        matrix_hal::EverloopImage everloop_image(bus.MatrixLeds());
        matrix_hal::Everloop everloop;
        everloop.Setup(&bus);

        // Setting up NFC
        matrix_hal::NFC nfc;
        matrix_hal::NFCData nfc_data;

        /////////////////
        // MAIN CODE //
        ///////////////

        int status;
        bool prompt_user = true;
        int page_number = 0;
        std::string write_str = "";
        std::vector<uint8_t> write_data;

        do {
            // Ask user for new data to write
            if (prompt_user) {
                std::cout << "Enter Page to Write/Read From (Integer)" << std::endl;
                std::cin >> page_number;
                std::cout << "Enter String to Write (one page is 4 characters)"
                        << std::endl;
                std::cin >> write_str;
                // Convert the string to a vector
                write_data =
                    std::vector<uint8_t>(write_str.begin(), write_str.end());
                prompt_user = false;
                std::cout << "Scan a Mifare Ultralight or NTAG" << std::endl;
            }

            // Wait until an NFC tag is activated
            do {
                status = nfc.Activate();
            } while (matrix_hal::NFCStatus(status) != "Activation Done");

            // Read the specified page from the NFC tag
            std::vector<uint8_t> read_page = nfc.mful.ReadPage(page_number);
            if (read_page.empty()) std::cout << "Error Reading" << std::endl;

            std::cout << "Page: " << page_number << " | Before Write: "
                    << matrix_hal::PagesContent::BytesToString(read_page)
                    << std::endl;

            // Write the specified page to the NFC tag
            status = nfc.mful.WritePage(page_number, write_data);

            // If the write succeeded then prompt the user for a new write next loop
            // iteration and set everloop to green, else set everloop to off
            if (matrix_hal::NFCStatus(status) == "Success") {
                prompt_user = true;
                for (matrix_hal::LedValue &led : everloop_image.leds) {
                    led.red = 0;
                    led.green = 20;
                    led.blue = 0;
                    led.white = 0;
                }
            } else {
                if (matrix_hal::NFCStatus(status) ==
                    "Incorrect Card Type For Function") {
                    std::cout
                        << "This example only supports Mifare Ultralight and NTAG "
                        "cards"
                        << std::endl;
                }
                for (matrix_hal::LedValue &led : everloop_image.leds) {
                    led.red = 0;
                    led.green = 0;
                    led.blue = 0;
                    led.white = 0;
                }
            }

            // Read the specified page from the NFC tag
            read_page = nfc.mful.ReadPage(page_number);
            if (read_page.empty()) std::cout << "Error Reading" << std::endl;

            std::cout << "Page: " << page_number << " | After Write: "
                    << matrix_hal::PagesContent::BytesToString(read_page)
                    << std::endl
                    << std::endl;

            nfc.Deactivate();

            // Update the Everloop
            everloop.Write(&everloop_image);

            // Sleep for a reasonable amount of time
            std::this_thread::sleep_for(std::chrono::microseconds(10000));
        } while (true);

        return 0;
    }
    ```

??? example "NFC Read NDEF"
    The following example shows how to read the NDEF message from an NFC tag. The tag must be either a NTAG or a MIFARE Ultralight. You can download this example <a href="https://github.com/matrix-io/matrix-hal-nfc/blob/master/examples/nfc_read_ndef.cpp" target="_blank">here</a>.

    ```c++
    /////////////////////////
    // INCLUDE STATEMENTS //
    ///////////////////////

    // For console output
    #include <iostream>
    // For sleep
    #include <chrono>
    #include <thread>

    // For using the Everloop
    #include "matrix_hal/everloop.h"
    #include "matrix_hal/everloop_image.h"
    #include "matrix_hal/matrixio_bus.h"

    // For using NFC
    #include "matrix_nfc/nfc.h"
    #include "matrix_nfc/nfc_data.h"

    int main() {
        ////////////////////
        // INITIAL SETUP //
        //////////////////

        // Setting up HAL bus
        matrix_hal::MatrixIOBus bus;
        if (!bus.Init()) return false;

        // Setting up Everloop
        matrix_hal::EverloopImage everloop_image(bus.MatrixLeds());
        matrix_hal::Everloop everloop;
        everloop.Setup(&bus);

        // Setting up NFC
        matrix_hal::NFC nfc;
        matrix_hal::NFCData nfc_data;

        /////////////////
        // MAIN CODE //
        ///////////////

        std::cout << "Scan a tag to read NDEF!" << std::endl;

        do {
            // Scan NFC tag and read NDEF into nfc_data.ndef
            nfc.Activate();
            nfc.ndef.Read(&nfc_data.ndef);
            nfc.Deactivate();

            // If tag was detected output scanned tag's NDEF and set everloop to
            // green, else set everloop to off.
            if (nfc_data.ndef.recently_updated) {
                // Only output NDEF if the scanned tag was NDEF formatted
                if (nfc_data.ndef.valid) {
                    std::cout << std::endl;
                    std::cout << "String:\n"
                            << nfc_data.ndef.ToString() << std::endl;
                    std::cout << "Hex:\n" << nfc_data.ndef.ToHex() << std::endl;
                    std::cout << "Output from NDEF parser:" << std::endl;
                    matrix_hal::NDEFParser ndef_parser =
                        matrix_hal::NDEFParser(&nfc_data.ndef);
                    std::cout << ndef_parser.ToString() << std::endl;
                }
                for (matrix_hal::LedValue &led : everloop_image.leds) {
                    led.red = 0;
                    led.green = 20;
                    led.blue = 0;
                    led.white = 0;
                }
            } else {
                for (matrix_hal::LedValue &led : everloop_image.leds) {
                    led.red = 0;
                    led.green = 0;
                    led.blue = 0;
                    led.white = 0;
                }
            }

            // Update the Everloop
            everloop.Write(&everloop_image);

            // Sleep for a reasonable amount of time
            std::this_thread::sleep_for(std::chrono::microseconds(10000));
        } while (true);

        return 0;
    }
    ```

??? example "NFC Write NDEF"
    The following example shows how to read the NDEF message from an NFC tag. The tag must be either a NTAG or a MIFARE Ultralight. You can download this example <a href="https://github.com/matrix-io/matrix-hal-nfc/blob/master/examples/nfc_write_ndef.cpp" target="_blank">here</a>.

    ```c++
    /////////////////////////
    // INCLUDE STATEMENTS //
    ///////////////////////

    // For console output
    #include <iostream>
    // For sleep
    #include <chrono>
    #include <thread>

    // For using the Everloop
    #include "matrix_hal/everloop.h"
    #include "matrix_hal/everloop_image.h"
    #include "matrix_hal/matrixio_bus.h"

    // For using NFC
    #include "matrix_nfc/nfc.h"
    #include "matrix_nfc/nfc_data.h"

    // A helper function for writing NDEF to tag
    int NDEF_WriteToNewTag(matrix_hal::NFC &nfc, matrix_hal::NFCData &nfc_data) {
        std::cout << "Press enter to write" << std::endl;

        // Loop until enter pressed
        char temp = 'x';
        while (temp != '\n') std::cin.get(temp);

        // Create an NDEFParser object and add a website NDEF record to the parser.
        matrix_hal::NDEFParser ndef_parser = matrix_hal::NDEFParser();
        ndef_parser.AddUriRecord("http://docs.matrix.one");
        std::cout << "Message Info:" << std::endl;
        // Output the NDEF message information from the NDEFParser.
        std::cout << ndef_parser.ToString() << std::endl;

        // Write the NDEF message from the NDEFParser to a NFC tag.
        nfc.Activate();
        nfc.ndef.Write(&ndef_parser);
        nfc.Deactivate();

        std::cout << "Wrote to new tag, try scanning tag with Android phone."
                << std::endl;
        return 0;
    }

    int main() {
        ////////////////////
        // INITIAL SETUP //
        //////////////////

        // Setting up HAL bus
        matrix_hal::MatrixIOBus bus;
        if (!bus.Init()) return false;

        // Setting up Everloop
        matrix_hal::EverloopImage everloop_image(bus.MatrixLeds());
        matrix_hal::Everloop everloop;
        everloop.Setup(&bus);

        // Setting up NFC
        matrix_hal::NFC nfc;
        matrix_hal::NFCData nfc_data;

        /////////////////
        // MAIN CODE //
        ///////////////

        std::cout << "Scan a tag to read then write NDEF!" << std::endl;

        do {
            // Scan NFC tag and read NDEF into nfc_data.ndef
            nfc.Activate();
            nfc.ndef.Read(&nfc_data.ndef);
            nfc.Deactivate();

            // If tag was detected output scanned tag's NDEF, write new NDEF, and
            // set everloop to green, else set everloop to off.
            if (nfc_data.ndef.recently_updated) {
                // Only output NDEF if the scanned tag was NDEF formatted
                if (nfc_data.ndef.valid) {
                    std::cout << std::endl;
                    std::cout << "String:\n"
                            << nfc_data.ndef.ToString() << std::endl;
                    std::cout << "Hex:\n" << nfc_data.ndef.ToHex() << std::endl;
                    std::cout << "Output from NDEF parser:" << std::endl;
                    matrix_hal::NDEFParser ndef_parser =
                        matrix_hal::NDEFParser(&nfc_data.ndef);
                    std::cout << ndef_parser.ToString() << std::endl;
                    std::cout << std::endl;
                }
                NDEF_WriteToNewTag(nfc, nfc_data);
                for (matrix_hal::LedValue &led : everloop_image.leds) {
                    led.red = 0;
                    led.green = 20;
                    led.blue = 0;
                    led.white = 0;
                }
            } else {
                for (matrix_hal::LedValue &led : everloop_image.leds) {
                    led.red = 0;
                    led.green = 0;
                    led.blue = 0;
                    led.white = 0;
                }
            }

            // Update the Everloop
            everloop.Write(&everloop_image);

            // Sleep for a reasonable amount of time
            std::this_thread::sleep_for(std::chrono::microseconds(10000));
        } while (true);

        return 0;
    }
    ```