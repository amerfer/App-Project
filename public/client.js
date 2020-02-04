        //event listener
        window.onload = getLesson();

        function getLesson(){
        fetch('http://localhost:3000/collections/lessons/', {mode: 'cors'})
        .then((res) => res.json())
        .then((data) => {
        let output = '<h2>Lessons</h2>';
        data.forEach(function(lessons){
            output += `
            <ul>
              <li id = 'lessons'>
              Topic: ` + lessons.topic + `<br>
              Location: ` + lessons.location + `<br> 
              Price: ` + lessons.price + `<br>  
              Time: ` + lessons.time + `<br> 
              Length: ` + lessons.length + ` <br>
              
              <select>
                <option value = "1">1</option>
                <option value = "2">2</option>
                <option value = "3">3</option>
                <option value = "4">4</option>
                <option value = "5">5</option>
              </select>

              </li>
            </ul>`;
        })
        document.getElementById('lessonOutput').innerHTML = output;
        //document.getElementById('lessonOutput').innerHTML = JSON.stringify(data);
        }) 
        .catch((err) => console.log('fetch not working'))  
        }

        function addLesson(){
          fetch(`http://localhost:3000/collections/lessons/`, {
            method: 'post',
            body: JSON.stringify()
        })

          .then((response) => response.json())
          .then((data) => console.log('it is working'))
          .catch((error) => console.log('try again'))
        }