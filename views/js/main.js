var ajax_call = function () {
    var request = new XMLHttpRequest()

    request.open('GET', '/calculate', true)

    var failure = () =>
        console.error("Something's gone wrong")

    request.onload = function () {
        if (this.status >= 200 && this.status < 400) {
            var data = JSON.parse(this.response)
            document
                .querySelector('#message')
                    .innerHTML =
                        data.message
        } else {
            failure()
        }
    }

    request.onerror = failure

    request.send()
}

document.querySelector('#clickit').onclick = ajax_call
