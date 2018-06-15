## Microphone Array on MATRIX Creator
![Mic Position](../img/mic_creator_position.png)

## Audio Specifications

Sample Rate: 8 to 96 kHz
Bit Depth: Signed 16 bit

<h3 style="padding-top:0;">Position [x,y] of each mic in the array (mm)</h3>

| Mic  |      X      |      Y      |  
| ---- | ----------- | ----------- |  
|  M1  |  20.0908795 | -48.5036755 |
|  M2  | -20.0908795 | -48.5036755 |
|  M3  | -48.5036755 | -20.0908795 |
|  M4  | -48.5036755 |  20.0908795 |
|  M5  | -20.0908795 |  48.5036755 |
|  M6  |  20.0908795 |  48.5036755 |
|  M7  |  48.5036755 |  20.0908795 |
|  M8  |  48.5036755 | -20.0908795 |

<h3 style="padding-top:0;">Connection to the FPGA</h3>

You can check the physical connection between the FPGA and other components in 
<a href="https://github.com/matrix-io/matrix-creator-fpga/blob/master/creator_core/creator.ucf" target="_blank">creator.ucf</a>

| Mic  |   FPGA pin  |   PDM_Data  |  
| ---- | ----------- | ----------- |  
|  M1  |     P45     | pdm_data<0> |
|  M2  |     P46     | pdm_data<1> |
|  M3  |     P47     | pdm_data<2> |
|  M4  |     P58     | pdm_data<3> |
|  M5  |     P59     | pdm_data<4> |
|  M6  |     P64     | pdm_data<5> |
|  M7  |     P65     | pdm_data<6> |
|  M8  |     P44     | pdm_data<7> |
|  CLK |     P47     | pdm_clk     |