class WordSearchGame {
    constructor(ROWS, COLS) {
        this.ROWS = ROWS;
        this.COLS = COLS;
        this.grid = [];
        this.words = [];
        this.wordsList = [];
        this.foundWords = new Set();
        this.selectedCells = [];
        this.isSelecting = false;
        this.startCell = null;
        this.currentDirection = null;
        this.score = 0;
        
        this.init();
    }

    async init() {
        this.loadWords();
        this.generatePuzzle();
        this.renderGrid();
        this.renderWordsList();
        this.attachEvents();
        this.startBackgroundSlider();
    }

    loadWords() {
        if (window.WORDS && window.WORDS.length > 0) {
            // Random tanlash 12-15 ta so'z
            const shuffled = [...window.WORDS];
            for (let i = shuffled.length - 1; i > 0; i--) {
                const j = Math.floor(Math.random() * (i + 1));
                [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
            }
            this.wordsList = shuffled.slice(0, 14);
            this.words = [...this.wordsList];
            
            document.getElementById('scoreTotal').innerText = `/${this.wordsList.length}`;
        } else {
            console.error('Words not loaded');
            this.wordsList = [];
        }
    }

    generatePuzzle() {
        // Initialize empty grid
        this.grid = Array(this.ROWS).fill().map(() => Array(this.COLS).fill(''));
        
        // Place words
        for (let word of this.words) {
            this.placeWord(word);
        }
        
        // Fill empty cells with random letters
        const letters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
        for (let i = 0; i < this.ROWS; i++) {
            for (let j = 0; j < this.COLS; j++) {
                if (this.grid[i][j] === '') {
                    this.grid[i][j] = letters[Math.floor(Math.random() * letters.length)];
                }
            }
        }
    }

    placeWord(word) {
        const wordUpper = word.toUpperCase();
        const maxAttempts = 100;
        
        for (let attempt = 0; attempt < maxAttempts; attempt++) {
            const direction = Math.floor(Math.random() * 8); // 8 directions
            const row = Math.floor(Math.random() * this.ROWS);
            const col = Math.floor(Math.random() * this.COLS);
            
            if (this.canPlaceWord(wordUpper, row, col, direction)) {
                this.insertWord(wordUpper, row, col, direction);
                return true;
            }
        }
        
        // If can't place, try to place word manually
        for (let i = 0; i < this.ROWS; i++) {
            for (let j = 0; j < this.COLS; j++) {
                for (let d = 0; d < 8; d++) {
                    if (this.canPlaceWord(wordUpper, i, j, d)) {
                        this.insertWord(wordUpper, i, j, d);
                        return true;
                    }
                }
            }
        }
        
        return false;
    }

    canPlaceWord(word, row, col, direction) {
        const dirs = [
            [0, 1],   // right
            [0, -1],  // left
            [1, 0],   // down
            [-1, 0],  // up
            [1, 1],   // down-right
            [1, -1],  // down-left
            [-1, 1],  // up-right
            [-1, -1]  // up-left
        ];
        
        const [dr, dc] = dirs[direction];
        
        for (let i = 0; i < word.length; i++) {
            const r = row + dr * i;
            const c = col + dc * i;
            
            if (r < 0 || r >= this.ROWS || c < 0 || c >= this.COLS) {
                return false;
            }
            
            if (this.grid[r][c] !== '' && this.grid[r][c] !== word[i]) {
                return false;
            }
        }
        
        return true;
    }

    insertWord(word, row, col, direction) {
        const dirs = [
            [0, 1], [0, -1], [1, 0], [-1, 0],
            [1, 1], [1, -1], [-1, 1], [-1, -1]
        ];
        
        const [dr, dc] = dirs[direction];
        
        for (let i = 0; i < word.length; i++) {
            const r = row + dr * i;
            const c = col + dc * i;
            this.grid[r][c] = word[i];
        }
    }

    renderGrid() {
        const gridElement = document.getElementById('grid');
        gridElement.innerHTML = '';
        
        for (let i = 0; i < this.ROWS; i++) {
            for (let j = 0; j < this.COLS; j++) {
                const cell = document.createElement('div');
                cell.className = 'cell';
                cell.textContent = this.grid[i][j];
                cell.dataset.row = i;
                cell.dataset.col = j;
                gridElement.appendChild(cell);
            }
        }
    }

    renderWordsList() {
        const wordsListElement = document.getElementById('wordsList');
        wordsListElement.innerHTML = '';
        
        this.wordsList.forEach(word => {
            const wordItem = document.createElement('div');
            wordItem.className = 'word-item';
            if (this.foundWords.has(word.toUpperCase())) {
                wordItem.classList.add('found');
            }
            wordItem.textContent = word;
            wordsListElement.appendChild(wordItem);
        });
    }

    updateScore() {
        this.score = this.foundWords.size;
        document.getElementById('scoreValue').textContent = this.score;
        const progress = (this.score / this.wordsList.length) * 100;
        document.getElementById('progressBar').style.width = `${progress}%`;
        
        if (this.score === this.wordsList.length) {
            this.showMessage("🎉 TABRIKLAYMAN! Siz barcha so'zlarni topdingiz! 🎉", true);
        }
    }

    showMessage(msg, isSuccess = false) {
        const messageDiv = document.getElementById('message');
        messageDiv.textContent = msg;
        messageDiv.classList.add('show');
        
        if (isSuccess) {
            messageDiv.style.background = "linear-gradient(135deg, #4caf50, #45a049)";
        } else {
            messageDiv.style.background = "linear-gradient(135deg, #667eea, #764ba2)";
        }
        
        setTimeout(() => {
            messageDiv.classList.remove('show');
            setTimeout(() => {
                messageDiv.style.background = "linear-gradient(135deg, #667eea, #764ba2)";
            }, 300);
        }, 2000);
    }

    playSound(isSuccess) {
        // Web Audio API bilan yumshoq sound effect
        const audioContext = new (window.AudioContext || window.webkitAudioContext)();
        const oscillator = audioContext.createOscillator();
        const gainNode = audioContext.createGain();
        
        oscillator.connect(gainNode);
        gainNode.connect(audioContext.destination);
        
        if (isSuccess) {
            oscillator.frequency.value = 523.25; // C5
            gainNode.gain.value = 0.1;
            oscillator.type = 'sine';
            oscillator.start();
            setTimeout(() => {
                oscillator.stop();
                audioContext.close();
            }, 200);
        } else {
            oscillator.frequency.value = 220; // A3
            gainNode.gain.value = 0.05;
            oscillator.type = 'sawtooth';
            oscillator.start();
            setTimeout(() => {
                oscillator.stop();
                audioContext.close();
            }, 150);
        }
    }

    checkWord() {
        if (this.selectedCells.length === 0) return;
        
        // Get selected word
        let selectedWord = '';
        this.selectedCells.forEach(cell => {
            selectedWord += this.grid[cell.row][cell.col];
        });
        
        // Check if word exists (case insensitive)
        const foundWord = this.wordsList.find(w => 
            w.toUpperCase() === selectedWord && !this.foundWords.has(w.toUpperCase())
        );
        
        if (foundWord) {
            // Word found
            this.foundWords.add(foundWord.toUpperCase());
            this.updateScore();
            this.playSound(true);
            this.showMessage(`✅ "${foundWord}" so'zini topdingiz!`, true);
            
            // Mark cells as found
            this.selectedCells.forEach(cell => {
                const cellElement = document.querySelector(`.cell[data-row='${cell.row}'][data-col='${cell.col}']`);
                cellElement.classList.add('found');
            });
            
            this.renderWordsList();
        } else {
            // Wrong selection
            this.playSound(false);
            this.showMessage(`❌ Noto'g'ri tanlov! Qaytadan urining.`, false);
            
            // Add shake animation
            this.selectedCells.forEach(cell => {
                const cellElement = document.querySelector(`.cell[data-row='${cell.row}'][data-col='${cell.col}']`);
                cellElement.classList.add('wrong');
                setTimeout(() => {
                    cellElement.classList.remove('wrong');
                }, 500);
            });
        }
        
        // Clear selection
        this.clearSelection();
    }

    clearSelection() {
        this.selectedCells.forEach(cell => {
            const cellElement = document.querySelector(`.cell[data-row='${cell.row}'][data-col='${cell.col}']`);
            cellElement.classList.remove('selected');
        });
        this.selectedCells = [];
        this.startCell = null;
        this.currentDirection = null;
    }

    attachEvents() {
        const gridElement = document.getElementById('grid');
        
        // Mouse events
        gridElement.addEventListener('mousedown', (e) => {
            const cell = e.target.closest('.cell');
            if (!cell) return;
            if (cell.classList.contains('found')) return;
            
            this.isSelecting = true;
            this.clearSelection();
            
            const row = parseInt(cell.dataset.row);
            const col = parseInt(cell.dataset.col);
            this.startCell = { row, col };
            this.selectedCells.push({ row, col });
            cell.classList.add('selected');
        });
        
        gridElement.addEventListener('mouseenter', (e) => {
            if (!this.isSelecting) return;
            
            const cell = e.target.closest('.cell');
            if (!cell) return;
            if (cell.classList.contains('found')) return;
            
            const row = parseInt(cell.dataset.row);
            const col = parseInt(cell.dataset.col);
            
            // Determine direction
            if (this.selectedCells.length === 1) {
                const dr = row - this.startCell.row;
                const dc = col - this.startCell.col;
                
                if (Math.abs(dr) > 0 && Math.abs(dc) > 0 && Math.abs(dr) !== Math.abs(dc)) {
                    return; // Not straight line or diagonal
                }
                
                if (dr !== 0 && dc !== 0 && Math.abs(dr) !== Math.abs(dc)) {
                    return; // Not straight diagonal
                }
                
                this.currentDirection = { dr: Math.sign(dr), dc: Math.sign(dc) };
            }
            
            if (this.currentDirection) {
                const nextRow = this.startCell.row + this.currentDirection.dr * this.selectedCells.length;
                const nextCol = this.startCell.col + this.currentDirection.dc * this.selectedCells.length;
                
                if (nextRow === row && nextCol === col) {
                    this.selectedCells.push({ row, col });
                    cell.classList.add('selected');
                }
            }
        });
        
        gridElement.addEventListener('mouseup', () => {
            if (this.isSelecting) {
                this.isSelecting = false;
                this.checkWord();
            }
        });
        
        // Touch events for mobile
        gridElement.addEventListener('touchstart', (e) => {
            e.preventDefault();
            const touch = e.touches[0];
            const cell = document.elementFromPoint(touch.clientX, touch.clientY)?.closest('.cell');
            if (!cell) return;
            if (cell.classList.contains('found')) return;
            
            this.isSelecting = true;
            this.clearSelection();
            
            const row = parseInt(cell.dataset.row);
            const col = parseInt(cell.dataset.col);
            this.startCell = { row, col };
            this.selectedCells.push({ row, col });
            cell.classList.add('selected');
        });
        
        gridElement.addEventListener('touchmove', (e) => {
            e.preventDefault();
            if (!this.isSelecting) return;
            
            const touch = e.touches[0];
            const cell = document.elementFromPoint(touch.clientX, touch.clientY)?.closest('.cell');
            if (!cell) return;
            if (cell.classList.contains('found')) return;
            
            const row = parseInt(cell.dataset.row);
            const col = parseInt(cell.dataset.col);
            
            if (this.selectedCells.length === 1) {
                const dr = Math.sign(row - this.startCell.row);
                const dc = Math.sign(col - this.startCell.col);
                
                if (Math.abs(dr) > 0 && Math.abs(dc) > 0 && Math.abs(dr) !== Math.abs(dc)) {
                    return;
                }
                
                if (dr !== 0 && dc !== 0 && Math.abs(dr) !== Math.abs(dc)) {
                    return;
                }
                
                this.currentDirection = { dr, dc };
            }
            
            if (this.currentDirection) {
                const nextRow = this.startCell.row + this.currentDirection.dr * this.selectedCells.length;
                const nextCol = this.startCell.col + this.currentDirection.dc * this.selectedCells.length;
                
                if (nextRow === row && nextCol === col) {
                    this.selectedCells.push({ row, col });
                    cell.classList.add('selected');
                }
            }
        });
        
        gridElement.addEventListener('touchend', (e) => {
            e.preventDefault();
            if (this.isSelecting) {
                this.isSelecting = false;
                this.checkWord();
            }
        });
        
        // Reset button
        document.getElementById('resetBtn').addEventListener('click', () => {
            this.resetGame();
        });
    }
    
    resetGame() {
        this.foundWords.clear();
        this.score = 0;
        this.selectedCells = [];
        this.updateScore();
        this.generatePuzzle();
        this.renderGrid();
        this.renderWordsList();
        this.showMessage("🔄 O'yin yangilandi! Yangi so'zlarni toping!", true);
        this.attachEvents();
    }
    
    startBackgroundSlider() {
        const slides = document.querySelectorAll('.bg-slide');
        let currentSlide = 0;
        
        setInterval(() => {
            slides[currentSlide].classList.remove('active');
            currentSlide = (currentSlide + 1) % slides.length;
            slides[currentSlide].classList.add('active');
        }, 5000);
    }
}

// Initialize game
const game = new WordSearchGame(6, 7);
