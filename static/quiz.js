/* =========================================
   SMILEYMEANING ULTIMATE QUIZ
   ========================================= */

// 1. QUESTION DATABASE
// Note: "correct" is the index (0, 1, or 2)
const QUIZ_DATA = {
  easy: [
    { q: "What does ❤️ usually represent?", options: ["Friendship", "Romantic Love", "Jealousy"], correct: 1, hint: "Universal symbol for romance." },
    { q: "What does 😭 usually mean?", options: ["Loud Crying", "Sleeping", "Sneezing"], correct: 0, hint: "Tears are streaming down the face." },
    { q: "The 🔥 emoji is slang for...", options: ["A real fire", "Something trendy/hot", "Cold weather"], correct: 1, hint: "That outfit is fire!" },
    { q: "Which emoji means 'Celebration'?", options: ["🎉", "😢", "😠"], correct: 0, hint: "A party popper." },
    { q: "What does 😂 convey?", options: ["Sadness", "Tears of Joy", "Fear"], correct: 1, hint: "Laughing so hard you cry." },
    { q: "What does 💔 mean?", options: ["Heart attack", "Heartbreak", "Love letter"], correct: 1, hint: "End of a relationship." },
    { q: "The 😎 emoji represents...", options: ["Blindness", "Coolness/Confidence", "Sunny weather"], correct: 1, hint: "Smiling with sunglasses." },
    { q: "What does 👍 mean?", options: ["Stop", "Approval", "Up"], correct: 1, hint: "Thumbs up." },
    { q: "The 🎂 emoji is used for...", options: ["Weddings", "Birthdays", "Breakfast"], correct: 1, hint: "Blow out the candles." },
    { q: "What does 💤 indicate?", options: ["Boredom", "Sleeping", "Confusion"], correct: 1, hint: "Zzz... snore." }
  ],
  medium: [
    { q: "Guess the Movie: 🚢🧊💑", options: ["Frozen", "Titanic", "Moana"], correct: 1, hint: "A ship hits an iceberg." },
    { q: "What does 🙃 imply?", options: ["Happiness", "Sarcasm/Irony", "Gravity"], correct: 1, hint: "Smiling through the pain." },
    { q: "The 🧢 is slang for...", options: ["Nice hat", "Lying (Cappin')", "Sports"], correct: 1, hint: "No cap means no lie." },
    { q: "Guess the Movie: 🦁👑", options: ["The Lion King", "Madagascar", "Jungle Book"], correct: 0, hint: "Simba." },
    { q: "What does 💀 mean in slang?", options: ["Dead", "Dying of laughter", "Halloween"], correct: 1, hint: "I'm dead (that was funny)." },
    { q: "What does 💅 signify?", options: ["Unbothered/Sass", "Salon", "Painting"], correct: 0, hint: "Feeling indifferent or fancy." },
    { q: "Guess the Movie: 👻🚫", options: ["Casper", "Ghostbusters", "Poltergeist"], correct: 1, hint: "Who you gonna call?" },
    { q: "What does ☕ represent?", options: ["Breakfast", "Gossip (Tea)", "Energy"], correct: 1, hint: "Spilling the tea." },
    { q: "The 🤡 emoji targets...", options: ["Funny people", "Foolish/Idiotic acts", "Circus"], correct: 1, hint: "Calling someone a clown." },
    { q: "What does 🐐 mean in sports?", options: ["Animal", "G.O.A.T.", "Stubborn"], correct: 1, hint: "Greatest of All Time." }
  ],
  hard: [
    { q: "Guess the Movie: 👦👓⚡", options: ["Harry Potter", "Percy Jackson", "Spy Kids"], correct: 0, hint: "The boy who lived." },
    { q: "What does 👺 (Tengu) imply?", options: ["Anger", "Arrogance", "Hunger"], correct: 1, hint: "Long nose = full of oneself." },
    { q: "What does 💨 mean in anime?", options: ["Farting", "Fast Exit", "Smoking"], correct: 1, hint: "Running away quickly." },
    { q: "The 🙆 symbol represents...", options: ["OK/Yes", "Headache", "Ballet"], correct: 0, hint: "Making an O for OK." },
    { q: "Guess the Movie: 🕷️🕸️🚶", options: ["Ant-Man", "Spider-Man", "Venom"], correct: 1, hint: "Friendly neighborhood hero." },
    { q: "What is 📛 shaped like?", options: ["Tulip", "Square", "Circle"], correct: 0, hint: "Japanese kindergarten badge." },
    { q: "The 🌚 suggests...", options: ["Night", "Shade/Creepiness", "Space"], correct: 1, hint: "Awkward side-eye." },
    { q: "Meaning of 🤟 vs 🤘?", options: ["Rock on", "I Love You (ASL)", "Spider-Man"], correct: 1, hint: "Thumb out = Love." },
    { q: "The 🏩 is specifically a...", options: ["School", "Love Hotel", "Bank"], correct: 1, hint: "Hotel for couples." },
    { q: "What does 🔰 mean?", options: ["Beginner", "Recycle", "Shield"], correct: 0, hint: "Japanese Shoshinsha mark." }
  ],
   expert: [
    { q: "What is the official Unicode name of 🕴️?", options: ["Spy", "Man in Business Suit Levitating", "Ska Dancer"], correct: 1, hint: "It's absurdly descriptive." },
    { q: "The 〽️ symbol represents...", options: ["Stock Market Crash", "Part Alternation Mark", "Mountain"], correct: 1, hint: "Used in traditional Japanese singing." },
    { q: "What distinguishes 😪 from 😴?", options: ["The snot bubble", "The mouth", "The angle"], correct: 0, hint: "😪 is 'Sleepy Face', 😴 is 'Sleeping Face'." },
    { q: "The 📠 emoji depicts a...", options: ["Printer", "Fax Machine", "Radio"], correct: 1, hint: "Technology from the 1980s." },
    { q: "What is the 💠 symbol?", options: ["Diamond with a Dot", "Flower", "Ice Crystal"], correct: 0, hint: "Used to signify 'kawaii' or cuteness." },
    { q: "The 🤳 emoji was created to represent...", options: ["Looking in mirror", "A Selfie", "FaceTiming"], correct: 1, hint: "Arm extended, phone in hand." },
    { q: "What does the 😽 (Kissing Cat) differ from 😗?", options: ["It has closed eyes", "It has ears", "It implies sarcasm"], correct: 0, hint: "The cat's eyes are smiling lines." },
    { q: "The 🗓️ Spiral Calendar usually shows which date?", options: ["July 17", "Jan 1", "No date"], correct: 0, hint: "World Emoji Day." },
    { q: "What is the 🏤 emoji?", options: ["European Post Office", "City Hall", "Bank"], correct: 0, hint: "Has a horn symbol on the front." },
    { q: "The 🌫️ emoji represents...", options: ["Fog", "Wind", "Dust"], correct: 0, hint: "Low visibility weather." }
  ]
};

// 2. DAILY CHALLENGE POOL (30+ HARD/TRIVIA QUESTIONS)
const DAILY_POOL = [
  { q: "What does the 🧿 (Nazar Amulet) protect against?", options: ["Viruses", "The Evil Eye", "Sunburn"], correct: 1, hint: "Used in Greece/Turkey." },
  { q: "The 🎋 (Tanabata Tree) is used for...", options: ["Christmas", "Writing Wishes", "Firewood"], correct: 1, hint: "Star Festival." },
  { q: "What does 🍥 (Fish Cake) go inside?", options: ["Ramen", "Cake", "Sushi"], correct: 0, hint: "Swirly narutomaki." },
  { q: "The 💠 represents...", options: ["Flower", "Kawaii/Cuteness", "Ice"], correct: 1, hint: "Diamond with a dot." },
  { q: "What does 🍱 (Bento) represent?", options: ["Snack", "Boxed Lunch", "Dinner"], correct: 1, hint: "Japanese portable meal." },
  { q: "Guess the Movie: 🦖🦕 پارک", options: ["Jurassic Park", "Godzilla", "Ice Age"], correct: 0, hint: "Dinosaurs." },
  { q: "The 🎐 is a...", options: ["Jellyfish", "Wind Chime", "Balloon"], correct: 1, hint: "Glass bell for summer." },
  { q: "What is the 🎏 emoji?", options: ["Kites", "Carp Streamer", "Flags"], correct: 1, hint: "Flown on Children's Day." },
  { q: "The 🎑 is used for...", options: ["Harvest Moon Viewing", "Picnic", "Golf"], correct: 0, hint: "Tsukimi festival." },
  { q: "Guess the Movie: 👽📞🏠", options: ["Star Wars", "E.T.", "Arrival"], correct: 1, hint: "Phone home." },
  { q: "The 💮 is a stamp meaning...", options: ["Very Well Done", "Rejected", "Fragile"], correct: 0, hint: "School teacher's stamp." },
  { q: "What does 💆 represent?", options: ["Headache", "Face Massage", "Thinking"], correct: 1, hint: "Relaxing at a spa." },
  { q: "The 👹 (Oni) represents...", options: ["Santa", "Ogre/Demon", "Clown"], correct: 1, hint: "Folklore monster." },
  { q: "What is 🍡?", options: ["Candy", "Dango (Dumplings)", "Grapes"], correct: 1, hint: "Rice flour sweets." },
  { q: "Guess the Movie: 🔎🐠", options: ["Shark Tale", "Finding Nemo", "Little Mermaid"], correct: 1, hint: "Clownfish." },
  { q: "The 👐 is meant to be...", options: ["Jazz Hands", "Open Hands (Hug)", "Pushing"], correct: 1, hint: "Offering a hug." },
  { q: "What does 💃 actually represent?", options: ["Party", "Flamenco Dancer", "Running"], correct: 1, hint: "Spanish dance." },
  { q: "The 🙇 represents...", options: ["Thinking", "Deep Apology (Dogaza)", "Sleeping"], correct: 1, hint: "Bowing deeply." },
  { q: "What is 🕴️?", options: ["Spy", "Man in Business Suit Levitating", "Dancer"], correct: 1, hint: "Ska music logo." },
  { q: "Guess the Movie: 🥊🐯👁️", options: ["Rocky", "Creed", "Raging Bull"], correct: 0, hint: "Eye of the Tiger." },
  { q: "The 🛤️ is a...", options: ["Ladder", "Railway Track", "Stitch"], correct: 1, hint: "Train path." },
  { q: "What does 🗯️ represent?", options: ["Explosion", "Right Anger Bubble", "Cloud"], correct: 1, hint: "Comic book anger." },
  { q: "The 🖖 is from...", options: ["Star Wars", "Star Trek", "Harry Potter"], correct: 1, hint: "Live long and prosper." },
  { q: "What is 🧉?", options: ["Coffee", "Mate (Drink)", "Coconut"], correct: 1, hint: "South American caffeine rich drink." },
  { q: "Guess the Movie: 🐼👊🥋", options: ["Kung Fu Panda", "Karate Kid", "Mulan"], correct: 0, hint: "Dragon Warrior." },
  { q: "The 🎰 is showing...", options: ["777", "$$$", "Win"], correct: 0, hint: "Jackpot." },
  { q: "What does 🕯️ symbolize in texts?", options: ["Power out", "Manifesting/Prayer", "Romance"], correct: 1, hint: "Setting an intention." },
  { q: "The 🗿 is a...", options: ["Rock", "Moai Statue", "Face"], correct: 1, hint: "Easter Island." },
  { q: "Guess the Movie: 🍫🎫🏭", options: ["Candyman", "Charlie & Choc Factory", "Elf"], correct: 1, hint: "Golden Ticket." },
  { q: "The 🃏 is the...", options: ["Joker", "Ace", "King"], correct: 0, hint: "Wild card." },
  { q: "What is 🧿 used for?", options: ["Decor", "Ward off Evil Eye", "Button"], correct: 1, hint: "Protection." }
];

// 3. STATE VARIABLES
let currentQuestions = [];
let currentIndex = 0;
let score = 0;
let currentMode = '';
const correctSound = document.getElementById("audio-correct");
const wrongSound = document.getElementById("audio-wrong");

// 4. ON LOAD: CHECK DAILY STATUS
document.addEventListener("DOMContentLoaded", () => {
  const today = new Date().toDateString();
  const lastPlayed = localStorage.getItem('smiley_daily_played');
  
  if (lastPlayed === today) {
    document.getElementById('daily-status-text').textContent = "✅ Completed for today. Returns tomorrow.";
    const btn = document.querySelector('.daily-btn');
    btn.textContent = "Done";
    btn.style.opacity = "0.6";
    btn.style.cursor = "default";
    document.querySelector('.daily-card').onclick = null; // Disable click
  }
});

// 5. HELPER: SHUFFLE ARRAY (Fisher-Yates)
function shuffleArray(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
}

// 6. GAME START FUNCTIONS
function startQuiz(level) {
  currentMode = level;
  // Clone and Shuffle the questions so order is random every time
  currentQuestions = shuffleArray([...QUIZ_DATA[level]]);
  setupGame(level + " MODE");
}

function startDailyChallenge() {
  const today = new Date().toDateString();
  if (localStorage.getItem('smiley_daily_played') === today) {
    return; // Do nothing if already played
  }

  currentMode = 'daily';
  
  // Calculate Index based on Date (All users get same question)
  const epochDays = Math.floor(new Date() / 8.64e7); 
  const dailyIndex = epochDays % DAILY_POOL.length;
  
  currentQuestions = [ DAILY_POOL[dailyIndex] ]; // Only 1 question
  setupGame("📅 DAILY CHALLENGE");
}

function setupGame(title) {
  currentIndex = 0;
  score = 0;
  
  // UI Switch
  document.getElementById('level-menu').style.display = 'none';
  document.getElementById('result-view').style.display = 'none';
  document.getElementById('quiz-subtitle').style.display = 'none';
  document.getElementById('quiz-interface').style.display = 'block';
  
  document.getElementById('level-badge').textContent = title;
  renderQuestion();
}

// 7. RENDER QUESTION
function renderQuestion() {
  const qData = currentQuestions[currentIndex];
  
  // Progress Bar
  const total = currentQuestions.length;
  const percent = ((currentIndex) / total) * 100;
  document.getElementById('progress-bar').style.width = percent + "%";

  // Build HTML
  let html = `<div class="question">
                ${currentMode === 'daily' ? 'Daily Question:' : 'Q' + (currentIndex+1) + ':'} 
                ${qData.q}
              </div>
              <div class="choices">`;

  qData.options.forEach((opt, idx) => {
    html += `<button class="choice" onclick="handleAnswer(this, ${idx})">${opt}</button>`;
  });
  
  html += `</div><div id="hint-text" style="margin-top:15px; color:#666; font-style:italic; display:none;"></div>`;

  document.getElementById('question-box').innerHTML = html;
  document.getElementById('next-btn').style.display = 'none';
}

// 8. HANDLE ANSWER (WITH SOUNDS)
function handleAnswer(btn, index) {
  const allBtns = document.querySelectorAll('.choice');
  allBtns.forEach(b => b.disabled = true);

  const correctIndex = currentQuestions[currentIndex].correct;
  const hintText = document.getElementById('hint-text');

  if(index === correctIndex) {
    btn.classList.add('correct');
    score++;
    hintText.style.display = 'block';
    hintText.textContent = "Correct! 🎉";
    hintText.style.color = "green";
    playSound(correctSound);
  } else {
    btn.classList.add('incorrect');
    allBtns[correctIndex].classList.add('correct');
    hintText.style.display = 'block';
    hintText.textContent = "Oops! " + currentQuestions[currentIndex].hint;
    hintText.style.color = "#d9534f";
    playSound(wrongSound);
  }

  const nextBtn = document.getElementById('next-btn');
  nextBtn.style.display = 'block';
  
  if(currentMode === 'daily') nextBtn.textContent = "See Result";
  else nextBtn.textContent = "Next Question ➜";
}

// Play Sound Helper
function playSound(audioEl) {
  if(audioEl) {
    audioEl.currentTime = 0;
    audioEl.play().catch(e => console.log("Audio play failed (user interaction required)"));
  }
}

// 9. NEXT BUTTON
document.getElementById('next-btn').addEventListener('click', () => {
  currentIndex++;
  if(currentIndex < currentQuestions.length) {
    renderQuestion();
  } else {
    endGame();
  }
});

