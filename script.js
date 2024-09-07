function calculateWakeTimes() {
    const sleepTimeInput = document.getElementById('sleep-time').value;
    /* Obtém o valor do campo de entrada para o horário de dormir */
    const fallAsleepTimeInput = document.getElementById('fall-asleep-time').value || 0;
    /* Obtém o valor do campo de entrada para o tempo de adormecimento, considerando 0 se vazio */
    const resultsList = document.getElementById('results');
    /* Obtém o elemento da lista onde os resultados serão exibidos */
    resultsList.innerHTML = '';
    /* Limpa os resultados anteriores */

    if (!sleepTimeInput) {
        alert('Por favor, insira um horário válido!');
        /* Exibe um alerta se o campo de horário de dormir estiver vazio */
        return;
    }

    const sleepTime = new Date();
    /* Cria um objeto Date para o horário de dormir */
    const [hours, minutes] = sleepTimeInput.split(':');
    /* Divide o horário de dormir em horas e minutos */
    sleepTime.setHours(hours);
    sleepTime.setMinutes(minutes);
    sleepTime.setSeconds(0);
    /* Define a hora e minutos no objeto Date */

    const fallAsleepTime = parseInt(fallAsleepTimeInput);
    sleepTime.setMinutes(sleepTime.getMinutes() + fallAsleepTime);
    /* Adiciona o tempo para adormecer ao horário de dormir */

    const cycles = 6; /* Considerando até 6 ciclos de 90 minutos */
    const cycleDuration = 90 * 60 * 1000; /* 90 minutos em milissegundos */
    let wakeTime;

    for (let i = 1; i <= cycles; i++) {
        wakeTime = new Date(sleepTime.getTime() + i * cycleDuration);
        /* Calcula o horário de acordar para cada ciclo */
        const formattedTime = wakeTime.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
        /* Formata o horário de acordar para o formato 'HH:MM' */
        const listItem = document.createElement('li');
        listItem.textContent = `Ciclo ${i}: ${formattedTime}`;
        /* Cria um item de lista com o horário formatado */
        resultsList.appendChild(listItem);
        /* Adiciona o item à lista de resultados */
    }
}