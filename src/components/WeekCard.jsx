
import React, { useState, useEffect } from 'react';
import { NotebookText, Timer, Lock, ChevronDown, CheckCircle } from 'lucide-react';
const WeekCard = ({ weekData, currentWeek, onStartDrill, onOpenJournal, onSetWeek, onAdvanceWeek, journalCount }) => {
    const { week, title, concept, icon: Icon, instructions, journalPrompt } = weekData;
    const isCompleted = week < currentWeek;
    const isCurrent = week === currentWeek;
    const isLocked = week > currentWeek;
    const [isExpanded, setIsExpanded] = useState(isCurrent);

    const canAdvance = journalCount >= 5;

    useEffect(() => { setIsExpanded(isCurrent); }, [isCurrent]);

    const handleHeaderClick = () => { if (!isLocked) { if (!isCurrent) { onSetWeek(week); } setIsExpanded(!isExpanded); } };
    
    let cardClasses = 'border-l-4 transition-all duration-300 ';
    let headerClasses = 'cursor-pointer ';
    if (isCurrent) cardClasses += 'bg-slate-800/80 border-teal-400 shadow-lg shadow-teal-500/10';
    else if (isCompleted) cardClasses += 'bg-slate-800/30 border-sky-500';
    else { cardClasses += 'bg-slate-800/10 border-slate-700'; headerClasses = 'cursor-not-allowed'; }

    return (
        <div className={`rounded-xl overflow-hidden mb-4 ${cardClasses}`}>
            <div className={`p-4 flex justify-between items-center ${headerClasses}`} onClick={handleHeaderClick}>
                <div className="flex items-center"><div className={`flex items-center justify-center w-10 h-10 rounded-full mr-4 ${isCurrent ? 'bg-teal-400/20 text-teal-300' : 'bg-slate-700 text-slate-300'}`}>{isLocked ? <Lock size={20} /> : isCompleted ? <CheckCircle size={20} className="text-sky-400" /> : <Icon size={20} />}</div><h2 className={`text-xl font-bold ${isCurrent ? 'text-white' : 'text-slate-300'}`}>{`Week ${week}: ${title}`}</h2></div>
                {!isLocked && <ChevronDown className={`transition-transform duration-300 ${isExpanded ? 'rotate-180' : ''}`} />}
            </div>
            
            {isExpanded && !isLocked && (
                <div className="p-4 border-t border-slate-700 animate-fade-in">
                    <p className="italic text-slate-300 mb-6 text-center">"{concept}"</p>
                    <div className="bg-slate-900/50 rounded-lg p-4 mb-6 border border-slate-700"><h4 className="font-bold text-sky-300 text-lg mb-2">Drill Details</h4><p className="text-slate-300">{instructions}</p><h4 className="font-bold text-teal-300 text-lg mt-4 mb-2">Journal Prompt</h4><p className="text-slate-300 italic">"{journalPrompt}"</p></div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4"><button onClick={() => onStartDrill(weekData)} className="bg-sky-600 hover:bg-sky-500 p-4 rounded-lg text-left transition-transform transform hover:scale-105"><div className="flex items-center mb-1"><Timer className="mr-2" size={20}/><h3 className="text-lg font-bold">Start Drill</h3></div><p className="text-sky-200 text-sm">Open the timer for this week's exercise.</p></button><button onClick={() => onOpenJournal(weekData)} className="bg-teal-600 hover:bg-teal-500 p-4 rounded-lg text-left transition-transform transform hover:scale-105"><div className="flex items-center mb-1"><NotebookText className="mr-2" size={20}/><h3 className="text-lg font-bold">Open Journal</h3></div><p className="text-teal-200 text-sm">{journalCount} / 5 entries completed.</p></button></div>
                    {isCurrent && week < 8 && (<div className="mt-6 text-center"><button onClick={onAdvanceWeek} disabled={!canAdvance} className="bg-teal-500 hover:bg-teal-400 disabled:bg-slate-600 disabled:cursor-not-allowed text-white font-bold py-3 px-6 rounded-lg transition-all transform disabled:scale-100 hover:scale-105"><span>{canAdvance ? "Complete Week & Unlock Next" : `Complete ${5-journalCount} more entries to unlock`}</span></button></div>)}
                </div>
            )}
        </div>
    );
};
export default WeekCard;