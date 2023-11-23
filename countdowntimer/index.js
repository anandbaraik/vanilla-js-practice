(function(){
    let hour = document.querySelector('.hour');
    let minute = document.querySelector('.minute');
    let second = document.querySelector('.second');
    let startBtn = document.querySelector('.start');
    let stopBtn = document.querySelector('.stop');
    let resetBtn = document.querySelector('.reset');

    var countdownTimer = null;

    function stopTimer(state) {
        startBtn.innerHTML = (state == 'pause') ? 'Continue' : 'Start';
        stopBtn.style.display = "none";
        startBtn.style.display = "initial";
        clearInterval(countdownTimer);
    }

    function timer() {
        
        if(second.value > 60) {
            minute.value ++;
            second.value = parseInt(second.value) - 59;
        }

        if(minute.value > 60) {
            hour.value ++;
            minute.value = parseInt(minute.value) - 60;
        }

        if((hour.value == 0) && (minute.value == 0) && (second.value == 0)) {
            hour.value = "";
            minute.value = "";
            second.value = "";
            stopTimer();
        }

        if(second.value != 0) {
            second.value = (second.value  > 10) ? (second.value - 1) : `0${second.value - 1}`;
        }

        if((minute.value != 0) && (second.value == 0)) {
            second.value = 59;
            minute.value = (minute.value  > 10) ? (minute.value - 1) : `0${minute.value - 1}`;
        }

        if((hour.value != 0) && (minute.value == 0)) {
            minute.value = 60;
            hour.value = (hour.value  > 10) ? (hour.value - 1) : `0${hour.value - 1}`;
        }

        return
    }

    function startTimer() {
        if((hour.value == 0) && (minute.value == 0) && (second.value == 0)) {
            return
        }

        startBtn.style.display = "none";
        stopBtn.style.display = "initial";

        countdownTimer = setInterval(() => {
            timer();
        }, 1000);
    }

    startBtn.addEventListener('click', startTimer);
    
    stopBtn.addEventListener('click', function(){
        stopTimer("pause");
    });

    resetBtn.addEventListener('click', function(){
        hour.value = "";
        minute.value = "";
        second.value = "";
        stopTimer();
    });
})();