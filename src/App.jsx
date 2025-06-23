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
import { Dribbble, Target, BrainCircuit, NotebookText, Star, Mic, MicOff, Lock, ChevronDown, CheckCircle, Plus, Edit2, Trash2, LogOut, BookOpen, Award, CalendarPlus } from 'lucide-react';

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


// --- Enriched Course Content with Daily Journal Prompts ---
const courseContent = [
    { week: 0, title: "Welcome to Your Mental Gym", icon: BrainCircuit, isIntro: true,
      concept: "Physical talent gets you to the game. Mental strength lets you win it.",
      deeperDive: "You spend countless hours training your body: lifting, running, and practicing drills until they're perfect. But every top athlete knows that when the pressure is on, the real competition happens in the six inches between your ears. This 8-week course is your mental gym. Here, you will train the skills that separate the good from the great: focus under pressure, unshakeable confidence, and the ability to visualize success before it happens. Let's begin." },
    { week: 1, title: "The Mind as the Starting Block", icon: Dribbble,
      concept: "Every action is preceded by a thought. This week, we learn to become the calm observer of our thoughts, creating a space between an event and our reaction to it. This is the foundation of mental control.",
      drill: "The 'Sit Still' Drill",
      instructions: "For five minutes, sit upright and remain physically still. As thoughts arise, notice them like clouds passing in the sky, without judgment, and gently return your focus to your stillness. As the week progresses, try to increase your time to seven or even ten minutes.",
      journalPrompts: [
          "Describe the 'chatter' in your mind. What kinds of thoughts kept popping up? How did it feel when you managed even a few seconds of inner quiet?",
          "When did you feel the most restless during the drill? What thought or feeling triggered it?",
          "Did you notice any patterns in your thoughts (e.g., replaying past events, worrying about the future)? Describe one.",
          "How did this mental stillness (or lack thereof) compare to how your mind feels during a practice or game?",
          "What is one situation outside of sports where being a calm observer of your thoughts would be helpful?",
          "How has your ability to sit still and quiet your mind changed since Day 1?",
          "Reflect on the week. What was the biggest challenge in this drill, and what was the biggest reward?"
      ],
      deeperDive: "This drill trains your prefrontal cortex, the part of the brain responsible for emotional regulation and executive function. By consciously resisting the urge to react to every thought or physical impulse, you are building the mental muscle to stay calm under pressure. Think of it as creating a 'mental pause button.' This button is what prevents you from being emotionally rattled by a bad call, a mistake, or an opponent's trash talk, allowing you to respond with logic instead of impulse." },
    { week: 2, title: "Control the Mental Locker Room", icon: BrainCircuit,
      concept: "Your brain forms habits through neural pathways. Negative self-talk is a reinforced habit, like a well-worn path in a field. This week, we strategically stop walking that path and start cutting a new one.",
      drill: "Thought Stopping & Replacement",
      instructions: "When you catch a negative thought (e.g., 'I'm too tired'), mentally visualize a big red STOP sign. Then, immediately and forcefully, replace it with a pre-written, powerful statement (e.g., 'I have the endurance to finish strong'). Don't just say the words; try to feel them.",
      journalPrompts: [
          "Identify one recurring negative thought you challenged this week. What was your replacement thought?",
          "Describe a specific moment where you used this technique. How did it affect your immediate feelings or actions?",
          "What situations or triggers tend to bring out your most negative self-talk?",
          "Create a new empowering replacement statement for a different negative thought you've had.",
          "How does your self-talk after a mistake differ from your self-talk after a success?",
          "Did you find it difficult to believe your positive replacement statements at first? Is it getting easier?",
          "Reflect on the week. How has becoming aware of your self-talk changed your mood during training?"
      ],
      deeperDive: "This is a core technique of Cognitive Behavioral Therapy (CBT), built on the principle of neuroplasticity. Your brain can and does change based on your thoughts and actions. Every time you successfully interrupt a negative thought and substitute a positive one, you weaken the old neural pathway and strengthen a new one. It's not magic; you are physically re-wiring your brain for confidence and resilience, making positive self-talk your new automatic response." },
    { week: 3, title: "The Power of Unwavering Focus", icon: Target,
      concept: "Focus is a muscle. Most unforced errors come from a lapse in focus. This week, we train your ability to consciously direct your attention and hold it steady.",
      drill: "Object Lock-In",
      instructions: "For 5-7 minutes, focus all your mental energy on a small, detailed object (the laces on a football). Trace its lines with your eyes. When your mind inevitably wanders—which is part of the training—acknowledge the distraction without frustration, let it go, and firmly bring your attention back to the object. Try to extend this time throughout the week.",
      journalPrompts: [
        "What was the biggest distraction for you during the focus drill today (internal or external)?",
        "Think of a time you were completely 'in the zone.' What did that feel like? How can this drill help you get there?",
        "Describe a moment in your sport where narrow focus is critical (like a free throw). Now describe a moment where broad focus is critical (like reading the defense).",
        "How can you use this 'focus muscle' to better listen to your coach's instructions during a timeout?",
        "Besides your sport, where else in your life (school, home) could this improved focus be beneficial?",
        "Did you notice it becoming easier to hold your focus as the week went on? Describe the feeling.",
        "Reflect on the week. What have you learned about your own attention span and your ability to control it?"
      ],
      deeperDive: "This drill strengthens 'attentional control,' the ability to choose what you pay attention to. Top performers can filter out irrelevant stimuli (the crowd, the score, their own anxieties) and lock onto the most important cue in the moment. This exercise trains your brain's filtering mechanism, the thalamus, making it easier to achieve a state of 'flow' and perform with heightened awareness during competition." },
    { week: 4, title: "Building Your Mental Blueprint", icon: BrainCircuit,
      concept: "Your brain doesn't know the difference between a vividly imagined successful action and a real one. When you visualize a perfect performance, you create a neural 'blueprint' for success.",
      drill: "The Perfect Play (3rd Person)",
      instructions: "From a third-person view (like on TV), see yourself execute one critical skill flawlessly. Notice your technique, your form, and your composure. Rewind and play this mental video on a loop for 5 minutes. Focus on the mechanics and the perfect outcome.",
      journalPrompts: [
        "Describe your 'Perfect Play' in detail. What did perfect execution look like from the outside?",
        "What is one small detail of your technique you noticed and corrected while visualizing today?",
        "Visualize an opponent making a great play against you. Now, visualize your perfect, calm, and focused response.",
        "How does visualizing success before practice change how you feel when you step onto the field/court?",
        "Visualize your team successfully executing a complex play. What is your specific role in it?",
        "Has this drill made the actual physical skill feel more automatic or natural?",
        "Reflect on the week. What's the biggest benefit you've found from seeing yourself succeed before you even start?"
      ],
      deeperDive: "Watching yourself from a third-person perspective allows you to analyze and perfect form and strategy without the emotional pressure of being 'in it.' It's like being your own coach, breaking down the mechanics of success in a safe mental space. This detached viewpoint is crucial for mastering the *technique* and *strategy* of a skill, correcting errors in your mind before they happen on the field." },
    { week: 5, title: "HD Visualization: Making It Real", icon: Star,
      concept: "A blurry mental image has little power. A rich, multi-sensory visualization is what truly convinces your subconscious mind that the event is real. This is the difference between watching a movie and starring in it.",
      drill: "First-Person Immersion",
      instructions: "Experience your 'Perfect Play' through your own eyes. Actively engage your senses: what do you FEEL (the grip on the bat), HEAR (the swish of the net), and SMELL (the grass)? Crucially, attach the powerful EMOTION of success to the visualization.",
      journalPrompts: [
        "Which sense was easiest for you to add today? Which was the most difficult?",
        "Describe the specific emotion you attached to your successful visualization. Was it pride, relief, excitement?",
        "Visualize a moment of adversity (e.g., being tired, the score is close). Now, use first-person visualization to see, hear, and feel yourself pushing through it successfully.",
        "How did adding sensory details make the visualization feel more real compared to last week's drill?",
        "Focus on just one sense for your next visualization (e.g., only the sounds of the game). What do you notice?",
        "Has this drill improved your confidence in your ability to perform the skill under pressure?",
        "Reflect on the week. Which part of this drill (senses or emotion) had the biggest impact on you?"
      ],
      deeperDive: "When you visualize from a first-person view and add sensory detail, your brain sends faint electrical signals to the relevant muscles, priming them for action. This is called the 'Carpenter Effect' or 'ideomotor response'. Adding emotion to this process anchors the visualization in your limbic system, your brain's emotional center, making the mental rehearsal far more memorable and powerful under pressure." },
    { week: 6, title: "Defining Your Victory", icon: Target,
      concept: "A vague wish gives your brain no direction. A clear, present-tense goal gives it a powerful command. You are programming your brain's internal 'GPS' to find the destination.",
      drill: "The Present Tense Goal",
      instructions: "Write one specific, major goal on a card, phrased as if it's already true ('I am the starting point guard...'). Read it with feeling every morning and night. As you read, take a moment to imagine how it *feels* to have already achieved it.",
      journalPrompts: [
        "Write down your Present Tense Goal. Does it feel ambitious? Is it specific enough?",
        "Did you feel any resistance or doubt when you first started saying it? Describe that feeling.",
        "What is one small action you can take *today* that is in alignment with your Present Tense Goal?",
        "How does repeating this goal change the way you approach your daily practice?",
        "Break down your main goal into a smaller, one-week goal. Write it in the present tense.",
        "As you repeat your goal, is the feeling of it being real getting stronger? Describe the change.",
        "Reflect on the week. Has focusing on a definite outcome made your efforts feel more purposeful?"
      ],
      deeperDive: "This technique engages the Reticular Activating System (RAS) in your brain. The RAS acts as a filter for all the information your senses take in. By repeatedly focusing on a clear, specific goal, you are programming your RAS to constantly scan your environment for opportunities, people, and information relevant to achieving that goal. You literally start to notice things you were blind to before, creating a path to your objective." },
    { week: 7, title: "Building Unshakable Belief", icon: Star,
      concept: "Belief isn't just a thought; it's a feeling of certainty. The fastest way to build belief in a future goal is to borrow the feeling from a past success. Your mind already knows what success feels like.",
      drill: "The Highlight Reel",
      instructions: "Mentally replay 2-3 of your proudest moments. Don't just see them; re-live them. Focus on the feeling of confidence and achievement it gave you. Now, take that powerful feeling and overlay it onto the visualization of your 'Present Tense Goal.'",
      journalPrompts: [
        "Describe the past successes on your 'Highlight Reel.' What is the common feeling that links them all together?",
        "When you attached the feeling of past success to your new goal, did it make the new goal feel more believable? Why?",
        "What is one piece of 'evidence' from your life that proves you are capable of achieving your goal?",
        "Think of a role model or athlete you admire. Visualize yourself having their level of confidence.",
        "How can you 'act as if' you've already achieved your goal in your next practice?",
        "Has this drill helped quiet the voice of doubt? How?",
        "Reflect on the week. Do you feel a stronger sense of certainty about your goal now than you did seven days ago?"
      ],
      deeperDive: "This uses a principle called 'state-dependent memory.' Your emotional state can trigger related memories, skills, and levels of confidence. By recalling the *feeling* of past success, you put your brain and body back into that high-performance state. When you attach that powerful emotional state to your new goal, you create a strong belief that the new goal is just as achievable because your mind has already 'felt' the success." },
    { week: 8, title: "Game Day Integration", icon: Dribbble,
      concept: "This isn't a superstition; it's a strategic mental warm-up. It automates the process of shifting you from your everyday mindset into your 'performance state' on command.",
      drill: "The Performance Prime Routine",
      instructions: "Create and practice your 3-5 minute routine: 1. Stillness (3 deep breaths). 2. Visualization (1 minute of your 'First-Person Immersion'). 3. Affirmation (recite your 'Present Tense Goal' with the feeling of certainty). Make this non-negotiable before every practice and game.",
      journalPrompts: [
        "Write down your 3-step Performance Prime Routine. Is it simple and easy to remember?",
        "Perform your routine before your next practice. Describe how you felt mentally (focus, confidence, nerves) as you started.",
        "When is the best time to do this routine? In the locker room? On the sideline? Find your spot.",
        "How can you use a mini-version of this routine (e.g., just one deep breath and your affirmation) to reset after a mistake in a game?",
        "Did you feel more in control of your mental state after doing the routine?",
        "Adjust one part of your routine. For example, try a different affirmation or visualization. What felt better?",
        "Reflect on the week. How will you ensure you make this routine a permanent part of your athletic life?"
      ],
      deeperDive: "Routines reduce cognitive load and create an anchor for performance. When you have a set pre-game routine, you don't waste mental energy thinking about how to get ready. It becomes an automatic trigger that tells your brain and body, 'It's time to compete.' This makes focus and confidence reliable and accessible when you need them most, rather than leaving your mental state to chance on game day." },
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

const Header = ({ currentWeek, onLogout, onOpenCalendar }) => {
    const totalWeeks = courseContent.length - 2; // Exclude intro and conclusion for progress
    const progress = currentWeek > 1 ? ((currentWeek - 1) / totalWeeks) * 100 : 0;
    
    return (
        <header className="w-full max-w-4xl mx-auto p-4 sticky top-0 z-10 bg-slate-900/80 backdrop-blur-lg">
            <div className="text-center mb-2 relative">
                <h1 className="text-3xl md:text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-teal-300 to-sky-400">Athlete's Master Key</h1>
                <div className="absolute top-1/2 right-0 -translate-y-1/2 flex items-center space-x-2">
                    <button onClick={onOpenCalendar} className="p-2 text-slate-400 hover:text-white"><CalendarPlus size={20} /></button>
                    <button onClick={onLogout} className="p-2 text-slate-400 hover:text-white"><LogOut size={20} /></button>
                </div>
            </div>
            <div className="w-full bg-slate-700 rounded-full h-2.5"><div className="bg-gradient-to-r from-teal-400 to-sky-500 h-2.5 rounded-full transition-all duration-500" style={{ width: `${progress}%` }}></div></div>
            <p className="text-center text-sky-300 mt-2 text-sm font-semibold">{currentWeek <= 8 ? `Week ${currentWeek} of 8` : 'Course Complete!'}</p>
        </header>
    )
};

const WeekCard = ({ weekData, currentWeek, onLearnMore, onOpenJournal, onSetWeek, onAdvanceWeek, uniqueJournalDays }) => {
    const { week, title, concept, icon: Icon, isConclusion, isIntro } = weekData;
    const isCompleted = week < currentWeek;
    const isCurrent = week === currentWeek;
    const isLocked = week > currentWeek;
    const [isExpanded, setIsExpanded] = useState(isCurrent || isIntro);

    const canAdvance = uniqueJournalDays >= 5;

    useEffect(() => { setIsExpanded(isCurrent); }, [isCurrent]);

    const handleHeaderClick = () => {
        if (isLocked) return;
        
        if (isIntro) {
            setIsExpanded(!isExpanded);
        } else {
            if (!isCurrent) {
                onSetWeek(week);
            }
            setIsExpanded(!isExpanded);
        }
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
                        <div className="bg-slate-900/50 rounded-lg p-4 border border-slate-700 text-slate-300"><p>{weekData.deeperDive}</p></div>
                    ) : !isConclusion ? (
                        <>
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4"><button onClick={() => onLearnMore(weekData)} className="bg-sky-600 hover:bg-sky-500 p-4 rounded-lg text-left transition-transform transform hover:scale-105"><div className="flex items-center mb-1"><BookOpen className="mr-2" size={20}/><h3 className="text-lg font-bold">Read Lesson</h3></div><p className="text-sky-200 text-sm">Understand the 'why' behind the drill.</p></button><button onClick={() => onOpenJournal(weekData)} className="bg-teal-600 hover:bg-teal-500 p-4 rounded-lg text-left transition-transform transform hover:scale-105"><div className="flex items-center mb-1"><NotebookText className="mr-2" size={20}/><h3 className="text-lg font-bold">Open Journal</h3></div><p className="text-teal-200 text-sm">{uniqueJournalDays} / 5 unique days recorded.</p></button></div>
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
                    <Dribbble className="mx-auto text-teal-400 mb-2" size={48} />
                    <h1 className="text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-teal-300 to-sky-400">Athlete's Master Key</h1>
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
  
    const handleLearnMore = (weekData) => { setModalData(weekData); setModalType('lesson'); };
    const handleOpenJournal = (weekData) => { 
        setModalData(weekData); 
        setModalType('journal'); 
        setJournalView('list'); 
    };

    const handleSaveJournal = async () => {
      if (!modalData) return;
      
      const updatedJournalEntries = JSON.parse(JSON.stringify(journalEntries));
      const weekEntries = updatedJournalEntries[modalData.week] || [];

      if (editingEntry) { 
        const entryIndex = weekEntries.findIndex(e => e.id === editingEntry.id);
        if (entryIndex > -1) {
            weekEntries[entryIndex].text = journalInput;
        }
      } else {
        const newEntry = { id: crypto.randomUUID(), date: new Date().toISOString(), text: journalInput };
        weekEntries.push(newEntry);
      }
      updatedJournalEntries[modalData.week] = weekEntries;

      setJournalEntries(updatedJournalEntries);
      await saveUserData({ journalEntries: updatedJournalEntries });

      setJournalView('list'); setEditingEntry(null); setJournalInput('');
    };

    const handleDeleteJournal = async (entryId) => {
      if (!modalData) return;
      const updatedJournalEntries = JSON.parse(JSON.stringify(journalEntries));
      const weekEntries = updatedJournalEntries[modalData.week] || [];
      updatedJournalEntries[modalData.week] = weekEntries.filter(e => e.id !== entryId);
      
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

    const getDailyJournalPrompt = (weekData) => {
        if (!weekData || !weekData.journalPrompts) return "";
        const uniqueDays = countUniqueJournalDays(journalEntries[weekData.week]);
        const promptIndex = Math.min(uniqueDays, weekData.journalPrompts.length - 1);
        return weekData.journalPrompts[promptIndex];
    };

    const renderModalContent = () => {
        if (!modalType) return null;
        
        if (modalType === 'calendar') {
            return <CalendarSyncModal onClose={closeModal} />;
        }
        if (modalType === 'lesson') return <Modal onClose={closeModal} size="xl"><div className="max-h-[80vh] overflow-y-auto pr-2 custom-scrollbar"><h2 className="text-3xl font-bold text-sky-400 mb-2">{!modalData.isIntro && `Week ${modalData.week}: `}{modalData.title}</h2><p className="italic text-slate-300 mb-4">"{modalData.concept}"</p><div className="border-t border-slate-700 my-4"></div><h3 className="text-xl font-bold text-teal-300 mb-2">The Drill: {modalData.drill}</h3><p className="text-slate-300 mb-4">{modalData.instructions}</p><h3 className="text-xl font-bold text-teal-300 mb-2">Deeper Dive: The 'Why' Behind It</h3><p className="text-slate-300">{modalData.deeperDive}</p></div><button onClick={closeModal} className="w-full bg-slate-700 hover:bg-slate-600 text-white font-bold py-3 rounded-lg mt-6">Close</button></Modal>;
        if (modalType === 'journal') {
            const weekEntries = journalEntries[modalData.week] || [];
            const dailyPrompt = getDailyJournalPrompt(modalData);

            return (
            <Modal onClose={closeModal} size="xl">
                <h2 className="text-3xl font-bold text-teal-400 mb-2">Journal: Week {modalData.week}</h2>
                {journalView === 'list' ? (
                <div>
                    <p className="text-slate-300 font-semibold mb-4">Today's Prompt: <span className="font-normal italic">"{dailyPrompt}"</span></p>
                    <button onClick={() => { setEditingEntry(null); setJournalInput(''); setJournalView('editor'); }} className="w-full bg-teal-600 hover:bg-teal-500 text-white font-bold py-3 px-4 rounded-lg flex items-center justify-center mb-4"><Plus className="mr-2" />Add New Entry</button>
                    <div className="max-h-64 overflow-y-auto space-y-3 pr-2 custom-scrollbar">
                    {weekEntries.length === 0 ? <p className="text-center text-slate-400">No entries yet.</p> : weekEntries.sort((a,b) => new Date(b.date) - new Date(a.date)).map(entry => (
                        <div key={entry.id} className="bg-slate-900/50 p-3 rounded-lg flex justify-between items-center">
                        <div><p className="font-semibold">{entry.text.substring(0, 50)}...</p><p className="text-xs text-slate-400">{new Date(entry.date).toLocaleDateString()}</p></div>
                        <div className="flex space-x-2">
                           <button onClick={() => { setEditingEntry(entry); setJournalInput(entry.text); setJournalView('editor'); }} className="p-2 bg-blue-600 hover:bg-blue-500 text-white rounded-full"><Edit2 size={16}/></button>
                           <button onClick={() => handleDeleteJournal(entry.id)} className="p-2 hover:bg-slate-700 rounded-full text-red-400"><Trash2 size={16}/></button>
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
            <Header currentWeek={currentWeek} onLogout={handleLogout} onOpenCalendar={() => setModalType('calendar')} />
            <main className="w-full max-w-4xl mx-auto p-4">
                {courseContent.map(weekData => ( <WeekCard key={weekData.week} weekData={weekData} currentWeek={currentWeek} onLearnMore={handleLearnMore} onOpenJournal={handleOpenJournal} onSetWeek={setCurrentWeek} onAdvanceWeek={handleAdvanceWeek} uniqueJournalDays={countUniqueJournalDays(journalEntries[weekData.week])} /> ))}
            </main>
            <footer className="text-center p-4">
                <p className="text-slate-500 text-xs">Your progress is saved automatically.</p>
            </footer>
            {renderModalContent()}
            <style>{`.custom-scrollbar::-webkit-scrollbar { width: 8px; } .custom-scrollbar::-webkit-scrollbar-track { background: #1e293b; } .custom-scrollbar::-webkit-scrollbar-thumb { background-color: #06b6d4; border-radius: 20px; border: 2px solid #1e293b; } @keyframes fade-in-up { 0% { opacity: 0; transform: translateY(20px); } 100% { opacity: 1; transform: translateY(0); } } @keyframes fade-in { 0% { opacity: 0; } 100% { opacity: 1; } } .animate-fade-in-up { animation: fade-in-up 0.4s ease-out forwards; } .animate-fade-in { animation: fade-in 0.5s ease-out forwards; }`}</style>
        </div>
    );
}

const CalendarSyncModal = ({ onClose }) => {
    const [reminders, setReminders] = useState([
        { enabled: true, time: '08:00' },
        { enabled: false, time: '18:00' }
    ]);

    const handleToggle = (index) => {
        const newReminders = [...reminders];
        newReminders[index].enabled = !newReminders[index].enabled;
        setReminders(newReminders);
    };

    const handleTimeChange = (index, time) => {
        const newReminders = [...reminders];
        newReminders[index].time = time;
        setReminders(newReminders);
    };
    
    const generateICS = (reminder) => {
        if (!reminder.enabled) return;
        const [hour, minute] = reminder.time.split(':');
        
        const pad = (num) => num.toString().padStart(2, '0');
        
        let now = new Date();
        now.setUTCHours(parseInt(hour), parseInt(minute), 0, 0);

        const dtstart = `${now.getUTCFullYear()}${pad(now.getUTCMonth() + 1)}${pad(now.getUTCDate())}T${pad(now.getUTCHours())}${pad(now.getUTCMinutes())}00Z`;

        const icsContent = `BEGIN:VCALENDAR
VERSION:2.0
PRODID:-//Athlete's Master Key//EN
BEGIN:VEVENT
UID:${crypto.randomUUID()}@athletesmasterkey.app
DTSTAMP:${dtstart}
DTSTART;TZID=Etc/UTC:${dtstart}
RRULE:FREQ=DAILY
SUMMARY:Athlete's Master Key: Mental Drill
DESCRIPTION:Time for your daily mental training drill from the Athlete's Master Key app!
END:VEVENT
END:VCALENDAR`;
        
        const blob = new Blob([icsContent], { type: 'text/calendar;charset=utf-8' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `amk_reminder_${reminder.time.replace(':', '')}.ics`;
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
    };

    const generateGoogleLink = (reminder) => {
        if (!reminder.enabled) return;
        const [hour, minute] = reminder.time.split(':');
        const now = new Date();
        
        const pad = (num) => num.toString().padStart(2, '0');

        let Tstart = `${pad(hour)}${pad(minute)}00`;
        let Tend = `${pad(parseInt(hour))}${pad(parseInt(minute) + 5)}00`; // 5 min duration

        const today = `${now.getFullYear()}${pad(now.getMonth() + 1)}${pad(now.getDate())}`;

        const dtstart = `${today}T${Tstart}`;
        const dtend = `${today}T${Tend}`;
        
        const title = encodeURIComponent("Athlete's Master Key: Mental Drill");
        const details = encodeURIComponent("Time for your daily mental training drill from the Athlete's Master Key app!");
        const rrule = "RRULE:FREQ=DAILY";
        
        const url = `https://www.google.com/calendar/render?action=TEMPLATE&text=${title}&details=${details}&dates=${dtstart}/${dtend}&recur=${rrule}&ctz=America/New_York`;
        window.open(url, '_blank');
    };

    return (
        <Modal onClose={onClose} size="lg">
            <h2 className="text-3xl font-bold text-sky-400 mb-2">Set Calendar Reminders</h2>
            <p className="text-slate-300 mb-6">Add recurring daily events to your personal calendar to stay on track with your mental training.</p>
            {reminders.map((reminder, index) => (
                 <div key={index} className="space-y-4 bg-slate-900/50 p-4 rounded-lg mb-4">
                    <div className="flex items-center justify-between">
                        <label htmlFor={`reminder-toggle-${index}`} className="font-semibold text-lg">{`Reminder ${index + 1}`}</label>
                        <div className="relative inline-flex items-center cursor-pointer">
                            <input type="checkbox" id={`reminder-toggle-${index}`} className="sr-only peer" checked={reminder.enabled} onChange={() => handleToggle(index)} />
                            <div className="w-11 h-6 bg-slate-700 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-slate-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-teal-600"></div>
                        </div>
                    </div>
                     <div className={`transition-opacity ${reminder.enabled ? 'opacity-100' : 'opacity-50'}`}>
                        <div className="flex items-center justify-between mb-3">
                           <label htmlFor={`reminder-time-${index}`} className="font-semibold">Time</label>
                           <input type="time" id={`reminder-time-${index}`} disabled={!reminder.enabled} value={reminder.time} onChange={e => handleTimeChange(index, e.target.value)} className="bg-slate-700 border border-slate-600 rounded-md p-1"/>
                        </div>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                           <button onClick={() => generateGoogleLink(reminder)} disabled={!reminder.enabled} className="bg-blue-600 hover:bg-blue-500 disabled:bg-slate-600 text-white font-semibold py-2 px-4 rounded-lg flex items-center justify-center">
                               Add to Google Calendar
                           </button>
                           <button onClick={() => generateICS(reminder)} disabled={!reminder.enabled} className="bg-gray-200 hover:bg-gray-300 disabled:bg-slate-600 text-black font-semibold py-2 px-4 rounded-lg flex items-center justify-center">
                               Add to Apple/Outlook (.ics)
                           </button>
                        </div>
                    </div>
                </div>
            ))}
             <button onClick={onClose} className="w-full bg-slate-700 hover:bg-slate-600 text-white font-bold py-3 rounded-lg mt-6">Done</button>
        </Modal>
    );
};


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



