# Verilog Cheat Sheet
## Disclaimers and notes
### - Verilog is meant to simulate and create digital versions of circuits
### - Verilog uses modules similar to how other languages use classes
### - Verilog doesn't use {}, instead it declares a keyword followed by a keywordend (example: module and moduleend are used to begin and end modules)
--------------------
--------------------
## Modules 
### Modules are chunks of code that are used to simulate a certain functionality in a circuit.
```verilog
    module [module_name] #(parameters) (variables_for_input_output);
        //code for module
    endmodule

    //ex: 
        module app 
            #(
            parameter one,
            parameter two,
            parameter three
            )
            (
                input a,
                output b,
                inout z
            );
                //module code here
        endmodule

    //example module meant to represent an AND gate:

        //we declare our module called andgate
        module andgate (inOne, inTwo, out);         //we specify its inputs and outputs
            input inOne, inTwo;                     //here we declare inOne and two as inputs
            output out;                             //out is output

            assign out = inOne & inTwo;             //this continually and implicitly assigns 
                                                    //out the value of inOne AND inTwo
        endmodule
```


---------------------------------
--------------------
## Verilog variables
### Verilog variables function the same as regular variables but only usually come as `reg` or `int`.
### `reg` isn't necessarily meant to represent a physical register, rather it's meant to hold a value assigned to it.
### They can store values and drive values unlike NETWORKS (see below).
`reg`
```verilog
    //ex:
        input a, b;
        output c;
        reg a, b;
        wire c;
```

`int` (basic 32 bit integer)
```verilog
    //ex:
        int number = 42;
```
--------------------
--------------------
## Networks
### Nets are just meant to create networks, and so physically represent things like wires or other forms of connectors.
### Unlike verilog variables, nets can't hold values and so are only meant to connect ports, transmit signals, etc., like actual wires.
```verilog
    wire //a net type that acts like a wire
```
--------------------
--------------------
## Parameters
### Parameters are like global/local constants.
`parameter` (used for global constants in a module)
```verilog
    //ex: 
        parameter a_variable_name = 8;
```
`localparam` (used for local constants in a module)
```verilog
    //ex: 
        localparam a_variable_name = 8;
```
--------------------
--------------------
## Declaring buses
```verilog
    [datatype] [Most significant bit : least significant bit] [variable name]

    //ex: 
        wire [7:0] gpio // an 8 bit wire bus named gpio

    //ex: 
        reg  [9:0] led // a 10 bit reg bus named led
```
--------------------
--------------------
## Numbers
### Verilog has a sort of short hand syntax to specify the size, base and value of a number.
```verilog
    [bitsize]'[base][number]

    //ex:
        8'b10101; //8 bit binary 00010101

    //ex:
        10'D102 //10 bit Decimal 102
```
--------------------
--------------------
## Including other modules in the same folder
### Modules can include each other similar to how *js* files can include other *js* files.
### The syntax is similar to how you would create an instance of a class.
```verilog
    module_name #(parameter_values) instance_name(port_connection_list);
    
    //ex: 
        counter #(delay.(delay_amount)) instance(gpio, mic)
        //when declaring parameters, parameter_name.(parameter) is often 
        //used to specify what parameter a value is being assigned to
```
--------------------
## Conditional Statements
```verilog
    if (this is a regular if)

    //ex: 
        if (*something*)
            //code
        else if (*anotherThing*)
            //more code
        else
            //even more code
```
-----------------------------
```verilog
    case (this is a switch)

    case(variable)
        case1: //code
        case2: //code
        default: //code
    endcase;

    //ex: 
        case(a)
            1: q = a;
            2: b = a;
            3: g = a;
            default: a = 0;
        endcase
```
--------------------
--------------------
## `always@()`
### `always@`s occur at a certain change in the sensitivity list.
### So for `always@(a, b, c)`, the code block within the `always` will run if `a`, `b`, or `c` change.
```verilog
    always@(sensitivity list);
        //code
    end

    //ex:
        always @(posedge clk) begin
            if(!count[1])
            count <= count + 1;
        end
```
--------------------
## `posedge` and `negedge`
### `posedge` and `negedge` are used when dealing with clocks.
### "`posedge` *clk*" in a sensitivity list means that at every time the clock ticks to its positive edge, run the always block.
### `negedge` is similar but for the negative edge of the clock.
--------------------
--------------------
## `generate`
### A `generate` is similar to a for loop except any module instantiated in the loop, remains instantiated in memory.
```verilog
    generate
    genvar
    
    //ex:
        // Tristate logic for IO
        genvar    i; //the genvar is like the variable i created in a for loop
        generate
            for (i=0;i<GPIO_WIDTH;i=i+1)  begin:
                assign gpio_io[i] = (gpio_dir[i]) ? gpio_o[i] : 1'bz;
                assign gpio_i[i]  = gpio_io[i];
            end
        endgenerate
    
    //in this example, every time a gpio_io[i] is assigned, it remains in memory even after the for loop ends
    //so basically, local variables in loops can remain in memory with generate
```
-----------------
-----------------
## `assign`
### `assign` is an implicit way to continuously update a variable.
### Similar to an `always` block's sensitivity list, the `assign` statement will run whenever the right side of the equal sign changes.
```verilog
    //ex:
        module andgate (inOne, inTwo, out);         //we specify its inputs and outputs
            input inOne, inTwo;                     //here we declare inOne and two as inputs
            output out;                             //out is output

            assign out = inOne & inTwo;             //this continually and implicitly assigns 
                                                    //out the value of inOne AND inTwo
        endmodule
```

