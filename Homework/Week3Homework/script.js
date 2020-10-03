// Assignment Code
var generateBtnEl = document.querySelector("#generate");
var specialChars = '!#$%&\()*+,-./:;<=>?@^[]^_`{|}~';
var lowercaseEl = document.querySelector("#lowercase");
var uppercaseEl = document.querySelector("#uppercase");
var numericEl = document.querySelector("#numeric");
var specialCharsEl = document.querySelector("#specialChars");
var lengthEl = document.querySelector("#length");
var passwordEl = document.querySelector("#password");

// Write password to the #password input
function writePassword() {
  var password = generatePassword();
  var passwordText = document.querySelector("#password");

  passwordText.value = password;

}
// Functions for randomizing checked values based on UTF-16 code (for the special characters it is grabbing it from the variable specialChars)
function getRandomUpperCase(){
  return String.fromCharCode(Math.floor(Math.random()*26)+65);
}
function getRandomLowerCase(){
  return String.fromCharCode(Math.floor(Math.random()*26)+97);
}
function getRandomNumber(){
  return String.fromCharCode(Math.floor(Math.random()*10)+48);
}
function getRandomSpecialChars(){
  return specialChars[Math.floor(Math.random()*specialChars.length)];
}

// Event listener to generate button
generateBtnEl.addEventListener('click', () => {
  const length = +lengthEl.value;
  const hasUpper = uppercaseEl.checked;
  const hasLower = lowercaseEl.checked;
  const hasNumber = numericEl.checked;
  const hasSpecialChars = specialCharsEl.checked;

passwordEl.innerText = generatePassword(hasUpper, hasLower, hasNumber, hasSpecialChars, length);
})

// Function that generates password
function generatePassword(upper, lower, number, specialChars, length){

  let generatedPassword = "";

  // Pushes values into fillArr
  const pushArr = [getRandomUpperCase, getRandomLowerCase, getRandomNumber, getRandomSpecialChars];

  //Array that fills depending on what is checked
  const fillArr = []
 
  //Values in array must match with testArr
  const typesArr = [upper, lower, number, specialChars];
  
  //Expression that pushes values into fillArr
  for (let i=0; i<pushArr.length; i++){ 
    if (typesArr[i] == true){
      fillArr.push(pushArr[i]);
    };
  };

  //Expression that creates password
  for(let i=0; i<length; i++){
    generatedPassword += fillArr[Math.floor(Math.random()*fillArr.length)]();
  };

  const finalPassword = generatedPassword;
  
  return finalPassword;
}
