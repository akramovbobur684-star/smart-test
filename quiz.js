* {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
}

body {
    font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, sans-serif;
    background: linear-gradient(135deg, #0f172a 0%, #1e293b 100%);
    min-height: 100vh;
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 16px;
    transition: background 0.3s ease;
}

body.dark-mode {
    background: linear-gradient(135deg, #0f172a 0%, #0f172a 100%);
}

.quiz-container {
    max-width: 800px;
    width: 100%;
    background: #1e293b;
    border-radius: 24px;
    padding: 24px;
    box-shadow: 0 20px 40px rgba(0, 0, 0, 0.3);
    transition: all 0.3s ease;
}

.quiz-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 24px;
    padding-bottom: 16px;
    border-bottom: 2px solid #334155;
    flex-wrap: wrap;
    gap: 12px;
}

.quiz-timer {
    background: #0f172a;
    padding: 8px 20px;
    border-radius: 12px;
    font-size: 24px;
    font-weight: bold;
    color: #94a3b8;
    font-family: monospace;
}

.quiz-score {
    background: #0f172a;
    padding: 8px 20px;
    border-radius: 12px;
    font-size: 18px;
    font-weight: 600;
    color: #38bdf8;
}

.quiz-progress {
    text-align: center;
    margin-bottom: 20px;
    font-size: 14px;
    color: #94a3b8;
    font-weight: 500;
}

.quiz-question {
    background: #0f172a;
    padding: 28px;
    border-radius: 20px;
    margin-bottom: 24px;
}

.quiz-question-text {
    color: #f1f5f9;
    font-size: 22px;
    font-weight: 600;
    line-height: 1.4;
    text-align: center;
    word-wrap: break-word;
}

.quiz-options {
    display: flex;
    flex-direction: column;
    gap: 12px;
    margin-bottom: 24px;
}

.quiz-option {
    background: #334155;
    padding: 14px 20px;
    border-radius: 14px;
    color: #f1f5f9;
    font-size: 16px;
    cursor: pointer;
    transition: all 0.3s ease;
    border: 2px solid transparent;
    word-wrap: break-word;
}

.quiz-option:hover {
    background: #475569;
    transform: translateX(5px);
}

.quiz-option.correct {
    background: #10b981;
    border-color: #059669;
    animation: pulse 0.5s ease;
}

.quiz-option.wrong {
    background: #ef4444;
    border-color: #dc2626;
    animation: shake 0.5s ease;
}

.quiz-option.correct-highlight {
    background: #10b981;
    border-color: #059669;
    box-shadow: 0 0 0 3px rgba(16, 185, 129, 0.3);
}

.quiz-buttons {
    display: flex;
    gap: 15px;
    justify-content: center;
    flex-wrap: wrap;
}

.quiz-btn {
    padding: 12px 28px;
    font-size: 16px;
    font-weight: 600;
    border: none;
    border-radius: 14px;
    cursor: pointer;
    transition: all 0.3s ease;
    font-family: inherit;
}

.quiz-btn-next {
    background: #3b82f6;
    color: white;
}

.quiz-btn-next:hover {
    background: #2563eb;
    transform: translateY(-2px);
    box-shadow: 0 5px 15px rgba(59, 130, 246, 0.3);
}

.quiz-btn-restart {
    background: #ef4444;
    color: white;
}

.quiz-btn-restart:hover {
    background: #dc2626;
    transform: translateY(-2px);
    box-shadow: 0 5px 15px rgba(239, 68, 68, 0.3);
}

.quiz-modal {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: rgba(0, 0, 0, 0.85);
    display: flex;
    justify-content: center;
    align-items: center;
    z-index: 1000;
    animation: fadeIn 0.3s ease;
}

.quiz-modal-content {
    background: #1e293b;
    padding: 36px;
    border-radius: 24px;
    text-align: center;
    max-width: 400px;
    width: 90%;
    animation: slideUp 0.3s ease;
}

.quiz-modal-message {
    color: #f1f5f9;
    font-size: 20px;
    margin-bottom: 28px;
    line-height: 1.5;
    white-space: pre-line;
}

.quiz-modal-restart {
    background: #3b82f6;
    color: white;
    border: none;
    padding: 14px 28px;
    border-radius: 14px;
    font-size: 24px;
    cursor: pointer;
    transition: all 0.3s ease;
}

.quiz-modal-restart:hover {
    background: #2563eb;
    transform: scale(1.05);
}

.quiz-modal-close {
    background: #64748b;
    color: white;
    border: none;
    padding: 12px 28px;
    border-radius: 14px;
    font-size: 16px;
    cursor: pointer;
    font-weight: 600;
    transition: all 0.3s ease;
}

.quiz-modal-close:hover {
    background: #475569;
    transform: scale(1.05);
}

@keyframes pulse {
    0%, 100% {
        transform: scale(1);
    }
    50% {
        transform: scale(1.02);
    }
}

@keyframes shake {
    0%, 100% {
        transform: translateX(0);
    }
    25% {
        transform: translateX(-5px);
    }
    75% {
        transform: translateX(5px);
    }
}

@keyframes fadeIn {
    from {
        opacity: 0;
    }
    to {
        opacity: 1;
    }
}

@keyframes slideUp {
    from {
        transform: translateY(50px);
        opacity: 0;
    }
    to {
        transform: translateY(0);
        opacity: 1;
    }
}

@media (max-width: 768px) {
    .quiz-container {
        padding: 16px;
    }
    
    .quiz-question {
        padding: 20px;
    }
    
    .quiz-question-text {
        font-size: 18px;
    }
    
    .quiz-option {
        padding: 12px 16px;
        font-size: 14px;
    }
    
    .quiz-timer {
        font-size: 20px;
        padding: 6px 16px;
    }
    
    .quiz-score {
        font-size: 16px;
        padding: 6px 16px;
    }
    
    .quiz-btn {
        padding: 10px 22px;
        font-size: 14px;
    }
    
    .quiz-modal-content {
        padding: 28px;
    }
    
    .quiz-modal-message {
        font-size: 18px;
    }
}

@media (max-width: 480px) {
    .quiz-header {
        flex-direction: column;
        align-items: stretch;
        text-align: center;
    }
    
    .quiz-timer {
        text-align: center;
    }
    
    .quiz-score {
        text-align: center;
    }
    
    .quiz-buttons {
        flex-direction: column;
    }
    
    .quiz-btn {
        width: 100%;
    }
    
    .quiz-question-text {
        font-size: 16px;
    }
    
    .quiz-option {
        font-size: 13px;
        padding: 10px 14px;
    }
}
