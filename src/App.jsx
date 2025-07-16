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
import { Dribbble, Target, BrainCircuit, NotebookText, Star, Mic, MicOff, Lock, ChevronDown, CheckCircle, Plus, Edit2, Trash2, LogOut, BookOpen, Award, ShoppingCart } from 'lucide-react';

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
    { week: 0, title: "Welcome to Your Mental Gym", icon: BrainCircuit, isIntro: true, concept: "Physical talent gets you to the game. Mental strength lets you win it.", deeperDive: "You spend countless hours training your body: lifting, running, and practicing drills until they're perfect. But every top athlete knows that when the pressure is on, the real competition happens in the six inches between your ears. This 24-week course is your mental gym. Here, you will train the skills that separate the good from the great: focus under pressure, unshakeable confidence, and the ability to visualize success before it happens. Let's begin." },
    // BLOCK 1
    { week: 1, title: "The Mind as the Starting Block", icon: Dribbble, concept: "Every action is preceded by a thought. This week, we learn to become the calm observer of our thoughts.", weeklyIntro: "Welcome to Week 1. Before we can learn to direct our thoughts, we must first learn to simply observe them without judgment. This week's drills are designed to build the foundational skill of awareness.", dailyLessons: Array(7).fill({}), journalPrompts: Array(7).fill("...") },
    { week: 2, title: "Control the Mental Locker Room", icon: BrainCircuit, concept: "Your brain forms habits through neural pathways. This week, we strategically re-wire your automatic mental responses.", weeklyIntro: "Last week, you learned to observe your thoughts. This week, you become the gatekeeper of your mind. You will learn to control the narrative in your head, which directly influences your confidence.", dailyLessons: Array(7).fill({}), journalPrompts: Array(7).fill("...") },
    { week: 3, title: "The Power of Unwavering Focus", icon: Target, concept: "Focus is a muscle. This week, we train your ability to consciously direct your attention and hold it steady.", weeklyIntro: "Now that you can observe and manage your thoughts, it's time to build your focus. This week, you'll learn to direct your attention like a laser beam.", dailyLessons: Array(7).fill({}), journalPrompts: Array(7).fill("...") },
    { week: 4, title: "Building Your Mental Blueprint", icon: BrainCircuit, concept: "Your brain doesn't know the difference between a vividly imagined action and a real one. This week, you become the architect of your success.", weeklyIntro: "This week, we move from simple focus to active creation by building a detailed mental blueprint of a perfect performance.", dailyLessons: Array(7).fill({}), journalPrompts: Array(7).fill("...") },
    { week: 5, title: "HD Visualization: Making It Real", icon: Star, concept: "A blurry mental image has little power. A rich, multi-sensory visualization is what truly convinces your subconscious mind.", weeklyIntro: "Last week, you were the director. This week, you become the star. We will upgrade your mental blueprint to High Definition by engaging all your senses and emotions.", dailyLessons: Array(7).fill({}), journalPrompts: Array(7).fill("...") },
    { week: 6, title: "Defining Your Victory", icon: Target, concept: "A vague wish gives your brain no direction. A clear, present-tense goal gives it a powerful command.", weeklyIntro: "This week, you will learn to program your brain's internal 'GPS' with a powerful statement of purpose.", dailyLessons: Array(7).fill({}), journalPrompts: Array(7).fill("...") },
    { week: 7, title: "Building Unshakable Belief", icon: Star, concept: "Belief isn't just a thought; it's a feeling of certainty. The fastest way to build belief is to borrow the feeling from a past success.", weeklyIntro: "This week, we will connect the dots. You will learn to harness the powerful, positive emotions from your past victories and anchor them to your new goals.", dailyLessons: Array(7).fill({}), journalPrompts: Array(7).fill("...") },
    { week: 8, title: "Game Day Integration", icon: Dribbble, concept: "This isn't a superstition; it's a strategic mental warm-up to shift you into your 'performance state' on command.", weeklyIntro: "All the training from the past seven weeks culminates in this final step: creating a simple, powerful, and repeatable pre-performance routine.", dailyLessons: Array(7).fill({}), journalPrompts: Array(7).fill("...") },
    // BLOCK 2
    { week: 9, block: 2, title: "Performing Under Pressure", icon: Award, concept: "Pressure is a privilege. This week, you learn to dictate your mental state to the situation.", weeklyIntro: "You've built the foundational tools. Now, it's time to test them under fire. By practicing in simulated high-stakes scenarios, you train your nervous system to remain calm and focused when the real pressure hits.", dailyLessons: Array(7).fill({}), journalPrompts: Array(7).fill("...") },
    { week: 10, block: 2, title: "The Resilient Athlete", icon: Award, concept: "Resilience isn't about never failing; it's about bouncing back faster.", weeklyIntro: "Every athlete faces setbacks. This week, we will train your 'bounce-back' ability, turning failures into valuable learning opportunities.", dailyLessons: Array(7).fill({}), journalPrompts: Array(7).fill("...") },
    { week: 11, block: 2, title: "Advanced Visualization: Opponent Modeling", icon: Award, concept: "Mentally scout your opponents to create a strategic advantage.", weeklyIntro: "Basic visualization perfects your actions. Advanced visualization anticipates and overcomes the actions of others. This week, you'll learn to feel one step ahead of the competition.", dailyLessons: Array(7).fill({}), journalPrompts: Array(7).fill("...") },
    { week: 12, block: 2, title: "The Leader's Mindset", icon: Award, concept: "Leadership is a skill, not just a title. This week is about cultivating the mental habits of a leader.", weeklyIntro: "Every athlete can lead through presence and work ethic. This week, you will practice the mental drills that build a leadership presence that stabilizes and inspires your team.", dailyLessons: Array(7).fill({}), journalPrompts: Array(7).fill("...") },
    { week: 13, block: 2, title: "The Confidence Bank", icon: Award, concept: "Confidence comes from evidence. This week is about actively collecting and reviewing proof of your competence.", weeklyIntro: "Unshakable confidence comes from consistently remembering the many times you've succeeded. This week, you will become the accountant for your own 'Confidence Bank.'", dailyLessons: Array(7).fill({}), journalPrompts: Array(7).fill("...") },
    { week: 14, block: 2, title: "Automating Your Skills", icon: Award, concept: "Make your mental skills as automatic as your physical ones.", weeklyIntro: "The goal of a true master is to make skills so ingrained that they become automatic. This week is about reducing the conscious effort required to use your mental tools.", dailyLessons: Array(7).fill({}), journalPrompts: Array(7).fill("...") },
    { week: 15, block: 2, title: "The Off-Season Mind", icon: Award, concept: "Mental training doesn't stop when the season ends.", weeklyIntro: "The off-season is where champions are made. This week is about applying your mental skills to your off-season training to start the next season mentally tougher.", dailyLessons: Array(7).fill({}), journalPrompts: Array(7).fill("...") },
    { week: 16, block: 2, title: "The 'Why' Revisited", icon: Award, concept: "Reconnect with your deepest motivation for playing your sport.", weeklyIntro: "Your 'Why' is the ultimate fuel source. This week, we will reconnect with that core passion to create motivation that is far more powerful than any external reward.", dailyLessons: Array(7).fill({}), journalPrompts: Array(7).fill("...") },
    // BLOCK 3
    { week: 17, block: 3, title: "Advanced Anchoring", icon: Star, concept: "Create different anchors for different mental states.", weeklyIntro: "You've learned to create a single anchor for confidence. Now, we'll expand your toolkit to give you precise control over your psychology in any situation.", dailyLessons: Array(7).fill({}), journalPrompts: Array(7).fill("...") },
    { week: 18, block: 3, title: "Team Visualization", icon: Star, concept: "Extend your mental game to your entire team.", weeklyIntro: "When a team shares a common vision, they become more than the sum of their parts. This week, you will practice visualizing not just your own success, but the success of your team.", dailyLessons: Array(7).fill({}), journalPrompts: Array(7).fill("...") },
    { week: 19, block: 3, title: "Handling External Pressure", icon: Star, concept: "Build a mental shield against pressure from parents, coaches, and scouts.", weeklyIntro: "This week, you will learn to differentiate between what you can control and what you can't, making you immune to the distractions and anxieties from the outside world.", dailyLessons: Array(7).fill({}), journalPrompts: Array(7).fill("...") },
    { week: 20, block: 3, title: "The 'Inner Coach' Dialogue", icon: Star, concept: "Turn your mind into your most trusted advisor.", weeklyIntro: "Instead of just replacing a single thought, you will learn to have a full, constructive internal dialogue with your 'Inner Coach,' the wise and strategic part of your mind.", dailyLessons: Array(7).fill({}), journalPrompts: Array(7).fill("...") },
    { week: 21, block: 3, title: "Long-Term Goal Setting", icon: Star, concept: "Apply your goal-setting skills to your long-term athletic and life ambitions.", weeklyIntro: "A compelling long-term vision provides a powerful context for your daily efforts, creating a source of nearly limitless motivation.", dailyLessons: Array(7).fill({}), journalPrompts: Array(7).fill("...") },
    { week: 22, block: 3, title: "The Mind-Body Connection", icon: Star, concept: "Use your mind to build a stronger, more resilient body.", weeklyIntro: "Your mental state directly affects your physical recovery and susceptibility to injury. This week, we focus on using your mental skills to enhance your physical well-being.", dailyLessons: Array(7).fill({}), journalPrompts: Array(7).fill("...") },
    { week: 23, block: 3, title: "The Gratitude Edge", icon: Star, concept: "Use gratitude to reduce performance anxiety and increase enjoyment.", weeklyIntro: "Gratitude is the powerful antidote to the burnout that comes from constantly striving. A happy, grateful athlete is often a more relaxed and successful one.", dailyLessons: Array(7).fill({}), journalPrompts: Array(7).fill("...") },
    { week: 24, block: 3, title: "The Complete Athlete", icon: Star, concept: "Integrate all your mental skills into your identity.", weeklyIntro: "This final week is about integration and creating a personal plan to ensure these skills become a permanent part of who you are.", dailyLessons: Array(7).fill({}), journalPrompts: Array(7).fill("...") },
    { week: 25, title: "The Journey Continues", icon: Award, isConclusion: true, concept: "You have successfully completed the 24-week program. This is not the end; it's the beginning.", deeperDive: "Mental strength, like physical strength, requires consistent training. The tools you've learned are now part of your permanent toolkit. Continue to use them, and your mind will become your greatest athletic asset." }
];

