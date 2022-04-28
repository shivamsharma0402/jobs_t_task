let fs = require('fs').promises;
const path = require('path');
let uniqid = require('uniqid');

exports.add = async (req, res, next) => {
    try {
        const filePath = path.join(__dirname, '..', 'data/Directory.json');

        const data = await fs.readFile(filePath, "binary");
        let json = JSON.parse(data);

        json.push({
            id: uniqid(),
            ...req.body
        })

        await fs.writeFile(filePath, JSON.stringify(json));

        return res.status(201).send({
            msg: "Book saved successfully!",
        });
    } catch (err) {
        console.log(err);
        res.status(500).send({ message: err });
    }
};

exports.update = async (req, res, next) => {
    try {
        const filePath = path.join(__dirname, '..', 'data/Directory.json');
        const { id } = req.params;
        const { title, author } = req.body;

        const file_data = await fs.readFile(filePath, "binary");
        let json = JSON.parse(file_data);

        
        const index = json.findIndex(data => data.id == id);

        if (index == '-1') {
            return res.status(400).send({
                msg: "Book not found!",
            });
        }

        json[index].title = title;
        json[index].author = author;
        // json.forEach(data => {
        //     if (data.id == id) {
        //         data.title = title;
        //         data.author = author;
        //     }
        // });
        await fs.writeFile(filePath, JSON.stringify(json));

        return res.status(200).send({
            msg: "Book updated successfully!"
        });

    } catch (err) {
        console.log(err);
        res.status(500).send({ message: err });
    }
};

exports.fetch = async (req, res, next) => {
    try {
        const filePath = path.join(__dirname, '..', 'data/Directory.json');

        const data = await fs.readFile(filePath, "binary")

        return res.status(200).send({
            msg: "Books fetched successfully!",
            data: JSON.parse(data),
        });
    } catch (err) {
        console.log(err);
        res.status(500).send({ message: err });
    }
};

exports.fetchOne = async (req, res, next) => {
    try {
        const { id } = req.params;
        const filePath = path.join(__dirname, '..', 'data/Directory.json');

        const data = await fs.readFile(filePath, "binary")

        let json = JSON.parse(data);

        const index = json.findIndex(data => data.id == id);

        if (index == '-1') {
            return res.status(400).send({
                msg: "Book not found!",
            });
        }
        return res.status(200).send({
            msg: "Book fetched successfully!",
            data: json[index],
        });
    } catch (err) {
        console.log(err);
        res.status(500).send({ message: err });
    }
};

exports.remove = async (req, res, next) => {
    try {
        const filePath = path.join(__dirname, '..', 'data/Directory.json');

        const { id } = req.params;

        const file_data = await fs.readFile(filePath, "binary");
        let json = JSON.parse(file_data);

        const index = json.findIndex(data => data.id == id);

        if (index == '-1') {
            return res.status(400).send({
                msg: "Book not found!",
            });
        }

        json.splice(index, 1)
        await fs.writeFile(filePath, JSON.stringify(json));

        return res.status(200).send({
            msg: "Book removed successfully!"
        });
    } catch (err) {
        console.log(err);
        res.status(500).send({ message: err });
    }
};