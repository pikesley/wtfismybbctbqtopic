function isLetter(char) {
  return('abcdefghijklmnopqrstuvwxyz@'.indexOf(char.toLowerCase()) > -1)
}

function isWord(string) {
  if(string == '') {
    return false
  }
  return(string.split('').every(isLetter))
}

function split(string) {
  return compress(string.split(/([^@A-Za-z])/))
}

function compress(list) {
  var a = []
  var buffer = ''

  $.each(list, function(index, word) {
    if(isWord(word)) {
      if(buffer != '') {
        a.push(buffer)
        buffer = ''
      }
      a.push(word)
    } else {
      buffer += word
    }
  })

  if(buffer != '') {
    a.push(buffer)
  }

  return(a)
}

function getRandom(array) {
  return array[Math.floor(Math.random() * array.length)]
}

function isPlaceholder(word) {
  return(word.indexOf('@') === 0)
}

function stripFirst(word) {
  return word.substring(1)
}

function containsPlaceholders(string) {
  return(string.indexOf('@') > -1)
}

function words(string) {
  return split(string)
}

function replaceWord(word, json) {
  if(isPlaceholder(word)) {
    return getRandom(json[stripFirst(word)])
  } else {
    return word
  }
}

function populateTemplate(template, json) {
  var populated = []
  $.each(words(template), function(index, word) {
    populated.push(replaceWord(word, json))
  })
  complete = populated.join('')

  if(containsPlaceholders(complete)) {
    return populateTemplate(complete, json)
  } else {
    return complete
  }
}

function template(json) {
  return populateTemplate(getRandom(json['templates']), json)
}
