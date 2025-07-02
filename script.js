hours = 0;
minutes = 0;
seconds = 0;
audio = new Audio('assets/alarm.mp3')
timer = null;
tasks = 0;
tasks_done = 0;

display = document.getElementById('display');

document.getElementById('display').addEventListener('click', ()=> {
    window.open('text.html', 'Set Countdown', 'height=250, width=400');
    
});

document.getElementById('add-item').addEventListener('click', ()=> {
    if (tasks < 5 && document.getElementById('task-input').value != "") {
        const submittedTask = document.getElementById('task-input').value.trim();
        tasks++;
        const para = document.createElement('ul');
        para.className = "task";
        para.addEventListener('mouseover', ()=> {
            para.classList.toggle('hover');
        })
        para.addEventListener('mouseout', ()=> {
            para.classList.toggle('hover');
        })
        para.addEventListener('click', ()=> {
            para.classList.toggle('strikethrough');
            elem = document.getElementById('bar');
            if (para.classList.contains('strikethrough')) {
                tasks_done++;
            } else {
                tasks_done--;
            }
            added = ((tasks_done / tasks) * 100);
            elem.style.width = added + "%";
        })
        const node = document.createTextNode(submittedTask);
        para.appendChild(node);

        const element = document.getElementById('tasks-list');
        element.appendChild(para);
        document.getElementById('task-input').value = "";
    }
});

function changeTime(time) {
    const parts = time.split(":").map(part => parseInt(part, 10));

    if (parts.length === 3) {
    [hours, minutes, seconds] = parts;
    } else if (parts.length === 2) {
    [minutes, seconds] = parts;
    } else if (parts.length === 1) {
    [seconds] = parts;
    }

    h = hours < 10 ? "0" + hours:hours;
    m = minutes < 10 ? "0" + minutes:minutes;
    s = seconds < 10 ? "0" + seconds:seconds;

    display.innerText = `${h}:${m}:${s}`;
}

function stopwatch() {
    seconds--;
    if (seconds < 0) {
        seconds = 59;
        minutes--;
        if (minutes < 0) {
            minutes = 59;
            hours--;

            if (hours <= 0) {
                audio.play();
                clearInterval(timer);
                return false;
            }
        }
    }

    h = hours < 10 ? "0" + hours:hours;
    m = minutes < 10 ? "0" + minutes:minutes;
    s = seconds < 10 ? "0" + seconds:seconds;

    display.innerText = `${h}:${m}:${s}`;
}

document.getElementById('startButton').addEventListener('click', ()=> {
    if(timer !== null) {
        clearInterval(timer);
    }
    timer = setInterval(stopwatch, 1000);
});


document.getElementById('stopButton').addEventListener('click', ()=> {
    clearInterval(timer);
});

document.getElementById('resetButton').addEventListener('click', ()=> {
    clearInterval(timer);
    hours = 0; 
    minutes = 0;
    seconds = 0;
    display.innerText = "00:00:00";
});

document.getElementById('close-button').addEventListener('click', ()=> {
    window.close();
})