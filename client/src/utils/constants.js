export const THEMES = [
  {
    id: "material",
    name: "Material",
  },
  {
    id: "3024-night",
    name: "3024 Night",
  },
  {
    id: "abbott",
    name: "Abbott",
  },
  {
    id: "abcdef",
    name: "Abcdef",
  },
  {
    id: "ayu-dark",
    name: "Ayu Dark",
  },
  {
    id: "ayu-mirage",
    name: "Ayu Mirage",
  },
  {
    id: "base16-dark",
    name: "Base16 Dark",
  },
  {
    id: "blackboard",
    name: "Blackboard",
  },
  {
    id: "cobalt",
    name: "Cobalt",
  },
  {
    id: "colorforth",
    name: "Colorforth",
  },
  {
    id: "dracula",
    name: "Dracula",
  },
  {
    id: "erlang-dark",
    name: "Erlang Dark",
  },
  {
    id: "hopscotch",
    name: "Hopscotch",
  },
  {
    id: "isotope",
    name: "Isotope",
  },
  {
    id: "mdn-like",
    name: "Mdn Like",
  },
  {
    id: "monokai",
    name: "Monokai",
  },
  {
    id: "neo",
    name: "Neo",
  },
  {
    id: "night",
    name: "Night",
  },
  {
    id: "nord",
    name: "Nord",
  },
  {
    id: "seti",
    name: "Seti",
  },
  {
    id: "the-matrix",
    name: "The Matrix",
  },
  {
    id: "twilight",
    name: "Twilight",
  },
  {
    id: "yeti",
    name: "Yeti",
  },
];

export const LANGUAGES = [
  {
    name: "HTML",
    mode: "htmlmixed",
  },
  {
    name: "CSS",
    mode: "css",
  },
  {
    name: "JavaScript",
    mode: "javascript",
  },
  {
    name: "Python",
    mode: "python",
  },
  {
    name: "C/C++",
    mode: "clike",
  },
  {
    name: "PHP",
    mode: "php",
  },
  {
    name: "PowerShell",
    mode: "powershell",
  },
  {
    name: "Dart",
    mode: "dart",
  },
  {
    name: "Django",
    mode: "django",
  },
  {
    name: "Shell",
    mode: "shell",
  },
  {
    name: "SQL",
    mode: "sql",
  },
  {
    name: "Markdown",
    mode: "markdown",
  },
];

export const defaultCodes = {
  HTML: `
<!DOCTYPE html>
<html lang="en">
<head>
  <title>Form in HTML</title>
</head>
<body>
<form>
  <label for="fname">First name:</label><br>
  <input type="text" id="fname" name="fname"><br>
  <label for="lname">Last name:</label><br>
  <input type="text" id="lname" name="lname">
</form>
</body>
</html>`,
  CSS: `
/* Changing background color  */
body {
  background-color: #f0f0f0;
}
`,
  JavaScript: `
// generating  a random number
const a = Math.random();
console.log(a);
`,
  Python: `
# This program adds two numbers

num1 = 1.5
num2 = 6.3
  
# Add two numbers
sum = num1 + num2
  
# Display the sum
print('The sum of {0} and {1} is {2}'.format(num1, num2, sum)) 
`,
  C: `
#include <stdio.h>
int main() {   
  int number;
     
  printf("Enter an integer: ");  
      
  // reads and stores input
  scanf("%d", &number);
  
  // displays output
  printf("You entered: %d", number);
      
  return 0;
}  
`,
  PHP: `
<?php
  $name = "Codebook";
  echo "Hey! This is " . $name . "<br>";
?>
`,
  PowerShell: `
## Define the service name in a variable
$ServiceName = 'EventLog'
  
$ServiceInfo = Get-Service -Name $ServiceName
`,
  Dart: `
int fibonacci(int n) {
  if (n == 0 || n == 1) return n;
  return fibonacci(n - 1) + fibonacci(n - 2);
}
  
var result = fibonacci(20);
`,
  Django: `
{# Looping in Django #}

<ul>
  {% for x in mymembers %}
    <li>{{ x.firstname }}</li>
  {% endfor %}
</ul>
`,
  Shell: `
#!/bin/bash

# Add two numeric value
((sum=25+35))
  
#Print the result
echo $sum
`,
  SQL: `
-- creating a table

CREATE TABLE STATION
(ID INTEGER PRIMARY KEY,
CITY CHAR(20),
STATE CHAR(2),
LAT_N REAL,
LONG_W REAL);
`,
  Markdown: `
# This is an H1 #

## This is an H2 ##
  
### This is an H3 ###
`,
};
