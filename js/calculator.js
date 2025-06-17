document.addEventListener('DOMContentLoaded', () => {
    const listeningInput = document.getElementById('listening-score');
    const readingInput = document.getElementById('reading-score');
    const calculateBtn = document.getElementById('calculate-btn');
    const listeningResult = document.getElementById('listening-result');
    const readingResult = document.getElementById('reading-result');
    const totalScore = document.getElementById('total-score');
    const levelResult = document.getElementById('level-result');
    const skillList = document.getElementById('skill-list');
    const encouragementMessage = document.getElementById('encouragement-message');

    // Bảng quy đổi điểm TOEIC Listening
    const listeningScores = {
        0: 5, 1: 15, 2: 20, 3: 25, 4: 30, 5: 35, 6: 40, 7: 45, 8: 50, 9: 55,
        10: 60, 11: 65, 12: 70, 13: 75, 14: 80, 15: 85, 16: 90, 17: 95, 18: 100, 19: 105,
        20: 110, 21: 115, 22: 120, 23: 125, 24: 130, 25: 135, 26: 140, 27: 145, 28: 150, 29: 155,
        30: 160, 31: 165, 32: 170, 33: 175, 34: 180, 35: 185, 36: 190, 37: 195, 38: 200, 39: 205,
        40: 210, 41: 215, 42: 220, 43: 225, 44: 230, 45: 235, 46: 240, 47: 245, 48: 250, 49: 255,
        50: 260, 51: 265, 52: 270, 53: 275, 54: 280, 55: 285, 56: 290, 57: 295, 58: 300, 59: 305,
        60: 310, 61: 315, 62: 320, 63: 325, 64: 330, 65: 335, 66: 340, 67: 345, 68: 350, 69: 355,
        70: 360, 71: 365, 72: 370, 73: 375, 74: 380, 75: 385, 76: 395, 77: 400, 78: 405, 79: 410,
        80: 415, 81: 420, 82: 425, 83: 430, 84: 435, 85: 440, 86: 445, 87: 450, 88: 455, 89: 460,
        90: 465, 91: 470, 92: 475, 93: 480, 94: 485, 95: 490, 96: 495, 97: 495, 98: 495, 99: 495,
        100: 495
    };

    // Bảng quy đổi điểm TOEIC Reading
    const readingScores = {
        0: 5, 1: 5, 2: 5, 3: 10, 4: 15, 5: 20, 6: 25, 7: 30, 8: 35, 9: 40,
        10: 45, 11: 50, 12: 55, 13: 60, 14: 65, 15: 70, 16: 75, 17: 80, 18: 85, 19: 90,
        20: 95, 21: 100, 22: 105, 23: 110, 24: 115, 25: 120, 26: 125, 27: 130, 28: 135, 29: 140,
        30: 145, 31: 150, 32: 155, 33: 160, 34: 165, 35: 170, 36: 175, 37: 180, 38: 185, 39: 190,
        40: 195, 41: 200, 42: 205, 43: 210, 44: 215, 45: 220, 46: 225, 47: 230, 48: 235, 49: 240,
        50: 245, 51: 250, 52: 255, 53: 260, 54: 265, 55: 270, 56: 275, 57: 280, 58: 285, 59: 290,
        60: 295, 61: 300, 62: 305, 63: 310, 64: 315, 65: 320, 66: 325, 67: 330, 68: 335, 69: 340,
        70: 345, 71: 350, 72: 355, 73: 360, 74: 365, 75: 370, 76: 375, 77: 380, 78: 385, 79: 390,
        80: 395, 81: 400, 82: 405, 83: 410, 84: 415, 85: 420, 86: 425, 87: 430, 88: 435, 89: 440,
        90: 445, 91: 450, 92: 455, 93: 460, 94: 465, 95: 470, 96: 475, 97: 480, 98: 485, 99: 490,
        100: 495
    };

    // Các cấp độ TOEIC
    const toeicLevels = {
        A: {
            range: [850, 990],
            name: "Advanced",
            skills: [
                "Có thể giao tiếp hiệu quả trong mọi tình huống",
                "Hiểu và sử dụng thành thạo các cấu trúc ngữ pháp phức tạp",
                "Có khả năng đọc hiểu và phân tích các tài liệu chuyên sâu",
                "Có thể tham gia các cuộc họp và thảo luận chuyên môn"
            ]
        },
        B: {
            range: [700, 849],
            name: "Upper Intermediate",
            skills: [
                "Có thể giao tiếp tốt trong hầu hết các tình huống",
                "Hiểu và sử dụng được các cấu trúc ngữ pháp phức tạp",
                "Có khả năng đọc hiểu các tài liệu chuyên ngành",
                "Có thể tham gia các cuộc họp và thảo luận"
            ]
        },
        C: {
            range: [600, 699],
            name: "Intermediate",
            skills: [
                "Có thể giao tiếp trong các tình huống thông thường",
                "Hiểu và sử dụng được các cấu trúc ngữ pháp cơ bản",
                "Có khả năng đọc hiểu các tài liệu đơn giản",
                "Có thể tham gia các cuộc họp đơn giản"
            ]
        },
        D: {
            range: [500, 599],
            name: "Elementary",
            skills: [
                "Có thể giao tiếp trong các tình huống đơn giản",
                "Hiểu và sử dụng được các cấu trúc ngữ pháp cơ bản",
                "Có khả năng đọc hiểu các tài liệu đơn giản",
                "Cần hỗ trợ trong các tình huống phức tạp"
            ]
        },
        E: {
            range: [400, 499],
            name: "Beginner",
            skills: [
                "Có thể giao tiếp trong các tình huống rất đơn giản",
                "Hiểu và sử dụng được các cấu trúc ngữ pháp cơ bản nhất",
                "Có khả năng đọc hiểu các tài liệu rất đơn giản",
                "Cần nhiều hỗ trợ trong giao tiếp"
            ]
        },
        F: {
            range: [0, 399],
            name: "Starter",
            skills: [
                "Có thể giao tiếp trong các tình huống rất đơn giản",
                "Hiểu và sử dụng được các cấu trúc ngữ pháp cơ bản nhất",
                "Có khả năng đọc hiểu các tài liệu rất đơn giản",
                "Cần nhiều hỗ trợ trong giao tiếp"
            ]
        }
    };

    // Function to calculate TOEIC score based on correct answers
    function calculateScore(correctAnswers) {
        for (const conversion of scoreConversionTable) {
            if (correctAnswers >= conversion.range[0] && correctAnswers <= conversion.range[1]) {
                return conversion.score;
            }
        }
        return 0;
    }

    // Function to determine level based on total score
    function determineLevel(totalScore) {
        for (const [key, info] of Object.entries(levelInfo)) {
            if (totalScore >= info.range[0] && totalScore <= info.range[1]) {
                return info;
            }
        }
        return levelInfo.beginner;
    }

    // Function to get random message from level
    function getRandomMessage(level) {
        const messages = level.messages;
        return messages[Math.floor(Math.random() * messages.length)];
    }

    // Function to validate input
    function validateInput(input) {
        const value = parseInt(input.value);
        if (isNaN(value) || value < 0 || value > 100) {
            input.classList.add('error');
            return false;
        }
        input.classList.remove('error');
        return true;
    }

    // Function to update results
    function updateResults() {
        const listeningScore = parseInt(listeningInput.value) || 0;
        const readingScore = parseInt(readingInput.value) || 0;

        const listeningConverted = calculateScore(listeningScore);
        const readingConverted = calculateScore(readingScore);
        const total = listeningConverted + readingConverted;

        listeningResult.textContent = listeningConverted;
        readingResult.textContent = readingConverted;
        totalScore.textContent = total;

        // Update level information
        const level = determineLevel(total);
        levelResult.textContent = level.name;
        
        // Update skills list
        skillList.innerHTML = '';
        level.skills.forEach(skill => {
            const li = document.createElement('li');
            li.textContent = skill;
            skillList.appendChild(li);
        });

        // Update encouragement message
        encouragementMessage.textContent = getRandomMessage(level);
    }

    // Event listeners
    calculateBtn.addEventListener('click', () => {
        const isListeningValid = validateInput(listeningInput);
        const isReadingValid = validateInput(readingInput);

        if (isListeningValid && isReadingValid) {
            updateResults();
        }
    });

    // Add input validation on change
    [listeningInput, readingInput].forEach(input => {
        input.addEventListener('input', () => {
            validateInput(input);
        });
    });

    // Add keyboard support
    document.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') {
            calculateBtn.click();
        }
    });
}); 