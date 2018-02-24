const ajax_call = function () {
    var request = new XMLHttpRequest()

    request.open('GET', '/calculate', true)
    document.querySelector('#clickit').style.display = 'none';

    document.querySelector('#message')
            .innerHTML = "calculating..."

    var failure = () =>
        console.error("Something's gone wrong")

    request.onload = function () {
        if (this.status >= 200 && this.status < 400) {
            const data = JSON.parse(this.response)

            document.querySelector('#clickit').style.display = 'block';
            document
                .querySelector('#message')
                    .innerHTML =
                        "Numbers: " + data.numbers + "<br><br>Prime factors: " + data.factors
        } else {
          document
              .querySelector('#message')
                  .innerHTML = "could not calculate"
            failure()
        }
    }

    request.onerror = failure

    request.send()
}

document.querySelector('#clickit').onclick = ajax_call
console.log('here')
