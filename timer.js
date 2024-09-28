const cliProgress = require('cli-progress')
const colors = require('ansi-colors')

const progressBar = new cliProgress.SingleBar({
  format: 'Помодоро-таймер: |' + colors.green('{bar}') + '| {percentage}% || {value}/{total} минут',
  barCompleteChar: '\u2588',
  barIncompleteChar: '\u2591',
  hideCursor: true
})

// Задаем длительность таймера (в минутах)
const DURATION = 25 // 25 минут

// Запускаем прогресс-бар
progressBar.start(DURATION, 0)

// Создаем таймер, который будет увеличивать значение прогресс-бара на 1 единицу (1 минуту)
let timer = setInterval(() => {
  progressBar.increment() // Увеличиваем прогресс на 1 единицу

  // Проверяем не превышает ли заданное значение
  if (progressBar.value >= DURATION) {
    clearInterval(timer) // Останавливаем таймер
    progressBar.stop() // Останавливаем прогресс-бар
    console.log("Сессия помодоро завершена! Время отдыхать.")

    // Звуковой сигнал с консоли
    process.stdout.write('\x07')
  }
}, 60000) // 60000 миллисекунд = 1 минута
