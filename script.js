const chatBody =
document.getElementById("chatBody");

const userInput =
document.getElementById("userInput");

const sendBtn =
document.getElementById("sendBtn");

const suggestions =
document.querySelectorAll(".suggestion");

const faqs = [

{
question:"how do i create an account",
answer:"Click the Sign Up button and fill in your details."
},

{
question:"how do i reset my password",
answer:"Go to Login > Forgot Password and follow the instructions."
},

{
question:"what payment methods are accepted",
answer:"We accept Visa, Mastercard, PayPal and UPI."
},

{
question:"how can i contact support",
answer:"You can reach support via email or live chat."
},

{
question:"what is your refund policy",
answer:"Refunds are available within 30 days of purchase."
}

];

function addMessage(text,type){

const msg =
document.createElement("div");

msg.className =
`message ${type}`;

msg.textContent = text;

chatBody.appendChild(msg);

chatBody.scrollTop =
chatBody.scrollHeight;
}

function similarity(text1,text2){

const words1 =
text1.toLowerCase().split(" ");

const words2 =
text2.toLowerCase().split(" ");

let score = 0;

words1.forEach(word=>{

if(words2.includes(word)){
score++;
}

});

return score;
}

function findBestAnswer(query){

let bestScore = 0;

let bestAnswer =
"Sorry, I couldn't find a relevant answer.";

faqs.forEach(faq=>{

const score =
similarity(
query,
faq.question
);

if(score > bestScore){

bestScore = score;

bestAnswer =
faq.answer;
}

});

return bestAnswer;
}

function botReply(question){

const typing =
document.createElement("div");

typing.className =
"message bot typing";

typing.textContent =
"Typing...";

chatBody.appendChild(typing);

chatBody.scrollTop =
chatBody.scrollHeight;

setTimeout(()=>{

typing.remove();

const answer =
findBestAnswer(question);

addMessage(answer,"bot");

},1000);
}

function sendMessage(){

const text =
userInput.value.trim();

if(!text) return;

addMessage(text,"user");

botReply(text);

userInput.value="";
}

sendBtn.addEventListener(
"click",
sendMessage
);

userInput.addEventListener(
"keypress",
e=>{
if(e.key==="Enter"){
sendMessage();
}
}
);

suggestions.forEach(btn=>{

btn.addEventListener(
"click",
()=>{

userInput.value =
btn.textContent;

sendMessage();

});

});
