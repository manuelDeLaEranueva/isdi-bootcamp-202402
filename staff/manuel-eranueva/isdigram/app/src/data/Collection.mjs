class Collection {
    constructor(name) {
        this.name = name
    }

    // helpers

    _generateId() {
        return (+((parseInt(Math.random() * 10 ** 17)).toString())).toString(36)
    }

    _loadDocuments() {
        const documentsJSON = localStorage[this.name]

        const documents = JSON.parse(documentsJSON || '[]')

        return documents
    }

    _saveDocuments(documents) {
        if (!(documents instanceof Array)) throw new TypeError('documents is not an array')

        documents.forEach(document => {
            if (!(document instanceof Object)) throw new TypeError('a document in documents is not an object')
        })

        const documentsJSON = JSON.stringify(documents)

        localStorage[this.name] = documentsJSON
    }

    _backup() {
        localStorage[this.name + '-backup'] = localStorage[this.name]
    }

    _restore() {
        localStorage[this.name] = localStorage[this.name + '-backup']
    }

    // CRUD

    findOne(callback) {
        if (typeof callback !== 'function') throw new TypeError('callback is not a function')

        const documents = this._loadDocuments()

        const document = documents.find(callback)

        return document
    }

    insertOne(document) {
        const documents = this._loadDocuments()

        document.id = this._generateId()

        documents.push(document)

        this._saveDocuments(documents)
    }

    updateOne(document) {
        const documents = this._loadDocuments()

        const index = documents.findIndex(document2 => document2.id === document.id)

        if (index > - 1) {
            documents.splice(index, 1, document)

            this._saveDocuments(documents)
        }
    }

    deleteOne(callback) {
        const documents = this._loadDocuments()

        const index = documents.findIndex(callback)

        if (index > - 1) {
            documents.splice(index, 1)

            this._saveDocuments(documents)
        }
    }

    getAll() {
        const documents = this._loadDocuments()

        return documents
    }

    print() {
        const document = this._loadDocuments()

        console.table(document)
    }
}

export default Collection