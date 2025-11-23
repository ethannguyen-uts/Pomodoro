import { useState, FormEvent, useRef, useEffect } from 'react';

interface Task {
    id: number;
    text: string;
    completed: boolean;
}

export default function TodoList(): JSX.Element {
    const [tasks, setTasks] = useState<Task[]>([]);
    const [inputValue, setInputValue] = useState<string>('');
    const listRef = useRef<HTMLDivElement>(null);

    // Auto-scroll to bottom when tasks change
    useEffect(() => {
        if (listRef.current) {
            listRef.current.scrollTop = listRef.current.scrollHeight;
        }
    }, [tasks]);

    const addTask = (e: FormEvent) => {
        e.preventDefault();
        if (!inputValue.trim()) return;
        const newTask: Task = {
            id: Date.now(),
            text: inputValue,
            completed: false,
        };
        setTasks([...tasks, newTask]);
        setInputValue('');
    };

    const toggleTask = (id: number) => {
        setTasks(tasks.map(task =>
            task.id === id ? { ...task, completed: !task.completed } : task
        ));
    };

    const removeTask = (id: number) => {
        setTasks(tasks.filter(task => task.id !== id));
    };

    return (
        <div className="flex flex-col h-full">
            <div className="flex items-center gap-3 mb-6">
                <div className="p-1 rounded bg-notion-hover/50">
                    <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="text-notion-red">
                        <path d="M12 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path>
                        <polyline points="14 2 14 8 20 8"></polyline>
                        <path d="M9 15l2 2 4-4"></path>
                    </svg>
                </div>
                <h2 className="text-3xl font-bold text-notion-text tracking-tight">Tasks</h2>
            </div>

            <form onSubmit={addTask} className="mb-6 group">
                <div className="flex items-center gap-2 p-2 rounded hover:bg-notion-hover transition-colors duration-200">
                    <span className="text-notion-gray text-xl">+</span>
                    <input
                        type="text"
                        value={inputValue}
                        onChange={(e) => setInputValue(e.target.value)}
                        placeholder="Add a new task..."
                        className="flex-1 bg-transparent border-none outline-none text-notion-text placeholder-notion-gray text-lg"
                    />
                </div>
                <div className="h-[1px] bg-notion-border w-full mt-2"></div>
            </form>

            <div ref={listRef} className="flex-1 overflow-y-auto flex flex-col gap-1 pr-2 custom-scrollbar">
                {tasks.length === 0 && (
                    <div className="text-notion-gray italic pl-8 mt-4">
                        No tasks yet.
                    </div>
                )}
                {tasks.map(task => (
                    <div key={task.id} className="group flex items-center py-1 px-2 rounded hover:bg-notion-hover transition-colors duration-150">
                        <button
                            onClick={() => toggleTask(task.id)}
                            className={`w-5 h-5 rounded border mr-3 flex items-center justify-center transition-all duration-200 ${task.completed
                                ? 'bg-notion-blue border-notion-blue'
                                : 'border-notion-text hover:bg-notion-gray/10'
                                }`}
                        >
                            {task.completed && <span className="text-notion-bg text-[10px] font-bold">✓</span>}
                        </button>

                        <span className={`flex-1 text-lg transition-colors duration-200 ${task.completed ? 'line-through text-notion-gray decoration-notion-gray' : 'text-notion-text'
                            }`}>
                            {task.text}
                        </span>

                        <button
                            onClick={() => removeTask(task.id)}
                            className="text-notion-gray hover:text-notion-red p-1 rounded opacity-0 group-hover:opacity-100 transition-opacity duration-200"
                        >
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
                                <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
                            </svg>
                        </button>
                    </div>
                ))}
            </div>
        </div>
    );
}
