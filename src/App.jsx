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
import { Dribbble, Target, BrainCircuit, NotebookText, Star, Mic, MicOff, Lock, ChevronDown, CheckCircle, Plus, Edit2, Trash2, LogOut, BookOpen, Award } from 'lucide-react';

// --- Firebase Configuration ---
// Your web app's Firebase configuration
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
const appId = typeof __app_id !== 'undefined' ? __app_id : 'athlete-s-master-key'; // Use your project ID as a fallback
// setLogLevel('debug'); // Use for debugging firestore


// --- Enriched Course Content with Daily Lessons & Expanded Intro ---
const courseContent = [
    { week: 0, title: "Welcome to Your Mental Gym", icon: BrainCircuit, isIntro: true,
      concept: "Physical talent gets you to the game. Mental strength lets you win it.",
      deeperDive: "You spend countless hours training your body: lifting, running, and practicing drills until they're perfect. But every top athlete knows that when the pressure is on, the real competition happens in the six inches between your ears. The difference between a good athlete and a great one often comes down to who has the stronger mental game. This course is designed to be your personal mental gym, a place to build the focus, confidence, and resilience that define elite competitors.\n\nOver the next 8 weeks, you will learn and practice the core principles of sports psychology, adapted from the timeless wisdom of the Master Key System. We will move from foundational skills like controlling your thoughts and focus, to advanced techniques like high-definition visualization and building unshakable belief in your abilities. Each week builds on the last, creating a comprehensive mental toolkit you can use for the rest of your athletic career.\n\nYour commitment to these daily exercises is just as important as your commitment to your physical training. The drills are short but powerful. The journaling is designed to create self-awareness, which is the cornerstone of all improvement. By investing a few minutes each day, you are not just learning concepts; you are actively re-wiring your brain for success.\n\nThis journey is about more than just becoming a better athlete; it's about becoming a more focused, resilient, and confident person. The skills you build here will serve you long after you've left the field or court. Welcome to the first day of your new mental training regimen. Let's begin." },
    { 
      week: 1, 
      title: "The Mind as the Starting Block", 
      icon: Dribbble,
      concept: "Every action is preceded by a thought. This week, we learn to become the calm observer of our thoughts, creating a space between an event and our reaction to it. This is the foundation of mental control.",
      weeklyIntro: "Welcome to Week 1. Before we can learn to direct our thoughts, we must first learn to simply observe them without judgment. Many athletes are controlled by their thoughts—a flash of doubt before a big play, a surge of anger after a mistake. They believe they *are* their thoughts. The goal this week is to break that illusion.\n\nThis week's drills are designed to build the foundational skill of awareness. By practicing stillness and non-reaction, you will start to create a small space between a thought and your response to it. This space is where all mental power resides. It's the difference between an impulsive, emotional reaction and a calm, calculated action. This is the most fundamental skill in all of mental training.",
      dailyLessons: [
        { day: 1, title: "The Stillness Drill", instructions: "For 5 minutes, sit upright and remain physically still. Your only job is to notice thoughts without reacting. When your mind wanders, gently guide it back to stillness.", deeperDive: "This drill trains your prefrontal cortex to resist impulsive reactions, a key skill for staying calm under pressure. By consciously resisting the urge to react to every thought or physical impulse, you are building the mental muscle to stay calm under pressure. You're creating a 'mental pause button' that prevents you from being emotionally rattled by a bad call, a mistake, or an opponent's trash talk, allowing you to respond with logic instead of impulse." },
        { day: 2, title: "Noticing the Chatter", instructions: "Repeat the 5-minute stillness drill. Today, pay special attention to the *types* of thoughts that appear. Are they about the past? The future? Your to-do list? Just notice, don't judge.", deeperDive: "By identifying your mental habits, you begin to see that they are just thoughts, not commands. This separation is the first step to taking control. You learn that just because a thought appears doesn't mean it's true or that you have to act on it. This is the foundation of breaking free from negative thought loops that can sabotage performance." },
        { day: 3, title: "Resisting Physical Impulses", instructions: "Repeat the 5-minute stillness drill. Today, your focus is on physical sensations. Notice the urge to scratch an itch, shift your weight, or fidget. Acknowledge the urge, but consciously choose not to act on it.", deeperDive: "Mental discipline and physical discipline are linked. Resisting small physical impulses strengthens your overall willpower, making it easier to push through fatigue or discomfort in a game. This drill proves to your brain that you are in charge, not your fleeting physical sensations. It builds the mental fortitude to stay composed when your body is screaming at you to stop." },
        { day: 4, title: "Extending the Time", instructions: "Today, we increase the challenge. Perform the stillness drill for 7 minutes. The goal is to maintain your composure and non-reaction as the duration increases.", deeperDive: "Just like lifting heavier weights, extending the time builds mental endurance. It trains your mind to stay focused and calm for longer periods, which is crucial for late-game situations. This extended duration challenges your ability to stay present and not get carried away by boredom or restlessness, which are common mental opponents in long competitions." },
        { day: 5, title: "Connecting to Your Sport", instructions: "Before your 7-minute drill, briefly visualize a recent, frustrating moment from a game or practice. Then, during the drill, if frustrating thoughts arise, practice letting them go just like any other thought.", deeperDive: "This exercise connects the abstract skill of stillness to real-world athletic scenarios. You are training your brain to detach from the emotion of a mistake and return to a neutral, focused state. It's one thing to be calm in a quiet room; it's another to be calm after a turnover. This drill helps bridge that gap." },
        { day: 6, title: "The 10-Minute Challenge", instructions: "Today's drill is 10 minutes of complete stillness. Embrace the challenge. Notice how your mind and body feel as you push past your previous limits.", deeperDive: "Pushing your mental limits in a controlled setting builds profound confidence. When you know you can stay calm and focused for 10 minutes, a 30-second timeout feels like an eternity of calm. This builds a deep-seated belief in your mental resilience that you can draw upon when the pressure is at its highest." },
        { day: 7, title: "Weekly Reflection", instructions: "Perform the stillness drill for a final 10 minutes. Afterward, use the journal to reflect on the entire week's progress.", deeperDive: "Reflection solidifies learning. By looking back on the week's challenges and successes, you cement the new neural pathways you've started to build. It helps you understand your own mental patterns and prepares you for the next stage of your training, where you'll actively direct your thoughts instead of just observing them." }
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
    // Weeks 3-8 would be similarly structured with 7 daily lessons each.
    // For brevity, the rest of the weeks will follow the old format in this example.
    { week: 3, title: "The Power of Unwavering Focus", icon: Target, concept: "...", dailyLessons: [], journalPrompts: ["..."], deeperDive: "..." },
    { week: 4, title: "Building Your Mental Blueprint", icon: BrainCircuit, concept: "...", dailyLessons: [], journalPrompts: ["..."], deeperDive: "..." },
    { week: 5, title: "HD Visualization: Making It Real", icon: Star, concept: "...", dailyLessons: [], journalPrompts: ["..."], deeperDive: "..." },
    { week: 6, title: "Defining Your Victory", icon: Target, concept: "...", dailyLessons: [], journalPrompts: ["..."], deeperDive: "..." },
    { week: 7, title: "Building Unshakable Belief", icon: Star, concept: "...", dailyLessons: [], journalPrompts: ["..."], deeperDive: "..." },
    { week: 8, title: "Game Day Integration", icon: Dribbble, concept: "...", dailyLessons: [], journalPrompts: ["..."], deeperDive: "..." },
    { week: 9, title: "The Journey Continues", icon: Award, isConclusion: true,
      concept: "You have successfully completed the 8-week foundation. But this is not the end; it's the beginning. Mental strength, like physical strength, requires consistent training. The tools you've learned are now part of your permanent toolkit.",
      deeperDive: "Just as you don't stop lifting weights after one season, you don't stop mental training after one course. Consistency is the key to making these skills second nature. Continue to use your Performance Prime Routine before every game. Revisit the visualization and focus drills whenever you face a new challenge. Your mind is your greatest athletic asset—keep it sharp. The journey to mental mastery is ongoing, and you now have the map." }
];

const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
const recognition = SpeechRecognition ? new SpeechRecognition() : null;
if (recognition) {
  recognition.continuous = true;
  recognition.interimResults = true;
}

// --- Component Definitions (in one file) ---

const LoadingSpinner = () => <div className="flex justify-center items-center h-full w-full"><div className="animate-spin rounded-full h-16 w-16 border-b-4 border-teal-400"></div></div>;

const Modal = ({ children, onClose, size = 'lg' }) => (
    <div className="fixed inset-0 bg-slate-900 bg-opacity-70 z-50 flex justify-center items-center p-4 backdrop-blur-sm" onClick={onClose}>
        <div className={`bg-slate-800 rounded-2xl shadow-2xl w-full max-w-${size} p-6 relative text-white border border-slate-700 animate-fade-in-up`} onClick={e => e.stopPropagation()}>{children}</div>
    </div>
);

const Header = ({ currentWeek, onLogout, onOpenMasterJournal }) => {
    const totalWeeks = courseContent.filter(c => !c.isIntro && !c.isConclusion).length;
    const progress = currentWeek > 1 ? ((currentWeek - 1) / totalWeeks) * 100 : 0;
    
    return (
        <header className="w-full max-w-4xl mx-auto p-4 sticky top-0 z-10 bg-slate-900/80 backdrop-blur-lg">
            <div className="text-center mb-2 relative">
                <h1 className="text-3xl md:text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-teal-300 to-sky-400">My Mental Gym</h1>
                <div className="absolute top-1/2 right-0 -translate-y-1/2 flex items-center space-x-2">
                    <button onClick={onOpenMasterJournal} className="p-2 text-slate-400 hover:text-white" title="View All Journal Entries"><NotebookText size={20} /></button>
                    <button onClick={onLogout} className="p-2 text-slate-400 hover:text-white" title="Logout"><LogOut size={20} /></button>
                </div>
            </div>
            <div className="w-full bg-slate-700 rounded-full h-2.5"><div className="bg-gradient-to-r from-teal-400 to-sky-500 h-2.5 rounded-full transition-all duration-500" style={{ width: `${progress}%` }}></div></div>
            <p className="text-center text-sky-300 mt-2 text-sm font-semibold">{currentWeek <= 8 ? `Week ${currentWeek} of 8` : 'Course Complete!'}</p>
        </header>
    )
};

const WeekCard = ({ weekData, currentWeek, onLearnMore, onSetWeek, onAdvanceWeek, journalEntries }) => {
    const { week, title, concept, icon: Icon, isConclusion, isIntro, dailyLessons } = weekData;
    const isCompleted = week < currentWeek;
    const isCurrent = week === currentWeek;
    const isLocked = week > currentWeek;
    const [isExpanded, setIsExpanded] = useState(isCurrent || isIntro);

    const countUniqueJournalDays = (entries) => {
        if (!entries || entries.length === 0) return 0;
        const dates = entries.map(entry => new Date(entry.date).toDateString());
        return new Set(dates).size;
    };
    
    const uniqueJournalDays = countUniqueJournalDays(journalEntries[week]);
    const canAdvance = uniqueJournalDays >= 5;

    const handleHeaderClick = () => {
        if (isLocked) return;
        setIsExpanded(!isExpanded);
    };
    
    let cardClasses = 'border-l-4 transition-all duration-300 ';
    let headerClasses = isLocked ? 'cursor-not-allowed' : 'cursor-pointer';
    if (isCurrent) cardClasses += 'bg-slate-800/80 border-teal-400 shadow-lg shadow-teal-500/10';
    else if (isCompleted || isIntro) cardClasses += 'bg-slate-800/30 border-sky-500';
    else { cardClasses += 'bg-slate-800/10 border-slate-700'; }

    return (
        <div className={`rounded-xl overflow-hidden mb-4 ${cardClasses}`}>
            <div className={`p-4 flex justify-between items-center ${headerClasses}`} onClick={handleHeaderClick}>
                <div className="flex items-center"><div className={`flex items-center justify-center w-10 h-10 rounded-full mr-4 ${isCurrent ? 'bg-teal-400/20 text-teal-300' : 'bg-slate-700 text-slate-300'}`}>{isLocked ? <Lock size={20} /> : (isCompleted || isConclusion || isIntro) ? <CheckCircle size={20} className="text-sky-400" /> : <Icon size={20} />}</div><h2 className={`text-xl font-bold ${isCurrent ? 'text-white' : 'text-slate-300'}`}>{isIntro || isConclusion ? title : `Week ${week}: ${title}`}</h2></div>
                {!isLocked && <ChevronDown className={`transition-transform duration-300 ${isExpanded ? 'rotate-180' : ''}`} />}
            </div>
            
            {isExpanded && !isLocked && (
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
                                {dailyLessons && dailyLessons.map((lesson) => (
                                    <button key={lesson.day} onClick={() => onLearnMore(lesson, weekData)} className="w-full text-left p-3 bg-slate-900/50 hover:bg-slate-700/50 rounded-lg flex items-center justify-between transition-colors">
                                        <span>Day {lesson.day}: {lesson.title}</span>
                                        <BookOpen size={16} className="text-sky-400"/>
                                    </button>
                                ))}
                           </div>
                           <p className="text-center text-sm text-slate-400 mb-4">You have journaled on {uniqueJournalDays} of the required 5 days this week.</p>
                            {isCurrent && week < 8 && (<div className="mt-6 text-center"><button onClick={onAdvanceWeek} disabled={!canAdvance} className="bg-teal-500 hover:bg-teal-400 disabled:bg-slate-600 disabled:cursor-not-allowed text-white font-bold py-3 px-6 rounded-lg transition-all transform disabled:scale-100 hover:scale-105"><span>{canAdvance ? "Complete Week & Unlock Next" : `Journal on ${5 - uniqueJournalDays} more day(s) to unlock`}</span></button></div>)}
                            {isCurrent && week === 8 && (<div className="mt-6 text-center"><button onClick={onAdvanceWeek} disabled={!canAdvance} className="bg-teal-500 hover:bg-teal-400 disabled:bg-slate-600 disabled:cursor-not-allowed text-white font-bold py-3 px-6 rounded-lg transition-all transform disabled:scale-100 hover:scale-105"><span>{canAdvance ? "Finish Course & View Conclusion" : `Journal on ${5-uniqueJournalDays} more day(s)`}</span></button></div>)}
                        </>
                    ) : (
                         <div className="bg-slate-900/50 rounded-lg p-4 border border-slate-700 text-slate-300"><p>{weekData.deeperDive}</p></div>
                    )}
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

    const loadUserData = useCallback(async (uid) => {
        if (!uid) return; setLoading(true);
        try {
            const docRef = doc(db, "artifacts", appId, "users", uid);
            const docSnap = await getDoc(docRef);
            if (docSnap.exists()) {
                const data = docSnap.data();
                setCurrentWeek(data.currentWeek || 1);
                setJournalEntries(data.journalEntries || {});
            } else {
                const newUserData = { currentWeek: 1, journalEntries: {} };
                await setDoc(docRef, newUserData);
                setCurrentWeek(newUserData.currentWeek);
                setJournalEntries(newUserData.journalEntries);
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
  
    const handleAdvanceWeek = () => { if (currentWeek < 9) setCurrentWeek(w => w + 1); };
    const closeModal = () => { setModalType(null); setModalData(null); setIsListening(false); if (recognition) recognition.stop(); };
  
    const handleLogout = () => signOut(auth);
    
    const countUniqueJournalDays = (entries) => {
        if (!entries || entries.length === 0) return 0;
        const dates = entries.map(entry => new Date(entry.date).toDateString());
        return new Set(dates).size;
    };

    const renderModalContent = () => {
        if (!modalType) return null;
        
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
            <Header currentWeek={currentWeek} onLogout={handleLogout} />
            <main className="w-full max-w-4xl mx-auto p-4">
                {courseContent.map(weekData => ( <WeekCard key={weekData.week} weekData={weekData} currentWeek={currentWeek} onLearnMore={handleLearnMore} onOpenJournal={handleOpenJournal} onSetWeek={setCurrentWeek} onAdvanceWeek={handleAdvanceWeek} uniqueJournalDays={countUniqueJournalDays(journalEntries[weekData.week])} journalEntries={journalEntries}/> ))}
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












