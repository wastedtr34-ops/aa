import React, { useState, useEffect } from 'react';
import { CheckCircle, XCircle, Trophy, RotateCcw, Brain } from 'lucide-react';

const questions = [
  {
    q: "What is the time complexity for accessing an element by index in a LinkedList?",
    opts: ["O(1)", "O(log n)", "O(n)", "O(n²)"],
    ans: 2
  },
  {
    q: "Which data structure is recommended in Java for both stack and queue operations?",
    opts: ["LinkedList", "Stack", "ArrayDeque", "PriorityQueue"],
    ans: 2
  },
  {
    q: "What happens when an ArrayList's capacity is exceeded?",
    opts: ["Throws exception", "Doubles capacity", "Adds 10 slots", "Becomes LinkedList"],
    ans: 1
  },
  {
    q: "What is the average time complexity for HashMap get/put operations?",
    opts: ["O(n)", "O(1)", "O(log n)", "O(n log n)"],
    ans: 1
  },
  {
    q: "Which backing structure does PriorityQueue use?",
    opts: ["Array", "Heap", "Tree", "LinkedList"],
    ans: 1
  },
  {
    q: "What is the time complexity for TreeMap operations?",
    opts: ["O(1)", "O(n)", "O(log n)", "O(n²)"],
    ans: 2
  },
  {
    q: "If two objects are equal according to equals(), what MUST be true?",
    opts: ["Same memory address", "Same hashCode", "Same type", "Same toString"],
    ans: 1
  },
  {
    q: "Which graph representation is better for sparse graphs?",
    opts: ["Adjacency Matrix", "Adjacency List", "Edge List", "Incidence Matrix"],
    ans: 1
  },
  {
    q: "What is the memory complexity of an adjacency matrix for V vertices?",
    opts: ["O(V)", "O(E)", "O(V²)", "O(V + E)"],
    ans: 2
  },
  {
    q: "What is the time complexity for inserting at an arbitrary position in ArrayList?",
    opts: ["O(1)", "O(log n)", "O(n)", "O(1) amortized"],
    ans: 2
  },
  {
    q: "What type of tree backs a TreeMap?",
    opts: ["Binary Search Tree", "AVL Tree", "Red-Black Tree", "B-Tree"],
    ans: 2
  },
  {
    q: "Which operation is O(1) for LinkedList?",
    opts: ["get(index)", "contains()", "removeFirst()", "Random access"],
    ans: 2
  },
  {
    q: "What is the default behavior of PriorityQueue?",
    opts: ["Max-heap", "Min-heap", "FIFO", "LIFO"],
    ans: 1
  },
  {
    q: "Which provides predictable iteration order in hash-based collections?",
    opts: ["HashMap", "HashSet", "LinkedHashMap", "TreeMap"],
    ans: 2
  },
  {
    q: "What does a good hashCode() function primarily reduce?",
    opts: ["Memory usage", "Collisions", "Code complexity", "Iteration time"],
    ans: 1
  },
  {
    q: "What is the amortized time complexity for ArrayList append operations?",
    opts: ["O(1)", "O(n)", "O(log n)", "O(n log n)"],
    ans: 0
  },
  {
    q: "Which interface should you implement for natural ordering of custom objects?",
    opts: ["Comparator", "Comparable", "Serializable", "Iterable"],
    ans: 1
  },
  {
    q: "What happens during fail-fast iteration if the collection is modified?",
    opts: ["Continues normally", "Returns null", "Throws exception", "Skips elements"],
    ans: 2
  },
  {
    q: "For a dense graph, which representation provides O(1) edge lookup?",
    opts: ["Adjacency List", "Edge List", "Adjacency Matrix", "Both A and C"],
    ans: 2
  },
  {
    q: "Why do arrays avoid boxing for primitives?",
    opts: ["Use wrappers", "Direct memory", "Smaller size", "Faster hash"],
    ans: 1
  }
];

