$(function () {
  let i = 0;
  //Test Data
  $('#topic').attr('value', 'Bassonsoitto')
  $('#title').attr('value', 'Släppäys')
  $('#description').attr('value', 'Sormilla basson läpsytys')
  $('#ttm').attr('value', '1000h')
  $('#timeS').attr('value', '2000h')
  $('#src').attr('value', 'https://fi.wikipedia.org/wiki/Bass')
  $('startedL').text()

  fetch('http://localhost:3000/api/topics')
  .then(res => res.json())
  .then(data => data.map(post => {
    $('<div id=""></div>').attr("id", i).text(post.topic).appendTo('#blog')
    $('<p class="title"></p>')
      .appendTo('#' + i)
      .text('Title: ' + post.title)
    $('<p class="description"></p>')
      .appendTo('#' + i)
      .text('Description: ' + post.description)
    $('<p class="ttm"></p>')
      .appendTo('#' + i)
      .text('Time Spent: ' + post.timeS)
    $('<p class="ttm"></p>')
      .appendTo('#' + i)
      .text('Links: ' + post.src)
    $('<p class="ttm"></p>')
      .appendTo('#' + i)
      .text('Started Learning: ' + post.startedL)
    $('<p class="ttm"></p>')
      .appendTo('#' + i)
      .text('In Progress: ' + post.inProg)
    $('<p class="ttm"></p>')
      .appendTo('#' + i)
      .text('Completion Date: ' + post.compDate)
    i++;
  }))
  .catch((err) => console.log('Could not find any pre-existing posts on initial load. Submit a post!'))

  $('#submit').on('click', function (e) {
    e.preventDefault();

    const topic = $('#topic').val();
    const title = $('#title').val();
    const descr = $('#description').val();
    const ttm = $('#ttm').val();
    const timeS = $('#timeS').val();
    const src = $('#src').val();
    const startedL = $('startedL').val();
    const inProg = document.getElementById('inProg').checked;
    const compDate = $('#compDate').val();
    const headers = new Headers({
      'Content-Type': 'application/json'
    });

    let entry = {
      key: i,
      id: '',
      topic: topic,
      title: title,
      description: descr,
      ttm: ttm,
      timeS: timeS,
      src: src,
      startedL: startedL,
      inProg: inProg,
      compDate: compDate
    };

    const jsonEntry = JSON.stringify(entry)

    const postBody = {
      method: 'POST',
      headers: headers,
      body: jsonEntry
    };
    if (confirm('Save Data?')) {
      $('#blog').empty();

      fetch('http://localhost:3000/api/topics', postBody)
        .then((res) => res.json())
        .then(data => data.map(post => {
          $('<div class="columns" id=""></div>').attr("id", i).text(post.topic).appendTo('#blog')
          $('<p class="title"></p>')
            .appendTo('#' + i)
            .text('Title: ' + post.title)
          $('<p class="description"></p>')
            .appendTo('#' + i)
            .text('Description: ' + post.description)
          $('<p class="ttm"></p>')
            .appendTo('#' + i)
            .text('Time Spent: ' + post.timeS)
          $('<p class="ttm"></p>')
            .appendTo('#' + i)
            .text('Links: ' + post.src)
          $('<p class="ttm"></p>')
            .appendTo('#' + i)
            .text('Started Learning: ' + post.startedL)
          $('<p class="ttm"></p>')
            .appendTo('#' + i)
            .text('In Progress: ' + post.inProg)
          $('<p class="ttm"></p>')
            .appendTo('#' + i)
            .text('Completion Date: ' + post.compDate)
          i++;
        }))
        .catch((err) => console.log(err))

      let entryString = JSON.stringify(entry)
      //console.log(Object.keys(olio).length)
      localStorage.setItem(i, entryString)
    } else {
      alert('No data saved!')
    }
  })

  const getDataFromLocal = () => {
    const keyName = localStorage.key(i)
    const post = JSON.parse(localStorage.getItem(i));

    console.log(post)
    console.log(keyName)
    $('<div id=""></div>').attr("id", i).text(post.topic).appendTo('#blog')
    $('<p class="title"></p>')
      .appendTo('#' + i)
      .text('Title: ' + post.title)
    $('<p class="description"></p>')
      .appendTo('#' + i)
      .text('Description: ' + post.description)
    $('<p class="ttm"></p>')
      .appendTo('#' + i)
      .text('Time Spent: ' + post.timeS)
    $('<p class="ttm"></p>')
      .appendTo('#' + i)
      .text('Links: ' + post.src)
    $('<p class="ttm"></p>')
      .appendTo('#' + i)
      .text('Started Learning: ' + post.startedL)
    $('<p class="ttm"></p>')
      .appendTo('#' + i)
      .text('In Progress: ' + post.inProg)
    $('<p class="ttm"></p>')
      .appendTo('#' + i)
      .text('Completion Date: ' + post.compDate)
  }

  function updateClock() {
    var time = new Date()
    var hr = time.getHours()
    var min = time.getMinutes()
    var sec = time.getSeconds()
    var localDate = new Intl.DateTimeFormat('fi').format(time)

    document.getElementById('time').innerHTML = localDate + ' / ' + hr + ':' + min + ':' + sec

    setInterval(updateClock, 1000)
  }
  updateClock();
})