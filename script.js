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

function findFAQ(query){

let bestScore = 0;

let bestAnswer = null;

faqs.forEach(faq=>{

const score =
similarity(
query,
faq.question
);

if(score > bestScore){

bestScore = score;
bestAnswer = faq.answer;

}

});

if(bestScore >= 2){
return bestAnswer;
}

return null;
}

function basicChatbot(query){

query =
query.toLowerCase();

if(
query.includes("hello") ||
query.includes("hi") ||
query.includes("hey")
){
return "Hello 👋 How can I assist you today?";
}

if(
query.includes("how are you")
){
return "I'm doing great. Thanks for asking 😊";
}

if(
query.includes("your name")
){
return "I'm FAQ Assistant, your virtual chatbot.";
}

if(
query.includes("thank")
){
return "You're welcome 😊";
}

if(
query.includes("bye")
){
return "Goodbye 👋 Have a great day!";
}

if(
query.includes("time")
){
return `Current time is ${new Date().toLocaleTimeString()}`;
}

if(
query.includes("date")
){
return `Today's date is ${new Date().toLocaleDateString()}`;
}

if(
query.includes("help")
){
return "You can ask about accounts, passwords, payments, refunds, support, or chat with me.";
}

const randomReplies = [

"That's interesting. Tell me more.",

"I understand. Could you provide more details?",

"I'm still learning, but I'll try my best to help.",

"Can you rephrase your question?",

"I may not know that yet, but I'm here to help."

];

return randomReplies[
Math.floor(
Math.random() *
randomReplies.length
)
];
}

function generateResponse(question){

const faqAnswer =
findFAQ(question);

if(faqAnswer){
return faqAnswer;
}

return basicChatbot(question);
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
generateResponse(question);

addMessage(answer,"bot");

},800);
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

}
);

});
