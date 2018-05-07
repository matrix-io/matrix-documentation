## Microphone Array on MATRIX Voice
![Mic Position](../img/mic_voice_position.png)

## Audio specs:

Sample Rate: 8 to 48 kHz
Bit Depth: 16 bit

<h2 style="padding-top:0;">Position [x,y] of each mic in the array (mm):</h2>

| Mic  |      X      |      Y      |  
| ---- | ----------- | ----------- |  
|  M1  |    00.00    |     0.00    |
|  M2  |   -38.13    |     3.58    |
|  M3  |   -20.98    |    32.04    |
|  M4  |    11.97    |    36.38    |
|  M5  |    35.91    |    13.32    |
|  M6  |    32.81    |   -19.77    |
|  M7  |     5.00    |   -37.97    |
|  M8  |   -26.57    |   -27.58    |

<h2 style="padding-top:0;">Connection to the FPGA:</h2>

| Mic  |   FPGA pin  |   PDM_Data  |  
| ---- | ----------- | ----------- |  
|  M1  |     E6      | pdm_data<0> |
|  M2  |     B8      | pdm_data<1> |
|  M3  |     A8      | pdm_data<2> |
|  M4  |     C7      | pdm_data<3> |
|  M5  |     A7      | pdm_data<4> |
|  M6  |     A6      | pdm_data<5> |
|  M7  |     B6      | pdm_data<6> |
|  M8  |     A5      | pdm_data<7> |
|  CLK |     B5      | pdm_clk     |