export default function JavaQuiz() {
  const [current, setCurrent] = useState(0);
  const [selected, setSelected] = useState(null);
  const [answers, setAnswers] = useState([]);
  const [showResult, setShowResult] = useState(false);
  const [score, setScore] = useState(0);

  const handleAnswer = (idx) => {
    if (selected !== null) return;
    
    setSelected(idx);
    const isCorrect = idx === questions[current].ans;
    setAnswers([...answers, { q: current, selected: idx, correct: isCorrect }]);
    
    if (isCorrect) {
      setScore(score + 1);
    }

    setTimeout(() => {
      if (current < questions.length - 1) {
        setCurrent(current + 1);
        setSelected(null);
      } else {
        setShowResult(true);
      }
    }, 1500);
  };

  const restart = () => {
    setCurrent(0);
    setSelected(null);
    setAnswers([]);
    setShowResult(false);
    setScore(0);
  };

  const getScoreColor = () => {
    const pct = (score / questions.length) * 100;
    if (pct >= 80) return 'text-emerald-400';
    if (pct >= 60) return 'text-blue-400';
    if (pct >= 40) return 'text-yellow-400';
    return 'text-red-400';
  };

  if (showResult) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 flex items-center justify-center p-4">
        <div className="max-w-2xl w-full bg-slate-800/50 backdrop-blur-xl rounded-3xl shadow-2xl border border-purple-500/20 p-8">
          <div className="text-center">
            <Trophy className="w-24 h-24 mx-auto mb-6 text-yellow-400 animate-bounce" />
            <h2 className="text-4xl font-bold text-white mb-4">Quiz Complete!</h2>
            <p className={`text-7xl font-bold mb-8 ${getScoreColor()}`}>
              {score}/{questions.length}
            </p>
            <div className="mb-8">
              <div className="bg-slate-700/50 rounded-full h-4 overflow-hidden">
                <div 
                  className="h-full bg-gradient-to-r from-purple-500 to-pink-500 transition-all duration-1000"
                  style={{ width: `${(score / questions.length) * 100}%` }}
                />
              </div>
            </div>
            <p className="text-slate-300 text-lg mb-8">
              {score >= 16 ? "Outstanding! You're a Java DS master! 🎯" :
               score >= 12 ? "Great job! Solid understanding! 💪" :
               score >= 8 ? "Good effort! Keep practicing! 📚" :
               "Don't give up! Review and try again! 🚀"}
            </p>
            <button
              onClick={restart}
              className="px-8 py-4 bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-xl font-semibold hover:from-purple-500 hover:to-pink-500 transition-all transform hover:scale-105 flex items-center gap-2 mx-auto"
            >
              <RotateCcw className="w-5 h-5" />
              Restart Quiz
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 flex items-center justify-center p-4">
      <div className="max-w-3xl w-full">
        <div className="mb-8 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Brain className="w-8 h-8 text-purple-400" />
            <h1 className="text-3xl font-bold text-white">Java Data Structures</h1>
          </div>
          <div className="text-right">
            <div className="text-sm text-slate-400">Question</div>
            <div className="text-2xl font-bold text-purple-400">{current + 1}/{questions.length}</div>
          </div>
        </div>

        <div className="bg-slate-800/50 backdrop-blur-xl rounded-3xl shadow-2xl border border-purple-500/20 p-8 mb-6">
          <div className="mb-8">
            <div className="flex gap-1 mb-6">
              {questions.map((_, idx) => (
                <div
                  key={idx}
                  className={`h-1.5 flex-1 rounded-full transition-all ${
                    idx < current ? 'bg-emerald-500' :
                    idx === current ? 'bg-purple-500' :
                    'bg-slate-700'
                  }`}
                />
              ))}
            </div>
            
            <h2 className="text-2xl font-semibold text-white mb-8 leading-relaxed">
              {questions[current].q}
            </h2>

            <div className="space-y-4">
              {questions[current].opts.map((opt, idx) => {
                const isSelected = selected === idx;
                const isCorrect = idx === questions[current].ans;
                const showCorrect = selected !== null && isCorrect;
                const showWrong = selected === idx && !isCorrect;

                return (
                  <button
                    key={idx}
                    onClick={() => handleAnswer(idx)}
                    disabled={selected !== null}
                    className={`w-full p-5 rounded-xl text-left font-medium transition-all transform hover:scale-[1.02] flex items-center justify-between ${
                      showCorrect ? 'bg-emerald-500/20 border-2 border-emerald-500 text-emerald-300' :
                      showWrong ? 'bg-red-500/20 border-2 border-red-500 text-red-300' :
                      isSelected ? 'bg-purple-500/20 border-2 border-purple-500 text-white' :
                      'bg-slate-700/50 border-2 border-slate-600 text-slate-200 hover:border-purple-500/50 hover:bg-slate-700'
                    } ${selected !== null ? 'cursor-not-allowed' : 'cursor-pointer'}`}
                  >
                    <span>{opt}</span>
                    {showCorrect && <CheckCircle className="w-6 h-6" />}
                    {showWrong && <XCircle className="w-6 h-6" />}
                  </button>
                );
              })}
            </div>
          </div>
        </div>

        <div className="text-center">
          <div className="inline-flex items-center gap-2 px-6 py-3 bg-slate-800/50 backdrop-blur-xl rounded-full border border-purple-500/20">
            <Trophy className="w-5 h-5 text-yellow-400" />
            <span className="text-white font-semibold">Score: {score}</span>
          </div>
        </div>
      </div>
    </div>
  );
}