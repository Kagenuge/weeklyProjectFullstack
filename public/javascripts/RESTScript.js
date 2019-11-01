$(function () {
  //Test Data
  $('#topic').attr('value', 'Bassonsoitto')
  $('#title').attr('value', 'Släppäys')
  $('#description').attr('value', 'Sormilla basson läpsytys')
  $('#ttm').attr('value', '1000')
  $('#timeS').attr('value', '2000')
  $('#src').attr('value', 'https://fi.wikipedia.org/wiki/Bass')

  const getData = () => {
    fetch('http://localhost:3000/api/topics')
  .then(res => res.json())
  .then(data => data.map(post => {
    $('<div id=""></div>').attr("id", post.id).text(post.topic).appendTo('#blog')
    $('<p class="title"></p>')
      .appendTo('#' + post.id)
      .text('Title: ' + post.title)
    $('<p class="description"></p>')
      .appendTo('#' + post.id)
      .text('Description: ' + post.description)
    $('<p class="ttm"></p>')
      .appendTo('#' + post.id)
      .text('Time Spent: ' + post.timetomaster)
    $('<p class="ttm"></p>')
      .appendTo('#' + post.id)
      .text('Time Spent: ' + post.timespent)
    $('<p class="ttm"></p>')
      .appendTo('#' + post.id)
      .text('Links: ' + post.source)
    $('<p class="ttm"></p>')
      .appendTo('#' + post.id)
      .text('Started Learning: ' + post.startedlearningdate)
    $('<p class="ttm"></p>')
      .appendTo('#' + post.id)
      .text('In Progress: ' + post.inprogress)
    $('<p class="ttm"></p>')
      .appendTo('#' + post.id)
      .text('Completion Date: ' + post.completiondate)
  }))
  .catch((err) => console.log('Could not find any pre-existing posts on initial load. Submit a post!'))
  };

  $('#submit').on('click', function (e) {
    let i = 0;
    e.preventDefault();
    const topic = $('#topic').val();
    const title = $('#title').val();
    const descr = $('#description').val();
    const ttm = $('#ttm').val();
    const timeS = $('#timeS').val();
    const src = $('#src').val();
    var startedL = $('#startedL').val();
    if (!startedL){
      startedL = undefined;
    }
    const inProg = document.getElementById('inProg').checked;
    var compDate = $('#compDate').val();
    if (!compDate){
      compDate = undefined;
    }
    const headers = new Headers({
      'Content-Type': 'application/json'
    });
    let entry = {
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
        .then(res => res.json())
        .then(getData())
    }
  })

  /* function updateClock() {
    var time = new Date()
    var hr = time.getHours()
    var min = time.getMinutes()
    var sec = time.getSeconds()
    var localDate = new Intl.DateTimeFormat('fi').format(time)

    document.getElementById('time').innerHTML = localDate + ' / ' + hr + ':' + min + ':' + sec

    setInterval(updateClock, 1000)
  }
  updateClock(); */
  getData();
})