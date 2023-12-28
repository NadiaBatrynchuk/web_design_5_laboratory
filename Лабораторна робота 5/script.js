document.addEventListener('DOMContentLoaded', function() {
    const studentName = prompt('Будь ласка, введіть своє ім’я:');
    const studentGroup = prompt('Будь ласка, введіть номер своєї групи:');

    // Відображаємо ім'я та номер групи на сторінці
    document.getElementById('student-name').textContent = studentName;
    document.getElementById('student-group').textContent = studentGroup;


    // Функція для показу блоку питань
    function showQuestionBlock(blockId) {
        const block = document.getElementById(blockId);
        if (block) {
            block.style.display = 'block';
        }
    }

    // Правильні відповіді
    const easyAnswers = {
        'q1': 'true',
        'q2': 'color',
        'q3': 'style',
        'q4': '<a>',
        'q5': 'a', // Pixels (px)
        'q6': 'a', // text-align: center;
        'q7': 'a', // border: none;
        'q8': 'd', // list-style-type: disc;
        'q9': 'd', // text-indent: 15px;
        'q10': 'd', // color: purple;
        'q11': 'no',
        'q12': 'font-weight',
        'q13': '<p>',
        'q14': 'text-indent',
        'q15': '<ul>',
    };

    const middleAnswers = {
        'q1': ['color', 'font-size'], // Це масив, оскільки може бути декілька правильних чекбоксів
        'q2': 'position',
        'q3': 'a', // font-size: large;
        'q4': 'a', // margin: 10px;
        'q5': 'a', // display: none;
        'q6': 'a', // box-shadow: 5px 5px 10px #000;
        'q7': 'a', // line-height: 1.5;
        'q8': 'a', // border: 1px solid #000;
        'q9': 'a', // text-align: center;
        'q10': 'a', // animation: move 2s ease-in-out;
        'q11': '#',
        'q12': 'src',
        'q13': 'font-size',
        'q14': 'text-shadow',
        'q15': 'letter-spacing',
    };

    const hardAnswers = {
        'q1': 'color: red;', // Припустимо, правильною відповіддю є 'color: red;'
        'q2': 'visibility: hidden;', // Припустимо, правильна відповідь на питання про приховування елемента
        'q3': 'font-size', // Припустимо, правильною відповіддю є 'font-size'
        'q4': 'a', // border-width: 2px;
        'q5': 'b', // right: 0; top: 0;
        'q6': 'a', // width: 100%;
        'q7': 'b', // element:hover { color: red; }
        'q8': ['color', 'font-weight', 'text-decoration'],
        'q9': [':hover', ':active', ':first-child'],
        'q10': ['display', 'flex-direction', 'justify-content', 'align-items'],
        'q11': ':active',
        'q12': 'justify-content',
        'q13': 'white-space',
        'q14': 'opacity',
        'q15': 'border',
    };

    function showRandomQuestions(levelId) {
        // Вибираємо усі div у межах певного рівня
        const questions = document.querySelectorAll(`${levelId} > div`);
        questions.forEach(question => {
            question.style.display = 'none'; // Приховуємо кожен div
        });

        let randomIndices = new Set();
        while(randomIndices.size < 10) {
            randomIndices.add(Math.floor(Math.random() * questions.length));
        }

        randomIndices.forEach(index => {
            questions[index].style.display = 'block'; // Робимо випадкові div видимими
        });
    }


    let totalScore = 0;

    // Функція для перевірки відповідей конкретного рівня
    function checkAnswers(answers) {
        let score = 0;
        for (const [question, correctAnswer] of Object.entries(answers)) {
            const userAnswers = document.querySelectorAll(`input[name="${question}"]:checked`);
            let userAnswerValues = Array.from(userAnswers).map(input => input.value);

            if (Array.isArray(correctAnswer)) {
                // Якщо правильна відповідь - масив (наприклад, для чекбоксів)
                if (userAnswerValues.sort().join(',') === correctAnswer.sort().join(',')) {
                    score++;
                }
            } else {
                // Для радіокнопок та інших випадків
                if (userAnswerValues.includes(correctAnswer)) {
                    score++;
                }
            }
        }
        totalScore += score;
        return score;
    }

    // Обробники подій для кнопок перевірки відповідей
    document.getElementById('start-easy').addEventListener('click', function() {
        showRandomQuestions('#easy-level');
    });

    document.getElementById('start-middle').addEventListener('click', function() {
        const easyScore = checkAnswers(easyAnswers);
        showRandomQuestions('#middle-level');
    });

    document.getElementById('start-hard').addEventListener('click', function() {
        const middleScore = checkAnswers(middleAnswers);
        showRandomQuestions('#hard-level');
    });

    // Окремий обробник для підведення підсумків
    document.getElementById('apply').addEventListener('click', function() {
        const hardScore = checkAnswers(hardAnswers);
        alert(`Ваш загальний результат: ${totalScore} з 30`);
    });
});
