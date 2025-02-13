self.addEventListener('message', function(e) {
    if(e.data === 'Run the timer') {
        startTimer();

        let time = 
            `${minutes.toString().padStart(2,"0")}
            :
            ${seconds.toString().padStart(2,"0")}`;
        
        this.self.postMessage(time);
    }
});