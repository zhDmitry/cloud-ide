module.exports = (extention, fileName) => {
    switch (extention) {
        case 'go':
            return `docker run  --rm -v $(pwd)/docker:/home nimmis/alpine-golang go run /home/${fileName}`
        default:
            return 'echo ha-ha'
    }
}