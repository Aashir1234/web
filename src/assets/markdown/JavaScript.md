- [Introduction to tcl/tk Scripting](#Intro)
- [Running tcl Scripts](#running-Scripts)
- [Scripting Basics](#tcl_scripting_basics)
- [Strings Processing](#escape_sequences)
- [Different braces and their behaviour ](#Different-braces-and-their-behaviour)
- [Conditional Statements](#conditional-statements)
- [TCL Expression and Operators](#TCL-Expression-and-Operator)


## Intro
Tcl is shortened form of `Tool Command Language`. John Ousterhout of the University of California, Berkeley, designed it. <br/> It is a combination of a `scripting language` and its `own interpreter` that gets embedded to the application, we develop with it.
Tcl was developed initially for Unix. It was then ported to Windows, DOS, OS/2, and Mac OSX. Tcl is much similar to other unix shell languages like Bourne Shell (Sh), the C Shell (csh), the Korn Shell (sh), and Perl. <br/>
It aims at providing ability for programs to interact with other programs and also for acting as an embeddable interpreter. <br/>
## running-Scripts
To run a script in tcl i.e (.tcl) file.  we use tcl.sh interpreter 
```
tclsh hello.tcl
```
## tcl_scripting_basics
### Printing a line
To print a line in tcl we use `puts`. <br/>
example: <br/>
```
puts "HELLO WORLD"
```
### Assigning Values
To assign values to any variable we use `set`.
example: <br/>
```
set x "Aashir"
puts x
```
## escape_sequences
```
String 	      Output 	                  Hex Value
\a 	     Audible Bell 	             0x07
\b 	     Backspace       	             0x08
\f 	     Form Feed (clear screen) 	     0x0c
\n 	     New Line 	                     0x0a
\r 	     Carriage Return 	             0x0d
\t 	     Tab 	                     0x09
\v 	     Vertical Tab 	             0x0b
```
for example :
```
puts "to add a character like \$ we use slash"
puts "My name is aashir \n I am 20 yrs old "
puts "to use tabular spaces we use ...\t.... \\t"
```

## Different braces and their behaviour
### {} -> Curly braces :
Characters within braces are passed to a command exactly as written. <br/>
Some points to remember

    1- Variable substitution is not allowed inside {} braces
    2- It used to create list data type
Example: <br/>
```
% set x 10
% puts {$x}
% $x
```
```
%set number {1 2 3 4 5} -> Here number is a list data type
%puts $number
%1 2 3 4 5
```
### [] -> square braces :
Square brackets are used to create nested command. Simply put, output of one command passed as argument to another command. Square brackets are used to define a block that’s run BEFORE the rest of the command on the current line, and the result is substituted into the line.
Example:
```
% set x 10
% puts "y : [set y [set x 10]]"
%y : 10
% puts "x : $x"
%x : 10
```

### TCL Expression and Operator
operands and operators
```
Operator Category 		Symbol 		   Precedence/Associativity
Arithmetic Operator 	      + - * / % 	   Left to Right
Relational Operator 	    == != < > <= >= 	   Left to Right
Logical Operator 	       && || ! 	           Left to Right
Ternary Operator 	          ?: 	           Right to Left
String Comparison Operator 	eq ne 	           Left to Right
Exponentiation Operator 	** 	           Left to Right
```


## conditional statements
### if-else:
```
set x 1
if {$x == 1} {puts "The value of x is 1"} else {puts "The value of x is not 1"}
#another syntax 
if "$x != 1" {
	puts "$$x != 1"
} else { puts "$$x == 1"
}
```
### while:
