import React, { useState, useEffect, useCallback } from 'react';
import { initializeApp } from 'firebase/app';
import { getFirestore, doc, setDoc, getDoc, setLogLevel } from 'firebase/firestore';
import { 
    getAuth, 
    onAuthStateChanged, 
    createUserWithEmailAndPassword, 
    signInWithEmailAndPassword,
    GoogleAuthProvider,
    signInWithPopup,
    signOut
} from 'firebase/auth';
import { Dribbble, Target, BrainCircuit, NotebookText, Star, Mic, MicOff, Lock, ChevronDown, CheckCircle, Plus, Edit2, Trash2, LogOut, BookOpen, Award, ShoppingCart, Bell } from 'lucide-react';

// --- Firebase Configuration ---
const firebaseConfig = {
  apiKey: "AIzaSyBFKdpRCWWHJcMyhnA3IVN6tXzLKJj_cck",
  authDomain: "athlete-s-master-key.firebaseapp.com",
  projectId: "athlete-s-master-key",
  storageBucket: "athlete-s-master-key.appspot.com",
  messagingSenderId: "850364511378",
  appId: "1:850364511378:web:d395ee2c99a61e349da24b"
};


// --- Firebase Initialization ---
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const auth = getAuth(app);
const appId = typeof __app_id !== 'undefined' ? __app_id : 'athlete-s-master-key';
// setLogLevel('debug');


// --- Full 24-Week Course Content ---
const courseContent = [
    { week: 0, title: "Welcome to Your Mental Gym", icon: BrainCircuit, isIntro: true,
      concept: "Physical talent gets you to the game. Mental strength lets you win it.",
      deeperDive: "You spend countless hours training your body: lifting, running, and practicing drills until they're perfect. But every top athlete knows that when the pressure is on, the real competition happens in the six inches between your ears. The difference between a good athlete and a great one often comes down to who has the stronger mental game. This course is designed to be your personal mental gym, a place to build the focus, confidence, and resilience that define elite competitors.\n\nOver the next 24 weeks, you will learn and practice the core principles of sports psychology, adapted from the timeless wisdom of the Master Key System. We will move from foundational skills like controlling your thoughts and focus, to advanced techniques like high-definition visualization and building unshakable belief in your abilities. Each week builds on the last, creating a comprehensive mental toolkit you can use for the rest of your athletic career.\n\nYour commitment to these daily exercises is just as important as your commitment to your physical training. The drills are short but powerful. The journaling is designed to create self-awareness, which is the cornerstone of all improvement. By investing a few minutes each day, you are not just learning concepts; you are actively re-wiring your brain for success.\n\nThis journey is about more than just becoming a better athlete; it's about becoming a more focused, resilient, and confident person. The skills you build here will serve you long after you've left the field or court. Welcome to the first day of your new mental training regimen. Let's begin." },
    { 
      week: 1, 
      title: "The Mind as the Starting Block", 
      icon: Dribbble,
      concept: "Every action is preceded by a thought. This week, we learn to become the calm observer of our thoughts, creating a space between an event and our reaction to it. This is the foundation of mental control.",
      weeklyIntro: "Welcome to Week 1. Before we can learn to direct our thoughts, we must first learn to simply observe them without judgment. Many athletes are controlled by their thoughts—a flash of doubt before a big play, a surge of anger after a mistake. They believe they *are* their thoughts. The goal this week is to break that illusion.\n\nThis week's drills are designed to build the foundational skill of awareness. By practicing stillness and non-reaction, you will start to create a small space between a thought and your response to it. This space is where all mental power resides. It's the difference between an impulsive, emotional reaction and a calm, calculated action. This is the most fundamental skill in all of mental training.",
      dailyLessons: [
        { day: 1, title: "The Stillness Drill", instructions: "For 5 minutes, sit upright and remain physically still. Your only job is to notice thoughts without reacting. When your mind wanders, gently guide it back to stillness.", deeperDive: "This drill trains your prefrontal cortex to resist impulsive reactions, a key skill for staying calm under pressure. You're creating a 'mental pause button' that prevents you from being rattled by a bad call or a mistake, allowing you to respond with logic instead of impulse." },
        { day: 2, title: "Noticing the Chatter", instructions: "Repeat the 5-minute stillness drill. Today, pay special attention to the *types* of thoughts that appear. Are they about the past? The future? Your to-do list? Just notice, don't judge.", deeperDive: "By identifying your mental habits, you begin to see that they are just thoughts, not commands. This separation is the first step to taking control and breaking free from negative thought loops that can sabotage performance." },
        { day: 3, title: "Resisting Physical Impulses", instructions: "Repeat the 5-minute stillness drill. Today, your focus is on physical sensations. Notice the urge to scratch an itch, shift your weight, or fidget. Acknowledge the urge, but consciously choose not to act on it.", deeperDive: "Mental discipline and physical discipline are linked. Resisting small physical impulses strengthens your overall willpower, making it easier to push through fatigue or discomfort in a game." },
        { day: 4, title: "Extending the Time", instructions: "Today, we increase the challenge. Perform the stillness drill for 7 minutes. The goal is to maintain your composure and non-reaction as the duration increases.", deeperDive: "Just like lifting heavier weights, extending the time builds mental endurance. It trains your mind to stay focused and calm for longer periods, which is crucial for late-game situations." },
        { day: 5, title: "Connecting to Your Sport", instructions: "Before your 7-minute drill, briefly visualize a recent, frustrating moment from a game or practice. Then, during the drill, if frustrating thoughts arise, practice letting them go just like any other thought.", deeperDive: "This exercise connects the abstract skill of stillness to real-world athletic scenarios. You are training your brain to detach from the emotion of a mistake and return to a neutral, focused state." },
        { day: 6, title: "The 10-Minute Challenge", instructions: "Today's drill is 10 minutes of complete stillness. Embrace the challenge. Notice how your mind and body feel as you push past your previous limits.", deeperDive: "Pushing your mental limits in a controlled setting builds profound confidence. When you know you can stay calm and focused for 10 minutes, a 30-second timeout feels like an eternity of calm." },
        { day: 7, title: "Weekly Reflection", instructions: "Perform the stillness drill for a final 10 minutes. Afterward, use the journal to reflect on the entire week's progress.", deeperDive: "Reflection solidifies learning. By looking back on the week's challenges and successes, you cement the new neural pathways you've started to build and prepare for the next stage of your training." }
      ],
      journalPrompts: [
          "Describe the 'chatter' in your mind. What kinds of thoughts kept popping up?",
          "What types of thoughts did you notice today? Were they mostly about the past, present, or future?",
          "What was the strongest physical urge you resisted during the drill? How did it feel to not act on it?",
          "How did the longer duration feel? Was there a point where it became more difficult?",
          "Did the memory of the frustrating moment affect your drill? Were you able to let it go?",
          "What was the most challenging part of the 10-minute drill? How did you overcome it?",
          "What was the biggest lesson you learned about your own mind this week?"
      ]
    },
    { 
      week: 2, 
      title: "Control the Mental Locker Room", 
      icon: BrainCircuit, 
      concept: "Your brain forms habits through neural pathways. Negative self-talk is a reinforced habit. This week, we strategically stop walking that path and start cutting a new one.",
      weeklyIntro: "Last week, you learned to observe your thoughts. This week, you become the gatekeeper of your mind. Your inner voice can be your greatest coach or your harshest critic. For many athletes, the inner critic runs the show, replaying mistakes and fueling doubt. This week is about firing that critic and hiring a coach.\n\nWe will use a powerful technique to actively intervene in your thought patterns. This isn't about pretending negative thoughts don't exist; it's about acknowledging them and consciously choosing a more powerful, productive response. You are learning to control the narrative in your head, which directly influences your confidence and actions on the field.",
      dailyLessons: [
        { day: 1, title: "Identifying the Negative Voice", instructions: "Throughout the day, act as a detective for your own thoughts. When you make a mistake or feel frustrated, what is the first thing you say to yourself? Write down at least one negative self-talk phrase you notice.", deeperDive: "Awareness is the first step to change. You cannot fix a habit you don't know you have. Today is about gathering intelligence on your inner critic so you can understand its tactics and triggers." },
        { day: 2, title: "The 'STOP' Command", instructions: "Today, when you catch a negative thought, mentally (or even out loud, if you're alone) shout 'STOP!'. Visualize a big red stop sign. The goal is simply to interrupt the pattern.", deeperDive: "This interruption breaks the automatic loop of a negative thought. It's a conscious intervention that prevents the thought from spiraling and affecting your emotional state. You are asserting control and showing your brain that this thought pattern is no longer acceptable." },
        { day: 3, title: "Crafting Your Replacement", instructions: "Take the negative phrases you identified on Day 1. For each one, write a powerful, positive, and believable replacement. Instead of 'Don't mess up,' write 'I am focused and prepared.'", deeperDive: "Your replacement statements must be believable to you. If they are too generic or unbelievable, your mind will reject them. They should be grounded in the effort you put in, such as 'I trust my training' or 'I've made this shot a thousand times.'" },
        { day: 4, title: "Full Integration: Stop & Replace", instructions: "Now, combine the steps. When you catch a negative thought, shout 'STOP!' and immediately follow it with one of your powerful replacement statements. Do this every single time you notice the inner critic.", deeperDive: "This is where neuroplasticity happens. You are actively weakening the old, negative neural pathway and building a new, positive one. It feels like work at first, but with each repetition, the new pathway becomes stronger and more automatic." },
        { day: 5, title: "Applying it to Physical Drills", instructions: "During your physical practice today, make a conscious effort to use the Stop & Replace technique. If you miss a shot or make a mistake in a drill, immediately interrupt any negative self-talk.", deeperDive: "The moments immediately following a mistake are the most critical for mental control. By using this technique during practice, you are training yourself to have a resilient response when it matters most in a game. You're building a habit of bouncing back instantly." },
        { day: 6, title: "Replacing 'Don't' with 'Do'", instructions: "Focus on your language today. Notice how often you tell yourself 'Don't miss' or 'Don't mess up.' Replace these with 'Do' statements: 'Make this shot,' 'Focus on the target,' 'Execute with precision.'", deeperDive: "Your brain doesn't process negatives well. If you say 'Don't think about a pink elephant,' you immediately think of one. By focusing on what you *want* to do, you give your brain a clear, positive command to follow, which is far more effective than telling it what to avoid." },
        { day: 7, title: "Weekly Reflection", instructions: "Review your journal entries for the week. How has becoming aware of your self-talk changed your mood or performance in training?", deeperDive: "Recognizing the shift in your internal dialogue is powerful. It proves that you have the ability to change your mindset. This reflection reinforces the effectiveness of the technique and builds your confidence to continue using it as a core mental skill." }
      ],
      journalPrompts: [
          "What was the most common negative thought you caught yourself saying today?",
          "Describe the feeling of interrupting a negative thought. Did it feel empowering?",
          "What is one of your new, powerful replacement statements? Why is it believable to you?",
          "Did you use the Stop & Replace technique today? Describe the situation and the outcome.",
          "How did using this technique during physical practice affect your next attempt?",
          "What was one 'Don't' statement you changed to a 'Do' statement today?",
          "What was the biggest change you noticed in your mindset this week?"
      ]
    },
    { 
      week: 3, 
      title: "The Power of Unwavering Focus", 
      icon: Target,
      concept: "Focus is a muscle. Most unforced errors come from a lapse in focus. This week, we train your ability to consciously direct your attention and hold it steady.",
      weeklyIntro: "Now that you can observe your thoughts and manage your inner dialogue, it's time to build your focus. Focus is a muscle; the more you train it, the stronger it gets. Most unforced errors in sports don't come from a lack of skill, but from a momentary lapse in concentration. This week, you'll learn to direct your attention like a laser beam.\n\nThe goal is to develop 'attentional control,' the ability to choose what you pay attention to and ignore everything else. This means filtering out the crowd, the scoreboard, and your own internal distractions to lock in on the task at hand. Mastering this skill is the key to unlocking the state of 'flow,' where you perform at your best, almost automatically.",
      dailyLessons: [
        { day: 1, title: "Object Lock-In", instructions: "For 5 minutes, focus on a small object (laces on a ball, a crack in the wall). Study every detail. When your mind wanders, gently bring it back.", deeperDive: "This is a pure concentration drill. By forcing your mind to stay on one neutral target, you are strengthening its ability to hold attention, just like bicep curls strengthen your arm." },
        { day: 2, title: "Auditory Focus", instructions: "For 5 minutes, close your eyes and focus only on a single, continuous sound (a fan, the hum of a refrigerator). Tune out all other noises.", deeperDive: "Great athletes can hear their coach's voice through a screaming stadium. This drill trains your auditory filtering, allowing you to pick out the important sounds and ignore the distracting noise." },
        { day: 3, title: "Expanding Awareness", instructions: "Sit quietly for 5 minutes. First, focus on your breath. Then, expand your awareness to the sounds in the room. Then, expand it further to the feeling of the chair beneath you. Practice shifting your focus without losing it.", deeperDive: "This teaches attentional flexibility. In a game, you need to shift from a narrow focus (the ball) to a broad focus (the whole field) and back again. This drill trains that mental agility." },
        { day: 4, title: "Focus Under Duress", instructions: "Perform the Object Lock-In drill for 7 minutes, but this time, have music or a TV on in the background. Your task is to hold your focus on the object despite the distraction.", deeperDive: "This simulates in-game distractions. It's easy to focus in a quiet room; it's hard with a crowd yelling. This drill builds your mental 'shield' against external noise." },
        { day: 5, title: "Sport-Specific Cues", instructions: "Identify one key visual cue in your sport (the spin of the ball, the position of a defender's hips). For 5 minutes, visualize that cue in your mind's eye with intense clarity.", deeperDive: "You are training your brain to instantly recognize the most important information for your sport. This speeds up your decision-making, making you react faster and more effectively." },
        { day: 6, title: "The 'Reset' Word", instructions: "Choose a simple, powerful word like 'Focus,' 'Now,' or 'Here.' During practice, if you feel your mind drifting, mentally say your reset word to bring your attention back to the present moment.", deeperDive: "This is a quick-action tool to stop a mental spiral. A mistake can cause your focus to drift to the past ('I can't believe I did that'). Your reset word is an anchor that pulls your attention back to the only time that matters: right now." },
        { day: 7, title: "Weekly Reflection", instructions: "Reflect on your ability to focus this week. In what situations is it easiest to focus? When is it hardest?", deeperDive: "Understanding your personal focus patterns is key. Knowing your triggers for distraction allows you to be proactive in using your mental tools before your focus slips." }
      ],
      journalPrompts: [
          "What was the biggest distraction for you during the focus drill today (internal or external)?",
          "What did you notice when you tried to focus only on sound? Was it easier or harder than visual focus?",
          "Describe the experience of shifting your focus. Did you feel in control of where your attention went?",
          "How did the background noise affect your ability to focus? Did you get better at ignoring it?",
          "What is the most important visual cue for your position in your sport? Why?",
          "Did you use your reset word in practice? Describe the situation.",
          "What is your biggest takeaway from this week of focus training?"
      ]
    },
    { 
      week: 4, 
      title: "Building Your Mental Blueprint", 
      icon: BrainCircuit,
      concept: "Your brain doesn't know the difference between a vividly imagined action and a real one. This week, you become the architect of your success.",
      weeklyIntro: "Your brain and nervous system cannot tell the difference between a vividly imagined experience and a real one. This is a scientific fact, and it's the secret weapon of elite athletes. When you mentally rehearse a perfect performance, you are creating and strengthening the neural pathways required to execute that skill in reality.\n\nThis week, we move from simple focus to active creation. You will become the architect of your own success by building a detailed mental blueprint of a perfect performance. We'll start from a third-person perspective, like a coach or scout, which allows you to analyze your form and strategy objectively.",
      dailyLessons: [
        { day: 1, title: "The Perfect Simple Skill", instructions: "Choose one fundamental skill (a free throw, a golf putt, a serve). For 5 minutes, watch yourself execute it perfectly on a mental movie screen.", deeperDive: "This initial step creates the basic 'file' in your brain for success. You are establishing a clear image of what perfect execution looks like, which your mind will use as a reference." },
        { day: 2, title: "Adding Detail", instructions: "Repeat Day 1's drill, but add more detail. See the perfect arc of the ball, the smooth follow-through of your arm, the ideal body positioning.", deeperDive: "The more detail you add, the more 'real' the visualization becomes to your brain. You are adding layers of data to the neural blueprint, making it more robust and easier for your body to follow." },
        { day: 3, title: "Visualizing the 'Why'", instructions: "As you visualize your perfect skill, also visualize *why* it was perfect. See the perfect backspin on the ball causing it to swish through the net. See the perfect footwork that gave you the power.", deeperDive: "This connects the action to the result. It deepens your understanding of the skill's mechanics, moving beyond just 'what it looks like' to 'how it works.' This is crucial for self-correction in a game." },
        { day: 4, title: "The Full Sequence", instructions: "Now, visualize the entire sequence. See yourself getting ready for the free throw, taking a deep breath, executing it perfectly, and seeing the positive result.", deeperDive: "Sports skills don't happen in a vacuum. By visualizing the pre-shot routine and the successful aftermath, you are building a complete performance sequence, which helps automate the entire process under pressure." },
        { day: 5, title: "Visualizing a Teammate", instructions: "To strengthen your objective view, visualize a teammate or a professional athlete you admire executing the skill perfectly. What can you learn from watching them?", deeperDive: "This helps you identify key technical elements you might be missing in your own performance. It's a form of mental modeling that can accelerate your learning curve." },
        { day: 6, title: "Visualizing a Complex Play", instructions: "Move beyond a single skill. Visualize your team executing a complex play perfectly, and see your specific role within it. See yourself making the right pass, the right cut, or the right block.", deeperDive: "This expands your visualization from individual skill to team strategy. It helps you understand your role in the bigger picture and improves your in-game decision-making and timing." },
        { day: 7, title: "Weekly Reflection", instructions: "How has visualizing success changed your confidence when you physically practice the skill?", deeperDive: "This reflection helps you connect the mental work to the physical results. Recognizing the increase in confidence reinforces the value of visualization and motivates you to continue the practice." }
      ],
      journalPrompts: [
          "Describe your 'Perfect Play' in detail. What did perfect execution look like from the outside?",
          "What is one small detail of your technique you noticed and corrected while visualizing today?",
          "Why was the play you visualized successful? What were the key mechanical components?",
          "Describe your pre-shot routine in your visualization. Was it calm and consistent?",
          "What did you learn from visualizing someone else perform the skill?",
          "What was your role in the complex play you visualized? How did you contribute to the team's success?",
          "Do you feel more prepared to execute this skill in a game now? Why?"
      ]
    },
    { 
      week: 5, 
      title: "HD Visualization: Making It Real", 
      icon: Star,
      concept: "A blurry mental image has little power. A rich, multi-sensory visualization is what truly convinces your subconscious mind that the event is real.",
      weeklyIntro: "Last week, you were the director, watching the movie of your success. This week, you become the star. A blurry, detached mental image has little power. A rich, multi-sensory, first-person visualization is what truly convinces your subconscious mind that the event is real and achievable.\n\nWe will upgrade your mental blueprint to High Definition by engaging all your senses. The more senses you involve, the deeper the blueprint is etched into your mind. We will also add the most important ingredient: emotion. Feeling the success is the key to unlocking it.",
      dailyLessons: [
        { day: 1, title: "First-Person View", instructions: "Take your 'Perfect Play' from last week and switch the camera. Experience it through your own eyes. What do you see right before, during, and after the play?", deeperDive: "Visualizing from a first-person perspective activates the motor cortex in your brain more strongly than a third-person view. You are telling your brain, 'This is what *I* am doing,' not just 'This is what is being done.'" },
        { day: 2, title: "Adding Touch and Feel", instructions: "Repeat the first-person visualization, but now focus on the sense of touch. Feel the grip of the bat, the texture of the ball, the ground under your feet.", deeperDive: "The sense of touch (kinesthetics) is powerful for athletes. By mentally rehearsing the physical feeling of a perfect motion, you are fine-tuning your muscle memory without ever moving." },
        { day: 3, title: "Adding Sound", instructions: "Now, add the auditory layer. What are the specific sounds of your success? The crack of the bat, the swish of the net, the roar of the crowd, the sound of your own breathing.", deeperDive: "Sound is a powerful environmental cue. By including the sounds of the game in your visualization, you make the mental rehearsal more realistic and train yourself to stay focused amidst the noise of actual competition." },
        { day: 4, title: "The Power of Emotion", instructions: "This is the most important step. As you complete your perfect visualization, attach the powerful *emotion* of success. Feel the surge of pride, the joy, the relief, the confidence. Let the feeling wash over you.", deeperDive: "Emotion acts like a super glue for memory. A visualization charged with positive emotion is far more likely to be recalled and replicated under pressure than a neutral, technical one." },
        { day: 5, title: "Visualizing Adversity", instructions: "Visualize a moment of adversity (being tired, a bad call). Now, use first-person, multi-sensory visualization to see, hear, and feel yourself overcoming it with calm confidence.", deeperDive: "You are not just rehearsing success; you are rehearsing resilience. This prepares you for the inevitable challenges of a game, giving you a pre-programmed confident response to adversity." },
        { day: 6, title: "The Full HD Rehearsal", instructions: "Combine it all. For 10 minutes, run through your perfect play in first-person, engaging sight, sound, touch, and powerful, positive emotion.", deeperDive: "This is the full dress rehearsal for your brain. By repeatedly running this HD simulation, you are making the feeling of success your default expectation." },
        { day: 7, title: "Weekly Reflection", instructions: "Which part of this drill (senses or emotion) had the biggest impact on you and why?", deeperDive: "Understanding which sensory inputs are most powerful for you allows you to customize your visualizations for maximum impact in the future." }
      ],
      journalPrompts: [
          "What did you see from your own eyes during the visualization?",
          "Describe the physical sensations you focused on. Did it make the visualization feel more real?",
          "What sounds did you add to your mental movie? Did they increase the intensity?",
          "Describe the specific emotion you attached to your successful visualization. Was it pride, relief, excitement?",
          "How did you feel after visualizing yourself overcoming adversity?",
          "How did the full HD rehearsal feel compared to the simpler visualizations from earlier in the week?",
          "Which sense will you focus on improving in your visualizations next week?"
      ]
    },
    { 
      week: 6, 
      title: "Defining Your Victory", 
      icon: Target,
      concept: "A vague wish gives your brain no direction. A clear, present-tense goal gives it a powerful command.",
      weeklyIntro: "This week, you will learn to program your brain's internal 'GPS' with a powerful statement of purpose. By stating your goal in the present tense, you bypass the doubt of the conscious mind and speak directly to your creative subconscious, which works tirelessly to turn that statement into your physical reality.",
      dailyLessons: [
        { day: 1, title: "Crafting Your Goal", instructions: "Write down one specific, major goal for your season. Phrase it as if it's already true: 'I am...' or 'I have...' Make it bold but believable.", deeperDive: "Writing a goal in the present tense tricks your subconscious mind into accepting it as a current reality, which then begins to organize your thoughts and actions to match that reality." },
        { day: 2, title: "The Morning & Night Ritual", instructions: "Read your Present Tense Goal with feeling and conviction every morning upon waking and every night before sleeping. As you read, take a moment to imagine how it *feels* to have already achieved it.", deeperDive: "The mind is most receptive to suggestion just after waking and just before sleeping. This ritual impresses your goal onto your subconscious at the most opportune times." },
        { day: 3, title: "Finding the Feeling", instructions: "Today, as you read your goal, focus entirely on generating the *feeling* of its accomplishment. Does it feel like pride? Relief? Excitement? Hold that feeling for 60 seconds.", deeperDive: "Your subconscious mind responds to feeling, not just words. By associating a powerful, positive emotion with your goal, you give it the fuel it needs to manifest." },
        { day: 4, title: "Connecting Goal to Action", instructions: "Identify one small action you can take *today* that is in alignment with your goal. Before you do it, read your goal statement. After you do it, read it again, knowing you just moved one step closer.", deeperDive: "This creates a feedback loop of success. The goal inspires the action, and the action reinforces the belief in the goal." },
        { day: 5, title: "Overcoming Doubt", instructions: "If you feel doubt when reading your goal, don't fight it. Acknowledge it, and then say to yourself, 'Nevertheless, I am [Your Goal].' This acknowledges the doubt without giving it power.", deeperDive: "Fighting a thought gives it energy. By acknowledging it and calmly reaffirming your goal, you are training your mind to treat doubt as irrelevant noise." },
        { day: 6, title: "Creating a Micro-Goal", instructions: "Break down your main goal into a smaller, one-week goal. Write it in the present tense (e.g., 'I am the hardest worker in practice this week.'). Focus on this micro-goal for the day.", deeperDive: "Micro-goals make the larger vision less intimidating and provide more frequent opportunities for a sense of accomplishment, which builds momentum." },
        { day: 7, title: "Weekly Reflection", instructions: "Has focusing on a definite outcome made your efforts feel more purposeful? How has your belief in the goal changed over the week?", deeperDive: "This review helps you see the tangible results of your mental work, solidifying the connection between your inner world of thought and your outer world of action." }
      ],
      journalPrompts: [
          "Write down your Present Tense Goal. Does it feel ambitious? Is it specific enough?",
          "Did you feel any resistance or doubt when you first started saying your goal? Describe that feeling.",
          "What is one small action you can take *today* that is in alignment with your Present Tense Goal?",
          "How does repeating this goal change the way you approach your daily practice?",
          "What is your micro-goal for this week?",
          "As you repeat your goal, is the feeling of it being real getting stronger? Describe the change.",
          "Has focusing on a definite outcome made your efforts feel more purposeful?"
      ]
    },
    { 
      week: 7, 
      title: "Building Unshakable Belief", 
      icon: Star,
      concept: "Belief isn't just a thought; it's a feeling of certainty. The fastest way to build belief is to borrow the feeling from a past success.",
      weeklyIntro: "This week, we will connect the dots. You will learn to harness the powerful, positive emotions from your past victories and anchor them to the new goals you are creating. This process builds a bridge in your mind from 'I did it before' to 'I can do it again.'",
      dailyLessons: [
        { day: 1, title: "The Highlight Reel", instructions: "Close your eyes and mentally replay 2-3 of your proudest moments in your sport. Don't just see them; re-live them. Focus on the feeling of confidence and achievement it gave you.", deeperDive: "You are accessing your personal library of success. Your brain stores these memories and their associated feelings. This drill is like pulling the 'confidence' file." },
        { day: 2, title: "Naming the Feeling", instructions: "Repeat the Highlight Reel drill. Today, give that core feeling of success a name. Is it 'Unstoppable,' 'Calm Confidence,' or 'Focused Power'?", deeperDive: "Giving the feeling a name makes it a tangible mental tool that you can recall more easily and intentionally." },
        { day: 3, title: "Anchoring", instructions: "Now, as you re-live a highlight and feel that success, create a simple physical anchor, like touching your thumb and index finger together. Do this several times. This links the physical action to the mental state.", deeperDive: "This is a technique from Neuro-Linguistic Programming (NLP). You are creating a classical conditioning link, where a neutral stimulus (the touch) becomes associated with a powerful emotional state." },
        { day: 4, title: "Firing the Anchor", instructions: "Throughout the day, especially before practice, fire your anchor (touch your thumb and index finger) and consciously recall the feeling of success. The goal is to be able to trigger that state on demand.", deeperDive: "Repetition strengthens the neural connection. The more you practice firing the anchor, the faster and more powerfully you'll be able to call up the feeling of confidence when you need it." },
        { day: 5, title: "Connecting to Your Goal", instructions: "Now, combine the steps. Fire your anchor to bring up the feeling of success, and then immediately read your Present Tense Goal from last week. Do this multiple times.", deeperDive: "You are now transferring the feeling of certainty from a past, proven success onto your future, desired success. This makes the new goal feel much more attainable to your subconscious mind." },
        { day: 6, title: "Acting 'As If'", instructions: "In today's practice, consciously carry yourself 'as if' you have already achieved your goal. How would you walk? How would you talk to teammates? How would you approach a difficult drill?", deeperDive: "Your physiology and psychology are a two-way street. Acting confident can actually make you feel more confident. This 'fake it 'til you make it' approach helps align your body with the belief you are building." },
        { day: 7, title: "Weekly Reflection", instructions: "How has this process of anchoring past success to your future goal affected your overall confidence?", deeperDive: "By reflecting on this, you acknowledge the power you have to change your own state. This builds meta-confidence—confidence in your ability to become confident." }
      ],
      journalPrompts: [
          "Describe the past successes on your 'Highlight Reel.' What is the common feeling that links them all together?",
          "What did you name your feeling of success?",
          "Describe the physical anchor you chose. Did you feel the emotional state when you fired it?",
          "Did you use your anchor before or during practice today? What was the effect?",
          "Did connecting your anchor to your goal make the goal feel more real?",
          "How did 'acting as if' change your approach to practice today?",
          "Do you feel a stronger sense of certainty about your goal now than you did seven days ago?"
      ]
    },
    { 
      week: 8, 
      title: "Game Day Integration", 
      icon: Dribbble,
      concept: "This isn't a superstition; it's a strategic mental warm-up. It automates the process of shifting you from your everyday mindset into your 'performance state' on command.",
      weeklyIntro: "All the training from the past seven weeks culminates in this final step: creating a simple, powerful, and repeatable pre-performance routine. This is not a superstition; it is a strategic mental warm-up. It is your personal trigger to shift from your everyday mindset into your 'performance state' on command.\n\nA solid routine eliminates pre-game anxiety and mental clutter. It allows you to step onto the field or court with a mind that is calm, focused, and confident. By making your mental preparation automatic, you free up all your mental energy for what truly matters: competing at your absolute best.",
      dailyLessons: [
        { day: 1, title: "Designing Your Routine", instructions: "Write down your 3-step Performance Prime Routine. Make it short (3-5 minutes) and simple. Example: 1. Three deep breaths. 2. One minute of HD visualization of a key skill. 3. Recite your Present Tense Goal with feeling.", deeperDive: "The key to a good routine is that it is simple, repeatable, and under your control. It shouldn't depend on any external factors. This gives you a sense of certainty in the chaos of competition." },
        { day: 2, title: "The First Practice", instructions: "Perform your new routine before today's practice begins. Notice how you feel stepping onto the field compared to usual.", deeperDive: "This is the first live test. The goal is to make the routine a habit, so it feels as natural as tying your shoes." },
        { day: 3, title: "Finding Your Time and Place", instructions: "When is the best time to do this routine? In the locker room? On the bus? On the sideline? Experiment and find the time and place that works best for you.", deeperDive: "By establishing a consistent time and place, you strengthen the routine's power as a psychological trigger. Your brain learns that 'when I'm in this spot, doing this thing, it's time to perform.'" },
        { day: 4, title: "The 'Reset' Routine", instructions: "Create a mini, 10-second version of your routine. It could be one deep breath and a single reset word. Practice using this in practice immediately after a mistake to instantly get back on track.", deeperDive: "You won't always have 5 minutes for your full routine. A 'reset' routine is a powerful tool for in-game composure, allowing you to quickly move on from errors and refocus." },
        { day: 5, title: "Refining the Routine", instructions: "Adjust one part of your routine. Try a different affirmation or visualize a different skill. Does it feel more powerful? The goal is to perfect it for you.", deeperDive: "Your routine should evolve with you. As you grow as an athlete, you might find that different elements work better. This process of refinement keeps your mental game sharp." },
        { day: 6, title: "Full Dress Rehearsal", instructions: "Perform your routine today with the same intensity and focus as you would on game day. Treat it as the most important part of your preparation.", deeperDive: "This builds the habit under simulated pressure. The more you can make your practice environment feel like a game environment, the better your skills will transfer." },
        { day: 7, title: "Weekly Reflection", instructions: "How will you ensure you make this routine a non-negotiable part of your athletic life?", deeperDive: "Commitment is the final step. By making a conscious decision to integrate this into your identity as an athlete, you ensure you will continue to reap the benefits long after this course is over." }
      ],
      journalPrompts: [
          "Write down your 3-step Performance Prime Routine. Is it simple and easy to remember?",
          "Perform your routine before your next practice. Describe how you felt mentally (focus, confidence, nerves) as you started.",
          "When is the best time to do this routine? In the locker room? On the sideline? Find your spot.",
          "How can you use a mini-version of this routine (e.g., just one deep breath and your affirmation) to reset after a mistake in a game?",
          "Did you feel more in control of your mental state after doing the routine?",
          "Adjust one part of your routine. For example, try a different affirmation or visualization. What felt better?",
          "Reflect on the week. How will you ensure you make this routine a permanent part of your athletic life?"
      ]
    },
    // Weeks 9-24 are placeholders for brevity
    { week: 9, block: 2, title: "Performing Under Pressure", icon: Award, concept: "...", weeklyIntro: "...", dailyLessons: Array(7).fill({}), journalPrompts: Array(7).fill("...") },
    { week: 10, block: 2, title: "The Resilient Athlete", icon: Award, concept: "...", weeklyIntro: "...", dailyLessons: Array(7).fill({}), journalPrompts: Array(7).fill("...") },
    { week: 11, block: 2, title: "Advanced Visualization: Opponent Modeling", icon: Award, concept: "...", weeklyIntro: "...", dailyLessons: Array(7).fill({}), journalPrompts: Array(7).fill("...") },
    { week: 12, block: 2, title: "The Leader's Mindset", icon: Award, concept: "...", weeklyIntro: "...", dailyLessons: Array(7).fill({}), journalPrompts: Array(7).fill("...") },
    { week: 13, block: 2, title: "The Confidence Bank", icon: Award, concept: "...", weeklyIntro: "...", dailyLessons: Array(7).fill({}), journalPrompts: Array(7).fill("...") },
    { week: 14, block: 2, title: "Automating Your Skills", icon: Award, concept: "...", weeklyIntro: "...", dailyLessons: Array(7).fill({}), journalPrompts: Array(7).fill("...") },
    { week: 15, block: 2, title: "The Off-Season Mind", icon: Award, concept: "...", weeklyIntro: "...", dailyLessons: Array(7).fill({}), journalPrompts: Array(7).fill("...") },
    { week: 16, block: 2, title: "The 'Why' Revisited", icon: Award, concept: "...", weeklyIntro: "...", dailyLessons: Array(7).fill({}), journalPrompts: Array(7).fill("...") },
    { week: 17, block: 3, title: "Advanced Anchoring", icon: Star, concept: "...", weeklyIntro: "...", dailyLessons: Array(7).fill({}), journalPrompts: Array(7).fill("...") },
    { week: 18, block: 3, title: "Team Visualization", icon: Star, concept: "...", weeklyIntro: "...", dailyLessons: Array(7).fill({}), journalPrompts: Array(7).fill("...") },
    { week: 19, block: 3, title: "Handling External Pressure", icon: Star, concept: "...", weeklyIntro: "...", dailyLessons: Array(7).fill({}), journalPrompts: Array(7).fill("...") },
    { week: 20, block: 3, title: "The 'Inner Coach' Dialogue", icon: Star, concept: "...", weeklyIntro: "...", dailyLessons: Array(7).fill({}), journalPrompts: Array(7).fill("...") },
    { week: 21, block: 3, title: "Long-Term Goal Setting", icon: Star, concept: "...", weeklyIntro: "...", dailyLessons: Array(7).fill({}), journalPrompts: Array(7).fill("...") },
    { week: 22, block: 3, title: "The Mind-Body Connection", icon: Star, concept: "...", weeklyIntro: "...", dailyLessons: Array(7).fill({}), journalPrompts: Array(7).fill("...") },
    { week: 23, block: 3, title: "The Gratitude Edge", icon: Star, concept: "...", weeklyIntro: "...", dailyLessons: Array(7).fill({}), journalPrompts: Array(7).fill("...") },
    { week: 24, block: 3, title: "The Complete Athlete", icon: Star, concept: "...", weeklyIntro: "...", dailyLessons: Array(7).fill({}), journalPrompts: Array(7).fill("...") },
    { week: 25, title: "The Journey Continues", icon: Award, isConclusion: true, concept: "You have successfully completed the 24-week program. This is not the end; it's the beginning.", deeperDive: "..." }
];

// --- Component Definitions ---
const LoadingSpinner = () => <div className="flex justify-center items-center h-full w-full"><div className="animate-spin rounded-full h-16 w-16 border-b-4 border-teal-400"></div></div>;
const Modal = ({ children, onClose, size = 'lg' }) => ( <div className="fixed inset-0 bg-slate-900 bg-opacity-70 z-50 flex justify-center items-center p-4 backdrop-blur-sm" onClick={onClose}><div className={`bg-slate-800 rounded-2xl shadow-2xl w-full max-w-${size} p-6 relative text-white border border-slate-700 animate-fade-in-up`} onClick={e => e.stopPropagation()}>{children}</div></div>);
const Header = ({ currentWeek, onLogout, onOpenReminders, onOpenMasterJournal }) => {
    const totalWeeks = courseContent.filter(c => !c.isIntro && !c.isConclusion).length;
    const progress = currentWeek > 1 ? ((currentWeek - 1) / totalWeeks) * 100 : 0;
    
    return (
        <header className="w-full max-w-4xl mx-auto p-4 sticky top-0 z-10 bg-slate-900/80 backdrop-blur-lg">
            <div className="flex justify-between items-center mb-2">
                <div className="w-1/3 flex items-center space-x-2">
                    <button onClick={onOpenMasterJournal} className="p-2 text-slate-400 hover:text-white" title="View All Journal Entries"><NotebookText size={20} /></button>
                    <button onClick={onOpenReminders} className="p-2 text-slate-400 hover:text-white" title="Set Reminders"><Bell size={20} /></button>
                </div>
                <div className="w-1/3 text-center">
                    <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-teal-300 to-sky-400 truncate min-w-0">My Mental Gym</h1>
                </div>
                <div className="w-1/3 flex justify-end items-center space-x-2">
                     <button onClick={onLogout} className="p-2 text-slate-400 hover:text-white" title="Logout"><LogOut size={20} /></button>
                </div>
            </div>
            <div className="w-full bg-slate-700 rounded-full h-2.5"><div className="bg-gradient-to-r from-teal-400 to-sky-500 h-2.5 rounded-full transition-all duration-500" style={{ width: `${progress}%` }}></div></div>
            <p className="text-center text-sky-300 mt-2 text-sm font-semibold">{currentWeek <= 24 ? `Week ${currentWeek} of 24` : 'Course Complete!'}</p>
        </header>
    )
};
const WeekCard = ({ weekData, currentWeek, onLearnMore, onSetWeek, onAdvanceWeek, journalEntries, access, onUnlock }) => {
    const { week, title, concept, icon: Icon, isConclusion, isIntro, dailyLessons, block } = weekData;
    const isCompleted = week < currentWeek;
    const isCurrent = week === currentWeek;
    
    const isPaywalled = (block === 2 && !access.block2) || (block === 3 && !access.block3);
    const isLocked = week > currentWeek && !isPaywalled;

    const [isExpanded, setIsExpanded] = useState(isCurrent || isIntro);

    const countUniqueJournalDays = (entries) => {
        if (!entries || entries.length === 0) return 0;
        const dates = entries.map(entry => new Date(entry.date).toDateString());
        return new Set(dates).size;
    };
    
    const uniqueJournalDays = countUniqueJournalDays(journalEntries[week]);
    const canAdvance = uniqueJournalDays >= 5;

    const handleHeaderClick = () => {
        if (isLocked || isPaywalled) return;
        setIsExpanded(!isExpanded);
    };
    
    let cardClasses = 'border-l-4 transition-all duration-300 ';
    let headerClasses = (isLocked || isPaywalled) ? 'cursor-not-allowed' : 'cursor-pointer';
    if (isCurrent) cardClasses += 'bg-slate-800/80 border-teal-400 shadow-lg shadow-teal-500/10';
    else if (isCompleted || isIntro) cardClasses += 'bg-slate-800/30 border-sky-500';
    else if (isPaywalled) cardClasses += 'bg-slate-800/10 border-yellow-500';
    else { cardClasses += 'bg-slate-800/10 border-slate-700'; }

    return (
        <div className={`rounded-xl overflow-hidden mb-4 ${cardClasses}`}>
            <div className={`p-4 flex justify-between items-center ${headerClasses}`} onClick={handleHeaderClick}>
                <div className="flex items-center"><div className={`flex items-center justify-center w-10 h-10 rounded-full mr-4 ${isCurrent ? 'bg-teal-400/20 text-teal-300' : 'bg-slate-700 text-slate-300'}`}>{isLocked || isPaywalled ? <Lock size={20} /> : (isCompleted || isConclusion || isIntro) ? <CheckCircle size={20} className="text-sky-400" /> : <Icon size={20} />}</div><h2 className={`text-xl font-bold ${isCurrent ? 'text-white' : 'text-slate-300'}`}>{isIntro || isConclusion ? title : `Week ${week}: ${title}`}</h2></div>
                {!(isLocked || isPaywalled) && <ChevronDown className={`transition-transform duration-300 ${isExpanded ? 'rotate-180' : ''}`} />}
            </div>
            
            {isExpanded && !isLocked && !isPaywalled && (
                <div className="p-4 border-t border-slate-700 animate-fade-in">
                    <p className="italic text-slate-300 mb-6 text-center">"{concept}"</p>
                    {isIntro ? (
                        <div className="bg-slate-900/50 rounded-lg p-4 border border-slate-700 text-slate-300 whitespace-pre-line"><p>{weekData.deeperDive}</p></div>
                    ) : !isConclusion ? (
                        <>
                           <div className="bg-slate-900/50 rounded-lg p-4 mb-6 border border-slate-700">
                                <h3 className="text-lg font-bold text-sky-300 mb-3">Weekly Introduction</h3>
                                <p className="text-slate-300 whitespace-pre-line">{weekData.weeklyIntro}</p>
                           </div>
                           <h3 className="text-lg font-bold mb-2 text-center">Daily Lessons</h3>
                           <div className="space-y-2 mb-6">
                                {dailyLessons && dailyLessons.map((lesson, index) => (
                                    <button key={index} onClick={() => onLearnMore(lesson, weekData)} className="w-full text-left p-3 bg-slate-900/50 hover:bg-slate-700/50 rounded-lg flex items-center justify-between transition-colors">
                                        <span>Day {index + 1}: {lesson.title || `Day ${index + 1}`}</span>
                                        <BookOpen size={16} className="text-sky-400"/>
                                    </button>
                                ))}
                           </div>
                           <p className="text-center text-sm text-slate-400 mb-4">You have journaled on {uniqueJournalDays} of the required 5 days this week.</p>
                            {isCurrent && week < 24 && (<div className="mt-6 text-center"><button onClick={onAdvanceWeek} disabled={!canAdvance} className="bg-teal-500 hover:bg-teal-400 disabled:bg-slate-600 disabled:cursor-not-allowed text-white font-bold py-3 px-6 rounded-lg transition-all transform disabled:scale-100 hover:scale-105"><span>{canAdvance ? "Complete Week & Unlock Next" : `Journal on ${5 - uniqueJournalDays} more day(s) to unlock`}</span></button></div>)}
                            {isCurrent && week === 24 && (<div className="mt-6 text-center"><button onClick={onAdvanceWeek} disabled={!canAdvance} className="bg-teal-500 hover:bg-teal-400 disabled:bg-slate-600 disabled:cursor-not-allowed text-white font-bold py-3 px-6 rounded-lg transition-all transform disabled:scale-100 hover:scale-105"><span>{canAdvance ? "Finish Course & View Conclusion" : `Journal on ${5-uniqueJournalDays} more day(s)`}</span></button></div>)}
                        </>
                    ) : (
                         <div className="bg-slate-900/50 rounded-lg p-4 border border-slate-700 text-slate-300"><p>{weekData.deeperDive}</p></div>
                    )}
                </div>
            )}
             {isPaywalled && (
                <div className="p-4 text-center">
                    <button onClick={() => onUnlock(block)} className="bg-yellow-500 hover:bg-yellow-400 text-slate-900 font-bold py-3 px-6 rounded-lg flex items-center justify-center mx-auto">
                        <ShoppingCart className="mr-2" size={20} />
                        Unlock Block {block}: Advanced Training
                    </button>
                </div>
            )}
        </div>
    );
};

const LoginScreen = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [isLoginView, setIsLoginView] = useState(true);
    const [error, setError] = useState('');

    const handleEmailAuth = async () => {
        setError('');
        if (!email || !password) { setError("Please enter email and password."); return; }
        try {
            if (isLoginView) {
                await signInWithEmailAndPassword(auth, email, password);
            } else {
                await createUserWithEmailAndPassword(auth, email, password);
            }
        } catch (err) {
            setError(err.message.replace('Firebase: ', ''));
        }
    };
    
    const handleGoogleAuth = async () => {
        setError('');
        const provider = new GoogleAuthProvider();
        try {
            await signInWithPopup(auth, provider);
        } catch (err) {
            setError(err.message.replace('Firebase: ', ''));
        }
    };

    return (
        <div className="min-h-screen flex flex-col items-center justify-center bg-slate-900 text-white p-4">
            <div className="w-full max-w-sm">
                <div className="text-center mb-8">
                    <BrainCircuit className="mx-auto text-teal-400 mb-2" size={48} />
                    <h1 className="text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-teal-300 to-sky-400">My Mental Gym</h1>
                    <p className="text-slate-400">Unlock Your Mental Potential</p>
                </div>
                
                <div className="bg-slate-800 p-8 rounded-2xl shadow-2xl">
                    <h2 className="text-2xl font-bold mb-6 text-center">{isLoginView ? 'Login' : 'Create Account'}</h2>
                    {error && <p className="bg-red-500/20 text-red-300 p-3 rounded-lg mb-4 text-center text-sm">{error}</p>}
                    <div className="space-y-4">
                        <input type="email" placeholder="Email" value={email} onChange={e => setEmail(e.target.value)} className="w-full bg-slate-900/50 p-3 rounded-lg border border-slate-700 focus:ring-2 focus:ring-teal-500 focus:outline-none"/>
                        <input type="password" placeholder="Password" value={password} onChange={e => setPassword(e.target.value)} className="w-full bg-slate-900/50 p-3 rounded-lg border border-slate-700 focus:ring-2 focus:ring-teal-500 focus:outline-none"/>
                        <button onClick={handleEmailAuth} className="w-full bg-teal-600 hover:bg-teal-500 text-white font-bold py-3 rounded-lg">{isLoginView ? 'Login' : 'Sign Up'}</button>
                    </div>
                    <div className="my-6 flex items-center"><div className="flex-grow border-t border-slate-700"></div><span className="flex-shrink mx-4 text-slate-500">OR</span><div className="flex-grow border-t border-slate-700"></div></div>
                    <button onClick={handleGoogleAuth} className="w-full bg-sky-600 hover:bg-sky-500 text-white font-bold py-3 rounded-lg flex items-center justify-center">
                        <svg className="w-5 h-5 mr-2" viewBox="0 0 48 48"><path fill="#FFC107" d="M43.611,20.083H42V20H24v8h11.303c-1.649,4.657-6.08,8-11.303,8c-6.627,0-12-5.373-12-12c0-6.627,5.373-12,12-12c3.059,0,5.842,1.154,7.961,3.039l5.657-5.657C34.046,6.053,29.268,4,24,4C12.955,4,4,12.955,4,24c0,11.045,8.955,20,20,20c11.045,0,20-8.955,20-20C44,22.659,43.862,21.35,43.611,20.083z"></path><path fill="#FF3D00" d="M6.306,14.691l6.571,4.819C14.655,15.108,18.961,12,24,12c3.059,0,5.842,1.154,7.961,3.039l5.657-5.657C34.046,6.053,29.268,4,24,4C16.318,4,9.656,8.337,6.306,14.691z"></path><path fill="#4CAF50" d="M24,44c5.166,0,9.86-1.977,13.409-5.192l-6.19-5.238C29.211,35.091,26.715,36,24,36c-5.202,0-9.619-3.317-11.283-7.946l-6.522,5.025C9.505,39.556,16.227,44,24,44z"></path><path fill="#1976D2" d="M43.611,20.083H42V20H24v8h11.303c-0.792,2.237-2.231,4.166-4.087,5.571l6.19,5.238C41.38,36.16,44,30.638,44,24C44,22.659,43.862,21.35,43.611,20.083z"></path></svg>
                        Sign in with Google
                    </button>
                    <p className="text-center mt-6 text-sm">
                        {isLoginView ? "Don't have an account?" : "Already have an account?"}
                        <button onClick={() => setIsLoginView(!isLoginView)} className="text-teal-400 hover:underline font-semibold ml-1">{isLoginView ? 'Sign Up' : 'Login'}</button>
                    </p>
                </div>
            </div>
        </div>
    );
};


const AppCore = ({ user }) => {
    const [currentWeek, setCurrentWeek] = useState(1);
    const [journalEntries, setJournalEntries] = useState({});
    const [loading, setLoading] = useState(true);
    const [modalData, setModalData] = useState(null);
    const [modalType, setModalType] = useState(null);
    const [journalView, setJournalView] = useState('list');
    const [editingEntry, setEditingEntry] = useState(null);
    const [journalInput, setJournalInput] = useState('');
    const [isListening, setIsListening] = useState(false);
    const [access, setAccess] = useState({ block2: false, block3: false });

    const loadUserData = useCallback(async (uid) => {
        if (!uid) return; setLoading(true);
        try {
            const docRef = doc(db, "artifacts", appId, "users", uid);
            const docSnap = await getDoc(docRef);
            if (docSnap.exists()) {
                const data = docSnap.data();
                setCurrentWeek(data.currentWeek || 1);
                setJournalEntries(data.journalEntries || {});
                setAccess({
                    block2: data.access?.block2 || false,
                    block3: data.access?.block3 || false
                });
            } else {
                const newUserData = { currentWeek: 1, journalEntries: {}, access: { block2: false, block3: false } };
                await setDoc(docRef, newUserData);
                setCurrentWeek(newUserData.currentWeek);
                setJournalEntries(newUserData.journalEntries);
                setAccess(newUserData.access);
            }
        } catch (error) { console.error("Error loading user data:", error); } 
        finally { setLoading(false); }
    }, []);
    
    const saveUserData = useCallback(async (dataToSave) => {
        if (!user) return;
        try { 
            const docRef = doc(db, "artifacts", appId, "users", user.uid);
            await setDoc(docRef, dataToSave, { merge: true });
        } catch (error) { console.error("Error saving user data:", error); }
    }, [user]);

    useEffect(() => { if (user) loadUserData(user.uid); }, [user, loadUserData]);
    
    useEffect(() => {
        if (!loading && user) {
            saveUserData({ currentWeek });
        }
    }, [currentWeek, loading, user, saveUserData]);

    const toggleListening = () => {
      if (!recognition) return;
      if (isListening) { recognition.stop(); setIsListening(false); } 
      else {
        recognition.onresult = (event) => {
          let finalTranscript = '';
          for (let i = event.resultIndex; i < event.results.length; ++i) {
            if (event.results[i].isFinal) finalTranscript += event.results[i][0].transcript;
          }
          setJournalInput(prevInput => prevInput + finalTranscript);
        };
        recognition.start();
        setIsListening(true);
      }
    };
    useEffect(() => { if (recognition) recognition.onend = () => setIsListening(false); }, []);
  
    const handleLearnMore = (lessonData, weekData) => { setModalData({lesson: lessonData, week: weekData}); setModalType('lesson'); };
    const handleOpenJournal = (weekData, day) => { 
        setModalData({ week: weekData, day: day }); 
        setModalType('journal'); 
        setJournalView('list'); 
    };

    const handleSaveJournal = async () => {
      if (!modalData) return;
      
      const updatedJournalEntries = JSON.parse(JSON.stringify(journalEntries));
      const weekEntries = updatedJournalEntries[modalData.week.week] || [];

      if (editingEntry) { 
        const entryIndex = weekEntries.findIndex(e => e.id === editingEntry.id);
        if (entryIndex > -1) {
            weekEntries[entryIndex].text = journalInput;
        }
      } else {
        const newEntry = { 
            id: crypto.randomUUID(), 
            date: new Date().toISOString(), 
            text: journalInput,
            prompt: modalData.week.journalPrompts[modalData.day - 1],
            day: modalData.day,
            week: modalData.week.week
        };
        weekEntries.push(newEntry);
      }
      updatedJournalEntries[modalData.week.week] = weekEntries;

      setJournalEntries(updatedJournalEntries);
      await saveUserData({ journalEntries: updatedJournalEntries });

      setJournalView('list'); setEditingEntry(null); setJournalInput('');
    };

    const handleDeleteJournal = async (entryId, weekNum) => {
      if (!weekNum) return;
      const updatedJournalEntries = JSON.parse(JSON.stringify(journalEntries));
      const weekEntries = updatedJournalEntries[weekNum] || [];
      updatedJournalEntries[weekNum] = weekEntries.filter(e => e.id !== entryId);
      
      setJournalEntries(updatedJournalEntries);
      await saveUserData({ journalEntries: updatedJournalEntries });
    };
  
    const handleAdvanceWeek = () => { if (currentWeek < 25) setCurrentWeek(w => w + 1); };
    const closeModal = () => { setModalType(null); setModalData(null); setIsListening(false); if (recognition) recognition.stop(); };
  
    const handleLogout = () => signOut(auth);
    
    const handleUnlock = (block) => {
        setModalData({ block: block });
        setModalType('payment');
    }

    const handlePayment = async (block) => {
        const newAccess = {...access};
        if(block === 2) newAccess.block2 = true;
        if(block === 3) newAccess.block3 = true;
        
        setAccess(newAccess);
        await saveUserData({ access: newAccess });
        closeModal();
    }

    const countUniqueJournalDays = (entries) => {
        if (!entries || entries.length === 0) return 0;
        const dates = entries.map(entry => new Date(entry.date).toDateString());
        return new Set(dates).size;
    };

    const renderModalContent = () => {
        if (!modalType) return null;
        
        if (modalType === 'payment') {
            return (
                <Modal onClose={closeModal} size="md">
                    <div className="text-center">
                        <h2 className="text-3xl font-bold text-yellow-400 mb-4">Unlock Advanced Training</h2>
                        <p className="text-slate-300 mb-6">Take your mental game to the next level by unlocking Block {modalData.block} of the course.</p>
                        <button onClick={() => handlePayment(modalData.block)} className="w-full bg-teal-600 hover:bg-teal-500 text-white font-bold py-3 rounded-lg text-lg">
                            Simulate Payment & Unlock
                        </button>
                    </div>
                </Modal>
            );
        }
        if (modalType === 'masterJournal') {
            const allEntries = Object.values(journalEntries).flat().sort((a,b) => new Date(b.date) - new Date(a.date));
            return (
                <Modal onClose={closeModal} size="xl">
                    <h2 className="text-3xl font-bold text-sky-400 mb-4">Master Journal</h2>
                    <div className="max-h-[70vh] overflow-y-auto pr-2 space-y-4 custom-scrollbar">
                        {allEntries.length === 0 ? <p className="text-center text-slate-400">No entries yet. Start journaling to see your progress!</p> :
                        allEntries.map(entry => (
                            <div key={entry.id} className="bg-slate-900/50 p-4 rounded-lg">
                                <p className="text-sm text-slate-400 mb-1">{new Date(entry.date).toLocaleString()}</p>
                                <p className="font-semibold italic text-teal-300 mb-2">Prompt: "{entry.prompt}"</p>
                                <p className="text-slate-200 whitespace-pre-wrap">{entry.text}</p>
                            </div>
                        ))}
                    </div>
                </Modal>
            );
        }
        if (modalType === 'lesson') return <Modal onClose={closeModal} size="xl"><div className="max-h-[80vh] overflow-y-auto pr-2 custom-scrollbar"><h2 className="text-3xl font-bold text-sky-400 mb-2">{modalData.lesson.title}</h2><div className="border-t border-slate-700 my-4"></div><h3 className="text-xl font-bold text-teal-300 mb-2">The Drill</h3><p className="text-slate-300 mb-4">{modalData.lesson.instructions}</p><h3 className="text-xl font-bold text-teal-300 mb-2">Deeper Dive: The 'Why' Behind It</h3><p className="text-slate-300">{modalData.lesson.deeperDive}</p><div className="mt-6"><button onClick={() => {closeModal(); setTimeout(() => handleOpenJournal(modalData.week, modalData.lesson.day), 200)}} className="w-full bg-teal-600 hover:bg-teal-500 text-white font-bold py-3 px-4 rounded-lg flex items-center justify-center text-lg">Journal About This Lesson</button></div></div></Modal>;
        if (modalType === 'journal') {
            const weekEntries = journalEntries[modalData.week.week] || [];
            const dayEntries = weekEntries.filter(e => e.day === modalData.day);
            const dailyPrompt = modalData.week.journalPrompts[modalData.day - 1];

            return (
            <Modal onClose={closeModal} size="xl">
                <h2 className="text-3xl font-bold text-teal-400 mb-2">Journal: Week {modalData.week.week}, Day {modalData.day}</h2>
                {journalView === 'list' ? (
                <div>
                    <p className="text-slate-300 font-semibold mb-4">Today's Prompt: <span className="font-normal italic">"{dailyPrompt}"</span></p>
                    <button onClick={() => { setEditingEntry(null); setJournalInput(''); setJournalView('editor'); }} className="w-full bg-teal-600 hover:bg-teal-500 text-white font-bold py-3 px-4 rounded-lg flex items-center justify-center mb-4"><Plus className="mr-2" />Add New Entry</button>
                    <div className="max-h-64 overflow-y-auto space-y-3 pr-2 custom-scrollbar">
                    {dayEntries.length === 0 ? <p className="text-center text-slate-400">No entries for this day yet.</p> : dayEntries.sort((a,b) => new Date(b.date) - new Date(a.date)).map(entry => (
                        <div key={entry.id} className="bg-slate-900/50 p-3 rounded-lg flex justify-between items-center">
                        <div><p className="font-semibold">{entry.text.substring(0, 50)}...</p><p className="text-xs text-slate-400">{new Date(entry.date).toLocaleDateString()}</p></div>
                        <div className="flex space-x-2">
                           <button onClick={() => { setEditingEntry(entry); setJournalInput(entry.text); setJournalView('editor'); }} className="p-2 bg-blue-600 hover:bg-blue-500 text-white rounded-full"><Edit2 size={16}/></button>
                           <button onClick={() => handleDeleteJournal(entry.id, modalData.week.week)} className="p-2 hover:bg-slate-700 rounded-full text-red-400"><Trash2 size={16}/></button>
                        </div>
                        </div>
                    ))}
                    </div>
                </div>
                ) : (
                <div>
                    <h3 className="text-xl font-bold mb-2">{editingEntry ? 'Edit Entry' : 'New Entry'}</h3>
                    <p className="text-slate-300 font-semibold mb-4">Prompt: <span className="font-normal italic">"{dailyPrompt}"</span></p>
                    <textarea className="w-full h-48 bg-slate-900/50 rounded-lg p-4 border border-slate-700 focus:ring-2 focus:ring-teal-500 focus:outline-none" value={journalInput} onChange={(e) => setJournalInput(e.target.value)} placeholder="Your reflections..." />
                    <div className="flex justify-between items-center mt-4"><button onClick={() => setJournalView('list')} className="bg-slate-600 hover:bg-slate-500 text-white font-bold py-2 px-4 rounded-lg">Back to List</button><div>{recognition && <button onClick={toggleListening} className={`p-3 rounded-full ${isListening ? 'bg-red-500 animate-pulse' : 'bg-sky-600'}`}>{isListening ? <MicOff /> : <Mic />}</button>}</div><button onClick={handleSaveJournal} className="bg-teal-600 hover:bg-teal-500 text-white font-bold py-2 px-4 rounded-lg">Save</button></div>
                </div>
                )}
            </Modal>
            );
        }
        return null;
    };

    if (loading) return <div className="bg-slate-900 min-h-screen flex items-center justify-center"><LoadingSpinner /></div>;
    
    return (
        <div className="bg-slate-900 text-white min-h-screen font-sans">
            <Header currentWeek={currentWeek} onLogout={handleLogout} onOpenMasterJournal={() => setModalType('masterJournal')} />
            <main className="w-full max-w-4xl mx-auto p-4">
                {courseContent.map(weekData => ( <WeekCard key={weekData.week} weekData={weekData} currentWeek={currentWeek} onLearnMore={handleLearnMore} onOpenJournal={handleOpenJournal} onSetWeek={setCurrentWeek} onAdvanceWeek={handleAdvanceWeek} journalEntries={journalEntries} access={access} onUnlock={handleUnlock} /> ))}
            </main>
            <footer className="text-center p-4">
                <p className="text-slate-500 text-xs">Your progress is saved automatically.</p>
            </footer>
            {renderModalContent()}
            <style>{`.custom-scrollbar::-webkit-scrollbar { width: 8px; } .custom-scrollbar::-webkit-scrollbar-track { background: #1e293b; } .custom-scrollbar::-webkit-scrollbar-thumb { background-color: #06b6d4; border-radius: 20px; border: 2px solid #1e293b; } @keyframes fade-in-up { 0% { opacity: 0; transform: translateY(20px); } 100% { opacity: 1; transform: translateY(0); } } @keyframes fade-in { 0% { opacity: 0; } 100% { opacity: 1; } } .animate-fade-in-up { animation: fade-in-up 0.4s ease-out forwards; } .animate-fade-in { animation: fade-in 0.5s ease-out forwards; }`}</style>
        </div>
    );
}

// --- Top-Level Component ---
export default function App() {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
            setUser(currentUser);
            setLoading(false);
        });
        return () => unsubscribe();
    }, []);

    if (loading) {
        return <div className="bg-slate-900 min-h-screen flex items-center justify-center"><LoadingSpinner /></div>
    }

    return user ? <AppCore user={user} /> : <LoginScreen />;
}
