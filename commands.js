module.exports = (extention, fileName) => {
    switch (extention) {
        case 'exs':
            return `docker run --rm  -v --rm -v $(pwd)/docker:/home -w /home elixir elixir ${fileName}`
        case 'java':
            return `docker run --rm -v $(pwd)/docker:/home -w /home java:7 javac ${fileName}`
        case 'js':
            return `docker run  --rm -v $(pwd)/docker:/home -w /home node:7 node ${fileName}`
        case 'rb':
            return `docker run --rm --name my-running-script -v $(pwd)/docker:/home  ruby:2.1 ruby /home/${fileName}`
        case 'py':
            return `docker run  --rm -v $(pwd)/docker:/home python:3 python /home/${fileName}`
        case 'go':
            return `docker run  --rm -v $(pwd)/docker:/home nimmis/alpine-golang go run /home/${fileName}`
        default:
            return 'echo ha-ha'
    }
}