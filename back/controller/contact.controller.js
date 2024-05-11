const db = require('../db')
class ContactController
{
    async createContact(req, res){
        const {name, number, id} = req.body
        console.log(name, number, id)
        const newContact = await db.query('INSERT INTO contact (name, number, acc_id) values ($1, $2, $3) RETURNING *', [name, number, id])
        res.json(newContact.rows[0])
    }
    async getOneContacts(req, res){
        const id = req.params.id
        console.log(id);
        const contacts = await db.query('SELECT * FROM contact where acc_id = $1', [id])
        res.json(contacts.rows)
    }
    async getContacts(req, res){
        const contacts = await db.query('SELECT * FROM contact')
        res.json(contacts.rows)
    }
    async updateContacts(req, res){
        const id = req.params.id
        const {name, number} = req.body
        const contacts = await db.query('UPDATE contact set name = $1, number = $2 where id = $3 RETURNING *', [name, number, id])
        res.json(contacts.rows[0])
    }
    async deleteContacts(req, res){
        const id = req.params.id
        const contacts = await db.query('DELETE FROM contact where id = $1', [id])
        res.json(contacts.rows[0])
    }
}

module.exports = new ContactController()