// 10. END GAME
function endGame() {
  document.getElementById('quiz-interface').style.display = 'none';
  document.getElementById('result-view').style.display = 'block';
  document.getElementById('progress-bar').style.width = "100%";

  if (currentMode === 'daily') {
    // Save state
    localStorage.setItem('smiley_daily_played', new Date().toDateString());
    
    // Result Text
    const txt = document.getElementById('result-text');
    if (score === 1) {
      txt.innerHTML = "You nailed the Daily Challenge! 🔥<br>See you tomorrow!";
      launchConfetti();
    } else {
      txt.innerHTML = "You missed today's challenge. 😢<br>Try again tomorrow!";
    }
    // Hide Replay button for Daily
    document.querySelector('button[onclick="restartLevel()"]').style.display = 'none';
  
  } else {
    // Normal Quiz
    document.getElementById('result-text').innerHTML = `You scored <b>${score}</b> out of <b>${currentQuestions.length}</b>`;
    document.querySelector('button[onclick="restartLevel()"]').style.display = 'inline-block';
    if(score > 7) launchConfetti();
  }
}

// 11. VIRAL SHARE BUTTON
function shareScore() {
  let text = "";
  if(currentMode === 'daily') {
    text = `I just played the Daily Emoji Challenge on SmileyMeaning! 📅\nMy Score: ${score}/1\nCan you solve it? https://smileymeaning.com/quiz/`;
  } else {
    text = `I scored ${score}/${currentQuestions.length} on the ${currentMode.toUpperCase()} Emoji Quiz! 🧠\nCan you beat me? https://smileymeaning.com/quiz/`;
  }

  navigator.clipboard.writeText(text).then(() => {
    const toast = document.getElementById('share-toast');
    toast.style.opacity = "1";
    setTimeout(() => toast.style.opacity = "0", 2000);
  });
}

// 12. UTILS
function showMenu() {
  document.getElementById('quiz-interface').style.display = 'none';
  document.getElementById('result-view').style.display = 'none';
  document.getElementById('quiz-subtitle').style.display = 'block';
  document.getElementById('level-menu').style.display = 'block';
  // Reload page to reset daily button state if needed, or just let it stay
}

function restartLevel() {
  startQuiz(currentMode);
}

function launchConfetti() {
  const colors = ["#ff6b6b", "#ffd93d", "#6bcf63", "#4dabf7"];
  for(let i=0; i<30; i++) {
    const div = document.createElement("div");
    div.classList.add("confetti");
    div.style.left = Math.random() * 100 + "vw";
    div.style.backgroundColor = colors[Math.floor(Math.random()*colors.length)];
    div.style.animationDuration = (Math.random() * 2 + 2) + "s";
    document.body.appendChild(div);
    setTimeout(() => div.remove(), 4000);
  }
}



/* =========================================
   13. SECURITY / ANTI-CHEAT (Optional)
   ========================================= */

// Disable Right Click
document.addEventListener('contextmenu', event => {
  event.preventDefault();
  // Optional: Show a custom alert
  // alert("Right-click is disabled on this quiz!"); 
});

// Disable Key Commands (F12, Ctrl+Shift+I, Ctrl+U)
document.addEventListener('keydown', function(e) {
  // F12
  if(e.keyCode == 123) {
    e.preventDefault();
    return false;
  }
  // Ctrl+Shift+I (Inspect)
  if(e.ctrlKey && e.shiftKey && e.keyCode == 'I'.charCodeAt(0)) {
    e.preventDefault();
    return false;
  }
  // Ctrl+Shift+C (Inspect Element)
  if(e.ctrlKey && e.shiftKey && e.keyCode == 'C'.charCodeAt(0)) {
    e.preventDefault();
    return false;
  }
  // Ctrl+Shift+J (Console)
  if(e.ctrlKey && e.shiftKey && e.keyCode == 'J'.charCodeAt(0)) {
    e.preventDefault();
    return false;
  }
  // Ctrl+U (View Source)
  if(e.ctrlKey && e.keyCode == 'U'.charCodeAt(0)) {
    e.preventDefault();
    return false;
  }
});
