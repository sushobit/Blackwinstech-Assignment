const db = require("../models/contactsModel");

// Get all contacts
exports.getAllContacts = (req, res) => {
  db.all("SELECT * FROM contacts", [], (err, rows) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json(rows);
  });
};

// Get single contact by ID
exports.getContactById = (req, res) => {
  const { id } = req.params;
  db.get("SELECT * FROM contacts WHERE id = ?", [id], (err, row) => {
    if (err) return res.status(500).json({ error: err.message });
    if (!row) return res.status(404).json({ message: "Contact not found" });
    res.json(row);
  });
};

// Create new contact
exports.createContact = (req, res) => {
  const { name, email, phone, address } = req.body;
  db.run(
    "INSERT INTO contacts (name, email, phone, address) VALUES (?, ?, ?, ?)",
    [name, email, phone, address || null],
    function (err) {
      if (err) return res.status(500).json({ error: err.message });
      res.status(201).json({ id: this.lastID, name, email, phone, address });
    }
  );
};

// Update contact by ID
exports.updateContact = (req, res) => {
  const { id } = req.params;
  const { name, email, phone, address } = req.body;

  db.run(
    "UPDATE contacts SET name = ?, email = ?, phone = ?, address = ? WHERE id = ?",
    [name, email, phone, address || null, id],
    function (err) {
      if (err) return res.status(500).json({ error: err.message });
      if (this.changes === 0) return res.status(404).json({ message: "Contact not found" });
      res.json({ id, name, email, phone, address });
    }
  );
};

// Delete contact by ID
exports.deleteContact = (req, res) => {
  const { id } = req.params;
  db.run("DELETE FROM contacts WHERE id = ?", [id], function (err) {
    if (err) return res.status(500).json({ error: err.message });
    if (this.changes === 0) return res.status(404).json({ message: "Contact not found" });
    res.json({ message: "Contact deleted successfully" });
  });
};