// --- Component Definitions ---
const LoadingSpinner = () => <div className="flex justify-center items-center h-full w-full"><div className="animate-spin rounded-full h-16 w-16 border-b-4 border-teal-400"></div></div>;
const Modal = ({ children, onClose, size = 'lg' }) => ( <div className="fixed inset-0 bg-slate-900 bg-opacity-70 z-50 flex justify-center items-center p-4 backdrop-blur-sm" onClick={onClose}><div className={`bg-slate-800 rounded-2xl shadow-2xl w-full max-w-${size} p-6 relative text-white border border-slate-700 animate-fade-in-up`} onClick={e => e.stopPropagation()}>{children}</div></div>);
const Header = ({ currentWeek, onLogout, onOpenMasterJournal }) => {
    const totalWeeks = courseContent.filter(c => !c.isIntro && !c.isConclusion).length;
    const progress = currentWeek > 1 ? ((currentWeek - 1) / totalWeeks) * 100 : 0;
    
    return (
        <header className="w-full max-w-4xl mx-auto p-4 sticky top-0 z-10 bg-slate-900/80 backdrop-blur-lg">
            <div className="flex justify-between items-center mb-2">
                <div className="w-1/3"></div>
                <div className="w-1/3 text-center">
                    <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-teal-300 to-sky-400 truncate min-w-0">My Mental Gym</h1>
                </div>
                <div className="w-1/3 flex justify-end items-center space-x-2">
                    <button onClick={onOpenMasterJournal} className="p-2 text-slate-400 hover:text-white" title="View All Journal Entries"><NotebookText size={20} /></button>
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
                                {dailyLessons && dailyLessons.map((lesson) => (
                                    <button key={lesson.day} onClick={() => onLearnMore(lesson, weekData)} className="w-full text-left p-3 bg-slate-900/50 hover:bg-slate-700/50 rounded-lg flex items-center justify-between transition-colors">
                                        <span>Day {lesson.day}: {lesson.title}</span>
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
